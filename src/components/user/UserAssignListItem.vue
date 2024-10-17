<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Button from "../common/Button.vue";

const props = defineProps<{
  user: {
    _id: string;
    name: string;
    role: string;
  };
  isAssigned: boolean;
}>();

const emit = defineEmits<{
  (e: "assign", userId: string): void;
  (e: "unassign", userId: string): void;
}>();

const handleAssignClick = () => {
  if (props.isAssigned) {
    emit("unassign", props.user._id);
  } else {
    emit("assign", props.user._id);
  }
};
</script>

<template>
  <li
    class="p-4 bg-white rounded-lg shadow flex items-center justify-between hover:shadow-md transition-shadow"
  >
    <div class="flex items-center gap-4 flex-1">
      <div class="basis-[100px] text-gray-800 font-medium">
        {{ props.user.name }} {{ props.user._id }}
      </div>
      <div
        :class="[
          'font-bold text-sm',
          props.user.role === 'PM' ? 'text-green-600' : 'text-blue-600',
        ]"
      >
        {{ props.user.role }}
      </div>
    </div>
    <Button
      :variant="props.isAssigned ? 'danger' : 'success'"
      @click="handleAssignClick"
      :class="[
        'text-sm px-3 py-1 rounded',
        props.isAssigned ? 'hover:bg-red-50' : 'hover:bg-green-50',
      ]"
    >
      {{ props.isAssigned ? "- Unassign" : "+ Assign" }}
    </Button>
  </li>
</template>
