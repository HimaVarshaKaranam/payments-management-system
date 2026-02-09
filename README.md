# Payments Management System

A secure internal fintech dashboard built with **Vue 3**, **TypeScript**, and **Vuex** for managing financial records and team members with full traceability and IST reporting.

## 🚀 Key Features

- **Dashboard**: High-level monitoring of all transactions with real-time status indicators.
- **Payment Management**: Complete CRUD flow for transactions with Indian Rupee (INR) formatting.
- **User Management**: System to add and organize team members with role-based attributes.
- **Advanced Filtering**: Filter records by Payment Status or Category (Subscription, Service, Product).
- **Localization**: Native support for `en-IN` locale (Lakhs/Crores numbering) and IST date formats.
- **Type Safety**: Built with strict TypeScript for bulletproof data integrity.

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **State Management**: Vuex (Actions, Mutations, and Getters)
- **Routing**: Vue Router
- **Language**: TypeScript
- **Testing**: Jest + Vue Test Utils
- **Bundler**: Vite

## 📥 Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-link>
   cd payments-management-system

```

2. **Install dependencies**:
```bash
npm install

```


3. **Start the development server**:
```bash
npm run dev

```


The app will be available at `http://localhost:5173`.

## 🧪 Testing

The project includes unit tests for components and the Vuex store to ensure data integrity.

```bash
# Run all tests
npm run test:unit

```

## 🏗️ Project Structure

```text
src/
├── assets/         # Styles and static assets
├── components/     # Reusable UI components
├── router/         # Vue Router configuration
├── store/          # Vuex store (State, Actions, Mutations)
├── types/          # TypeScript interfaces and Enums
└── views/          # Page components (Payments, Users)

```
