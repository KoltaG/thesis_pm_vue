import { reactive, computed, onMounted } from "vue";
import { toast } from "vue3-toastify"; // Import toast for notifications
import { User } from "../DTOs/login.response";
import userService from "../utils/services/userService";
import { useAuth } from "./useAuth";

export interface UserState {
  users: User[];
}

export const useUser = () => {
  const state = reactive<UserState>({
    users: [],
  });

  const { authState } = useAuth();

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const users = await userService.fetchUsers();
      state.users = users;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Error fetching users.");
    }
  };

  // Delete a user
  const deleteUser = async (_id: string) => {
    try {
      await userService.deleteUser(_id);
      state.users = state.users.filter((user) => user._id !== _id);
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Error deleting user.");
    }
  };

  // Fetch users on mount if the user is logged in
  onMounted(() => {
    if (authState.value.isLoggedIn && authState.value.user?.role === "PM") {
      fetchUsers();
    }
  });

  return {
    state: computed(() => state),
    fetchUsers,
    deleteUser,
  };
};
