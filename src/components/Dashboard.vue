<script setup lang="ts">
import { useAppState } from "../composables/useAppState";

const { state, addProject } = useAppState();

const addProjectHandler = () => {
  const newProject = {
    id: state.projects.length + 1,
    name: `Projekt ${state.projects.length + 1}`,
  };
  addProject(newProject);
};
</script>

<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Projektmenedzser Dashboard</h1>
    <button
      @click="addProjectHandler"
      class="mb-4 p-2 bg-blue-500 text-white rounded"
    >
      Új projekt hozzáadása
    </button>
    <ul>
      <li
        v-for="project in state.projects"
        :key="project.id"
        class="mb-2 p-2 bg-white rounded shadow"
      >
        {{ project.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
