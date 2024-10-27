<script setup lang="ts">
import { ref } from "vue";
import Modal from "../components/common/Modal.vue";
import NewProjectForm from "../components/project/NewProjectForm.vue";
import { useAuth } from "../composables/useAuth";
import PageHeader from "../components/layout/PageHeader.vue";
import ProjectLists from "../components/dashboard/ProjectLists.vue";
import DashboardMetrics from "../components/dashboard/DashboardMetrics.vue";
import DashboardGraph from "../components/dashboard/DashboardGraph.vue";

const { authState } = useAuth();

const isCreateProjectOpen = ref(false);

const openModal = () => {
  if (authState.value.user?.role !== "Dev") {
    isCreateProjectOpen.value = true;
  }
};
</script>

<template>
  <div>
    <PageHeader
      title="Dashboard"
      :onAddClick="authState.user?.role !== 'Dev' ? openModal : undefined"
      addText="Add New Project"
    />

    <div
      v-if="authState.user?.role !== 'Dev'"
      class="mb-4"
    >
      <h2 className="text-2xl font-bold mb-4">Metrics</h2>
      <DashboardMetrics />
      <DashboardGraph />
    </div>

    <h2 class="text-2xl font-bold mb-4">Projects</h2>
    <ProjectLists />

    <Modal
      :isOpen="isCreateProjectOpen"
      @close="isCreateProjectOpen = false"
      title="Add Project"
    >
      <NewProjectForm @success="isCreateProjectOpen = false" />
    </Modal>
  </div>
</template>
