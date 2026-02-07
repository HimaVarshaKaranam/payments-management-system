<template>
  <div class="form-page-wrapper">
    <div class="glass-card">
      <header class="form-header">
        <h2>{{ isEdit ? 'Update Transaction' : 'New Payment' }}</h2>
        <p>Fill in the details to {{ isEdit ? 'modify' : 'initialize' }} a payment record.</p>
      </header>

      <form @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="form-group">
            <label>Amount (USD)</label>
            <input 
              v-model.number="form.amount" 
              type="number" 
              step="0.01" 
              class="form-input" 
              placeholder="0.00"
              required 
            />
            <span v-if="form.amount <= 0 && form.amount !== null" class="error-msg">
              Must be greater than 0
            </span>
          </div>

          <div class="form-group">
            <label>Category</label>
            <select v-model="form.category" class="form-input">
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Assign to User</label>
          <select v-model="form.userId" class="form-input" required>
            <option disabled value="">Select a system user</option>
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.name }}
            </option>
          </select>
        </div>

        <div class="form-group" v-if="isEdit">
          <label>Payment Status</label>
          <select v-model="form.status" class="form-input">
            <option v-for="stat in statuses" :key="stat" :value="stat">{{ stat }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Description (Optional)</label>
          <textarea 
            v-model="form.description" 
            class="form-input" 
            rows="3" 
            placeholder="Reference notes..."
          ></textarea>
        </div>

        <button type="submit" :disabled="!isFormValid" class="btn-primary-lg">
          {{ isEdit ? 'Save Changes' : 'Confirm Transaction' }}
        </button>
        <button type="button" @click="$router.push('/payments')" class="btn-ghost-full">
          Discard Changes
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { PaymentStatus, PaymentCategory } from '../types';

const store = useStore();
const router = useRouter();
const route = useRoute();

// Determine if we're editing an existing payment or creating a new one
const isEdit = computed(() => !!route.params.id);
const users = computed(() => store.state.users);
const categories = Object.values(PaymentCategory);
const statuses = Object.values(PaymentStatus);

// Form state
const form = reactive({
  amount: 0,
  userId: '' as string | number,
  category: PaymentCategory.SERVICE,
  status: PaymentStatus.PENDING,
  description: ''
});

// Basic validation: amount must be > 0 and a user must be selected
const isFormValid = computed(() => {
  return form.amount > 0 && form.userId !== '';
});

// If editing, load existing payment data into the form
onMounted(() => {
  if (isEdit.value) {
    const existing = store.state.payments.find(
      (p: any) => p.id === Number(route.params.id)
    );
    if (existing) Object.assign(form, existing);
  }
});

// Handle form submission for both creating and updating payments
const handleSubmit = () => {
  if (isEdit.value) {
    store.commit('UPDATE_PAYMENT', { ...form, id: Number(route.params.id) });
  } else {
    store.dispatch('createPayment', { ...form });
  }
  router.push('/payments');
};
</script>

<style scoped>
@import '@/assets/forms.css';
</style>