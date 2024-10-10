import { reactive } from "vue";

import { User } from "../DTOs/login.response";
import { TaskRequest } from "../DTOs/task.request";
import projectService from "../utils/services/projectService";
import { toast } from "vue3-toastify";

export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  _id: string;
  projectId: string;
  name: string;
  description?: string;
  assignedUser?: User;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  _id: string;
  name: string;
  assignedUserIds: string[];
  tasks: Task[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectState {
  projects: Project[];
}

interface UseProject {
  state: ProjectState;
  fetchProjects: () => Promise<void>;
  createProject: (name: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  assignUserToProject: (projectId: string, userId: string) => Promise<void>;
  unassignUserFromProject: (projectId: string, userId: string) => Promise<void>;
  createTask: (projectId: string, task: TaskRequest) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>;
}
const useProjectComposable = (): UseProject => {
  const state = reactive<ProjectState>({
    projects: [],
  });

  // Fetch projects from API
  const fetchProjects = async (): Promise<void> => {
    try {
      const projects = await projectService.fetchProjects();
      state.projects = projects;
    } catch (error) {
      toast.error("Error fetching projects.");
    }
    return;
  };

  // Create a new project
  const createProject = async (name: string): Promise<void> => {
    try {
      const response = await projectService.addProject(name);

      if (response && response._id) {
        state.projects.push(response);
        console.log(state.projects, "Updated project state");
        toast.success("Project created successfully!");
      } else {
        toast.error("Invalid project data returned from the server.");
      }
    } catch (error) {
      toast.error("Error creating project.");
    }
    return;
  };

  // Delete a project
  const deleteProject = async (id: string): Promise<void> => {
    try {
      await projectService.deleteProject(id);
      state.projects = state.projects.filter((project) => project._id !== id);
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Error deleting project.");
    }
    return;
  };

  // Assign a user to a project
  const assignUserToProject = async (
    projectId: string,
    userId: string
  ): Promise<void> => {
    try {
      await projectService.assignUserToProject(projectId, userId);
      const project = state.projects.find((p) => p._id === projectId);
      if (project) {
        project.assignedUserIds.push(userId);
      }
      toast.success("User assigned to project successfully!");
    } catch (error) {
      toast.error("Error assigning user to project.");
    }
    return;
  };

  // Unassign a user from a project
  const unassignUserFromProject = async (
    projectId: string,
    userId: string
  ): Promise<void> => {
    try {
      await projectService.unassignUserFromProject(projectId, userId);
      const project = state.projects.find((p) => p._id === projectId);
      if (project) {
        project.assignedUserIds = project.assignedUserIds.filter(
          (id) => id !== userId
        );
      }
      toast.success("User unassigned from project successfully!");
    } catch (error) {
      toast.error("Error unassigning user from project.");
    }
    return;
  };

  // Create a new task in a project
  const createTask = async (
    projectId: string,
    task: TaskRequest
  ): Promise<void> => {
    try {
      const response = await projectService.addTaskToProject(projectId, task);
      const project = state.projects.find((p) => p._id === projectId);
      if (project) {
        project.tasks.push(response);
      }
      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Error creating task.");
    }
    return;
  };

  // Update a task in a project
  const updateTaskStatus = async (
    taskId: string,
    status: TaskStatus
  ): Promise<void> => {
    try {
      const response = await projectService.updateTaskStatus(taskId, status);
      const task = state.projects
        .flatMap((p) => p.tasks)
        .find((t) => t._id === taskId);
      if (task) {
        task.status = response.status;
      }
      toast.success("Task status updated successfully!");
    } catch (error) {
      toast.error("Error updating task status.");
    }
    return;
  };

  // Delete a task
  const deleteTask = async (taskId: string): Promise<void> => {
    try {
      await projectService.deleteTaskFromProject(taskId);
      state.projects.forEach((project) => {
        project.tasks = project.tasks.filter((task) => task._id !== taskId);
      });
      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Error deleting task.");
    }
    return;
  };

  // Return the state and functions
  return {
    state,
    fetchProjects,
    createProject,
    deleteProject,
    createTask,
    deleteTask,
    updateTaskStatus,
    assignUserToProject,
    unassignUserFromProject,
  };
};

// Create a new instance of the project composable, this is what will be used in the components
// It's a singleton, so it will be the same instance across all components
const projectInstance = useProjectComposable();
export const useProject = () => projectInstance;
