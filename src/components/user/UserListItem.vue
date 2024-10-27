<script setup lang="ts">
import { computed, ref } from "vue";
import { User } from "../../DTOs/login.response";
import { useUser } from "../../composables/useUser";
import ConfirmModal from "../common/ConfirmModal.vue";
import Button from "../common/Button.vue";
import { format } from "date-fns";
import { useAuth } from "../../composables/useAuth";

const { deleteUser } = useUser();
const { authState } = useAuth();

const props = defineProps<{
  user: User;
}>();

const confirmDeleteId = ref("");

const isConfirmDeleteOpen = computed(
  () => confirmDeleteId.value === props.user._id
);

const handleDeleteUser = (id: string) => {
  try {
    deleteUser(id);
    confirmDeleteId.value = "";
  } catch (error) {
    console.error("Failed to delete user:", error);
  }
};
</script>

<template>
  <li
    class="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow flex items-center justify-between"
  >
    <div class="flex items-center gap-6 flex-1">
      <div class="basis-[130px] text-gray-800 font-medium">
        {{ user.name }}
      </div>
      <div
        :class="[
          'font-bold text-sm',
          user.role === 'PM' ? 'text-green-600' : 'text-blue-600',
        ]"
      >
        {{ user.role }}
      </div>
      <div class="basis-[130px] text-gray-800 font-medium">
        {{ format(new Date(user.createdAt), "PP") }}
      </div>
    </div>
    <div class="flex items-center gap-4">
      <Button
        v-if="authState.user?._id !== user._id"
        @click="confirmDeleteId = user._id"
        variant="danger"
        class="px-3 py-1 text-sm rounded-md hover:bg-red-50 transition-colors"
      >
        Delete
      </Button>
    </div>

    <ConfirmModal
      v-model="isConfirmDeleteOpen"
      title="Delete User"
      @confirm="handleDeleteUser(user._id)"
      message="Are you sure you want to delete this user?"
      @close="confirmDeleteId = ''"
    />
  </li>
</template>
