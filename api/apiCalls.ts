import axios from 'axios';
import { ApiHealth } from 'types';

const domain = process.env.NODE_ENV == 'dev' ? 'http://localhost:8000' : '';

const getApiHealth = () => {
	return axios
		.get<ApiHealth>(domain + '/health')
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

const getApiSchedules = () => {
	return axios
		.get(domain + '/schedules')
		.then((response) => response.data)
		.catch((error) => {
			throw error;
		});
};

export { getApiHealth, getApiSchedules };
