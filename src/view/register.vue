<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { register, isAuthenticating, authError } = useAuth();

const name = ref('');
const email = ref('eve.holt@reqres.in'); // ReqRES sample user
const password = ref('pistol');
const confirmPassword = ref('');
const formError = ref('');

const canSubmit = computed(() => !isAuthenticating.value);

const handleRegister = async () => {
    formError.value = '';

    if (!email.value || !password.value) {
        formError.value = 'Email and password are required.';
        return;
    }
    if (password.value.length < 6) {
        formError.value = 'Password must be at least 6 characters.';
        return;
    }
    if (password.value !== confirmPassword.value) {
        formError.value = 'Passwords do not match.';
        return;
    }

    const success = await register(email.value, password.value);
    if (success) {
        // Redirect after successful registration
        router.push({ name: 'Catalog' });
    }
};
</script>

