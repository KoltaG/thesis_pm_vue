<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>

      <form @submit.prevent="onSubmit">
        <CustomInput
          v-model:modelValue="emailValue"
          label="Email"
          placeholder="Enter your email"
          :error="emailError"
        />

        <CustomInput
          v-model:modelValue="passwordValue"
          type="password"
          label="Password"
          placeholder="Enter your password"
          :error="passwordError"
        />

        <Button
          type="submit"
          :disabled="isSubmitting"
          class="justify-center !text-center w-full p-3 bg-blue-500 text-white rounded-lg focus:ring-opacity-50 disabled:opacity-50"
        >
          Login
        </Button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { toast } from "vue3-toastify";
import CustomInput from "../components/common/CustomInput.vue";
import Button from "../components/common/Button.vue";

const schema = yup.object({
  email: yup.string().email("Invalid email format!").required("Required!"),
  password: yup.string().required("Required!"),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
});

const { value: emailValue, errorMessage: emailError } =
  useField<string>("email");
const { value: passwordValue, errorMessage: passwordError } =
  useField<string>("password");

const { tryLogin } = useAuth();
const router = useRouter();

const onSubmit = handleSubmit(async (values) => {
  try {
    await tryLogin(values.email, values.password);
    toast.success("Login successful!");
    router.push("/");
  } catch (error) {
    toast.error("Error logging in, please try again!");
    console.error(error);
  }
});
</script>
