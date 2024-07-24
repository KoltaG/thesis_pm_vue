<template>
  <div class="min-h-screen bg-gray-100">
    <Dashboard />
  </div>
</template>

<script setup lang="ts">
import { provideAppState } from "./composables/useAppState";
import Dashboard from "./components/Dashboard.vue";

provideAppState();
</script>

<style scoped></style>
