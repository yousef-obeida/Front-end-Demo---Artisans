<script setup>
import { useBookStore } from '@/stores/bookstore';
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

onMounted(() => {
  console.log('Catalog mounted');
});

const store = useBookStore();
const books = computed(() => store.books);
const router = useRouter();

const query = ref('');
const filteredBooks = computed(() => {
  const q = (query.value || '').toLowerCase();
  return books.value.filter(book =>
    book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q)
  );
});

const expanded = ref({});
const toggleDescription = (title) => {
  expanded.value[title] = !expanded.value[title];
};



</script>
<template>
  <div class="container py-5">
    <div class="search-wrapper">
      <div class="search-box">
        <input type="text" v-model="query" class="search-input form-control" placeholder="Search anything..." />
        <i class="fas fa-search search-icon"></i>
      </div>
    </div>

    <div class="row mt-4">
      <div class="catalog-debug col-12">Catalog mounted — results: {{ filteredBooks.length }}</div>
      <div v-if="filteredBooks.length === 0" class="col-12">No results found.</div>
      <div v-for="book in filteredBooks" :key="book.title" class="col-md-3 mb-4">        <div class="card h-100 text-center">
          <img :src="book.image" class="card-img-top" :alt="book.title" style="width: 100%; margin: auto; padding-top: 10px; height: 250px; object-fit: cover; border-radius: 8px 8px 0 0;" />
          <div class="card-body">
            <h5 class="card-title">{{ book.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Author: {{ book.author }}</h6>
            <p class="card-text" v-if="expanded[book.title]">{{ book.description }}</p>
            <button class="btn-primary" @click="toggleDescription(book.title)">{{ expanded[book.title] ? 'View less' : 'View more' }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .search-wrapper {
    max-width: 600px;
    margin: 0 auto;

}

.search-box {
    position: relative;
    background: white;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

}

.search-box:focus-within {
    box-shadow: 0 8px 25px rgba(255, 0, 0, 0.1);
    transform: translateY(-2px);
}

.search-input {
    border: 2px solid #eee;
    border-radius: 30px;
    padding: 15px 25px;
    padding-right: 50px;
    width: 100%;
    transition: all 0.3s ease;
    background-color: #eeeff1;
}

.search-input:focus {
    border-color: black;
    box-shadow: none;
}

.search-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    transition: all 0.3s ease;
}

.search-box:focus-within .search-icon {
    color: black;
}

.box {
    border: 2px solid #c7cacd;
    padding: 20px;
    width: 50%;
    height: 500px;
    margin-bottom: 15px;
    border-radius: 8px;

}

.box h4 {
    color: rgb(74, 73, 73);
}
</style>