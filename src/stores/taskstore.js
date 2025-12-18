import { defineStore } from 'pinia';

export const useTaskStore = defineStore('taskstore', {
  state: () => ({
    tasks: [
      { id: 1, title: 'Complete project report', isFav: false },
      { id: 2, title: 'Review team feedback', isFav: true },
      { id: 3, title: 'Plan next sprint', isFav: false },
    ],
  }),
});