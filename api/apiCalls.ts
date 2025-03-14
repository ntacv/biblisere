import axios from "axios";

import { ApiHealth } from "types";

const getApiHealth = () => {
  return axios
    .get<ApiHealth>("http://localhost:8000/health")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getApiSchedules = () => {
  return axios
    .get("http://localhost:8000/schedules")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export { getApiHealth, getApiSchedules };
