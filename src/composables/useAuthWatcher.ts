import { watch } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "./useAuth";

export function useAuthWatcher() {
  const router = useRouter();
  const { authState } = useAuth();

  // Watch the isLoggedIn state
  watch(
    () => authState.value.isLoggedIn,
    (isLoggedIn) => {
      if (!isLoggedIn) {
        // Redirect to login if not logged in
        router.push("/login");
      } else {
        // Redirect to home if logged in
        router.push("/");
      }
    },
    { immediate: true } // Runs immediately when the watcher is created
  );
}
