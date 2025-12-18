<template>
  <footer class="site-footer">
    <div class="inner">
      <div class="left">
        <div class="brand">Bookstore</div>
        <div class="tag">Handpicked books for curious minds.</div>
      </div>
      <div class="right">
        <a href="#">Privacy</a>
        <a href="#" class="ml">Contact</a>
      </div>
    </div>
    <div class="copyright">© {{ new Date().getFullYear() }} Bookstore — All rights reserved</div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.site-footer { background: #f9fafb; color: #374151; padding: 1.25rem 0; margin-top: auto; }
.site-footer .inner { max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 1rem; }
.site-footer .tag { font-size: 0.9rem; color: #6b7280; }
.site-footer a { color: #6b7280; text-decoration: none; }
.site-footer .copyright { text-align: center; font-size: 0.9rem; color: #6b7280; margin-top: 0.75rem; }
</style>