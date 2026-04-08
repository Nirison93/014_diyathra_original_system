<script setup>
/**
 * Dashboard Component Script
 *
 * Main dashboard for POS system users
 * Uses AppLayout for consistent navigation
 */
import AppLayout from "@/Layouts/AppLayout.vue";
import { Head, Link, usePage, router } from "@inertiajs/vue3";
import { computed, ref, onMounted } from "vue";

const page = usePage();
const pageTitle = computed(() => {
  const appName = page.props.appSettings?.app_name || "POS";
  return appName;
});

// Set default tab based on user role
const getDefaultTab = () => {
  const userRole = page.props.auth.user.role;
  if ([0, 1, 3].includes(userRole)) {
    return "products"; // Products section for these roles
  }
  return "shops"; // Default to shops for other roles
};

// Track active tab
const activeTab = ref(getDefaultTab());

// Switch tabs and persist selection
const setActiveTab = (tab) => {
  activeTab.value = tab;
};

// Set default tab on mount
onMounted(() => {
  const savedTab = localStorage.getItem("activeTab");
  const fromNavigation = sessionStorage.getItem("fromNavigation");

  if (savedTab && fromNavigation === "true") {
    activeTab.value = savedTab;
    sessionStorage.removeItem("fromNavigation");
  } else {
    activeTab.value = getDefaultTab();
    localStorage.removeItem("activeTab");
  }
});
</script>

