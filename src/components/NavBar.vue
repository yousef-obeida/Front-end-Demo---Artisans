<template>
  <header class="site-header">
    <div class="inner">
      <div class="left">
        <a href="/" class="brand" @click="menuOpen = false">
          <img src="/src/assets/logo.svg" alt="Bookstore" class="logo" />
          <span class="title">Bookstore</span>
        </a>
        <nav class="links">
          <a href="/" :class="{active: $route.name === 'Home'}" @click="menuOpen = false">Home</a>
          <a href="/catalog.vue" :class="{active: $route.name === 'Catalog'}" @click="menuOpen = false">Catalog</a>
        </nav>
      </div>

      <div class="right">
        <template v-if="isAuthenticated">
          <span class="user">{{ userEmail }}</span>
          <button @click="handleLogout" class="btn-ghost">Logout</button>
        </template>
        <template v-else>
          <a href="/login" class="btn-primary" @click="menuOpen = false">Login</a>
        </template>
        <button class="menu-btn" @click="menuOpen = !menuOpen" aria-label="Menu">☰</button>
      </div>
    </div>

    <div v-if="menuOpen" class="mobile-menu">
      <a href="/" @click="menuOpen = false">Home</a>
      <a href="/catalog" @click="menuOpen = false">Catalog</a>
      <a href="/login" @click="menuOpen = false">Login</a>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuth } from '@/composables/useAuth';
const { logout, user, isAuthenticated } = useAuth();

const menuOpen = ref(false);

const userEmail = computed(() => user.value?.email || '');
const handleLogout = () => { logout(); };
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  display: flex;
  align-items: center;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  z-index: 1000;
}
.site-header .inner {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
}
.brand { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: inherit; }
.logo { width: 36px; height: 36px; object-fit: contain; }
.links a { margin-left: 1rem; color: #374151; text-decoration: none; }
.links a.active { color: var(--brand); font-weight: 700; }
.right { display: flex; align-items: center; gap: 0.75rem; }
.btn-primary { background: var(--brand); color: #fff; padding: 0.5rem 0.85rem; border-radius: 8px; text-decoration: none; }
.btn-ghost { background: transparent; border: 1px solid #e5e7eb; padding: 0.4rem 0.6rem; border-radius: 8px; }
.menu-btn { display: none; background: transparent; border: 0; font-size: 1.2rem; }
.mobile-menu { display: none; flex-direction: column; padding: 0.5rem 1rem; background: #fff; border-top: 1px solid #e5e7eb; }
@media (max-width: 640px) {
  .links { display: none; }
  .menu-btn { display: inline-block; }
  .mobile-menu { display: flex; }
}
</style>

 
