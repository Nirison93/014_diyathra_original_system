<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cash_drawers', function (Blueprint $table) {
            // Keep a standalone index for the FK before dropping the composite unique key.
            $table->index('user_id', 'cash_drawers_user_id_index');

            // Remove one-record-per-day constraint to allow multiple open/close sessions per user per day
            $table->dropUnique('cash_drawers_user_id_date_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cash_drawers', function (Blueprint $table) {
            $table->unique(['user_id', 'date'], 'cash_drawers_user_id_date_unique');
            $table->dropIndex('cash_drawers_user_id_index');
        });
    }
};
