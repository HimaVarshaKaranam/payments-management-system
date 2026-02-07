import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex'; // @ts-ignore
import PaymentForm from '../../src/views/PaymentForm.vue';

// Mocking the router with an empty 'id' parameter.
jest.mock('vue-router', () => ({ 
  useRoute: () => ({ params: { id: '' }, query: {} }), 
  useRouter: () => ({ push: jest.fn() }) 
}));

describe('PaymentForm Component Lifecycle', () => { 
  let store: any;

  // Reset the store before each test to prevent state pollution
  beforeEach(() => { 
    store = createStore({ 
      state: { users: [], payments: [] } 
    }); 
  });

  it('renders the "New Payment" title by default', () => { 
    // Mounting the component with the injected Vuex store
    const wrapper = shallowMount(PaymentForm, { 
      global: { plugins: [store] } 
    }); 

    // Assertion: Verifies the UI correctly displays the 'New Payment' header.
    expect(wrapper.text()).toContain('New Payment'); 
  }); 
});