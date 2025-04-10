import { createEvent, createStore } from 'effector';

import { User } from 'api/apiSwagger';

interface AdminState {
	users: User[];
}

const initialState: AdminState = {
	users: [],
};

export const actions = {
	setUsers: createEvent<User[]>('SET_USERS'),
	deleteUser: createEvent<number>('DELETE_USER'),
	logout: createEvent('LOGOUT'),
};

export const store = createStore(initialState, { name: 'User_v1' })
	.on(actions.setUsers, (store, users) => ({
		...store,
		users,
	}))
	.on(actions.deleteUser, (store, userId) => ({
		...store,
		users: store.users.filter((user) => user.id !== userId),
	}))
	.reset(actions.logout);

const StoreAdmin = {
	actions,
	store,
};
export default StoreAdmin;
