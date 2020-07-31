import axios from 'axios';

import { apiServer } from 'utils/constants';

const instance = axios.create({
  baseURL: apiServer,
  timeout: 1000,
  withCredentials: true,
});

export const login = (id: string, password: string) =>
  instance.post('/api/auth/login', {
    user_name: id,
    user_pass: password,
  });
export const logout = () => instance.post('/api/auth/logout');
export const checkLogin = () => instance.post('/api/auth/auto_login');
