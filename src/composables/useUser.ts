import { reactive } from "vue";
import { toast } from "vue3-toastify";
import { User } from "../DTOs/login.response";
import userService from "../utils/services/userService";
import authService from "../utils/services/authService";
import { RegisterRequest } from "../DTOs/register.request";

export interface UserState {
  users: User[];
}

interface UseUser {
  state: UserState;
  fetchUsers: () => Promise<void>;
  addUser: (user: RegisterRequest) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const useUserComposable = (): UseUser => {
  const state = reactive<UserState>({
    users: [],
  });

  // Fetch users from API
  const fetchUsers = async (): Promise<void> => {
    try {
      const users = await userService.fetchUsers();
      state.users = users;
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  // Add a new user
  const addUser = async (user: RegisterRequest): Promise<void> => {
    try {
      const newUser = await authService.postRegister(user);
      state.users.push(newUser);
      toast.success("User added successfully!");
    } catch (error) {
      console.error("Failed to add user:", error);
      toast.error("Error adding user.");
    }
  };

  // Delete a user
  const deleteUser = async (id: string): Promise<void> => {
    try {
      await userService.deleteUser(id);
      state.users = state.users.filter((user) => user._id !== id);
      toast.success("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Error deleting user.");
    }
  };

  return {
    state,
    fetchUsers,
    addUser,
    deleteUser,
  };
};

// Singleton instance of the user composable
const userInstance = useUserComposable();
export const useUser = () => userInstance;
