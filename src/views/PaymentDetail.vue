<template>
  <div v-if="payment" class="detail-container">
    <button @click="$router.back()" class="btn-back">← Back to List</button>
    <div class="detail-card">
      <div class="status-badge" :class="payment.status.toLowerCase()">
        {{ payment.status }}
      </div>
      <h2>Transaction #{{ payment.id }}</h2>
      <hr />
      <div class="info-grid">
        <p><strong>Amount:</strong> ${{ payment.amount.toFixed(2) }}</p>
        <p><strong>Category:</strong> {{ payment.category }}</p>
        <p><strong>Date:</strong> {{ payment.date }}</p>
        <p><strong>User ID:</strong> {{ payment.userId }}</p>
        <p><strong>Description:</strong> {{ payment.description || 'No description provided' }}</p>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <p>Payment record not found.</p>
    <router-link to="/payments">Return to Dashboard</router-link>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();
// Convert the URL ID to a Number to find the matching record
const payment = computed(() => {
  return store.state.payments.find((p: any) => p.id === Number(route.params.id));
});
</script>

<style scoped>
.btn-back { display: flex; align-items: center; gap: 8px; background: none; border: none; color: #636e72; font-weight: 600; cursor: pointer; padding: 8px 0; transition: color 0.2s ease; }
.btn-back:hover { color: #2d3436; transform: translateX(-4px); }
.detail-card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 1rem; }
.status-badge { float: right; padding: 4px 12px; border-radius: 20px; font-weight: bold; text-transform: uppercase; }
.pending { background: #fff3cd; color: #856404; }
.completed { background: #d4edda; color: #155724; }
.failed { background: #ffe3e3; color: #d63031; border: 1px solid #fab1a0; }
.info-grid p { margin: 10px 0; font-size: 1.1rem; }
</style>