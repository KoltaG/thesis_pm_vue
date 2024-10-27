<script setup lang="ts">
import Modal from "./Modal.vue";
import Button from "./Button.vue";

const props = defineProps<{
  modelValue: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const handleConfirm = () => {
  props.onConfirm();
  emit("update:modelValue", false);
};

const closeModal = () => {
  emit("update:modelValue", false);
};
</script>

<template>
  <Modal
    :isOpen="props.modelValue"
    @close="closeModal"
    :title="props.title ?? 'Confirm Action'"
  >
    <p class="mb-6 text-gray-700">{{ props.message }}</p>
    <div class="flex justify-end gap-4">
      <Button
        @click="handleConfirm"
        variant="info"
      >
        Confirm
      </Button>
    </div>
  </Modal>
</template>
