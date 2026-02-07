import { createStore } from 'vuex';
import { type Payment, type User, PaymentStatus, PaymentCategory } from '../types'; 

export default createStore({
  // Initial state with sample users and payments
  state: {
    users: [
      { id: 1, name: 'Vennela Madala', email: 'vennela@zetatech.com' },
      { id: 2, name: 'Siri Chinnam', email: 'siri@zetatech.com' }
    ],
    payments: [
      { 
        id: 101, 
        amount: 15000, 
        userId: 1, 
        category: PaymentCategory.SERVICE, 
        status: PaymentStatus.COMPLETED,
        createdAt: '2026-02-01T10:00:00Z',
        updatedAt: '2026-02-01T10:00:00Z',
        description: 'Example Payment'
      }
    ]
  },
  mutations: {
    // Mutation to add a new payment to the state
    ADD_PAYMENT(state, payment: Payment) {
      state.payments.push(payment);
    },
    // Mutation to update an existing payment in the state
    UPDATE_PAYMENT(state, updatedPayment: Payment) {
      const index = state.payments.findIndex(p => p.id === updatedPayment.id);
      if (index !== -1) {
        state.payments[index] = { 
          ...updatedPayment, 
          updatedAt: new Date().toISOString() 
        };
      }
    },
    // Mutation to delete a user from the state
    DELETE_USER(state, userId) { 
      state.users = state.users.filter(user => user.id !== userId); 
    },
    // Mutation to add a new user to the state
    ADD_USER(state, user) {
      state.users.push(user);
    }
  },
  actions: {
    // Action to create a new payment and commit it to the state
    createPayment({ commit }, payment: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>) {
      const now = new Date().toISOString();
      const newPayment: Payment = {
        ...payment,
        id: Math.floor(Math.random() * 10000),
        createdAt: now,
        updatedAt: now
      };
      commit('ADD_PAYMENT', newPayment);
    },
    // Action to delete a user by committing the DELETE_USER mutation
    deleteUser({ commit }, userId) {
       commit('DELETE_USER', userId);
    },
    // Action to create a new user and commit it to the state
    createUser({ commit, state }, userData) {
      const newId = state.users.length > 0 
        ? Math.max(...state.users.map(u => u.id)) + 1 
        : 1;
      const newUser = {
        ...userData,
        id: newId
      };
      commit('ADD_USER', newUser);
      return newUser;
    }
  }
});