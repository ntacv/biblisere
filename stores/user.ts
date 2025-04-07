import { createEvent, createStore } from 'effector';

import { User } from 'api/apiSwagger';

interface UserState {
	id?: User;
	token?: string;
}

const initialState: UserState = {
	id: undefined,
	token: undefined,
};

export const actions = {
	setUser: createEvent<User>('SET_USERS'),
	setToken: createEvent<string>('SET_TOKEN'),
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
	.reset(actions.logout);
