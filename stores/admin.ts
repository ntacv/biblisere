import { createEvent, createStore } from 'effector';

import { User } from 'api/apiSwagger';

interface AdminState {
	users: User[];
}

const initialState: AdminState = {
	users: [],
};

export const actions = {
	setUsers: createEvent<User[]>('ADMIN_SET_USERS'),
	deleteUser: createEvent<number>('ADMIN_DELETE_USER'),
	updateUser: createEvent<User>('ADMIN_UPDATE_USER'),
	logout: createEvent('ADMIN_LOGOUT'),
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
	.on(actions.updateUser, (store, newUser) => ({
		...store,
		users: store.users.map((user) => (user.id === newUser.id ? { ...user, ...newUser } : user)),
	}))
	.reset(actions.logout);

const StoreAdmin = {
	actions,
	store,
};
export default StoreAdmin;
