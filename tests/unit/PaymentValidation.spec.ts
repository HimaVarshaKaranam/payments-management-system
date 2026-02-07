import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex'; // @ts-ignore
import PaymentForm from '../../src/views/PaymentForm.vue';

// Mocking the router to isolate the component from the browser URL and navigation
jest.mock('vue-router', () => ({ 
  useRoute: () => ({ params: { id: '' }, query: {} }), 
  useRouter: () => ({ push: jest.fn() }) 
}));

describe('PaymentForm Validation Logic', () => { 
  let store: any;

  // Re-initialize the store before each test to ensure tests don't interfere with each other
  beforeEach(() => { 
    store = createStore({ 
      state: { 
        users: [{ id: 1, name: 'Test User' }], // Mock user needed for validation logic
        payments: [] 
      } 
    }); 
  });

  it('disables the submit button when amount is zero', async () => { 
    const wrapper = shallowMount(PaymentForm, { 
      global: { plugins: [store] } 
    });
    // 1. Target the specific number input for transaction amount
    const amountInput = wrapper.find('input[type="number"]');
    
    // 2. Simulate user input.
    await amountInput.setValue(0);

    // 3. Verify the Submit Button state.
    const submitBtn = wrapper.find('.btn-primary-lg').element as HTMLButtonElement;
    
    // Assert that the business rule (amount must be > 0) is being enforced in the UI
    expect(submitBtn.disabled).toBe(true);
  }); 
});