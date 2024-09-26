<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-50">
        <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">
                Login
            </h1>
            <Form @submit="onSubmit" v-slot="{ isSubmitting, errors, values }">
                <CustomInput v-model="values.email" name="email" label="Email" placeholder="Enter your email"
                    :error="errors.email" />
                <CustomInput v-model="values.password" name="password" type="password" label="Password"
                    placeholder="Enter your password" :error="errors.password" />
                <Button type="submit" :disabled="Object.keys(errors).length > 0 || isSubmitting"
                    class="justify-center !text-center w-full focus:ring-opacity-50 disabled:opacity-50">
                    Login
                </Button>
            </Form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import { useForm, Form } from 'vee-validate';
import * as yup from 'yup';
import { toast } from 'vue3-toastify';
import CustomInput from '../components/common/CustomInput.vue';
import Button from '../components/common/Button.vue';

// Validation Schema
const schema = yup.object({
    email: yup.string().email('Invalid email format!').required('Required!'),
    password: yup.string().required('Required!'),
});

// useAuth composable
const { tryLogin } = useAuth();
const router = useRouter();

const { handleSubmit, values } = useForm({
    validationSchema: schema,
    initialValues: { email: '', password: '' },
});

// Submit Handler
const onSubmit = handleSubmit(async (values) => {
    try {
        console.log("hh");
        await tryLogin(values.email, values.password);
        toast.success('Login successful!');
        router.push('/'); // Redirect on success
    } catch (error) {
        toast.error('Error logging in, please try again!');
        console.error(error);
    }
});
</script>