<script setup>
import { ref, onMounted } from "vue";
import { useAuth } from "./composables/useAuth";
import useNetwork from "./composables/useNetwork";
import { useAuthWatcher } from "./composables/useAuthWatcher";

// Call the network hook
useNetwork();

// State management
const hasAttemptedAutoLogin = ref(false);
const isLoading = ref(true);

const { checkAuthStatus } = useAuth();

// Auto-login effect
onMounted(() => {
  // Pass the onAutoLoginReady callback to the checkAuthStatus function
  checkAuthStatus(() => {
    hasAttemptedAutoLogin.value = true;
    isLoading.value = false;
  });
});

// Watcher for auth state, to redirect to login if not authenticated, or to dashboard if authenticated
useAuthWatcher();
</script>

<template>
  <router-view />
  <div v-if="isLoading">
    <p>Loading...</p>
  </div>
</template>
