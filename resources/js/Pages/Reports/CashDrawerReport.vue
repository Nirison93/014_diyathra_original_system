<template>
  <Head title="Cash Drawer Report" />

  <AppLayout>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 dark:from-gray-900 dark:to-gray-950">
      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-4">
          <button
            @click="goToReportsTab"
            class="px-6 py-2.5 rounded-[5px] font-medium text-sm bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            ← Back
          </button>
          <h1 class="text-4xl font-bold text-gray-800">Cash Drawer Report</h1>
        </div>

        <div class="flex items-center gap-2 bg-white rounded-lg p-3 shadow-sm border border-gray-200">
          <select
            v-model="selectedUserId"
            class="px-3 py-2 bg-white text-gray-800 text-sm border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Users</option>
            <option v-for="user in users" :key="user.id" :value="String(user.id)">
              {{ user.name }}
            </option>
          </select>
          <input
            type="date"
            v-model="startDate"
            class="px-3 py-2 bg-white text-gray-800 text-sm border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-blue-500"
          />
          <span class="text-gray-400">to</span>
          <input
            type="date"
            v-model="endDate"
            class="px-3 py-2 bg-white text-gray-800 text-sm border border-gray-300 rounded-[5px] focus:ring-2 focus:ring-blue-500"
          />
          <button
            @click="applyFilters"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-[5px] transition-all duration-200"
          >
            Apply
          </button>
          <button
            @click="resetFilters"
            class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-[5px] transition-all duration-200"
          >
            Reset
          </button>
        </div>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">User Summary</h3>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b-2 border-blue-600">
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">User</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-center">Sessions</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-center">Open</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-center">Closed</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-right">Total Opening</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-right">Total Closing</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">Last Opened</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="summary in userSummary"
              :key="summary.user_name"
              class="border-b border-gray-200 hover:bg-blue-50/50 transition-colors duration-200"
            >
              <td class="px-4 py-4 font-semibold text-gray-900">{{ summary.user_name }}</td>
              <td class="px-4 py-4 text-center text-gray-700">{{ summary.sessions_count }}</td>
              <td class="px-4 py-4 text-center text-amber-700">{{ summary.open_sessions }}</td>
              <td class="px-4 py-4 text-center text-emerald-700">{{ summary.closed_sessions }}</td>
              <td class="px-4 py-4 text-right text-gray-700">{{ currency }} {{ money(summary.total_opening) }}</td>
              <td class="px-4 py-4 text-right text-gray-700">{{ currency }} {{ money(summary.total_closing) }}</td>
              <td class="px-4 py-4 text-gray-700">{{ summary.last_opened_at || 'N/A' }}</td>
            </tr>
            <tr v-if="!userSummary || userSummary.length === 0">
              <td colspan="7" class="px-6 py-8 text-center text-gray-500 font-medium">No summary data for selected filters</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">Cash Drawer Sessions</h3>
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b-2 border-blue-600">
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">Date</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">User</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-right">Opening</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-right">Closing</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">Opened At</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm">Closed At</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-center">Duration (h/m)</th>
              <th class="px-4 py-3 text-blue-600 font-semibold text-sm text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in sessions.data"
              :key="row.id"
              class="border-b border-gray-200 hover:bg-blue-50/50 transition-colors duration-200"
            >
              <td class="px-4 py-4 text-gray-700">{{ row.date }}</td>
              <td class="px-4 py-4 font-semibold text-gray-900">{{ row.user_name }}</td>
              <td class="px-4 py-4 text-right text-gray-700">{{ currency }} {{ money(row.opening_balance) }}</td>
              <td class="px-4 py-4 text-right text-gray-700">
                {{ row.closing_balance !== null ? `${currency} ${money(row.closing_balance)}` : 'N/A' }}
              </td>
              <td class="px-4 py-4 text-gray-700">{{ row.opened_at || 'N/A' }}</td>
              <td class="px-4 py-4 text-gray-700">{{ row.closed_at || 'N/A' }}</td>
              <td class="px-4 py-4 text-center text-gray-700">{{ formatDuration(row.duration_minutes) }}</td>
              <td class="px-4 py-4 text-center">
                <span
                  class="px-3 py-1 rounded-[5px] text-white text-xs font-medium"
                  :class="row.status === 'open' ? 'bg-amber-600' : 'bg-emerald-600'"
                >
                  {{ row.status }}
                </span>
              </td>
            </tr>
            <tr v-if="!sessions.data || sessions.data.length === 0">
              <td colspan="8" class="px-6 py-8 text-center text-gray-500 font-medium">No cash drawer sessions found</td>
            </tr>
          </tbody>
        </table>

        <div
          class="flex items-center justify-between mt-6 pt-4 border-t border-gray-200"
          v-if="sessions.links && sessions.links.length > 3"
        >
          <div class="text-sm text-gray-600">
            Showing {{ sessions.from }} to {{ sessions.to }} of {{ sessions.total }} results
          </div>
          <div class="flex space-x-2">
            <button
              v-for="link in sessions.links"
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
  </AppLayout>
</template>

<script setup>
import { computed, ref } from "vue";
import { Head, router } from "@inertiajs/vue3";
import AppLayout from "@/Layouts/AppLayout.vue";
import { useDashboardNavigation } from "@/composables/useDashboardNavigation";

const props = defineProps({
  sessions: {
    type: Object,
    required: true,
  },
  userSummary: {
    type: Array,
    default: () => [],
  },
  users: {
    type: Array,
    default: () => [],
  },
  filters: {
    type: Object,
    default: () => ({}),
  },
  currencySymbol: {
    type: Object,
    default: () => ({}),
  },
});

const { goToReportsTab } = useDashboardNavigation();

const startDate = ref(props.filters.start_date || "");
const endDate = ref(props.filters.end_date || "");
const selectedUserId = ref(props.filters.user_id ? String(props.filters.user_id) : "");

const currency = computed(() => props.currencySymbol?.currency_symbol || "");

const money = (value) => Number(value || 0).toLocaleString("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const formatDuration = (minutes) => {
  if (minutes === null || minutes === undefined) return "N/A";

  const totalMinutes = Number(minutes);
  if (!Number.isFinite(totalMinutes)) return "N/A";

  const roundedMinutes = Math.round(totalMinutes);

  const hours = Math.floor(roundedMinutes / 60);
  const mins = roundedMinutes % 60;

  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
};

const applyFilters = () => {
  router.get(
    route("reports.cash-drawer"),
    {
      start_date: startDate.value,
      end_date: endDate.value,
      user_id: selectedUserId.value || undefined,
    },
    { preserveState: true, replace: true }
  );
};

const resetFilters = () => {
  startDate.value = "";
  endDate.value = "";
  selectedUserId.value = "";
  router.get(route("reports.cash-drawer"), {}, { preserveState: true, replace: true });
};
</script>
