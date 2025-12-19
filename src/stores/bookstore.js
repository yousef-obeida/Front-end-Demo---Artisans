import { defineStore } from 'pinia';

export const useBookStore = defineStore('bookstore', {
  state: () => ({
    books: [
    {
        title: "Harry Potter and the Deathly Hallows",
        author: "J.K. Rowling",
        image: "/assets/harry-potter1.jpg",
        description: "Estimated sales: 65 million+ The final book in the Harry Potter series, it concludes the epic battle between good and evil as Harry faces Voldemort in a dramatic showdown.",
        borrowLink: "/borrow"
    },
    {
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        image: "/assets/lord-rings.jpg",
        description: "Estimated sales: 150 million+ An epic fantasy trilogy that follows Frodo Baggins on a perilous journey to destroy a powerful ring. It's a cornerstone of modern fantasy literature.",
        borrowLink: "/borrow"
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        image: "/assets/The-alchemist.jpg",
        description: "Estimated sales: 150 million+ A philosophical novel about a young shepherd named Santiago who dreams of finding treasure in Egypt. It's a story of destiny, self-discovery, and the pursuit of one's personal legend.",
        borrowLink: "/borrow"
    },
    {
        title: "A Tale of Two Cities",
        author: "Charles Dickens",
        image: "/assets/tale-of-two-cities.jpg",
        description: "Estimated sales: 200 million+ A historical novel set during the French Revolution, exploring themes of sacrifice and redemption through the lives of characters in London and Paris.",
        borrowLink: "/borrow"
    },
    {
        title: "The Little Prince",
        author: "Antoine de Saint-Exupéry",
        image: "/assets/little-prince.jpg",
        description: "Estimated sales: 200 million+ A poetic tale of a young prince who travels from planet to planet, offering profound insights on love, loneliness, and human nature.",
        borrowLink: "/borrow"
    },
    {
        title: "And Then There Were None",
        author: "Agatha Christie",
        image: "/assets/were-none.jpg",
        description: "Estimated sales: 100 million+ A gripping mystery where ten strangers are lured to an island and killed one by one in a chilling whodunit.",
        borrowLink: "/borrow"
    },
    {
        title: "Harry Potter and the Philosopher’s Stone",
        author: "J.K. Rowling",
        image: "/assets/harry-potter2.jpg",
        description: "Estimated sales: 120 million+ The first book in the Harry Potter series, introducing readers to the magical world of Hogwarts and the boy who lived.",
        borrowLink: "/borrow"
    },
    {
        title: "Dream of the Red Chamber",
        author: "Cao Xueqin",
        image: "/assets/red-chamber.jpg",
        description: "Estimated sales: 100 million+ One of China's Four Great Classical Novels, this 18th-century epic explores the decline of a noble family and the complexities of love, fate, and society.",
        borrowLink: "/borrow"
    }

]
  })
});
