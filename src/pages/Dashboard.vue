<script setup lang="ts">
import { ref } from "vue";
import Modal from "../components/common/Modal.vue";
import NewProjectForm from "../components/project/NewProjectForm.vue";
import { useAuth } from "../composables/useAuth";
import PageHeader from "../components/layout/PageHeader.vue";
import ProjectLists from "../components/dashboard/ProjectLists.vue";

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
      :onAddClick="openModal"
      addText="Add New Project"
    />

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
