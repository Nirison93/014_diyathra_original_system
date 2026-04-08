<script setup>
import Checkbox from "@/Components/Checkbox.vue";
import GuestLayout from "@/Layouts/GuestLayout.vue";
import InputError from "@/Components/InputError.vue";
import InputLabel from "@/Components/InputLabel.vue";
import PrimaryButton from "@/Components/PrimaryButton.vue";
import TextInput from "@/Components/TextInput.vue";
import { Head, Link, useForm } from "@inertiajs/vue3";
import { ref } from "vue";

defineProps({
  canResetPassword: {
    type: Boolean,
  },
  status: {
    type: String,
  },
});

const form = useForm({
  email: "",
  password: "",
  remember: false,
});

const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const submit = () => {
  form.post(route("login"), {
    onFinish: () => form.reset("password"),
  });
};
const currentYear = new Date().getFullYear();
</script>

<template>
  <GuestLayout>
    <Head title="Log in" />

    <div class="h-screen flex overflow-hidden bg-gray-50">

      <!-- ───────────────── Left Column (desktop only) ───────────────── -->
      <div class="hidden lg:block lg:w-1/2 relative">
        <!-- Full-background image -->
        <img
  :src="'/images/login_img.png'"
  alt="Online මුදලාලි"
  class="absolute inset-0 w-full h-full object-cover"
/>
        <!-- Dark gradient overlay for readability -->
        <div :class="[
  'absolute inset-0',
  'bg-gradient-to-br',
  'from-blue-900/75',
  'via-indigo-800/65',
  'to-purple-900/75'
]"></div>

        <!-- Overlay text content -->
        <div class="relative z-10 flex flex-col items-center justify-center h-full px-12 text-center">
          <!-- Brand -->
          <div class="flex items-center space-x-3 mb-6">
            <div
              class="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/30"
            >
              <svg class="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span class="text-3xl font-bold text-white tracking-wide">Online මුදලාලි</span>
          </div>
          <!-- Tagline -->
          <h1 class="text-2xl font-bold text-white mb-3">
            Powerful Point of Sale Solution
          </h1>
          <p class="text-base text-blue-100 leading-relaxed max-w-sm">
            Streamline your business operations with our comprehensive inventory and sales management system.
          </p>
        </div>
      </div>

      <!-- ───────────────── Right Column – Login Form ───────────────── -->
      <div class="w-full lg:w-1/2 flex flex-col items-center justify-center overflow-y-auto px-6 py-8 lg:px-12">
        <div class="w-full max-w-md">

          <!-- Mobile / Tablet brand header (no image — keeps form on one screen) -->
          <div class="lg:hidden mb-6 text-center">
            <div class="inline-flex items-center space-x-2">
              <div class="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center">
                <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span class="text-xl font-bold text-gray-900">Online මුදලාලි</span>
            </div>
          </div>

          <!-- Login Card -->
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 lg:p-10">
            <!-- Header -->
            <div class="mb-8">
              <h2 class="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
              <p class="text-gray-600">Welcome back! Please enter your credentials.</p>
            </div>

            <!-- Status Message -->
            <div
              v-if="status"
              class="mb-6 bg-green-50 border border-green-200 rounded-lg p-4"
            >
              <div class="flex items-center">
                <svg
                  class="h-5 w-5 text-green-600 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p class="text-sm font-medium text-green-800">{{ status }}</p>
              </div>
            </div>

            <!-- Form -->
            <form @submit.prevent="submit" class="space-y-6">
              <!-- Email Field -->
              <div>
                <InputLabel
                  for="email"
                  value="Email Address"
                  class="text-sm font-medium text-gray-700 mb-2"
                />
                <TextInput
                  id="email"
                  type="email"
                  class="block w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                  v-model="form.email"
                  required
                  autofocus
                  autocomplete="username"
                  placeholder="Enter your email"
                />
                <InputError class="mt-2" :message="form.errors.email" />
              </div>

              <!-- Password Field -->
              <div>
                <InputLabel
                  for="password"
                  value="Password"
                  class="text-sm font-medium text-gray-700 mb-2"
                />
                <div class="relative">
                  <TextInput
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    class="block w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                    v-model="form.password"
                    required
                    autocomplete="current-password"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    @click="togglePasswordVisibility"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors duration-200"
                  >
                    <!-- Eye Icon (Show Password) -->
                    <svg
                      v-if="!showPassword"
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <!-- Eye Off Icon (Hide Password) -->
                    <svg
                      v-else
                      class="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  </button>
                </div>
                <InputError class="mt-2" :message="form.errors.password" />
              </div>

              <!-- Submit Button -->
              <div class="pt-2">
                <PrimaryButton
                  class="w-full flex justify-center items-center py-3.5 px-4 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-sm transition-all duration-200"
                  :class="{ 'opacity-50 cursor-not-allowed': form.processing }"
                  :disabled="form.processing"
                >
                  <span v-if="!form.processing">Sign In</span>
                  <span v-else class="flex items-center">
                    <svg
                      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                </PrimaryButton>
              </div>
            </form>
          </div>

          <!-- Footer Text -->
          <p class="mt-5 text-center text-sm text-gray-500">
            © {{ currentYear }} Online මුදලාලි. All rights reserved.
          </p>
        </div>
      </div>

    </div>
  </GuestLayout>
</template>
