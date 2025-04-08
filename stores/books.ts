import { createEvent, createStore } from 'effector';

import { Book } from 'api/apiSwagger';

interface BooksState {
	books?: Book[];
	bookMap?: Record<string, Book>;
}

const initialState: BooksState = {
	books: undefined,
	bookMap: undefined,
};

export const actions = {
	setBooks: createEvent<Book[]>('SET_BOOKS'),
	updateBook: createEvent<Book>('UPDATE_BOOK'),
};

export const store = createStore(initialState, { name: 'Books_v1' })
	.on(actions.setBooks, (store, books) => ({
		...store,
		books,
		bookMap: books.reduce(
			(acc, book) => {
				acc[book.id] = book;
				return acc;
			},
			{} as Record<string, Book>,
		),
	}))
	.on(actions.updateBook, (store, newBook) => ({
		...store,
		books: store.books?.map((book) => (book.id === newBook.id ? newBook : book)),
		bookMap: {
			...store.bookMap,
			[newBook.id]: newBook,
		},
	}));
