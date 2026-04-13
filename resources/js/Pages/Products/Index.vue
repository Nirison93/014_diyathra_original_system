<template>
  <AppLayout>
    <!-- Main Container -->
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 dark:from-gray-900 dark:to-gray-950">
      <!-- Header Section with Navigation and Actions -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <!-- Back to Dashboard Button -->
          <button
            @click="$inertia.visit(route('dashboard'))"
            class="px-6 py-2.5 rounded-[5px] font-medium text-sm bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            ← Back
          </button>
          <h1 class="text-4xl font-bold text-gray-800">Products</h1>
        </div>
        <!-- Action Buttons -->
        <div class="flex gap-3">
          <!-- Add GRN Button -->
          <button
            @click="$inertia.visit(route('good-receive-notes.create'))"
            class="px-6 py-2.5 rounded-[5px] font-medium text-sm bg-green-600 text-white hover:bg-green-700 hover:scale-105 transition-all duration-300"
          >
            📦 Add GRN
          </button>
          <!-- Add New Product Button -->
          <button
            @click="openCreateModal"
            class="px-6 py-2.5 rounded-[5px] font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          >
            + Add Product
          </button>
        </div>
      </div>

      <!-- Information Banner -->
      <!-- <div class="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-lg p-4 shadow-sm">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
          </svg>
          <div>
            <p class="font-semibold text-blue-900">💡 Stock Management Reminder</p>
            <p class="text-sm text-blue-800 mt-1">
              All product stock is managed exclusively through GRN (Goods Received Notes). 
              To add stock to a product, use the <strong class="underline">📦 Add GRN</strong> button above.
            </p>
          </div>
        </div>
      </div> -->

      <!-- Live Search -->
      <div class="mb-4">
        <div class="relative max-w-xl">
          <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M10.8 18a7.2 7.2 0 100-14.4 7.2 7.2 0 000 14.4z" />
            </svg>
          </span>
          <input
            v-model="search"
            type="text"
            placeholder="Search by product name, brand, or category..."
            class="w-full rounded-[8px] border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <!-- GRN Data View Statistics Boxes -->
      

      <!-- Products Table Container -->
      <div class="bg-white rounded-2xl border border-gray-200 p-6">
        <table class="w-full text-left border-collapse">
          <!-- Table Header -->
          <thead>
            <tr class="border-b-2 border-blue-600">
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">#</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">Product Info</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">
                Brand/Category
              </th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-right">
                Price ({{ currencySymbol.currency }})
              </th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-center">
                Qty
              </th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-center">
                Status
              </th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-center">
                Actions
              </th>
            </tr>
          </thead>
          <!-- Table Body - Product Rows -->
          <tbody>
            <tr
              v-for="(product, index) in products.data"
              :key="product.id"
              class="border-b border-gray-200 hover:bg-blue-50/50 transition-colors duration-200"
            >
              <!-- Sequential ID -->
              <td class="px-4 py-4">
                <span
                  class="inline-flex items-center justify-center w-8 h-8 rounded-[10px] bg-blue-100 text-blue-700 font-bold text-sm"
                >
                  {{ (products.current_page - 1) * products.per_page + index + 1 }}
                </span>
              </td>
              <!-- Product Info (Name, Barcode, Code) -->
              <td class="px-4 py-4">
                <div class="space-y-1">
                  <div class="font-semibold text-gray-900">{{ product.name }}</div>
                  <!-- <div class="text-xs text-gray-600">Barcode: {{ product.barcode }}</div> -->
                  <div class="text-xs text-gray-500" v-if="product.code">
                    Code: {{ product.code }}
                  </div>
                </div>
              </td>
              <!-- Brand & Category -->
              <td class="px-4 py-4">
                <div class="space-y-1">
                  <div class="text-sm text-gray-800">
                    {{ product.brand?.name || "N/A" }}
                  </div>
                  <div class="text-xs text-gray-600">
                    {{
                      product?.category?.hierarchy_string
                        ? product.category.hierarchy_string +
                          " → " +
                          product.category.name
                        : product?.category?.name || "N/A"
                    }}
                  </div>
                </div>
              </td>
              <!-- Prices -->
              <td class="px-4 py-4 text-right">
                <div class="space-y-1">
                  <div class="text-sm font-semibold text-blue-700">
                    Retail: {{ Number(product.retail_price ?? 0).toFixed(2) }} <br />
                    Wholesale: {{ Number(product.wholesale_price ?? 0).toFixed(2) }}
                  </div>
                  <!-- <div class="text-xs text-gray-600">
                    Cost: {{ product.purchase_price || "0.00" }}
                  </div> -->
                </div>
              </td>
              <!-- Quantity -->
              <td class="px-4 py-4 text-center">
                <div class="flex flex-col gap-2">
                  <!-- Stock Quantity Badge -->
                  <div class="inline-flex items-center justify-center">
                    <span class="relative inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-full font-bold text-sm text-emerald-700 shadow-sm hover:shadow-md transition-shadow">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10.894 2.553a.889.889 0 00-1.788 0l-.412 2.463H6.781a.889.889 0 000 1.778h2.354l-1.06 6.36H5.228a.889.889 0 000 1.778h2.073l-.412 2.463a.889.889 0 101.788 0l.412-2.463h3.812l-.412 2.463a.889.889 0 101.788 0l.412-2.463h2.073a.889.889 0 100-1.778h-2.354l1.06-6.36h2.354a.889.889 0 100-1.778h-2.073l.412-2.463a.889.889 0 10-1.788 0l-.412 2.463h-3.812l.412-2.463zm1.06 7.138l1.06-6.36H9.894l-1.06 6.36h3.12z"/>
                      </svg>
                      <span>{{ Number(product.shop_quantity || 0).toFixed(0) }}</span>
                      <span class="text-xs font-normal opacity-75">{{ product.sales_unit?.symbol || 'Unit' }}</span>
                    </span>
                  </div>
                  
                  <!-- Minimum Stock Threshold -->
                  <div class="inline-flex items-center justify-center">
                    <span class="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-full text-xs font-semibold text-orange-700 shadow-sm">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M13.477 14.89A6 6 0 15.838 5.5H16a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V7h-.75a4.5 4.5 0 110 9h.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75h-.162z" clip-rule="evenodd"/>
                      </svg>Low
                      {{ product.shop_low_stock_margin || 0 }}
                    </span>
                  </div>
                </div>
              </td>
              <!-- Product Status Badge -->
              <td class="px-4 py-4 text-center">
                <span
                  :class="{
                    'bg-red-500/90 text-white px-4 py-1.5 rounded-[5px] font-medium text-xs':
                      product.status == 0,
                    'bg-green-500/90 text-white px-4 py-1.5 rounded-[5px] font-medium text-xs':
                      product.status == 1,
                    'bg-blue-500/90 text-white px-4 py-1.5 rounded-[5px] font-medium text-xs':
                      product.status == 2,
                  }"
                >
                  {{
                    product.status == 1
                      ? "Active"
                      : product.status == 0
                      ? "Inactive"
                      : "Default"
                  }}
                </span>
              </td>
              <!-- Action Buttons -->
              <td class="px-4 py-4">
                <div class="flex gap-2 justify-center">
                  <button
                    @click="openViewModal(product)"
                    class="px-4 py-2 text-xs font-medium text-white bg-green-600 rounded-[5px] hover:bg-green-700 hover:scale-105 transition-all duration-300"
                  >
                    View
                  </button>
                  <button
                    @click="openEditModal(product)"
                    :disabled="product.status == 2"
                    :class="[
                      'px-4 py-2 text-xs font-medium rounded-[5px] transition-all duration-300',
                      product.status == 2
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-50'
                        : 'text-white bg-blue-600 hover:bg-blue-700 hover:scale-105',
                    ]"
                  >
                    Edit
                  </button>
                  <button
                    @click="openDuplicateModal(product)"
                    class="px-4 py-2 text-xs font-medium text-white bg-purple-600 rounded-[5px] hover:bg-purple-700 hover:scale-105 transition-all duration-300"
                  >
                    Duplicate
                  </button>
                </div>
              </td>
            </tr>
            <!-- Empty State Message -->
            <tr v-if="!products.data || products.data.length === 0">
              <td colspan="7" class="px-6 py-8 text-center text-gray-500 font-medium">
                No products found
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div
          class="flex items-center justify-between px-6 py-4 mt-4"
          v-if="products.links"
        >
          <div class="text-sm text-gray-600 font-medium">
            Showing {{ products.from }} to {{ products.to }} of
            {{ products.total }} results
          </div>
          <div class="flex space-x-2">
            <button
              v-for="link in products.links"
              :key="link.label"
              @click="link.url ? router.visit(link.url) : null"
              :disabled="!link.url"
              :class="[
                'px-3 py-1 rounded-[5px] text-xs font-medium transition-all duration-300',
                link.active
                  ? 'bg-blue-600 text-white'
                  : link.url
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed',
              ]"
              v-html="link.label"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Components for CRUD Operations -->

    <!-- Create Product Modal - Full product creation form with image upload, units, pricing -->
    <ProductCreateModal
      v-model:open="isCreateModalOpen"
      :brands="brands"
      :categories="categories"
      :types="types"
      :measurementUnits="measurementUnits"
      :suppliers="suppliers"
      :customers="customers"
      :discounts="discounts"
      :taxes="taxes"
      :currencySymbol="currencySymbol"
    />

    <!-- View Product Modal - Read-only display with barcode printing capability -->
    <ProductViewModal
      v-model:open="isViewModalOpen"
      :product="selectedProductForView"
      :currencySymbol="currencySymbol"
    />

    <!-- Edit Product Modal - Full editing interface for existing products -->
    <ProductEditModal
      v-model:open="isEditModalOpen"
      :product="selectedProduct"
      :brands="brands"
      :categories="categories"
      :types="types"
      :measurementUnits="measurementUnits"
      :suppliers="suppliers"
      :customers="customers"
      :discounts="discounts"
      :taxes="taxes"
      :currencySymbol="currencySymbol"
    />
    <!-- Duplicate Product Modal - Clone product with new barcode for variants -->
    <ProductDuplicateModal
      v-model:open="isDuplicateModalOpen"
      :product="selectedProductForDuplicate"
      :brands="brands"
      :categories="categories"
      :types="types"
      :currencySymbol="currencySymbol"
      :measurementUnits="measurementUnits"
      :discounts="discounts"
      :taxes="taxes"
    />
  </AppLayout>
