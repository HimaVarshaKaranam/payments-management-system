<template>
  <div class="user-container">
    <div class="list-header">
      <h2 class="title">User Management</h2>
      <button @click="$router.push('/users/create')" class="btn-primary">
        + Add New User
      </button>
    </div>

    <div class="table-card">
      <table class="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email Address</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="row-hover">
            <td class="name-cell">{{ user.name }}</td>
            <td class="email-cell">{{ user.email }}</td>
            <td class="text-right">
              <button @click="handleDeleteUser(user.id)" class="btn-outline-danger">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

// Reactive connection to Vuex state
const users = computed(() => store.state.users);

const handleDeleteUser = (id: number) => {
  if (confirm("Are you sure? Deleting this user will remove them from the system dashboard.")) {
    store.commit('DELETE_USER', id);
  }
};
</script>

<style scoped>
.user-container {
  padding: 1rem 0;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.title {
  font-size: 1.75rem;
  font-weight: 800;
  color: #2d3436;
  margin: 0;
}

.btn-primary {
  background-color: #7f00ff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(127, 0, 255, 0.2);
}

.btn-primary:hover {
  background-color: #6a00d6;
  transform: translateY(-2px);
}

.table-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  border: 1px solid #f1f2f6;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  background: #fcfaff;
  text-align: left;
  padding: 1rem 1.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #636e72;
  border-bottom: 1px solid #f1f2f6;
}

.data-table td {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #f1f2f6;
}

.row-hover:hover {
  background-color: #fcfaff;
}

.id-cell {
  font-family: monospace;
  font-weight: 600;
  color: #7f00ff;
}

.name-cell {
  font-weight: 700;
}

.text-right {
  text-align: right;
}

.btn-outline-danger {
  background: transparent;
  color: #ff4757;
  border: 1px solid #ff4757;
  padding: 6px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.2s;
}

.btn-outline-danger:hover {
  background: #ff4757;
  color: white;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #b2bec3;
}
</style>