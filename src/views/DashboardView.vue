<template>
  <div class="dashboard-container">
    <h2 class="page-title">Analytics Overview</h2>

    <div class="stats-grid">
      <div class="stat-card">
        <label>Total Users</label>
        <div class="value">{{ totalUsers }}</div>
      </div>
      <div class="stat-card">
        <label>Total Transactions</label>
        <div class="value">{{ totalTransactions }}</div>
      </div>
      <div class="stat-card primary">
        <label>Total Revenue</label>
        <div class="value">₹{{ totalRevenue.toLocaleString() }}</div>
      </div>
      <div class="stat-card">
        <label>Success Rate</label>
        <div class="value">{{ successRate }}%</div>
      </div>
    </div>

    <div class="chart-section card">
      <h3>Transaction Status</h3>
      <div class="bar-chart">
        <div v-for="(count, status) in statusCounts" :key="status" class="bar-wrapper">
          <div 
            class="bar" 
            :class="status.toLowerCase()" 
            :style="{ height: (count * 40 + 10) + 'px' }"
            :data-value="count"
          ></div>
          <span class="bar-name">{{ status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { PaymentStatus } from '../types';

const store = useStore();

const payments = computed(() => store.state.payments);
const totalUsers = computed(() => store.state.users.length);
const totalTransactions = computed(() => payments.value.length);

// Only sums up amounts for successful payments
const totalRevenue = computed(() => {
  return payments.value
    .filter((p: any) => p.status === PaymentStatus.COMPLETED)
    .reduce((sum: number, p: any) => sum + p.amount, 0);
});

// Calculates percentage of successful vs total transactions
const successRate = computed(() => {
  if (totalTransactions.value === 0) return 0;
  const completed = payments.value.filter((p: any) => p.status === PaymentStatus.COMPLETED).length;
  return Math.round((completed / totalTransactions.value) * 100);
});

// Groups payments by status to be used in the bar chart
const statusCounts = computed(() => {
  const counts: Record<string, number> = { Pending: 0, Completed: 0, Failed: 0, Refunded: 0 };
  payments.value.forEach((p: any) => {
    if (counts[p.status] !== undefined) counts[p.status]++;
  });
  return counts;
});

const maxCount = computed(() => Math.max(...Object.values(statusCounts.value), 1));
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid #f1f2f6;
}

.stat-card label {
  color: #636e72;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
}

.stat-card .value {
  font-size: 2rem;
  font-weight: 800;
  margin-top: 8px;
  color: #2d3436;
}

.stat-card.primary .value {
  color: #7f00ff;
}

.chart-container {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #f1f2f6;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
}

.chart-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: #2d3436;
  margin-bottom: 2rem;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 250px;
  padding-bottom: 20px;
  position: relative;
  background-image: linear-gradient(#f1f2f6 1px, transparent 1px);
  background-size: 100% 50px;
}

.bar-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  z-index: 1;
}

.bar {
  width: 100%;
  border-radius: 8px 8px 4px 4px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  cursor: pointer;
}

.bar.pending { 
  background: linear-gradient(180deg, #ffb142, #f39c12); 
  box-shadow: 0 4px 10px rgba(243, 156, 18, 0.3);
}
.bar.completed { 
  background: linear-gradient(180deg, #2ecc71, #27ae60); 
  box-shadow: 0 4px 10px rgba(46, 204, 113, 0.3);
}
.bar.failed { 
  background: linear-gradient(180deg, #ff5252, #d63031); 
  box-shadow: 0 4px 10px rgba(214, 48, 49, 0.3);
}
.bar.refunded { 
  background: linear-gradient(180deg, #a29bfe, #6c5ce7); 
  box-shadow: 0 4px 10px rgba(108, 92, 231, 0.3);
}

.bar:hover {
  transform: scaleX(1.1) translateY(-5px);
  filter: brightness(1.1);
}

.bar::after {
  content: attr(data-value);
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 800;
  font-size: 0.9rem;
  color: #2d3436;
  opacity: 0;
  transition: opacity 0.3s;
}

.bar:hover::after {
  opacity: 1;
}

.bar-name {
  margin-top: 12px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #636e72;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>