<template>
  <div class="list-container">
    <div class="list-header">
      <h2 class="title">Payments Dashboard</h2>
    </div>

    <div class="control-bar">
      <div class="filter-group">
        <div class="filter-item">
          <select v-model="filters.status" class="small-select">
            <option value="">Status: All</option>
            <option v-for="s in statuses" :key="s" :value="s">{{ s }}</option>
          </select>
        </div>
        <div class="filter-item">
          <select v-model="filters.category" class="small-select">
            <option value="">Category: All</option>
            <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>
        <button @click="resetFilters" class="btn-reset">Reset Filters</button>
      </div>

      <button @click="$router.push('/payments/new')" class="btn-primary">
        + New Payment
      </button>
    </div>

    <div class="table-card">
      <table class="payment-table">
        <thead>
          <tr>
            <th>User</th> <th>Amount</th>
            <th>Category</th>
            <th>Status</th>
            <th>Created</th> <th>Last Updated</th> <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="payment in filteredPayments" :key="payment.id" class="row-hover">
            <td class="payer-name">{{ getUserName(payment.userId) }}</td>
            <td class="amount-cell">₹{{ payment.amount.toLocaleString('en-IN') }}</td>
            <td><span class="zeta-badge">{{ payment.category }}</span></td>
            <td>
              <span :class="['tag', payment.status.toLowerCase()]">{{ payment.status }}</span>
            </td>
            <td class="date-cell">{{ formatDate(payment.createdAt) }}</td>
            <td class="date-cell updated">{{ formatDate(payment.updatedAt) }}</td>
            <td class="text-right">
              <button @click="$router.push(`/payments/${payment.id}`)" class="btn-link">View</button>
              <button @click="$router.push(`/payments/edit/${payment.id}`)" class="btn-link edit">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { PaymentStatus, PaymentCategory } from '../types';

const store = useStore();
const statuses = Object.values(PaymentStatus);
const categories = Object.values(PaymentCategory);

const filters = reactive({ status: '', category: '' });

// Find the user name from the users array in Vuex store
const getUserName = (userId: number) => {
  const user = store.state.users.find((u: any) => u.id === userId);
  return user ? user.name : 'Unknown';
};

// Format ISO strings to a readable local date
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'N/A';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN');
};

// Dynamically updates the list whenever the 'filters' object changes.
const filteredPayments = computed(() => {
  return store.state.payments.filter((p: any) => {
    return (!filters.status || p.status === filters.status) &&
           (!filters.category || p.category === filters.category);
  });
});

// Resets the filters to their default state, showing all payments.
const resetFilters = () => {
  filters.status = '';
  filters.category = '';
};
</script>

<style scoped>
.list-container {
  padding: 1rem 0;
}

.title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #2d3436;
  margin-bottom: 1.5rem;
}

.control-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 12px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(127, 0, 255, 0.08);
  margin-bottom: 24px;
  border: 1px solid rgba(127, 0, 255, 0.05);
}

.filter-group {
  display: flex;
  gap: 12px;
  align-items: center;
}

.small-select {
  padding: 8px 12px;
  font-size: 0.85rem;
  border: 1px solid #eee;
  border-radius: 8px;
  min-width: 150px;
  background-color: #f9f9fb;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}

.small-select:focus {
  border-color: #7f00ff;
}

.btn-reset {
  background: none;
  border: none;
  color: #636e72;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
}

.btn-primary {
  background-color: #7f00ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(127, 0, 255, 0.2);
}

.btn-primary:hover {
  background-color: #6a00d6;
  transform: translateY(-1px);
}

.table-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.payment-table {
  width: 100%;
  border-collapse: collapse;
}

.payment-table th {
  background: #fcfaff;
  text-align: left;
  padding: 1rem 1.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #636e72;
  border-bottom: 1px solid #f1f2f6;
}

.payment-table td {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f2f6;
}

.id-cell { font-family: monospace; font-weight: 600; color: #7f00ff; }
.amount-cell { font-weight: 700; }

.tag {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 700;
}
.pending { background: #fff8e1; color: #ffa000; }
.completed { background: #e8f5e9; color: #2e7d32; }
.failed { background: #ffebee; color: #c62828; }

.text-right {
  text-align: right;
  padding-right: 2rem !important;
}

.btn-link {
  background: #f4ebff;
  color: #7f00ff;
  border: none;
  padding: 6px 14px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  margin-left: 8px;
  transition: all 0.2s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-link:hover {
  background: #7f00ff;
  color: white;
  transform: translateY(-1px);
}

.btn-link.edit {
  background: #f1f2f6;
  color: #636e72;
}

.btn-link.edit:hover {
  background: #dfe6e9;
  color: #2d3436;
}

th.text-right {
  text-align: right;
  padding-right: 2rem;
}

.no-data { text-align: center; padding: 40px; color: #b2bec3; }
</style>