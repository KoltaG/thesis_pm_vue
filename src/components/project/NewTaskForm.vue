<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";
import Button from "../common/Button.vue";
import CustomInput from "../common/CustomInput.vue";
import { TaskStatus, useProject } from "../../composables/useProject";
import { useUser } from "../../composables/useUser";

const props = defineProps<{
  projectId: string;
  onSuccess: () => void;
}>();

const { createTask, state: projectState } = useProject();
const { state: userState, fetchUsers } = useUser();

const project = computed(() =>
  projectState.projects.find((project) => project._id === props.projectId)
);
const assignedUsers = computed(() =>
  userState.users.filter((user) =>
    project.value?.assignedUserIds.includes(user._id)
  )
);

const initialValues = {
  name: "",
  description: "",
  assignedUserId: "",
  status: "To Do" as TaskStatus,
};

const validationSchema = Yup.object({
  name: Yup.string().required("Task name is required!"),
  description: Yup.string().max(
    500,
    "Description must be 500 characters or less."
  ),
  assignedUserId: Yup.string().required("Assigned user is required!"),
});

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema,
  initialValues,
});

const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: description, errorMessage: descriptionError } =
  useField<string>("description");
const { value: assignedUserId, errorMessage: assignedUserError } =
  useField<string>("assignedUserId");

const handleCreateTask = handleSubmit(async (values) => {
  try {
    await createTask(props.projectId, values);
    props.onSuccess();
    resetForm();
  } catch (error) {
    console.error("Failed to create task:", error);
  }
});

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="bg-white w-full">
      <form
        @submit.prevent="handleCreateTask"
        class="space-y-4"
      >
        <CustomInput
          v-model="name"
          :error="nameError"
          label="Task Name"
          placeholder="Enter task name"
        />

        <CustomInput
          v-model="description"
          :error="descriptionError"
          label="Description"
          placeholder="Enter task description (optional)"
        />

        <div class="flex flex-col gap-2 mb-4">
          <label class="block text-sm font-medium text-gray-700"
            >Assigned User</label
          >
          <select
            v-model="assignedUserId"
            class="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a user</option>
            <option
              v-for="user in assignedUsers"
              :key="user._id"
              :value="user._id"
            >
              {{ user.name }}
            </option>
          </select>
          <p
            v-if="assignedUserError"
            class="text-sm text-red-500 mt-1"
          >
            {{ assignedUserError }}
          </p>
        </div>

        <Button
          type="submit"
          :disabled="isSubmitting"
          class="justify-center !text-center w-full focus:ring-opacity-50 disabled:opacity-50"
        >
          Add Task
        </Button>
      </form>
    </div>
  </div>
</template>
