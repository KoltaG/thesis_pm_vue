<script setup lang="ts">
import { useForm, useField } from "vee-validate";
import * as Yup from "yup";
import Button from "../common/Button.vue";
import CustomInput from "../common/CustomInput.vue";
import { useUser } from "../../composables/useUser";
import { Role } from "../../DTOs/login.response";

const props = defineProps<{
  onSuccess: () => void;
}>();

const { addUser } = useUser();

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "Dev" as "Dev" | "PM",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  email: Yup.string()
    .email("Invalid email format!")
    .required("Email is required!"),
  password: Yup.string().required("Password is required!"),
});

const { handleSubmit, isSubmitting } = useForm({
  initialValues,
  validationSchema,
});

const handleRegisterUser = handleSubmit(async (values) => {
  try {
    await addUser(values);
    props.onSuccess();
  } catch (error) {
    console.error(error);
  }
});

const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: email, errorMessage: emailError } = useField<string>("email");
const { value: password, errorMessage: passwordError } =
  useField<string>("password");
const { value: role } = useField<Role>("role");
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="bg-white w-full">
      <form
        @submit.prevent="handleRegisterUser"
        class="space-y-4"
      >
        <CustomInput
          v-model="name"
          :error="nameError"
          label="Name"
          placeholder="Enter your name"
        />

        <CustomInput
          v-model="email"
          :error="emailError"
          label="Email Address"
          placeholder="Enter your email"
        />

        <CustomInput
          v-model="password"
          :error="passwordError"
          label="Password"
          placeholder="Enter your password"
          type="password"
        />

        <div class="flex flex-col gap-2 mb-4">
          <label class="block text-sm font-medium text-gray-700">Role</label>
          <select
            v-model="role"
            class="border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Dev">Developer</option>
            <option value="PM">Project Manager</option>
          </select>
        </div>

        <Button
          type="submit"
          :disabled="isSubmitting"
          class="justify-center !text-center w-full focus:ring-opacity-50 disabled:opacity-50"
        >
          Add User
        </Button>
      </form>
    </div>
  </div>
</template>
