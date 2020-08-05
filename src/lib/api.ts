import axios from 'axios';

import { apiServer } from 'utils/constants';

const instance = axios.create({
  baseURL: apiServer,
  timeout: 1000,
  withCredentials: true,
});

// auth
export const login = (id: string, password: string) =>
  instance.post('/api/auth/login', {
    user_name: id,
    user_pass: password,
  }); // 로그인
export const logout = () => instance.post('/api/auth/logout'); // 로그아웃
export const checkLogin = () => instance.post('/api/auth/auto_login'); // 자동 로그인
export const getConsultantInfo = (payload: {
  branch_id: number;
  team_id: number;
  limit: number;
  page: number;
}) =>
  instance.get('api/auth', {
    params: payload,
  }); // 상담원 정보 가져오기
