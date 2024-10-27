<script setup lang="ts">
defineProps({
  modelValue: String,
  label: String,
  type: {
    type: String,
    default: "text",
  },
  placeholder: String,
  error: String,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="mb-4">
    <label class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>
    <input
      :value="modelValue"
      @input="updateValue"
      :type="type"
      :placeholder="placeholder"
      class="w-full p-3 border rounded-md"
      :class="{ 'border-red-500': error, 'border-gray-300': !error }"
    />
    <p
      v-if="error"
      class="text-sm text-red-500 mt-1"
    >
      {{ error }}
    </p>
  </div>
</template>
