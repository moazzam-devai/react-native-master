import axios from 'axios';
import {SecureStorage} from '../utility';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost/',
});

axiosInstance.interceptors.request.use(async config => {
  const token = await SecureStorage.getItemAsync('access-token');
  if (token) {
    Object.assign(config.headers, {
      Authorization: token,
    });
  }
  return config;
});
