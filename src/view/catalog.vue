<script setup>
import { useBookStore } from '@/stores/bookstore';
import { computed, onMounted } from 'vue';

const store = useBookStore();
const books = computed(() => store.books);

const toggle = (id) => store.toggleFav(id);


function searchBooks(query) {
    const lowerQuery = (query || '').toLowerCase();
    const list = books.value || [];
    return list.filter(book =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery)
    );
} 

function renderBooks() {
    const container = document.getElementById("bookContainer");
    container.innerHTML = "";

}
function handleSearch(event) {
    const query = event?.target?.value ?? document.getElementById("searchInput")?.value ?? '';
    const results = searchBooks(query);
    const container = document.getElementById("bookResults");

    container.innerHTML = results.map(book => `
    <div class="col-md-3 mb-4">
      <div class="card h-100 text-center">
        <img src="${book.image}" class="card-img-top" alt="${book.title}" style="width: 100%; margin: auto; padding-top: 10px; height: 250px; object-fit: cover; border-radius: 8px 8px 0 0;">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Author: ${book.author}</h6>
          <p class="card-text" style="display: none;">${book.description}</p>
          <button class="btn btn-outline-dark me-2" onclick="toggleDescription(this)">View more</button>
          <button class="btn btn-outline-dark" onclick="location.href='${book.borrowLink}'">Borrow</button>
        </div>
      </div>
    </div>
  `).join('');
}


function toggleDescription(button) {
    const cardBody = button.closest(".card-body");
    const paragraph = cardBody.querySelector("p");
    const isHidden = paragraph.style.display === "none";
    paragraph.style.display = isHidden ? "block" : "none";
    button.textContent = isHidden ? "View less" : "View more";
}

onMounted(() => {
    handleSearch();
});

</script>
<template>
    <div class="container py-5">
        <div class="search-wrapper">
            <div class="search-box">
                <input type="text" id="searchInput" class="search-input form-control" placeholder="Search anything..."
                    @input="handleSearch">
                <i class="fas fa-search search-icon"></i>
            </div>
        </div>
    </div>

    <div id="bookResults" class="row mt-4"></div>

    <div class="container">
        <div class="row" id="bookContainer"></div>
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