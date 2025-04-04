import { createEvent, createStore } from 'effector';

import { Book } from 'api/apiSwagger';

interface BooksState {
	books?: Book[];
}

const initialState: BooksState = {
	books: undefined,
};

export const actions = {
	setBooks: createEvent<Book[]>('SET_BOOKS'),
	updateBook: createEvent<Book>('UPDATE_BOOK'),
	decreaseBookQuantity: createEvent<string>('DECREASE_BOOK_QUANTITY'),
	increaseBookQuantity: createEvent<string>('INCREASE_BOOK_QUANTITY'),
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
		books: store.books?.map((book) => (book.id === newBook.id ? book : newBook)),
	}));
