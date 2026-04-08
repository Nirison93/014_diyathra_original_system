<template>
  <AppLayout>
    <!-- Main Container -->
    <div class="min-h-screen bg-gray-50 p-6">
      <!-- Header Section with Navigation and Actions -->
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <!-- Back to Dashboard Button -->
          <button
            @click="goToStoresTab"
            class="px-6 py-2.5 rounded-[5px] font-medium text-sm bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            ← Back
          </button>
          <h1 class="text-4xl font-bold text-gray-800">Goods Received Notes</h1>
        </div>
        <!-- Add New Button -->
        <a
          :href="route('good-receive-notes.create')"
          class="px-6 py-2.5 rounded-[5px] font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 transition-all duration-300 inline-block"
        >
          + Create Goods Received Note
        </a>
      </div>

      <div class="mb-6 grid grid-cols-4 gap-4">
        <!-- Total GRNs Box -->
        <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Total GRNs</p>
              <p class="text-3xl font-bold text-blue-600 mt-2">{{ grnStats.total }}</p>
            </div>
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 6H6.28l-.31-1.243A1 1 0 005 4H3a1 1 0 000 2h1.623l2.472 9.887A1 1 0 0010 16.5h1a1 1 0 001-1v-1h6v1a1 1 0 001 1h2a1 1 0 100-2h-1v-3a1 1 0 00-1-1h-1.623l.244-.976A1 1 0 0012 9.329V6h1a1 1 0 100-2H6.28l-.31-1.243A1 1 0 005 2H3z" />
              </svg>
            </div>
          </div>
        </div>

        <!-- This Month's GRNs Box -->
        <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">This Month</p>
              <p class="text-3xl font-bold text-green-600 mt-2">{{ grnStats.this_month }}</p>
            </div>
            <div class="p-3 bg-green-100 rounded-lg">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Value Box -->
        <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Total Value</p>
              <p class="text-3xl font-bold text-purple-600 mt-2">{{ currencySymbol.currency_symbol }}{{ Number(grnStats.total_value ?? 0).toFixed(2) }}</p>
            </div>
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.16 5.314l6.526-3.674a.5.5 0 01.693.294l2.742 10.368c.34 1.293-.608 2.557-1.922 2.557h-8.5l-3.468-12a.5.5 0 01 .295-.694z" />
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Recent GRNs Count Box -->
        <div class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-medium">Recent GRNs</p>
              <p class="text-3xl font-bold text-orange-600 mt-2">{{ grnStats.recent.length }}</p>
              <div class="mt-3 space-y-1">
                <p v-for="grn in grnStats.recent.slice(0, 2)" :key="grn.id" class="text-xs text-gray-500">
                  #{{ grn.goods_received_note_no }}
                </p>
              </div>
            </div>
            <div class="p-3 bg-orange-100 rounded-lg">
              <svg class="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000-2H6a1 1 0 00-1 1v1H4a1 1 0 000 2h8a1 1 0 100-2H9V3a1 1 0 00-1-1H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V5a1 1 0 100 2h1a1 1 0 100-2h-1V5a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V5a1 1 0 100-2z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Goods Received Notes Table Container -->
      <div class="bg-white rounded-2xl border border-gray-200 p-6">
        <table class="w-full text-left border-collapse">
          <!-- Table Header -->
          <thead>
            <tr class="border-b-2 border-blue-600">
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">Note Number</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">Supplier</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">Date</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">Products</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">Discount</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">Tax</th>

              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-center">
                Actions
              </th>
            </tr>
          </thead>
          <!-- Table Body -->
          <tbody>
            <tr
              v-for="goodsReceivedNote in goodsReceivedNotes.data"
              :key="goodsReceivedNote.id"
              class="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
            >
              <td class="px-4 py-4">
                <span class="font-semibold text-gray-900">{{
                  goodsReceivedNote.goods_received_note_no
                }}</span>
              </td>
              <td class="px-4 py-4">
                <span class="text-sm text-gray-800">{{
                  goodsReceivedNote.supplier?.name || "N/A"
                }}</span>
              </td>
              <td class="px-4 py-4">
                <span class="text-sm text-gray-800">{{
                  formatDate(goodsReceivedNote.goods_received_note_date)
                }}</span>
              </td>
              <td class="px-4 py-4">
                <span class="text-sm text-gray-700"
                  >{{
                    goodsReceivedNote.goods_received_note_products?.length || 0
                  }}
                  items</span
                >
              </td>
              <td class="px-4 py-4">
                <span class="text-sm text-gray-800">{{
                  formatNumber(
                    (goodsReceivedNote.goods_received_note_products || []).reduce((sum, p) => sum + (parseFloat(p.discount) || 0), 0)
                  )
                }}</span>
              </td>
              <td class="px-4 py-4">
                <span class="text-sm text-gray-800">{{
                  formatNumber(goodsReceivedNote.tax_total)
                }}</span>
              </td>

              <td class="px-4 py-4">
                <div class="flex gap-2 justify-center">
                  <button
                    @click="openViewModal(goodsReceivedNote)"
                    class="px-4 py-2 text-xs font-medium text-white bg-green-600 rounded-[5px] hover:bg-green-700 transition-all duration-200"
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
            <!-- Empty State Message -->
            <tr v-if="!goodsReceivedNotes.data || goodsReceivedNotes.data.length === 0">
              <td colspan="8" class="px-6 py-8 text-center text-gray-500 font-medium">
                No Goods Received Notes found
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div
          class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200"
          v-if="goodsReceivedNotes.links && goodsReceivedNotes.links.length > 3"
        >
          <div class="text-sm text-gray-600">
            Showing {{ goodsReceivedNotes.from }} to {{ goodsReceivedNotes.to }} of
            {{ goodsReceivedNotes.total }} results
          </div>
          <div class="flex space-x-2">
            <button
              v-for="link in goodsReceivedNotes.links"
              :key="link.label"
              @click="link.url ? router.visit(link.url) : null"
              :disabled="!link.url"
              :class="[
                'px-4 py-2 rounded-[5px] text-sm font-medium transition-all duration-200',
                link.active
                  ? 'bg-blue-600 text-white'
                  : link.url
                  ? 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed',
              ]"
              v-html="link.label"
            ></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <GoodsReceivedNoteCreateModal
      v-model:open="isCreateModalOpen"
      :suppliers="suppliers"
      :discounts="discounts"
      :taxes="taxes"
      :purchase-orders="purchaseOrders"
      :products="products"
      :available-products="availableProducts"
      :grnNumber="grnNumber"
      :measurementUnits="measurementUnits"
    />

    <!-- View Modal -->
    <GoodsReceivedNoteViewModel
      v-model:open="isViewModalOpen"
      :grn="selectedGoodsReceivedNote"
    />

    <!-- Delete Modal -->
    <GoodsReceivedNoteDeleteModal
      v-model:open="isDeleteModalOpen"
      :grn="selectedGoodsReceivedNote"
    />
  </AppLayout>
