import { createEvent, createStore } from "effector";

import { ApiSchedules } from "types";

interface SchedulesState {
  status?: ApiSchedules;
}
const initialState: SchedulesState = {
  status: undefined,
};

export const actions = {
  setSchedules: createEvent<ApiSchedules>("SET_Schedules"),
};

export const store = createStore(initialState, { name: "Schedules_v1" }).on(
  actions.setSchedules,
  (store, status) => ({
    ...store,
    status,
  })
);
