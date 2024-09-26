<template>
    <button
      :type="type"
      :disabled="disabled"
      :class="buttonClasses"
      @click="onClick"
    >
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  const props = defineProps({
    onClick: Function,
    disabled: Boolean,
    variant: {
      type: String,
      default: 'info',
    },
    className: String,
    type: {
      type: String, //TODO fix type
      default: 'button',
    },
  });
  
  // Computed classes for the button
  const buttonClasses = computed(() => {
    const baseStyles = 'px-4 py-2 rounded font-semibold transition-colors duration-200 flex items-center gap-2';
    const disabledStyles = 'bg-gray-400 text-white cursor-not-allowed';
    const variantStyles = {
      success: 'bg-green-500 text-white hover:bg-green-600',
      info: 'bg-blue-500 text-white hover:bg-blue-600',
      danger: 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white',
      text: 'text-black hover:text-gray-600',
    };
    return props.disabled
      ? `${props.className} ${baseStyles} ${disabledStyles}`
      : `${props.className} ${baseStyles} ${variantStyles[props.variant]}`; //TODO fix type
  });
  </script>
  
