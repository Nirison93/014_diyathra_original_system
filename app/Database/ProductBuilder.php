<?php

namespace App\Database;

use Illuminate\Database\Eloquent\Builder;

class ProductBuilder extends Builder
{
    /**
     * Override select to replace 'qty' with 'shop_quantity as qty'
     */
    public function select($columns = ['*'])
    {
        $columns = is_array($columns) ? $columns : func_get_args();
        
        // Replace 'qty' with 'shop_quantity as qty' in the select columns
        $columns = array_map(function ($column) {
            if ($column === 'qty') {
                return 'shop_quantity as qty';
            }
            // Replace shop_quantity_in_sales_unit with shop_quantity for backward compatibility
            if ($column === 'shop_quantity_in_sales_unit') {
                return 'shop_quantity';
            }
            return $column;
        }, $columns);
        
        return parent::select($columns);
    }

    /**
     * Override where to replace 'qty' with 'shop_quantity'
     */
    public function where($column, $operator = null, $value = null, $boolean = 'and')
    {
        // Handle different where() argument patterns
        if ($column === 'qty') {
            $column = 'shop_quantity';
        }
        // Replace shop_quantity_in_sales_unit with shop_quantity for backward compatibility
        if ($column === 'shop_quantity_in_sales_unit') {
            $column = 'shop_quantity';
        }
        
        return parent::where($column, $operator, $value, $boolean);
    }
}
