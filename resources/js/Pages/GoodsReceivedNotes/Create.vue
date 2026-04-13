<template>
  <AppLayout>
    <!-- Main Container -->
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 dark:from-gray-900 dark:to-gray-950">
      <!-- Header Section -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <!-- Back Button -->
          <button
            @click="$inertia.visit(route('good-receive-notes.index'))"
            class="px-6 py-2.5 rounded-[5px] font-medium text-sm bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            ← Back to GRNs
          </button>
          <h1 class="text-4xl font-bold text-gray-800">Create Goods Received Note</h1>
        </div>
      </div>

      <!-- Information Banner -->
      <div class="mb-6 bg-gradient-to-r from-green-50 to-teal-50 border-l-4 border-green-600 rounded-lg p-4 shadow-sm">
        <div class="flex items-start gap-3">
          <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.5 1A1.5 1.5 0 001 2.5v15A1.5 1.5 0 002.5 19h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0017.5 1h-15zM7 9a2 2 0 11-4 0 2 2 0 014 0zM7 13a6 6 0 11-6-6 1 1 0 100 2 4 4 0 110 8 1 1 0 100-2z" />
          </svg>
          <div>
            <p class="font-semibold text-green-900">📦 This is how stock is added to products</p>
            <p class="text-sm text-green-800 mt-1">
              Every Goods Received Note (GRN) adds stock to the selected products. Fill in the supplier details below, then add the products you received from that supplier.
            </p>
          </div>
        </div>
      </div>

      <!-- Main Form Container -->
      <div class="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        <form @submit.prevent="submitForm" class="p-8">
          <!-- GRN Details Section -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-blue-600 mb-6 flex items-center gap-2">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm11 4a1 1 0 10-2 0v3.697a.75.75 0 00.305 1.616l2.905-1.016a.75.75 0 10-.51-1.414l-2.305.805V8zm-9 .008a1 1 0 10-2 0v7a1 1 0 102 0v-7z" />
              </svg>
              GRN Details
            </h2>

            <div class="grid grid-cols-2 gap-6 md:grid-cols-3">
              <!-- GRN Number (Auto-generated) -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  GRN Number <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.goods_received_note_no"
                  type="text"
                  class="w-full px-4 py-2.5 text-sm text-gray-800 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none cursor-not-allowed font-semibold"
                  readonly
                />
              </div>

              <!-- Supplier -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Supplier <span class="text-red-500">*</span>
                </label>
                <select
                  v-model="form.supplier_id"
                  class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  required
                >
                  <option value="">Select a supplier</option>
                  <option v-for="supplier in suppliers" :key="supplier.id" :value="supplier.id">
                    {{ supplier.name }}
                  </option>
                </select>
              </div>

              <!-- GRN Date -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  Goods Received Date <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.goods_received_note_date"
                  type="date"
                  class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  required
                />
              </div>

              <!-- Batch Number -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Batch Number</label>
                <input
                  v-model="form.batch_number"
                  type="text"
                  placeholder="e.g., BATCH-001"
                  class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>

              <!-- Subtotal -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Subtotal</label>
                <input
                  v-model="form.subtotal"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>

              <!-- Discount -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Discount</label>
                <input
                  v-model="form.discount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>

              <!-- Tax Total -->
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">Tax Total</label>
                <input
                  v-model="form.tax_total"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>
            </div>

            <!-- Remarks -->
            <div class="mt-6">
              <label class="block text-sm font-semibold text-gray-700 mb-2">Remarks</label>
              <textarea
                v-model="form.remarks"
                rows="3"
                placeholder="Any additional notes about this GRN..."
                class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition resize-none"
              ></textarea>
            </div>
          </div>

          <!-- Products Section -->
          <div class="mb-8 border-t border-gray-200 pt-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-blue-600 flex items-center gap-2">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3z" />
                </svg>
                Products
              </h2>
              <button
                type="button"
                @click="addProductRow"
                class="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200"
              >
                + Add Product
              </button>
            </div>

            <!-- Products Table -->
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-gray-100 border-b-2 border-gray-300">
                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Product</th>
                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Quantity</th>
                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Unit</th>
                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Purchase Price</th>
                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Discount</th>
                    <th class="px-4 py-3 text-sm font-semibold text-gray-700">Total</th>
                    <th class="px-4 py-3 text-sm font-semibold text-gray-700 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(product, index) in form.products" :key="index" class="border-b border-gray-200 hover:bg-blue-50/30">
                    <!-- Product Selection -->
                    <td class="px-4 py-3">
                      <select
                        v-model="product.product_id"
                        @change="updateProductDetails(index)"
                        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                        required
                      >
                        <option value="">Select product</option>
                        <option v-for="p in availableProducts" :key="p.id" :value="p.id">
                          {{ p.name }} ({{ p.barcode }})
                        </option>
                      </select>
                    </td>

                    <!-- Quantity -->
                    <td class="px-4 py-3">
                      <input
                        v-model.number="product.issued_quantity"
                        @input="calculateProductTotal(index)"
                        type="number"
                        step="0.01"
                        min="0.01"
                        placeholder="0.00"
                        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                        required
                      />
                    </td>

                    <!-- Unit Display -->
                    <td class="px-4 py-3">
                      <span class="text-sm font-medium text-gray-700">
                        {{ product.unit || "Unit" }}
                      </span>
                    </td>

                    <!-- Purchase Price -->
                    <td class="px-4 py-3">
                      <input
                        v-model.number="product.purchase_price"
                        @input="calculateProductTotal(index)"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                        required
                      />
                    </td>

                    <!-- Discount -->
                    <td class="px-4 py-3">
                      <input
                        v-model.number="product.discount"
                        @input="calculateProductTotal(index)"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.00"
                        class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                      />
                    </td>

                    <!-- Total (Calculated) -->
                    <td class="px-4 py-3">
                      <span class="text-sm font-semibold text-blue-700">
                        {{ formatNumber(product.total || 0) }}
                      </span>
                    </td>

                    <!-- Remove Button -->
                    <td class="px-4 py-3 text-center">
                      <button
                        type="button"
                        @click="removeProductRow(index)"
                        class="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700 transition-all duration-200"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>

                  <!-- Empty State -->
                  <tr v-if="form.products.length === 0">
                    <td colspan="7" class="px-6 py-8 text-center text-gray-500 font-medium">
                      No products added yet. Click "Add Product" to get started.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="border-t border-gray-200 pt-8 flex gap-4 justify-end">
            <button
              type="button"
              @click="$inertia.visit(route('good-receive-notes.index'))"
              class="px-8 py-3 font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting || form.products.length === 0"
              :class="[
                'px-8 py-3 font-semibold text-white rounded-lg transition-all duration-200',
                isSubmitting || form.products.length === 0
                  ? 'bg-gray-400 cursor-not-allowed opacity-50'
                  : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
              ]"
            >
              {{ isSubmitting ? 'Creating...' : 'Create GRN' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';

const props = defineProps({
  grnNumber: String,
  suppliers: Array,
  availableProducts: Array,
  measurementUnits: Array,
});

const isSubmitting = ref(false);

const form = reactive({
  goods_received_note_no: props.grnNumber || '',
  supplier_id: '',
  goods_received_note_date: new Date().toISOString().split('T')[0],
  batch_number: '',
  subtotal: 0,
  discount: 0,
  tax_total: 0,
  remarks: '',
  products: []
});

const addProductRow = () => {
  form.products.push({
    product_id: '',
    issued_quantity: 0,
    purchase_price: 0,
    discount: 0,
    unit: '',
    total: 0,
    batch_number: form.batch_number
  });
};

const removeProductRow = (index) => {
  form.products.splice(index, 1);
};

const updateProductDetails = (index) => {
  const productId = form.products[index].product_id;
  const product = props.availableProducts.find(p => p.id == productId);

  if (product) {
    form.products[index].unit = product.sales_unit?.symbol || 'Unit';
    form.products[index].purchase_price = product.purchase_price || 0;
  }
};

const calculateProductTotal = (index) => {
  const product = form.products[index];
  const lineTotal = (product.issued_quantity * product.purchase_price) - (product.discount || 0);
  form.products[index].total = Math.max(0, lineTotal);
};

const formatNumber = (number) => {
  return parseFloat(number || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const submitForm = async () => {
  if (form.products.length === 0) {
    alert('Please add at least one product');
    return;
  }

  isSubmitting.value = true;

  try {
    await fetch('/goods-received-notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
      },
      body: JSON.stringify(form)
    }).then(response => {
      if (response.ok) {
        window.location.href = '/goods-received-notes';
      } else {
        alert('Failed to create GRN');
      }
    });
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while creating the GRN');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Tailwind CSS handles all styling */
</style>
