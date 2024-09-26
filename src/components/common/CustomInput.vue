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
      <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  
  
  // TODO: Why props never read?
  // Props definition 
  const props = defineProps({
    modelValue: String, // This is the value passed by v-model
    label: String,
    type: {
      type: String,
      default: 'text',
    },
    placeholder: String,
    error: String,
  });
  
  // Emits definition to trigger the update for v-model
  const emit = defineEmits(['update:modelValue']);
  
  // Emit the updated value when the input changes
  const updateValue = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  };
  </script>
  
