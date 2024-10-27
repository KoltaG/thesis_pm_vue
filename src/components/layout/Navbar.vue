<script setup lang="ts">
import { useAuth } from "../../composables/useAuth";
import { computed } from "vue";

const { authState, logout } = useAuth();

const user = computed(() => authState.value.user);

const onLogout = () => {
  logout();
};
</script>

<template>
  <div class="h-screen w-64 bg-gray-800 text-white flex flex-col">
    <h2
      v-if="user"
      class="text-xl font-bold p-4"
    >
      {{ user.role === "PM" ? "PM" : "Dev" }} Panel
    </h2>

    <nav class="flex-1">
      <ul>
        <router-link to="/">
          <li class="p-4 hover:bg-gray-700">Dashboard</li>
        </router-link>

        <!-- User Management Link (Only visible if role is not 'Dev') -->
        <router-link
          v-if="user && user.role !== 'Dev'"
          to="/user-management"
        >
          <li class="p-4 hover:bg-gray-700">User management</li>
        </router-link>

        <li
          class="p-4 hover:bg-gray-700 cursor-pointer"
          @click="onLogout"
        >
          Logout
        </li>
      </ul>
    </nav>
  </div>
</template>
