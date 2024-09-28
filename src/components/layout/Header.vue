<template>
  <header class="w-full shadow md:rounded-xl bg-white px-4 py-2 flex justify-between items-center space-x-4">
    <!-- Button to toggle Navbar visibility -->
    <button
      class="text-black rounded border p-2 md:hidden"
      @click="toggleNavbar"
    >
      <!-- Hamburger Icon Component -->
      <HamburgerIcon class="w-6 h-6" />
    </button>

    <!-- Logo and Title -->
    <div class="flex flex-1 items-center gap-4">
      <router-link to="/">
        <img src="/vue.svg" alt="Logo" class="h-8" />
      </router-link>
      <h2>
        Koltai Balázs Thesis - <span class="font-bold">Vue App</span>
      </h2>
    </div>
  </header>
</template>

<script setup lang="ts">
// import { defineProps, defineEmits } from 'vue';

// TODO: This is realy react like, how to do it in vue?

// Props passed from the parent
const props = defineProps<{
  isNavbarOpen: boolean;
}>();

// Emit event to parent to toggle navbar state
const emit = defineEmits<{
  (e: 'toggle-navbar', isNavbarOpen: boolean): void;
}>();

// Method to toggle the navbar state
const toggleNavbar = () => {
  emit('toggle-navbar', !props.isNavbarOpen);
};
</script>
