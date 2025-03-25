import { createEvent, createStore } from "effector";

import { Book } from "api/apiSwagger";

interface BooksState {
  books?: Book[];
}

const initialState: BooksState = {
  books: undefined,
};

export const actions = {
  setBooks: createEvent<Book[]>("SET_BOOKS"),
};

export const store = createStore(initialState, { name: "Books_v1" }).on(
  actions.setBooks,
  (store, books) => ({
    ...store,
    books,
    bookMap: books.reduce((acc, book) => {
      acc[book.id] = book;
      return acc;
    }, {} as Record<string, Book>),
  })
);
