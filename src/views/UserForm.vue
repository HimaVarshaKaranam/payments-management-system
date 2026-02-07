<template>
  <div class="form-page-wrapper">
    <div class="glass-card">
      <header class="form-header">
        <h2>Register User</h2>
        <p>Add a new internal member to the ZetaPay system.</p>
      </header>

      <form @submit.prevent="handleUserSubmit">
        <div class="form-group">
          <label>Full Name</label>
          <input 
            v-model="userForm.name" 
            type="text" 
            class="form-input" 
            placeholder="e.g. Alex Rivera" 
            required 
          />
        </div>

        <div class="form-group">
          <label>Email Address</label>
          <input 
            v-model="userForm.email" 
            type="email" 
            class="form-input" 
            placeholder="alex@zetapay.com" 
            required 
          />
          <span v-if="!isEmailValid && userForm.email" class="error-msg">
            Please enter a valid business email address.
          </span>
        </div>

        <div class="form-actions-stack">
          <button type="submit" :disabled="!isFormReady" class="btn-primary-lg">
            Create User Account
          </button>
          <button type="button" @click="$router.push('/users')" class="btn-ghost-full">
            Cancel and Return
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

// Local state for the new user's information
const userForm = reactive({
  name: '',
  email: ''
});

// Email Regex Validation
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(userForm.email);
});

// Form Readiness Check
const isFormReady = computed(() => {
  return userForm.name.trim().length >= 3 && isEmailValid.value;
});

const handleUserSubmit = () => {
  if (isFormReady.value) {
    // Dispatching to Vuex action to handle the API call or state update
    store.dispatch('createUser', { ...userForm });
    // Redirecting the user back to the management list upon success
    router.push('/users');
  }
};
</script>

<style scoped>
@import '@/assets/forms.css';
</style>