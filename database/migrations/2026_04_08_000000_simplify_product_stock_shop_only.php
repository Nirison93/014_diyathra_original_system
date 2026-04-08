<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * 
     * This migration simplifies the stock management system by:
     * - Removing the store/shop separation
     * - Keeping only shop stock which is managed via GRN
     * - Stock is now added exclusively through the GRN (Goods Received Note) process
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            // Drop all store-related columns - stock now only managed via GRN
            $table->dropColumn([
                'store_quantity_in_purchase_unit',
                'store_quantity_in_transfer_unit',
                'store_quantity_in_sale_unit',
                'store_low_stock_margin',
            ]);
        });

        // Rename shop_quantity_in_sales_unit to shop_quantity for simplicity
        Schema::table('products', function (Blueprint $table) {
            $table->renameColumn('shop_quantity_in_sales_unit', 'shop_quantity');
        });

        // Update column comment to clarify the new stock management model
        DB::statement("ALTER TABLE products MODIFY COLUMN shop_quantity INT DEFAULT 0 COMMENT 'Shop stock quantity in sales units - managed exclusively via GRN'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Note: Reversing this migration requires re-running the multi-level units migrations
        Schema::table('products', function (Blueprint $table) {
            // Rename back to original name
            $table->renameColumn('shop_quantity', 'shop_quantity_in_sales_unit');
        });

        DB::statement("ALTER TABLE products MODIFY COLUMN shop_quantity_in_sales_unit INT DEFAULT 0 COMMENT 'Shop stock quantity in sales units (e.g., bottles)'");

        Schema::table('products', function (Blueprint $table) {
            // Restore store-related columns
            $table->integer('store_quantity_in_purchase_unit')->default(0)->after('shop_quantity_in_sales_unit')
                ->comment('Store stock quantity in purchase units (e.g., boxes)');
            $table->integer('store_quantity_in_transfer_unit')->default(0)->after('store_quantity_in_purchase_unit')
                ->comment('Store stock quantity in transfer units (e.g., bulks/bundles)');
            $table->integer('store_quantity_in_sale_unit')->default(0)->after('store_quantity_in_transfer_unit')
                ->comment('Store stock quantity in sales units');
            $table->integer('store_low_stock_margin')->default(0)->after('store_quantity_in_sale_unit')
                ->comment('Store low stock margin alert');
        });
    }
};