</template>

<script setup>
import { ref } from "vue";
import { router } from "@inertiajs/vue3";
import { logActivity } from "@/composables/useActivityLog";
import AppLayout from "@/Layouts/AppLayout.vue";
import GoodsReceivedNoteCreateModal from "./Components/GoodsReceivedNoteCreateModal.vue";
import GoodsReceivedNoteViewModel from "./Components/GoodsReceivedNoteViewModel.vue";
import { useDashboardNavigation } from "@/composables/useDashboardNavigation";

defineProps({
  products: Array,
  goodsReceivedNotes: Object,
  suppliers: Array,
  purchaseOrders: Array,
  availableProducts: Array,
  grnNumber: String,
  measurementUnits: Array,
  currencySymbol: Object,
  grnStats: {
    type: Object,
    default: () => ({
      total: 0,
      this_month: 0,
      total_value: 0,
      recent: [],
    }),
  },
});

const isCreateModalOpen = ref(false);
const isViewModalOpen = ref(false);
const isDeleteModalOpen = ref(false);
const selectedGoodsReceivedNote = ref(null);

const { goToStoresTab } = useDashboardNavigation();

const openCreateModal = () => {
  isCreateModalOpen.value = true;
};

const openViewModal = async (goodsReceivedNote) => {
  selectedGoodsReceivedNote.value = goodsReceivedNote;
  isViewModalOpen.value = true;

  // Log view activity
  await logActivity("view", "goods_received_notes", {
    grn_id: goodsReceivedNote.id,
    grn_number: goodsReceivedNote.goods_received_note_no,
    grn_date: goodsReceivedNote.goods_received_note_date,
    supplier: goodsReceivedNote.supplier?.name || "N/A",
  });
};

const openDeleteModal = (goodsReceivedNote) => {
  selectedGoodsReceivedNote.value = goodsReceivedNote;
  isDeleteModalOpen.value = true;
};

const formatDate = (date) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatNumber = (number) => {
  return parseFloat(number || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
</script>

<style scoped>
/* Tailwind CSS handles all styling */
</style>
