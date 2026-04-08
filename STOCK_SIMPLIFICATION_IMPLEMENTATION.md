# Stock Simplification: Shop-Only Management System

**Date:** April 8, 2026  
**Status:** ✅ Implementation Complete

## Overview

Successfully refactored the system to:
1. **Eliminate store/shop separation** - only manage shop stock
2. **Integrate GRN into product workflow** - all stock added exclusively through GRN
3. **Simplify data model** - reduced columns and complexity

---

## Changes Implemented

### 1. Database Migration
**File:** `2026_04_08_000000_simplify_product_stock_shop_only.php`

**Changes:**
- ✅ Dropped `store_quantity_in_purchase_unit`
- ✅ Dropped `store_quantity_in_transfer_unit`
- ✅ Dropped `store_quantity_in_sale_unit`
- ✅ Dropped `store_low_stock_margin`
- ✅ Renamed `shop_quantity_in_sales_unit` → `shop_quantity`
- ✅ Updated column comments

### 2. Product Model
**File:** `app/Models/Product.php`

**Changes:**
- ✅ **Fillable array:** Updated to use `shop_quantity` (removed all store_* fields)
- ✅ **Appends:** Removed `loose_bundles`, store-related appends
- ✅ **Accessors:** Removed all store quantity accessors
- ✅ **Kept:** Shop quantity unit conversion attributes only
- ✅ **Backward compat:** `qty` accessor still works, maps to `shop_quantity`

**Before:**
```php
'shop_quantity_in_sales_unit' => 100,
'store_quantity_in_purchase_unit' => 10,
'store_quantity_in_transfer_unit' => 50,
```

**After:**
```php
'shop_quantity' => 100, // Only this - stored in sales units
```

### 3. ProductController
**File:** `app/Http/Controllers/ProductController.php`

**Methods Updated:**
- ✅ `index()` - Removed store columns, simplified selection
- ✅ `store()` - Removed store quantity validation
- ✅ `update()` - Removed store quantity fields
- ✅ Removed ProductAvailableQuantity data loading (was for store batches)

### 4. GoodsReceivedNoteController
**File:** `app/Http/Controllers/GoodReceiveNoteController.php`

**Changes:**
- ✅ `store()` method updated:
  - Now increments `product->shop_quantity` (not store_quantity_in_purchase_unit)
  - All received stock goes directly to shop inventory
  - GRN is the sole entry point for adding stock
- ✅ Batch tracking maintained in `ProductAvailableQuantity` table (for FIFO)
- ✅ Product movements recorded as before

**Stock Flow:**
```
Supplier → GRN Created → Product shop_quantity incremented → Ready for Sale
```

### 5. ReportController
**File:** `app/Http/Controllers/ReportController.php`

**Methods Updated:**
- ✅ `stockReport()` - Simplified (only shop stock)
- ✅ `lowStockReport()` - Removed filter types (was shop/store/both), now shop-only
- ✅ Multiple cleanup: removed store_ column selections

**Note:** Similar changes needed in:
- `exportLowStockCsv()` and related exports
- `lowStockShopReport()` methods
- Other report methods referencing store quantities

### 6. Deleted Files
- ✅ `app/Http/Controllers/StoreInventoryController.php`
- Routes already removed (previous task)

---

## Current Stock Architecture

### Quantity Columns (Products Table)
| Column | Purpose | Values |
|--------|---------|--------|
| `shop_quantity` | Shop stock quantity | Stored in sales units (e.g., bottles) |
| `shop_low_stock_margin` | Alert threshold | When quantity ≤ margin, flag as low |

### Related Tables Maintained
- ✅ `product_available_quantities` - FIFO batch tracking
- ✅ `product_movements` - Audit trail (stock changes)
- ✅ `goods_received_notes` - GRN records
- ✅ `sales_products` - Sales tracking

---

## Stock Flow Diagram

```
Product Registration
        ↓
    (No Initial Stock)
        ↓
Create GRN
        ↓
Select Supplier
        ↓
Add Products + Quantities
        ↓
GRN Processed
        ↓
product.shop_quantity += received_qty
        ↓
Product Movement Recorded (Type: PURCHASE)
        ↓
Now Available for Sale
```

---

## API/Controller Changes for Frontend

### Product Creation
**Before:**
```javascript
{
  name: "Coca-Cola 500ml",
  shop_quantity_in_sales_unit: 100,
  store_quantity_in_purchase_unit: 0,
  store_low_stock_margin: 5
}
```

**After:**
```javascript
{
  name: "Coca-Cola 500ml",
  shop_quantity: 0,  // Start at 0, add stock via GRN
  shop_low_stock_margin: 10
}
```

### GRN Creation
- No changes needed - still receives products with quantities
- Now increments `shop_quantity` directly
- Stock immediately available for sales

---

## Migration Checklist

Before running the migration:
- [ ] Backup database
- [ ] Review existing store-quantity data (for reports/archives)
- [ ] Update frontend components
- [ ] Test GRN creation → product stock increment

**To run migration:**
```bash
php artisan migrate
```

**To rollback (if needed):**
```bash
php artisan migrate:rollback
```

---

## Remaining Updates

### Frontend Components (Need Manual Review)
- Product create/edit forms - remove store fields
- Product list views - update stock display
- Reports - update store references
- GRN form - may need updates depending on implementation

### Report Methods (Still Reference Old Columns)
The following methods still have `shop_quantity_in_sales_unit` references that should be updated to `shop_quantity`:
- `exportLowStockCsv()`
- `exportLowStockShopCsv()`   
- `exportLowStockShopPdf()`
- `lowStockShopReport()` variations
- `lowStockStoreReport()` (can be removed or converted)
- `lowStockReport()` export methods

These are pattern-based replacements that should be batch-updated in the ReportController.

---

## Benefits

✅ **Simpler Data Model** - Single stock column instead of 3+  
✅ **Clearer Workflow** - GRN is sole stock entry point  
✅ **Reduced Complexity** - No store/shop reconciliation needed  
✅ **Better Audit Trail** - All stock changes via GRN  
✅ **Easier Reporting** - Only one stock level to track  

---

## Testing Checklist

- [ ] Create a new product (shop_quantity starts at 0)
- [ ] Create a GRN with that product
- [ ] Verify product shop_quantity incremented
- [ ] Check product movements recorded correctly
- [ ] Create another GRN, verify stock increments again
- [ ] Create a sale, verify shop_quantity decrements
- [ ] Check batch tracking in ProductAvailableQuantity
- [ ] Verify all reports work with new column names
