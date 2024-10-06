<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import * as Yup from "yup";
import Button from "../common/Button.vue";
import CustomInput from "../common/CustomInput.vue";

// Define emits, these are can be catched by an event listener
const emit = defineEmits(["success"]);

const validationSchema = Yup.object({
  name: Yup.string().required("Project name is required!"),
});

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema,
});

const { value: name, errorMessage: nameError } = useField<string>("name");

const handleCreateProject = handleSubmit(async (values) => {
  // await createProject(values.name);
  console.log("Project created:", values.name);

  emit("success");
  resetForm();
});
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="bg-white w-full">
      <form
        @submit.prevent="handleCreateProject"
        class="space-y-4"
      >
        <CustomInput
          v-model="name"
          :error="nameError"
          name="name"
          label="Project Name"
          placeholder="Enter project name"
        />

        <Button
          type="submit"
          :disabled="isSubmitting"
          class="justify-center !text-center w-full focus:ring-opacity-50 disabled:opacity-50"
        >
          Add Project
        </Button>
      </form>
    </div>
  </div>
</template>
