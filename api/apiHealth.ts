import { useState } from "react";
import axios from "axios";

import { ApiHealth } from "types";
import { $storeHealth, actions } from "store";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const getApiHealth = () => {
  const [health, setHealthApi] = useState<ApiHealth>();
  const [apiStatus, setApiStatus] = useState<"loading" | "ok" | "error">(
    "loading"
  );

  const response = new Promise.then(() => {
    return axios
      .get("http://localhost:8000/health")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        health ? setApiStatus("ok") : setApiStatus("error"); // network error NOBRIDGE
      });
  });

  actions.setHealth(response);

  return health;
};

export { getApiHealth };
