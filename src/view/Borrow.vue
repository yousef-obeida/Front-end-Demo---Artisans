<template>
  <main class="container">
    <h1>Select Books to Borrow</h1>

    <div id="selectionMessageContainer" class="mb-4">
      <p id="selectionMessage">{{ selectionMessage }}</p>
    </div>

    <div id="bookChecklist">
      <label v-for="book in books" :key="book.title" class="book-card-label">
        <input type="checkbox" :value="book.title" v-model="selected" />
        <img :src="book.image" :alt="book.title" />
        <div class="book-info">
          <span class="book-title">{{ book.title }}</span>
          <span class="book-author">by {{ book.author }}</span>
        </div>
      </label>
    </div>

    <div class="checkout-area">
      <button @click="handleCheckout" class="checkout-btn">Proceed to Checkout</button>
      <div id="checkoutStatus" class="mt-3" :style="{ color: checkoutColor }">{{ checkoutMessage }}</div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useBookStore } from '@/stores/bookstore';

const store = useBookStore();
const books = store.books;

const selected = ref([]);
const checkoutMessage = ref('');
const checkoutColor = ref('');

const selectionMessage = computed(() => {
  if (selected.value.length === 0) return 'You have not selected any books yet.';
  if (selected.value.length === 1) return `You selected: ${selected.value[0]}`;
  const last = selected.value[selected.value.length - 1];
  const rest = selected.value.slice(0, -1).join(', ');
  return `You selected: ${rest} and ${last}`;
});

function handleCheckout() {
  if (selected.value.length === 0) {
    checkoutColor.value = 'red';
    checkoutMessage.value = 'Please select at least one book to proceed to checkout.';
    return;
  }
  checkoutColor.value = 'green';
  checkoutMessage.value = `Checkout successful! You are borrowing ${selected.value.length} book(s).`;
  // Optionally, clear selection
  selected.value = [];
}
</script>

<style scoped>
body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
.container { max-width: 900px; margin: 20px auto; padding: 20px; background: #f9fafb; border-radius: 8px; }
h1 { color: #111827; text-align: center; margin-bottom: 1rem; }
#selectionMessageContainer { padding: 10px; border: 1px solid #e5e7eb; background: #fff; border-radius: 6px; }
.book-card-label { display:flex; align-items:center; gap: 1rem; padding: 12px; border-radius: 8px; background: #fff; margin-top: 10px; border: 1px solid #e5e7eb; }
.book-card-label img { width: 60px; height: 90px; object-fit: cover; border-radius: 4px; }
.checkout-area { text-align:center; margin-top: 1.25rem; }
.checkout-btn { background: var(--brand); color: #fff; padding: 0.6rem 1rem; border-radius: 8px; border: none; cursor: pointer; }
.checkout-btn:hover { opacity: 0.95; }
</style>