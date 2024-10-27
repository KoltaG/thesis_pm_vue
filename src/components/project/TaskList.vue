<script setup lang="ts">
import TaskItem from "./TaskItem.vue";
import { Task, TaskStatus } from "../../composables/useProject";

defineProps<{
  taskStatus: TaskStatus;
  tasks: Task[];
}>();
</script>

<template>
  <div class="flex-1 bg-gray-200 shadow p-4 rounded-xl">
    <h3 class="mb-4 font-bold text-xl">{{ taskStatus }}</h3>
    <ul>
      <TaskItem
        v-for="task in tasks"
        :key="task._id"
        :task="task"
      />
    </ul>
  </div>
</template>
