<?php

namespace App\Http\Controllers;

use App\Models\CashDrawer;
use App\Models\Expense;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\QueryException;

class CashDrawerController extends Controller
{
    public function open(Request $request)
    {
        $validated = $request->validate([
            'opening_balance' => 'required|numeric|min:0|max:9999999999999.99',
        ]);

        $today = Carbon::today()->toDateString();
        $userId = Auth::id();

        $existing = CashDrawer::where('user_id', $userId)
            ->where('status', 'open')
            ->orderByDesc('opened_at')
            ->first();

        if ($existing) {
            return back()->withErrors([
                'opening_balance' => 'Close the currently open cash drawer before opening a new session.',
            ]);
        }

        try {
            CashDrawer::create([
                'user_id' => $userId,
                'date' => $today,
                'opening_balance' => $validated['opening_balance'],
                'opened_at' => now(),
                'status' => 'open',
            ]);
        } catch (QueryException $e) {
            // If legacy unique index (user_id + date) still exists, avoid 500 and show clear action.
            $isDuplicatePerDayConstraint = str_contains($e->getMessage(), 'cash_drawers_user_id_date_unique')
                || (isset($e->errorInfo[1]) && (int) $e->errorInfo[1] === 1062);

            if ($isDuplicatePerDayConstraint) {
                return back()->withErrors([
                    'opening_balance' => 'Cannot open another cash drawer session for today yet. Please run the latest database migration to enable multiple open/close sessions per day.',
                ]);
            }

            throw $e;
        }

        return redirect()->route('sales.index')->with('success', 'Opening balance saved successfully.');
    }

    public function close(Request $request)
    {
        $validated = $request->validate([
            'closing_balance' => 'required|numeric|min:0|max:9999999999999.99',
        ]);

        $userId = Auth::id();

        $drawer = CashDrawer::where('user_id', $userId)
            ->where('status', 'open')
            ->orderByDesc('opened_at')
            ->first();

        if (!$drawer) {
            return back()->withErrors([
                'closing_balance' => 'No open cash drawer session found to close.',
            ]);
        }

        if ($drawer->status === 'closed') {
            return back()->withErrors([
                'closing_balance' => 'Cash drawer is already closed for today.',
            ]);
        }

        $summary = $this->buildSummary($userId, $drawer);

        $drawer->update([
            'closing_balance' => $validated['closing_balance'],
            'closed_at' => now(),
            'status' => 'closed',
        ]);

        $difference = (float) $validated['closing_balance'] - (float) $summary['expected_balance'];

        return redirect()->route('sales.index')->with('success', 'Closing balance saved. Difference: ' . number_format($difference, 2));
    }

    private function buildSummary(int $userId, CashDrawer $drawer): array
    {
        $sessionStart = $drawer->opened_at ?? $drawer->created_at;
        $sessionEnd = now();

        $salesTotal = (float) Sale::where('user_id', $userId)
            ->whereBetween('created_at', [$sessionStart, $sessionEnd])
            ->sum('net_amount');

        $cashExpenses = (float) Expense::where('user_id', $userId)
            ->whereBetween('created_at', [$sessionStart, $sessionEnd])
            ->where('payment_type', 0)
            ->sum('amount');

        return [
            'sales_total' => $salesTotal,
            'cash_expenses' => $cashExpenses,
            'expected_balance' => (float) $drawer->opening_balance + $salesTotal - $cashExpenses,
        ];
    }
}
