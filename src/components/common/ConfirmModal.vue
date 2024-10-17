<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Modal from "./Modal.vue";
import Button from "./Button.vue";

const props = defineProps<{
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
}>();

const emit = defineEmits<{
  (e: "update:isOpen", isOpen: boolean): void;
}>();

// TODO closing doesnt work, fix it (useing id insted of is open)
const handleConfirm = () => {
  props.onConfirm();
  emit("update:isOpen", false);
};
</script>

<template>
  <Modal
    :isOpen="props.isOpen"
    @update:isOpen="emit('update:isOpen', $event)"
    :title="props.title ?? 'Confirm Action'"
    @close="emit('update:isOpen', false)"
  >
    <p class="mb-6 text-gray-700">{{ props.message }}</p>
    <div class="flex justify-end gap-4">
      <!-- TODO: check why this button doesnt work -->
      <Button
        @click="emit('update:isOpen', false)"
        variant="text"
        type="button"
      >
        Cancel
      </Button>
      <Button
        @click="handleConfirm"
        variant="info"
      >
        Confirm
      </Button>
    </div>
  </Modal>
</template>
