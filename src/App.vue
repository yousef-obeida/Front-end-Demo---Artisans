
<template>
  <div class="app-root">
    <header><Navbar /></header>

    <main>
      <router-view />
    </main>

    <footer><Footer /></footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.app-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* ensure it fills the viewport */
  box-sizing: border-box;
}
.app-root main {
  flex: 1; /* allow main to grow and push footer to bottom */
  padding-top: 64px; /* account for the fixed header height */
}
</style>