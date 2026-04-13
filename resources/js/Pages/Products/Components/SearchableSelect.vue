<template>
  <div class="relative">
    <div class="flex gap-2">
      <div class="flex-1 relative">
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="placeholder"
          @focus="isOpen = true"
          @blur="handleBlur"
          @keydown.escape="isOpen = false"
          @keydown.arrow-down="highlightNext"
          @keydown.arrow-up="highlightPrev"
          @keydown.enter="selectHighlighted"
          class="w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <!-- Dropdown Menu -->
        <div
          v-if="isOpen && filteredOptions.length > 0"
          class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto"
        >
          <div
            v-for="(option, index) in filteredOptions"
            :key="option.id"
            @click="selectOption(option)"
            @mouseenter="highlightedIndex = index"
            :class="[
              'px-3 py-2 cursor-pointer text-sm',
              highlightedIndex === index
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-gray-100'
            ]"
          >
            {{ option.label }}
          </div>
        </div>

        <!-- No Results Message -->
        <div
          v-if="isOpen && filteredOptions.length === 0 && searchQuery"
          class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 px-3 py-2 text-sm text-gray-500"
        >
          No results found
        </div>
      </div>

      <!-- Add New Button (if provided) -->
      <button
        v-if="addButtonAction"
        type="button"
        @click="addButtonAction"
        class="px-3 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200 flex-shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>

    <!-- Hidden Select for Form Submission -->
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="hidden"
    >
      <option value="">Select</option>
      <option v-for="option in allOptions" :key="option.id" :value="option.id">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  options: {
    type: Array,
    required: true,
  },
  placeholder: {
    type: String,
    default: 'Search and select...',
  },
  addButtonAction: {
    type: Function,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');
const isOpen = ref(false);
const highlightedIndex = ref(-1);

// Format options to ensure they have 'id' and 'label' properties
const allOptions = computed(() => {
  return props.options.map(option => {
    if (typeof option === 'object' && option !== null) {
      return {
        id: option.id,
        label: option.label || option.name || String(option.id),
        ...option
      };
    }
    return option;
  });
});

// Filter options based on search query
const filteredOptions = computed(() => {
  if (!searchQuery.value) return allOptions.value;

  const query = searchQuery.value.toLowerCase();
  return allOptions.value.filter(option =>
    option.label.toLowerCase().includes(query)
  );
});

// Get the label of the selected option
const selectedLabel = computed(() => {
  const selected = allOptions.value.find(opt => opt.id == props.modelValue);
  return selected ? selected.label : '';
});

// Update search query to show selected label when dropdown opens
watch(() => props.modelValue, (newVal) => {
  if (!isOpen.value) {
    if (newVal) {
      searchQuery.value = selectedLabel.value;
    } else {
      searchQuery.value = '';
    }
  }
}, { immediate: true });

// Handle blur to close dropdown and clear search if no selection
const handleBlur = () => {
  setTimeout(() => {
    // Close dropdown slightly after blur to allow click handlers to fire
    isOpen.value = false;
    // Keep selected value visible in the input
    if (props.modelValue) {
      searchQuery.value = selectedLabel.value;
    }
    highlightedIndex.value = -1;
  }, 150);
};

// Select an option
const selectOption = (option) => {
  emit('update:modelValue', option.id);
  searchQuery.value = option.label;
  isOpen.value = false;
  highlightedIndex.value = -1;
};

// Keyboard navigation
const highlightNext = () => {
  if (!isOpen.value) {
    isOpen.value = true;
  }
  if (highlightedIndex.value < filteredOptions.value.length - 1) {
    highlightedIndex.value++;
  }
};

const highlightPrev = () => {
  if (highlightedIndex.value > 0) {
    highlightedIndex.value--;
  }
};

const selectHighlighted = () => {
  if (highlightedIndex.value >= 0 && filteredOptions.value[highlightedIndex.value]) {
    selectOption(filteredOptions.value[highlightedIndex.value]);
  }
};
</script>

<style scoped>
/* Smooth transitions */
div {
  transition: background-color 150ms ease;
}
</style>