</template>

<script setup>
/**
 * Products Index Component Script
 *
 * Manages the products listing page with modal-based CRUD operations
 * Handles product viewing, editing, duplication, and deletion
 */

import { ref, watch } from "vue";
import { router } from "@inertiajs/vue3";
import { logActivity } from "@/composables/useActivityLog";
import ProductCreateModal from "./Components/ProductCreateModal.vue";
import ProductViewModal from "./Components/ProductViewModal.vue";
import ProductEditModal from "./Components/ProductEditModal.vue";
import ProductDuplicateModal from "./Components/ProductDuplicateModal.vue";

/**
 * Component Props
 * All data passed from ProductController
 */
const props = defineProps({
  products: {
    type: Object,
    required: true,
  },
  brands: {
    type: Array,
    required: true,
  },
  currencySymbol: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
  types: {
    type: Array,
    required: true,
  },
  measurementUnits: {
    type: Array,
    required: true,
  },
  discounts: {
    type: Array,
    required: true,
  },
  taxes: {
    type: Array,
    required: true,
  },
  grnStats: {
    type: Object,
    default: () => ({
      total: 0,
      this_month: 0,
      total_value: 0,
      recent: [],
    }),
  },
  filters: {
    type: Object,
    default: () => ({}),
  },
});

/**
 * Reactive State Variables
 *
 * Modal visibility states for each operation
 * Selected product references for edit/view/delete/duplicate operations
 */
