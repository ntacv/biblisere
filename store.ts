import axios from "axios";
import { createEffect, createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import { useState } from "react";

import { ApiHealth } from "types";

export const actions = { setHealth: createEvent<ApiHealth>("SET_HEALTH") };

const $storeHealth = createStore<{ data: ApiHealth }>({ data: undefined }).on(
  actions.setHealth,
  (store, health) => {
    return { ...store, data: health };
  }
);

export { $storeHealth };
