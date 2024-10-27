<script setup lang="ts">
import { computed, onMounted } from "vue";
import MetricCard from "./MetricCard.vue";
import { useProject } from "../../composables/useProject";
import { useUser } from "../../composables/useUser";
import TaskIcon from "../icons/TaskIcon.vue";
import ProjectIcon from "../icons/ProjectIcon.vue";
import UserIcon from "../icons/UserIcon.vue";

const { state: projectState } = useProject();
const { state: userState, fetchUsers } = useUser();

const projectCount = computed(() => projectState.projects.length);
const userCount = computed(() => userState.users.length);
const taskCount = computed(() =>
  projectState.projects.reduce((acc, project) => acc + project.tasks.length, 0)
);

onMounted(async () => {
  await fetchUsers();
});
</script>

<template>
  <div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-6">
    <MetricCard
      title="Users"
      :value="userCount"
      color="border-green-500"
      :icon="UserIcon"
    />
    <MetricCard
      title="Projects"
      :value="projectCount"
      color="border-blue-500"
      :icon="ProjectIcon"
    />
    <MetricCard
      title="Tasks"
      :value="taskCount"
      color="border-purple-500"
      :icon="TaskIcon"
    />
  </div>
</template>
