import { createEvent, createStore } from 'effector';
import { ApiSchedules } from 'types';

interface SchedulesState {
	data?: ApiSchedules[];
}
const initialState: SchedulesState = {
	data: undefined,
};

export const actions = {
	setSchedules: createEvent<ApiSchedules[]>('SET_Schedules'),
};

export const store = createStore(initialState, { name: 'Schedules_v1' }).on(
	actions.setSchedules,
	(store, data) => ({
		...store,
		data,
	}),
);
