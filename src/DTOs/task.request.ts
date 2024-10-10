import { TaskStatus } from "../composables/useProject";

export type TaskRequest = {
  name: string;
  description?: string;
  assignedUserId?: string;
  status: TaskStatus;
};
