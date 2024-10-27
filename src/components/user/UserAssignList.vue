<script setup lang="ts">
import { computed, onMounted } from "vue";
import UserAssignListItem from "./UserAssignListItem.vue";
import { useProject } from "../../composables/useProject";
import { useUser } from "../../composables/useUser";

const props = defineProps<{
  projectId: string;
}>();

const {
  state: projectState,
  assignUserToProject,
  unassignUserFromProject,
} = useProject();
const { state: userState, fetchUsers } = useUser();

const project = computed(() =>
  projectState.projects.find((p) => p._id === props.projectId)
);

const assignedUsers = computed(() =>
  userState.users.filter((user) =>
    project.value?.assignedUserIds.includes(user._id)
  )
);

const unassignedUsers = computed(() =>
  userState.users.filter(
    (user) => !project.value?.assignedUserIds.includes(user._id)
  )
);

const handleAssignUser = (userId: string) => {
  console.log("Assigning user:", userId);
  assignUserToProject(props.projectId, userId);
};

const handleUnassignUser = (userId: string) => {
  unassignUserFromProject(props.projectId, userId);
};

onMounted(async () => {
  await fetchUsers();
});
</script>

<template>
  <div class="overflow-auto px-1">
    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-4">Assigned Users</h3>
      <ul>
        <UserAssignListItem
          v-for="user in assignedUsers"
          :key="user._id"
          :user="user"
          :projectId="projectId"
          isAssigned
          @assign="handleAssignUser"
          @unassign="handleUnassignUser"
        />
      </ul>
    </div>

    <div>
      <h3 class="text-lg font-semibold mb-4">Unassigned Users</h3>
      <ul>
        <UserAssignListItem
          v-for="user in unassignedUsers"
          :key="user._id"
          :user="user"
          :projectId="projectId"
          :isAssigned="false"
          @assign="handleAssignUser"
          @unassign="handleUnassignUser"
        />
      </ul>
    </div>
  </div>
</template>
