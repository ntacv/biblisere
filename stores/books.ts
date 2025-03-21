import { createEvent, createStore } from "effector";

import { Book } from "api/apiSwagger";

interface BooksState {
  data?: Book[];
}

const initialState: BooksState = {
  data: undefined,
};

export const actions = {
  setBooks: createEvent<Book[]>("SET_BOOKS"),
};

export const store = createStore(initialState, { name: "Books_v1" }).on(
  actions.setBooks,
  (store, data) => ({
    ...store,
    data,
  })
);
