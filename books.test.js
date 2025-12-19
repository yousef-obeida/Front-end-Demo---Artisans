import { ref, computed } from 'vue';
import { describe, it, expect } from 'vitest';

describe('Book Filtering Logic', () => {
  it('filters books by title or author regardless of case', () => {
    
    const books = ref([
       
    {
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K. Rowling",
        image: "/src/assets/harry-potter1.jpg",
        description: "Estimated sales: 65 million+ The final book in the Harry Potter series, it concludes the epic battle between good and evil as Harry faces Voldemort in a dramatic showdown.",
        borrowLink: "/borrow"
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        image: "/src/assets/lord-rings.jpg",
        description: "Estimated sales: 150 million+ An epic fantasy trilogy that follows Frodo Baggins on a perilous journey to destroy a powerful ring. It's a cornerstone of modern fantasy literature.",
        borrowLink: "/borrow"
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        image: "/src/assets/The-alchemist.jpg",
        description: "Estimated sales: 150 million+ A philosophical novel about a young shepherd named Santiago who dreams of finding treasure in Egypt. It's a story of destiny, self-discovery, and the pursuit of one's personal legend.",
        borrowLink: "/borrow"
    },
    ]);
    const query = ref('');

    const filteredBooks = computed(() => {
      const q = (query.value || '').toLowerCase();
      return books.value.filter(book =>
        book.title.toLowerCase().includes(q) || book.author.toLowerCase().includes(q)
      );
    });

    // 2. Act & Assert: Initial State (No query)
    expect(filteredBooks.value).toHaveLength(3);

    // 3. Act: Search for a title
    query.value = 'The Alchemist';
    // Assert
    expect(filteredBooks.value).toHaveLength(1);
    expect(filteredBooks.value[0].title).toBe('The Alchemist');

    // 4. Act: Search for an author (case insensitive)
    query.value = 'PauLo CoElHo';
    // Assert
    expect(filteredBooks.value).toHaveLength(1);
    expect(filteredBooks.value[0].author).toBe('Paulo Coelho');

    // 5. Act: Search for something that doesn't exist
    query.value = 'Nonexistent Book';
    // Assert
    expect(filteredBooks.value).toHaveLength(0);
  });
});