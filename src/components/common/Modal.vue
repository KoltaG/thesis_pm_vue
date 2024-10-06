<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import Button from "./Button.vue";

defineProps({
  isOpen: Boolean,
  title: String,
});

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEscape);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleEscape);
});
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div
      class="fixed inset-0 bg-black bg-opacity-50"
      @click="closeModal"
    ></div>

    <div
      class="bg-white relative rounded-lg shadow-lg p-6 w-full max-w-lg z-10"
    >
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-black">{{ title }}</h3>

        <Button
          @click="closeModal"
          variant="text"
          class="text-2xl absolute top-4 right-4"
        >
          &times;
        </Button>
      </div>
      <slot />
    </div>
  </div>
</template>
