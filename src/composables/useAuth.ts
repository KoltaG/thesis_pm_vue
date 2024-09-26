import { reactive, computed } from "vue";
import authService from "../utils/services/authService";
import { tokenExpired } from "../utils/tokenTools";

interface User {
  id: string;
  name: string;
  role: string;
}

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
  user?: User;
}

const authState = reactive<AuthState>({
  isLoggedIn: false,
  isLoading: true,
  user: undefined,
});

// Define the login function
const tryLogin = async (email: string, password: string) => {
  const response = await authService.postLogin(email, password);
  const user = response.user;

  localStorage.setItem("access_token", response.token);
  localStorage.setItem("user", JSON.stringify(user));

  // Update the state
  authState.isLoggedIn = true;
  authState.user = user;
  authState.isLoading = false;
};

// Define the logout function
const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");

  authState.isLoggedIn = false;
  authState.user = undefined;
  authState.isLoading = false;
};

const checkAuthStatus = async (onAutoLoginReady?: () => void) => {
  const accessToken = localStorage.getItem("access_token");
  const userString = localStorage.getItem("user");

  const user = userString ? JSON.parse(userString) : null;

  if (accessToken && user) {
    if (!tokenExpired(accessToken, 60000)) {
      // Token is valid, initialize state
      authState.isLoggedIn = true;
      authState.user = user;
    } else {
      // Token expired, log out
      logout();
    }
  }

  authState.isLoading = false;

  // Run the auto login ready callback
  if (onAutoLoginReady) {
    onAutoLoginReady();
  }
};

// Composable function to return the auth state and methods
export const useAuth = () => {
  return {
    authState: computed(() => authState),
    tryLogin,
    logout,
    checkAuthStatus,
  };
};
