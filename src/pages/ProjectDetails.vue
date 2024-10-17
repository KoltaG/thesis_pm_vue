<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import TaskList from "../components/project/TaskList.vue";
import Modal from "../components/common/Modal.vue";
import UserAssignList from "../components/user/UserAssignList.vue";
import Button from "../components/common/Button.vue";
import { useAuth } from "../composables/useAuth";
import { useProject } from "../composables/useProject";
import PageHeader from "../components/layout/PageHeader.vue";
import NewTaskForm from "../components/project/NewTaskForm.vue";

const route = useRoute();
const router = useRouter();

const { state, deleteProject } = useProject();
const { authState } = useAuth();

const isUsersOpen = ref(false);
const isCreateTaskOpen = ref(false);

const projectId = route.params.id as string;

const project = computed(() => state.projects.find((p) => p._id === projectId));

// Filter tasks by status
const todoTasks = computed(
  () => project.value?.tasks.filter((task) => task.status === "To Do") || []
);
const inProgressTasks = computed(
  () =>
    project.value?.tasks.filter((task) => task.status === "In Progress") || []
);
const doneTasks = computed(
  () => project.value?.tasks.filter((task) => task.status === "Done") || []
);

const handleDeleteProject = async () => {
  try {
    await deleteProject(projectId as string);
    router.push("/");
  } catch (error) {
    console.error("Failed to delete project:", error);
  }
};
</script>

<template>
  <div v-if="project">
    <PageHeader
      :title="`Project: ${project.name}`"
      @delete-click="handleDeleteProject"
      addText="Create Task"
      @add-click="isCreateTaskOpen = true"
    >
      <template v-slot:extraActions>
        <Button
          v-if="authState.user?.role !== 'Dev'"
          @click="isUsersOpen = true"
          variant="info"
        >
          Assigned Users
        </Button>
      </template>
    </PageHeader>

    <div class="flex gap-4 flex-wrap">
      <TaskList
        taskStatus="To Do"
        :tasks="todoTasks"
      />
      <TaskList
        taskStatus="In Progress"
        :tasks="inProgressTasks"
      />
      <TaskList
        taskStatus="Done"
        :tasks="doneTasks"
      />
    </div>

    <Modal
      v-model:isOpen="isUsersOpen"
      title="Project Users"
      @close="isUsersOpen = false"
    >
      <UserAssignList :projectId="projectId" />
    </Modal>

    <Modal
      v-model:isOpen="isCreateTaskOpen"
      title="Add Task"
      @close="isCreateTaskOpen = false"
    >
      <NewTaskForm
        :projectId="projectId"
        @success="isCreateTaskOpen = false"
      />
    </Modal>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
