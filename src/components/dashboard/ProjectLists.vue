<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useProject } from "../../composables/useProject";
import { format } from "date-fns";

const { state, fetchProjects } = useProject();

onMounted(async () => {
  await fetchProjects();
});

const sortedProjects = computed(() => {
  return state.projects
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
});

const formatDate = (dateString: string) => {
  return dateString ? format(new Date(dateString), "PP") : "N/A";
};
</script>

<template>
  <div class="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    <router-link
      v-for="project in sortedProjects"
      :key="project._id"
      :to="`/project/${project._id}`"
      class="block bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-md p-5 hover:shadow-xl transition-shadow border-l-4 border-blue-500"
    >
      <h3 class="text-xl font-semibold text-blue-800 mb-2">
        {{ project.name }}
      </h3>
      <p class="text-sm text-gray-600 font-medium mb-2">
        Created on: {{ formatDate(project.createdAt) }}
      </p>
      <h4 class="text-sm font-semibold text-blue-700 mb-2">
        Assigned Users: {{ project.assignedUserIds.length }}
      </h4>
      <p class="text-sm text-blue-600 font-medium">
        Tasks: {{ project.tasks.length }}
      </p>
    </router-link>
  </div>
</template>
