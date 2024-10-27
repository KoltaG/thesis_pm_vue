<script setup lang="ts">
import { onMounted, watchEffect } from "vue";
import { useUser } from "../../composables/useUser";
import UserListItem from "./UserListItem.vue";

const { state: userState, fetchUsers } = useUser();

onMounted(() => {
  fetchUsers();
});

watchEffect(() => {
  console.log(userState.value.users, "watchEffect"); // Check if the state is updating here
});
</script>

<template>
  <div class="overflow-auto px-4 pb-6 -mx-4">
    <div
      class="mb-4 p-3 bg-gray-100 rounded-lg shadow-sm flex items-center justify-between"
    >
      <div class="flex items-center gap-6 flex-1">
        <div class="basis-[130px] text-gray-600 font-medium">Name</div>
        <div class="font-bold text-gray-600">Role</div>
        <div class="font-bold text-gray-600">Registered</div>
      </div>
    </div>

    <ul class="space-y-3">
      <UserListItem
        v-for="user in userState.users"
        :key="user._id"
        :user="user"
      />
    </ul>
  </div>
</template>
