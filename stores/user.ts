import { createEvent, createStore } from "effector";

import { User } from "api/apiSwagger";

interface UsersState {
  data?: User;
}

const initialState: UsersState = {
  data: undefined,
};

export const actions = {
  setUsers: createEvent<User>("SET_USERS"),
};

export const store = createStore(initialState, { name: "Users_v1" }).on(
  actions.setUsers,
  (store, data) => ({
    ...store,
    data,
  })
);
