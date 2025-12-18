<template>
  <footer class="container">
    <div class="inner">
      <div class="left">
        <div class="brand">Bookstore</div>
        <div class="tag">Handpicked books for curious minds.</div>
      </div>
    </div>
    <div class="copyright">© {{ new Date().getFullYear() }} Bookstore — All rights reserved</div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.container {
  background: #f9fafb;
  color: #374151;
  padding: 1.25rem 0;
  margin-top: auto;
  width: 100vw; /* span full viewport */
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  box-sizing: border-box;
  border-top: 1px solid #e5e7eb;
}
.container .inner { max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 1rem; }
.container .tag { font-size: 0.9rem; color: #6b7280; }
.container a { color: #6b7280; text-decoration: none; }
.container .copyright { text-align: center; font-size: 0.9rem; color: #6b7280; margin-top: 0.75rem; }
</style>