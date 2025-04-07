import { createEvent, createStore } from 'effector';

import { Schedule } from 'api/apiSwagger';

interface SchedulesState {
	data?: Schedule[];
}
const initialState: SchedulesState = {
	data: undefined,
};

export const actions = {
	setSchedules: createEvent<Schedule[]>('SET_Schedules'),
};

export const store = createStore(initialState, { name: 'Schedules_v1' }).on(
	actions.setSchedules,
	(store, data) => ({
		...store,
		data,
	}),
);
