<script setup lang="ts">
import { ref } from "vue";
import Button from "../common/Button.vue";
import ConfirmModal from "../common/ConfirmModal.vue";
import { Task, TaskStatus, useProject } from "../../composables/useProject";
import TrashcanIcon from "../icons/TrashcanIcon.vue";
import StatusButton from "./StatusButton.vue";

defineProps<{
  task: Task;
}>();

const { deleteTask, updateTaskStatus } = useProject();
const confirmDeleteId = ref<string | null>(null);

const handleUpdateTaskStatus = (taskId: string, status: TaskStatus) => {
  updateTaskStatus(taskId, status);
};

const handleDeleteTask = (taskId: string) => {
  deleteTask(taskId);
};

const getStatusColor = (status: TaskStatus) => {
  switch (status) {
    case "To Do":
      return "border-blue-300 bg-blue-50";
    case "In Progress":
      return "border-yellow-300 bg-yellow-50";
    case "Done":
      return "border-green-300 bg-green-50";
  }
};
</script>

<template>
  <li
    :class="`mb-4 p-4 rounded-lg shadow-md border ${getStatusColor(
      task.status
    )}`"
  >
    <div class="flex items-start justify-between mb-2">
      <h4 class="text-lg font-semibold text-gray-800">{{ task.name }}</h4>
      <Button
        @click="confirmDeleteId = task._id"
        variant="text"
        class="!p-0"
      >
        <TrashcanIcon class="w-4 h-4" />
      </Button>
    </div>

    <p
      v-if="task.description"
      class="text-sm text-gray-500"
    >
      {{ task.description }}
    </p>

    <p class="text-sm text-gray-500">
      Assignee:
      <span class="text-gray-800 font-bold">{{ task.assignedUser?.name }}</span>
    </p>

    <div class="flex gap-2 items-center">
      <StatusButton
        label="To Do"
        :active="task.status === 'To Do'"
        @click="handleUpdateTaskStatus(task._id, 'To Do')"
        color="blue"
      />
      <StatusButton
        label="In Progress"
        :active="task.status === 'In Progress'"
        @click="handleUpdateTaskStatus(task._id, 'In Progress')"
        color="yellow"
      />
      <StatusButton
        label="Done"
        :active="task.status === 'Done'"
        @click="handleUpdateTaskStatus(task._id, 'Done')"
        color="green"
      />
    </div>

    <ConfirmModal
      :isOpen="confirmDeleteId === task._id"
      @setIsOpen="confirmDeleteId = $event ? task._id : null"
      title="Delete Task"
      @confirm="handleDeleteTask(task._id)"
      message="Are you sure you want to delete this task?"
    />
  </li>
</template>
