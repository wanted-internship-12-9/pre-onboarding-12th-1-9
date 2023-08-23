import axios, { AxiosError } from 'axios';

import { BASE_API_URL_SERVER } from './apiConfig';

export const axiosFetch = axios.create({
  baseURL: BASE_API_URL_SERVER,
});

axiosFetch.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`;

    return config;
  },
  (error: AxiosError) => {
    console.log(error);
    return Promise.reject(error);
  },
);
