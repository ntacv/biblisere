import { createEvent, createStore } from 'effector';
import { ApiHealth } from 'types';

interface HealthState {
	status?: ApiHealth;
}
const initialState: HealthState = {
	status: undefined,
};

export const actions = { setHealth: createEvent<ApiHealth>('SET_HEALTH') };

export const store = createStore(initialState, { name: 'health_v1' }).on(
	actions.setHealth,
	(store, status) => ({
		...store,
		status,
	}),
);