const isCreateModalOpen = ref(false);
const isViewModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isDuplicateModalOpen = ref(false);
const selectedProduct = ref(null);
const selectedProductForView = ref(null);
const selectedProductForDuplicate = ref(null);
const search = ref(props.filters?.search || "");
let searchDebounceTimer = null;

watch(search, (value) => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer);
  }

  searchDebounceTimer = setTimeout(() => {
    router.get(
      route("products.index"),
      { search: value || undefined },
      {
        preserveState: true,
        replace: true,
      }
    );
  }, 300);
});

/**
 * Open Create Product Modal
 * Opens empty form for new product creation
 */
const openCreateModal = () => {
  isCreateModalOpen.value = true;
};

/**
 * Open View Product Modal
 * Displays product details in read-only mode with barcode printing
 * Also logs the view activity to activity_logs table
 *
 * @param {Object} product - Product object to view
 */
const openViewModal = async (product) => {
  selectedProductForView.value = product;
  isViewModalOpen.value = true;

  // Log the view activity
  await logActivity("view", "products", {
    product_id: product.id,
    product_name: product.name,
    barcode: product.barcode,
    brand: product.brand?.name || "N/A",
    category: product.category?.name || "N/A",
    purchase_price: product.purchase_price,
    selling_price: product.selling_price,
    qty: product.qty,
    status: product.status,
  });
};

/**
 * Open Edit Product Modal
 * Loads product data into edit form
 * Also logs the edit activity to activity_logs table
 *
 * @param {Object} product - Product object to edit
 */
const openEditModal = (product) => {
  selectedProduct.value = product;
  isEditModalOpen.value = true;
};

/**
 * Open Delete Confirmation Modal
 * Shows confirmation dialog before deletion
 *
 * @param {Object} product - Product object to delete
 */
const openDeleteModal = (product) => {
  if (!product || !product.id) {
    console.error("Invalid product data");
    return;
  }
  selectedProductForDelete.value = { ...product };
  isDeleteModalOpen.value = true;
};

/**
 * Open Duplicate Product Modal
 * Clones product data for creating variants
 * Useful for creating similar products with different attributes
 *
 * @param {Object} product - Product object to duplicate
 */
const openDuplicateModal = (product) => {
  if (!product || !product.id) {
    console.error("Invalid product data");
    return;
  }
  selectedProductForDuplicate.value = { ...product };
  isDuplicateModalOpen.value = true;
};
</script>