<template>
  <!-- Page Title for Browser Tab -->
  <Head :title="pageTitle" />

  <AppLayout>
    <div class="min-h-screen overflow-y-auto bg-gray-50 pb-12">
      <!-- Header -->
      <!-- <div class="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 bg-white border-b border-gray-200">
        <h1 class="text-4xl font-bold text-gray-900 tracking-tight">Dashboard</h1>
        <p class="text-gray-600 mt-2 font-medium">Welcome back to your POS system</p>
      </div> -->

      <!-- Tab Navigation -->
      <div class="px-4 sm:px-6 lg:px-8 mb-8 pt-6">
        <div class="flex flex-wrap justify-center gap-3 pb-3">
          <button
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            @click="setActiveTab('products')"
            :class="[
              activeTab === 'products'
                ? 'bg-gray-900 text-white rounded-lg shadow-sm border border-gray-900'
                : 'text-gray-600 rounded-lg border border-transparent hover:text-gray-900 hover:bg-white hover:border-gray-200',
              'px-4 py-2.5 font-medium text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2'
            ]"
          >
            <span>📦</span>
            <span class="hidden sm:inline">Products</span>
          </button>

          <button
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            @click="setActiveTab('stores')"
            :class="[
              activeTab === 'stores'
                ? 'bg-gray-900 text-white rounded-lg shadow-sm border border-gray-900'
                : 'text-gray-600 rounded-lg border border-transparent hover:text-gray-900 hover:bg-white hover:border-gray-200',
              'px-4 py-2.5 font-medium text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2'
            ]"
          >
            <span>🛒</span>
            <span class="hidden sm:inline">Stores</span>
          </button>

          <button
            @click="setActiveTab('shops')"
            :class="[
              activeTab === 'shops'
                ? 'bg-gray-900 text-white rounded-lg shadow-sm border border-gray-900'
                : 'text-gray-600 rounded-lg border border-transparent hover:text-gray-900 hover:bg-white hover:border-gray-200',
              'px-4 py-2.5 font-medium text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2'
            ]"
          >
            <span>💰</span>
            <span class="hidden sm:inline">Shops</span>
          </button>

          <button
            v-if="[0, 1, 2, 3].includes($page.props.auth.user.role)"
            @click="setActiveTab('reports')"
            :class="[
              activeTab === 'reports'
                ? 'bg-gray-900 text-white rounded-lg shadow-sm border border-gray-900'
                : 'text-gray-600 rounded-lg border border-transparent hover:text-gray-900 hover:bg-white hover:border-gray-200',
              'px-4 py-2.5 font-medium text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2'
            ]"
          >
            <span>📊</span>
            <span class="hidden sm:inline">Reports</span>
          </button>

          <button
            v-if="![2, 3].includes($page.props.auth.user.role)"
            @click="setActiveTab('settings')"
            :class="[
              activeTab === 'settings'
                ? 'bg-gray-900 text-white rounded-lg shadow-sm border border-gray-900'
                : 'text-gray-600 rounded-lg border border-transparent hover:text-gray-900 hover:bg-white hover:border-gray-200',
              'px-4 py-2.5 font-medium text-sm whitespace-nowrap transition-all duration-200 flex items-center gap-2'
            ]"
          >
            <span>🔧</span>
            <span class="hidden sm:inline">Settings</span>
          </button>
        </div>
      </div>

      <!-- Products Section -->
      <div
        v-if="activeTab === 'products' && [0, 1, 3].includes($page.props.auth.user.role)"
        class="px-4 sm:px-6 lg:px-8 mb-8"
      >
        <h3
          class="text-lg font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-300 flex items-center gap-2"
        >
          <span class="text-2xl">📦</span> Inventory Management
        </h3>
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <Link
            v-if="[0, 1 ,3].includes($page.props.auth.user.role)"
            :href="route('products.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📦</div>
            <div class="font-semibold text-gray-900 mb-1">Products</div>
            <div class="text-sm text-gray-600">Create and manage products</div>
          </Link>

          <Link
            v-if="[0, 1].includes($page.props.auth.user.role)"
            :href="route('brands.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">⭐</div>
            <div class="font-semibold text-gray-900 mb-1">Brands</div>
            <div class="text-sm text-gray-600">Manage product brands</div>
          </Link>

          <Link
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            :href="route('categories.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">🏷️</div>
            <div class="font-semibold text-gray-900 mb-1">Categories</div>
            <div class="text-sm text-gray-600">Organize products by category</div>
          </Link>

          <Link
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            :href="route('types.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">🧩</div>
            <div class="font-semibold text-gray-900 mb-1">Types</div>
            <div class="text-sm text-gray-600">Manage product types</div>
          </Link>

          <Link
            v-if="[0, 1].includes($page.props.auth.user.role)"
            :href="route('measurement-units.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📏</div>
            <div class="font-semibold text-gray-900 mb-1">Units</div>
            <div class="text-sm text-gray-600">Manage measurement units</div>
          </Link>

          <Link
            v-if="[0, 1 ,3].includes($page.props.auth.user.role)"
            :href="route('suppliers.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">🚚</div>
            <div class="font-semibold text-gray-900 mb-1">Suppliers</div>
            <div class="text-sm text-gray-600">Manage supplier information</div>
          </Link>
        </div>
      </div>

      <!-- Stores Section -->
      <div
        v-if="activeTab === 'stores' && [0, 1, 3, 4].includes($page.props.auth.user.role)"
        class="px-4 sm:px-6 lg:px-8 mb-8"
      >
        <h3
          class="text-lg font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-300 flex items-center gap-2"
        >
          <span class="text-2xl">🛒</span> Warehouse & Inventory Management
        </h3>
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">


           <Link
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            :href="route('store-inventory.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📊</div>
            <div class="font-semibold text-gray-900 mb-1">Inventory</div>
            <div class="text-sm text-gray-600">Track store adjustments</div>
          </Link>


          <Link
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            :href="route('purchase-order-requests.index')"
              class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📋</div>
            <div class="font-semibold text-gray-900 mb-1">
              Purchase Orders
            </div>
            <div class="text-sm text-gray-600">Manage purchase orders</div>
          </Link>


          <Link
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            :href="route('good-receive-notes.index')"
              class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📦</div>
            <div class="font-semibold text-gray-900 mb-1">
              Goods Received
            </div>
            <div class="text-sm text-gray-600">
              Track received goods
            </div>
          </Link>

          <Link
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            :href="route('good-receive-note-returns.index')"
              class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📦</div>
            <div class="font-semibold text-gray-900 mb-1">Goods Returns</div>
            <div class="text-sm text-gray-600">
              Track returned goods
            </div>
          </Link>

          <Link
            v-if="[0, 1, 3,4].includes($page.props.auth.user.role)"
            :href="route('product-release-notes.index')"
              class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📝</div>
            <div class="font-semibold text-gray-900 mb-1">
              Transfer Release
            </div>
            <div class="text-sm text-gray-600">
              Manage goods transfers
            </div>
          </Link>

          <Link
            v-if="[0, 1].includes($page.props.auth.user.role)"
            :href="route('purchase-expenses.index')"
              class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">💸</div>
            <div class="font-semibold text-gray-900 mb-1">Supplier Payments</div>
            <div class="text-sm text-gray-600">Track supplier payments</div>
          </Link>

        </div>
      </div>

      <!-- Shops Section -->
      <div
        v-if="activeTab === 'shops'"
        class="px-4 sm:px-6 lg:px-8 mb-8"
      >
        <h3
          class="text-lg font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-300 flex items-center gap-2"
        >
          <span class="text-2xl">💰</span> Sales Management
        </h3>
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <Link
            v-if="[0, 1].includes($page.props.auth.user.role)"
            :href="route('customers.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">👥</div>
            <div class="font-semibold text-gray-900 mb-1">Customers</div>
            <div class="text-sm text-gray-600">Manage customers</div>
          </Link>

          <Link
            v-if="[0, 1].includes($page.props.auth.user.role)"
            :href="route('discounts.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">🏷️</div>
            <div class="font-semibold text-gray-900 mb-1">Discounts</div>
            <div class="text-sm text-gray-600">Manage discounts</div>
          </Link>

          <Link
            v-if="[0, 1].includes($page.props.auth.user.role)"
            :href="route('taxes.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📊</div>
            <div class="font-semibold text-gray-900 mb-1">Taxes</div>
            <div class="text-sm text-gray-600">Manage tax rates</div>
          </Link>

          <Link
            v-if="[0, 1, 2].includes($page.props.auth.user.role)"
            :href="route('sales.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">💳</div>
            <div class="font-semibold text-gray-900 mb-1">Sales</div>
            <div class="text-sm text-gray-600">Manage sales transactions</div>
          </Link>

          <Link
            v-if="[0, 1, 2].includes($page.props.auth.user.role)"
            :href="route('sales.all')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📜</div>
            <div class="font-semibold text-gray-900 mb-1">Sales History</div>
            <div class="text-sm text-gray-600">View all sales records</div>
          </Link>

          <Link
            v-if="[0, 1, 2].includes($page.props.auth.user.role)"
            :href="route('quotations.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📄</div>
            <div class="font-semibold text-gray-900 mb-1">Quotations</div>
            <div class="text-sm text-gray-600">Create & manage quotations</div>
          </Link>

          <Link
            v-if="[0, 1, 2].includes($page.props.auth.user.role)"
            :href="route('quotation.edit')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">✏️</div>
            <div class="font-semibold text-gray-900 mb-1">Edit Quotations</div>
            <div class="text-sm text-gray-600">Update quotations</div>
          </Link>

          <Link
            v-if="[0, 1].includes($page.props.auth.user.role)"
            :href="route('product-transfer-requests.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📤</div>
            <div class="font-semibold text-gray-900 mb-1">Transfer Requests</div>
            <div class="text-sm text-gray-600">Manage transfer requests</div>
          </Link>

          <a
            v-if="[0, 1].includes($page.props.auth.user.role)"
            href="/stock-transfer-returns"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300 block"
          >
            <div class="text-3xl mb-3">🔄</div>
            <div class="font-semibold text-gray-900 mb-1">Transfer Returns</div>
            <div class="text-sm text-gray-600">Manage transfer returns</div>
          </a>

          <Link
            v-if="[0, 1].includes($page.props.auth.user.role)"
            :href="route('return.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">↩️</div>
            <div class="font-semibold text-gray-900 mb-1">Sales Returns</div>
            <div class="text-sm text-gray-600">Manage sales returns</div>
          </Link>
        </div>
      </div>

      <!-- Report Management -->
      <div
        v-if="
          activeTab === 'reports' && [0, 1, 2, 3].includes($page.props.auth.user.role)
        "
        class="px-4 sm:px-6 lg:px-8 mb-8"
      >
        <h3
          class="text-lg font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-300 flex items-center gap-2"
        >
          <span class="text-2xl">📊</span> Report Management
        </h3>
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <Link
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            :href="route('reports.low-stock-shop')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">🏪</div>
            <div class="font-semibold text-gray-900 mb-1">Shop Low Stock</div>
            <div class="text-sm text-gray-600">Products low in shop</div>
          </Link>
          <Link
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            :href="route('reports.low-stock-store')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">🏬</div>
            <div class="font-semibold text-gray-900 mb-1">Store Low Stock</div>
            <div class="text-sm text-gray-600">Products low in store</div>
          </Link>

          <Link
            v-if="[0, 1, 2, 3].includes($page.props.auth.user.role)"
            :href="route('reports.stock')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📈</div>
            <div class="font-semibold text-gray-900 mb-1">Stock Report</div>
            <div class="text-sm text-gray-600">Current inventory status</div>
          </Link>

          <Link
            v-if="[0, 1].includes($page.props.auth.user.role)"
            :href="route('reports.expenses')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">💸</div>
            <div class="font-semibold text-gray-900 mb-1">Supplier Payments</div>
            <div class="text-sm text-gray-600">Payment details & summary</div>
          </Link>

          <Link
            v-if="[0, 1, 2].includes($page.props.auth.user.role)"
            :href="route('reports.sales-income')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">💰</div>
            <div class="font-semibold text-gray-900 mb-1">Order History</div>
            <div class="text-sm text-gray-600">Sales & returns transactions</div>
          </Link>

          <Link
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            :href="route('reports.product-movements')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">🔀</div>
            <div class="font-semibold text-gray-900 mb-1">Product Movements</div>
            <div class="text-sm text-gray-600">Track stock inbound/outbound</div>
          </Link>

          <Link
            v-if="[0, 1, 3].includes($page.props.auth.user.role)"
            :href="route('reports.product-movement-sales-optimization')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📊</div>
            <div class="font-semibold text-gray-900 mb-1">Sales Optimization</div>
            <div class="text-sm text-gray-600">Movement based insights</div>
          </Link>

          <Link
            v-if="[0].includes($page.props.auth.user.role)"
            :href="route('reports.activity-log')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📝</div>
            <div class="font-semibold text-gray-900 mb-1">Activity Log</div>
            <div class="text-sm text-gray-600">User activity & audit trail</div>
          </Link>

          <Link
            v-if="[0].includes($page.props.auth.user.role)"
            :href="route('reports.sync')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">🔄</div>
            <div class="font-semibold text-gray-900 mb-1">Sync Report</div>
            <div class="text-sm text-gray-600">Sync activity logs</div>
          </Link>
        </div>
      </div>

      <!-- System Management
      <div
        v-if="activeTab === 'system' && [0, 1].includes($page.props.auth.user.role)"
        class="bg-white rounded-lg p-6 border border-gray-200"
      >
        <h3
          class="text-xl font-semibold text-gray-800 mb-4 pb-3 border-b border-gray-200 flex items-center gap-2"
        >
          <span>⚙️</span> System Management
        </h3>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Link
            v-if="[0, 1].includes($page.props.auth.user.role)"
            :href="route('users.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-4xl mb-3">👤</div>
            <div class="font-semibold text-lg text-gray-800 mb-1">Users</div>
            <div class="text-sm text-gray-600">Manage system users</div>
          </Link>
        </div>
      </div> -->

      <!-- Settings -->
      <div
        v-if="activeTab === 'settings' && ![1, 2, 3].includes($page.props.auth.user.role)"
        class="px-4 sm:px-6 lg:px-8 mb-8"
      >
        <h3
          class="text-lg font-bold text-gray-900 mb-6 pb-3 border-b-2 border-gray-300 flex items-center gap-2"
        >
          <span class="text-2xl">🔧</span> Settings
        </h3>
        <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          <!-- <Link
            :href="route('settings.company')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-4xl mb-3">🏢</div>
            <div class="font-semibold text-lg text-gray-800 mb-1">
              Company Information
            </div>
            <div class="text-sm text-gray-600">Company information & settings</div>
          </Link> -->

          <Link
            v-if="[0, 1].includes($page.props.auth.user.role)"
            :href="route('users.index')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📏</div>
            <div class="font-semibold text-gray-900 mb-1">Units</div>
            <div class="text-sm text-gray-600">Manage measurement units</div>
          </Link>

          <Link
            :href="route('settings.app')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">⚙️</div>
            <div class="font-semibold text-gray-900 mb-1">App Settings</div>
            <div class="text-sm text-gray-600">Configure system settings</div>
          </Link>
          <!-- <Link
            :href="route('settings.smtp')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div
              class="text-4xl mb-3"
            >
              📧
            </div>
            <div class="font-semibold text-lg text-gray-800 mb-1">SMTP Settings</div>
            <div class="text-sm text-gray-600">Email server configuration</div>
          </Link>-->
          <Link
            :href="route('settings.sync')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">🔄</div>
            <div class="font-semibold text-gray-900 mb-1">Sync Settings</div>
            <div class="text-sm text-gray-600">Configure sync options</div>
          </Link>
          <!-- <Link
            :href="route('settings.bill')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div
              class="text-4xl mb-3"
            >
              🧾
            </div>
            <div class="font-semibold text-lg text-gray-800 mb-1">Bill Setting</div>
            <div class="text-sm text-gray-600">Bill logo, company info, print size</div>
          </Link> -->
          <Link
            v-if="![1].includes($page.props.auth.user.role)"
            :href="route('backup.settings')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">💾</div>
            <div class="font-semibold text-gray-900 mb-1">Database Backup</div>
            <div class="text-sm text-gray-600">Backup & restore data</div>
          </Link>
          <Link
            :href="route('settings.bill')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📄</div>
            <div class="font-semibold text-gray-900 mb-1">Bill Settings</div>
            <div class="text-sm text-gray-600">Configure bill layout</div>
          </Link>
          <Link
            :href="route('import-export')"
            class="group bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300"
          >
            <div class="text-3xl mb-3">📁</div>
            <div class="font-semibold text-gray-900 mb-1">Import & Export</div>
            <div class="text-sm text-gray-600">Import/export data</div>
          </Link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<style scoped>
/* Smooth transitions */
a {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>


