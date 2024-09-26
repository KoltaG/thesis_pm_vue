<template>
  <div class="h-screen w-64 bg-gray-800 text-white flex flex-col">
    <!-- User Role Display -->
    <h2 v-if="user" class="text-xl font-bold p-4">
      {{ user.role === 'PM' ? 'PM' : 'Dev' }} Panel
    </h2>

    <!-- Navigation Menu -->
    <nav class="flex-1">
      <ul>
        <!-- Dashboard Link -->
        <router-link to="/">
          <li class="p-4 hover:bg-gray-700">Dashboard</li>
        </router-link>

        <!-- User Management Link (Only visible if role is not 'Dev') -->
        <router-link v-if="user && user.role !== 'Dev'" to="/user-management">
          <li class="p-4 hover:bg-gray-700">User management</li>
        </router-link>

        <!-- Logout -->
        <li class="p-4 hover:bg-gray-700 cursor-pointer" @click="onLogout">
          Logout
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '../../composables/useAuth';
import { computed } from 'vue';

// Use the auth composable to get the auth state and logout function
const { authState, logout } = useAuth();

// Get the user object from the auth state
const user = computed(() => authState.value.user);

// Handle the logout function
const onLogout = () => {
  logout();
};
</script>

