

<template>
  <div class="flex flex-col min-h-screen">
    <header><Navbar /></header>

    <main class="flex-grow">
      <router-view />
    </main>

    <footer><Footer /></footer>
  </div>
</template>

<script setup>
import Navbar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
</script>