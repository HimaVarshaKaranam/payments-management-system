import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex'; // @ts-ignore
import PaymentForm from '../../src/views/PaymentForm.vue';

// Mocking the router to provide a clean environment without real navigation
jest.mock('vue-router', () => ({ 
  useRoute: () => ({ params: { id: '' }, query: {} }), 
  useRouter: () => ({ push: jest.fn() }) 
}));

describe('PaymentForm UI Components', () => { 
  let store: any;

  // Initialize a fresh store with mock users before each test
  beforeEach(() => { 
    store = createStore({ 
      state: { 
        users: [ 
          { id: 1, name: 'Sarah Chen' }, 
          { id: 2, name: 'Marcus Vane' }, 
          { id: 3, name: 'Elena Rodriguez' }, 
          { id: 4, name: 'James Mitchell' }, 
          { id: 5, name: 'Aisha Patel' } 
        ], 
        payments: [] 
      } 
    }); 
  });

  it('renders the correct number of users in the dropdown', () => { 
    const wrapper = shallowMount(PaymentForm, { 
      global: { plugins: [store] } 
    });

    // Target the specific user selection dropdown.
    const userSelect = wrapper.find('select[required]'); 
    const options = userSelect.findAll('option');
    
    // Logic: We expect 6 options.
    expect(options.length).toBe(6);
    
    // Verifying that the data is correctly rendered inside the option tag
    expect(options[1].text()).toContain('Sarah Chen');
  }); 
});