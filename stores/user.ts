import { createEvent, createStore } from 'effector';

import { Book, User } from 'api/apiSwagger';

interface UserState {
	id?: User;
	token?: string;
}

const initialState: UserState = {
	id: undefined,
	token: undefined,
};

export const actions = {
	setUser: createEvent<User>('SET_USER'),
	setToken: createEvent<string>('SET_TOKEN'),
	borrowBook: createEvent<Book>('UPDATE_BOOK'),
	returnBook: createEvent<Book>('RETURN_BOOK'),
	logout: createEvent('LOGOUT'),
};

export const store = createStore(initialState, { name: 'User_v1' })
	.on(actions.setUser, (store, id) => ({
		...store,
		id,
	}))
	.on(actions.setToken, (store, token) => ({
		...store,
		token,
	}))
	.on(actions.borrowBook, (state, newBook: Book) => ({
		...state,
		id: {
			...state.id,
			books: [...(state.id?.books || []), newBook],
		},
	}))
	.on(actions.returnBook, (state, newBook: Book) => ({
		...state,
		id: {
			...state.id,
			books: state.id?.books?.filter((book) => book.id !== newBook.id),
		},
	}))
	.reset(actions.logout);
