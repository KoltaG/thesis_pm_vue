<template>
  <div class="app-container flex h-screen overflow-hidden bg-gray-100">
    <!-- Sidebar / Navbar -->
    <div
      class="navbar-container w-64 border-r border-gray-700 fixed md:relative h-full z-20 transform md:translate-x-0 transition-transform duration-300 ease-in-out bg-gray-900 text-gray-200"
      :class="isNavbarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <Navbar />
    </div>

    <!-- Overlay for Mobile View -->
    <div
      v-if="isNavbarOpen"
      class="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
      @click="setIsNavbarOpen(false)"
    ></div>

    <!-- Main Content Container -->
    <div class="main-container flex-1 flex flex-col relative z-0 md:p-4">
      <!-- Header Component -->
      <Header :isNavbarOpen="isNavbarOpen" @toggle-navbar="setIsNavbarOpen" />

      <!-- Main Content -->
      <main class="flex-1 w-full p-6 overflow-auto bg-white md:rounded-xl md:shadow-lg md:mt-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Header from './Header.vue';
import Navbar from './Navbar.vue';

// Define reactive state for isNavbarOpen
const isNavbarOpen = ref(false);

// Toggle navbar state
const setIsNavbarOpen = (newState: boolean) => {
  isNavbarOpen.value = newState;
};
</script>

