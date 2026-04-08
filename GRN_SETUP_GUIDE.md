# GRN (Goods Received Note) System - Complete Setup Guide

**Date:** April 8, 2026  
**Status:** ✅ Fully Configured

---

## Overview

The GRN (Goods Received Note) system is now fully integrated as the **exclusive entry point** for adding product stock to the shop. All inventory is managed through the GRN process.

### Key Principle
> **All stock is added exclusively through GRN. No other entry point exists.**

---

## Access Points

### 1. **From Dashboard** 
- Click the "Goods Received" card (📦 icon) on the main dashboard
- Takes you to GRN list page

### 2. **From Products Page**
- Click the **"📦 Add GRN"** button (green button) in the top-right corner
- Directly opens the GRN creation form

### 3. **Navigation Menu**
- Access via `Goods Received Notes` link in sidebar (if available)
- URL: `/goods-received-notes`

---

## GRN Workflow

### Step 1: Create a Product
1. Go to **Products** page
2. Click **"+ Add Product"**
3. Fill in product details (name, brand, category, pricing, units)
4. Product starts with **shop_quantity = 0** (no initial stock)
5. Save the product

### Step 2: Add Stock via GRN
1. From **Products** page, click **"📦 Add GRN"** button
   - OR Go to Dashboard → "Goods Received" → "Create Goods Received Note"
2. Fill GRN Details:
   - **Supplier** - Select the supplier
   - **Date** - When goods were received
   - **Batch Number** (optional) - For batch tracking
   - **Discount/Tax** - If applicable
3. Add Products:
   - Click **"+ Add Product"**
   - Select product from dropdown
   - Enter:
     - **Quantity** - How many units received
     - **Purchase Price** - Cost per unit
     - **Discount** (optional)
   - Quantity and price auto-calculate total
4. Click **"Create GRN"**

### Step 3: Verify Stock Updated
1. Go back to **Products** page
2. Find the product you just added GRN for
3. **Qty column** shows:
   - Green badge: `[quantity] Unit` - current shop stock
   - Red badge: `Min: [minimum]` - low stock threshold

---

## GRN Features

### ✅ Automatic Stock Update
- When you create a GRN with a product:
  - Product `shop_quantity` is **incremented** by the received quantity
  - Stock becomes immediately available for sales

### ✅ Batch Tracking (FIFO)
- Optional batch number for each GRN
- Tracks received quantities by batch
- Used for FIFO (First-In-First-Out) consumption during sales

### ✅ Audit Trail
- Every GRN creates a **Product Movement** record
- Complete history of stock additions
- Traceability for inventory management

### ✅ Multiple Suppliers
- Each GRN linked to one supplier
- Track which supplier provided which goods
- Useful for supplier performance analysis

### ✅ Financial Tracking
- Capture purchase price per unit
- Apply discounts and taxes
- Total cost calculation

---

## Key Data Fields

### GRN Header
| Field | Purpose | Example |
|-------|---------|---------|
| GRN Number | Auto-generated unique ID | GRN-20260408-0001 |
| Supplier | Which company supplied goods | ABC Distributors |
| Date | When goods received | 2026-04-08 |
| Batch Number | Optional batch identifier | BATCH-001 |
| Remarks | Any notes | Good condition, on time |

### Per-Product Line
| Field | Purpose | Example |
|-------|---------|---------|
| Product | Which product received | Coca-Cola 500ml |
| Quantity | How many units | 100 |
| Unit | Measurement unit | Bottle |
| Purchase Price | Cost per unit | 0.50 |
| Discount | Line item discount | 5.00 |
| Total | Calculated line total | 45.00 |

---

## Viewing GRN Records

1. Go to **Goods Received Notes** page
2. See table with all created GRNs
3. Click **"View"** button to see GRN details:
   - All products included in that GRN
   - Quantities and pricing
   - Supplier information
   - Date received

---

## Stock Calculation Example

### Scenario: Adding Coca-Cola to Shop

**Step 1: Product Created**
```
Product: Coca-Cola 500ml
Initial shop_quantity: 0
Sales Unit: Bottle
```

**Step 2: First GRN**
```
GRN-20260408-0001
Received Quantity: 100 bottles
Action: shop_quantity = 0 + 100 = 100
```

**Step 3: View Products**
```
Product List shows:
- Qty: 100 Bottle (green badge)
- Min: 10 (red badge - threshold)
```

**Step 4: Second GRN (More Stock)**
```
GRN-20260408-0002
Received Quantity: 50 bottles
Action: shop_quantity = 100 + 50 = 150
```

**Step 5: Sale Made**
```
Sale: 30 bottles
Action: shop_quantity = 150 - 30 = 120
```

**Step 6: Check Low Stock**
```
shop_quantity (120) > shop_low_stock_margin (10)
Status: ✅ Normal stock level
```

---

## Important Notes

### ⚠️ No Direct Stock Modification
- Products **cannot** be created with initial stock
- Stock **must** come from GRN
- **Exception:** Only via backend database (for data fixes)

### ⚠️ GRN Quantities Are in Sales Units
- All quantities stored in **sales_unit** (the smallest unit)
- Example: If sales_unit = "Bottle", quantities are in bottles
- Unit conversions handled automatically by system

### ⚠️ Shop Stock Visibility
- Only **shop_quantity** is tracked
- **Store concept has been removed** (dual warehouse model simplified)
- All stock is shop stock

### ⚠️ Batch Numbers
- Optional but recommended for tracking
- Useful for expiry date management
- Enables FIFO picking during sales

---

## Troubleshooting

### Problem: GRN not showing up in list
**Solution:** Ensure GRN was successfully created (check for success message)

### Problem: Product stock didn't increase
**Possible Causes:**
- GRN status might be inactive (check status badge)
- Product might be inactive
- Browser cache - refresh page

### Problem: Can't select a product in GRN
**Solution:** 
- Product must have status = "Active"
- Go to Products → Edit product → Set status to Active

### Problem: Quantity shows as 0
**Solution:**
- Verify GRN was saved (check GRN list)
- Check the quantity entered in line item
- Verify measurement unit is correct

---

## Best Practices

✅ **DO:**
- Use batch numbers for better inventory control
- Record accurate purchase prices
- Apply appropriate discounts at time of receipt
- Review GRN list regularly
- Monitor low stock warnings

❌ **DON'T:**
- Skip entering product details when creating GRN
- Leave batch fields empty (if tracking important)
- Modify shop_quantity directly in database
- Create duplicate GRN entries

---

## Quick Reference URLs

| Function | URL |
|----------|-----|
| GRN List | `/goods-received-notes` |
| Create GRN | `/goods-received-notes/create` |
| Products | `/products` |
| Dashboard | `/dashboard` |

---

## Summary

The GRN system is now:
- ✅ **Fully accessible** from dashboard and products page
- ✅ **Dedicated create page** for better user experience
- ✅ **Integrated with products** - quick access to create GRN
- ✅ **Complete workflow** - all stock tracked through GRN
- ✅ **Easy to understand** - clear step-by-step process

**All product stock must be added via GRN. This is now the exclusive entry point for inventory management.**
