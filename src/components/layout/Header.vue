<script setup lang="ts">
import HamburgerIcon from "../icons/HamburgerIcon.vue";

const props = defineProps<{
  isNavbarOpen: boolean;
}>();

const emit = defineEmits<{
  (e: "toggle-navbar", isNavbarOpen: boolean): void;
}>();

const toggleNavbar = () => {
  emit("toggle-navbar", !props.isNavbarOpen);
};
</script>

<template>
  <header
    class="w-full shadow md:rounded-xl bg-white px-4 py-2 flex justify-between items-center space-x-4"
  >
    <button
      class="text-black rounded border p-2 md:hidden"
      @click="toggleNavbar"
    >
      <HamburgerIcon class="w-6 h-6" />
    </button>

    <div class="flex flex-1 items-center gap-4">
      <router-link to="/">
        <img
          src="/vue.svg"
          alt="Logo"
          class="h-8"
        />
      </router-link>
      <h2>Koltai Balázs Thesis - <span class="font-bold">Vue App</span></h2>
    </div>
  </header>
</template>
