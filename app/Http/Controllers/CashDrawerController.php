<?php

namespace App\Http\Controllers;

use App\Models\CashDrawer;
use App\Models\Expense;
use App\Models\Sale;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            ->whereDate('date', $today)
            ->first();

        if ($existing) {
            return back()->withErrors([
                'opening_balance' => 'Opening balance for today is already recorded.',
            ]);
        }

        CashDrawer::create([
            'user_id' => $userId,
            'date' => $today,
            'opening_balance' => $validated['opening_balance'],
            'opened_at' => now(),
            'status' => 'open',
        ]);

        return redirect()->route('sales.index')->with('success', 'Opening balance saved successfully.');
    }

    public function close(Request $request)
    {
        $validated = $request->validate([
            'closing_balance' => 'required|numeric|min:0|max:9999999999999.99',
        ]);

        $today = Carbon::today()->toDateString();
        $userId = Auth::id();

        $drawer = CashDrawer::where('user_id', $userId)
            ->whereDate('date', $today)
            ->first();

        if (!$drawer) {
            return back()->withErrors([
                'closing_balance' => 'Opening balance is not recorded for today.',
            ]);
        }

        if ($drawer->status === 'closed') {
            return back()->withErrors([
                'closing_balance' => 'Cash drawer is already closed for today.',
            ]);
        }

        $summary = $this->buildSummary($userId, $today, $drawer->opening_balance);

        $drawer->update([
            'closing_balance' => $validated['closing_balance'],
            'closed_at' => now(),
            'status' => 'closed',
        ]);

        $difference = (float) $validated['closing_balance'] - (float) $summary['expected_balance'];

        return redirect()->route('sales.index')->with('success', 'Closing balance saved. Difference: ' . number_format($difference, 2));
    }

    private function buildSummary(int $userId, string $date, float $openingBalance): array
    {
        $salesTotal = (float) Sale::where('user_id', $userId)
            ->whereDate('sale_date', $date)
            ->sum('net_amount');

        $cashExpenses = (float) Expense::where('user_id', $userId)
            ->whereDate('expense_date', $date)
            ->where('payment_type', 0)
            ->sum('amount');

        return [
            'sales_total' => $salesTotal,
            'cash_expenses' => $cashExpenses,
            'expected_balance' => (float) $openingBalance + $salesTotal - $cashExpenses,
        ];
    }
}
