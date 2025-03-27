import { createEvent, createStore } from 'effector';

import { User } from 'api/apiSwagger';

interface UserState {
	data?: User;
}

const initialState: UserState = {
	data: undefined,
};

export const actions = {
	setUser: createEvent<User>('SET_USERS'),
};

export const store = createStore(initialState, { name: 'User_v1' }).on(
	actions.setUser,
	(store, data) => ({
		...store,
		data,
	}),
);
