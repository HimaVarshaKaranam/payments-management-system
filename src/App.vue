<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app-layout">
    <header class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <span class="logo-accent">Zeta</span>Pay
        </div>
        
        <nav class="nav-links">
          <RouterLink to="/" class="nav-item">
            <span class="nav-icon">📊</span> Dashboard
          </RouterLink>
          
          <RouterLink to="/payments" class="nav-item">
            <span class="nav-icon">💳</span> Payments
          </RouterLink>
          
          <RouterLink to="/users" class="nav-item">
            <span class="nav-icon">👤</span> Users
          </RouterLink>
        </nav>
      </div>
    </header>

    <main class="content-area">
      <div class="content-container">
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<style>
:root {
  --primary: #7f00ff;
  --primary-dark: #6200c7;
  --bg-subtle: #f8f9fc;
  --white: #ffffff;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: var(--bg-subtle);
  color: #2d3436;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.navbar {
  background: linear-gradient(135deg, var(--primary) 0%, #5500ab 100%);
  height: 72px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(127, 0, 255, 0.2);
}

.navbar-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-weight: 800;
  font-size: 1.6rem;
  color: white;
  letter-spacing: -1px;
  cursor: default;
}

.logo-accent {
  opacity: 0.85;
  font-weight: 400;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-item {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  padding: 10px 18px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-item.router-link-active {
  background: var(--white);
  color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.nav-icon {
  font-size: 1.1rem;
}

.content-area {
  flex: 1;
  padding: 2rem 1rem;
}

.content-container {
  max-width: 1100px;
  margin: 0 auto;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>