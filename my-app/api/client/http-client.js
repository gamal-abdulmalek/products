import axios from 'axios';
import Router from 'next/router';
import Cookies from 'js-cookie';

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
  timeout: 5000000,
  headers: {
    // 'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    
  },
});

Axios.interceptors.request.use((config) => {
  const token = Cookies.get(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY);
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token ? token : ''}`,
    // Authorization: `Bearer `,
  };
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403)
    ) {
      Cookies.remove(process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY);
      Router.replace('/');
    }
    return Promise.reject(error);
  }
);

export class HttpClient {
  static async get(url, params) {
    const response = await Axios.get(url, { params });
    return response.data;
  }

  static async post(url, data, options) {
    const response = await Axios.post(url, data, options);
    return response.data;
  }

  static async put(url, data) {
    const response = await Axios.put(url, data);
    return response.data;
  }

  static async delete(url) {
    const response = await Axios.delete(url);
    return response.data;
  }

}
