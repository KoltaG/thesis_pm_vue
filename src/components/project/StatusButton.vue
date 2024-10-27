<script setup lang="ts">
import Button from "../common/Button.vue";

const props = defineProps<{
  label: string;
  onClick: () => void;
  active: boolean;
  color: "blue" | "yellow" | "green";
}>();

const activeStyles = {
  blue: "bg-blue-500 !text-white",
  yellow: "bg-yellow-500 !text-white",
  green: "bg-green-500 !text-white",
};

const hoverStyles = {
  blue: "hover:bg-blue-100 !text-blue-500",
  yellow: "hover:bg-yellow-100 !text-yellow-500",
  green: "hover:bg-green-100 !text-green-500",
};
</script>

<template>
  <Button
    @click="props.onClick"
    variant="text"
    :class="[
      'px-3 pt-1 pb-1.5 rounded-full text-sm',
      props.active ? activeStyles[props.color] : hoverStyles[props.color],
    ]"
  >
    {{ props.label }}
  </Button>
</template>
