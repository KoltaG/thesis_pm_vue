<script setup lang="ts">
import { PropType } from "vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  icon: {
    type: Object as PropType<any>,
    required: true,
  },
});
</script>

<template>
  <div
    :class="`flex items-center p-4 bg-white rounded-lg shadow-md border-l-4 ${color} hover:shadow-lg transition-shadow`"
  >
    <div class="mr-4">
      <component
        :is="icon"
        class="h-6 w-6"
      />
    </div>
    <div>
      <p class="text-lg font-semibold text-gray-800">{{ value }}</p>
      <p class="text-sm text-gray-500">{{ title }}</p>
    </div>
  </div>
</template>
