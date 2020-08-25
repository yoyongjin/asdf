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
  search_name: string;
}) =>
  instance.get('/api/auth', {
    params: payload,
  }); // 상담원 정보 가져오기
export const resetPassword = (id: number) =>
  instance.patch('api/auth/password', {
    user_id: id,
  }); // 비밀번호 초기화

export const getBranchInfo = () => instance.get('/api/branch'); // 지점 + 팀 목록 가져오기

export const insertBranch = (branch_name: string) =>
  instance.post('/api/branch', {
    branch_name,
  });

export const insertTeam = (team_name: string, branch_id: number) =>
  instance.post('/api/team', {
    team_name,
    branch_id,
  });

export const updateTeam = (id: number, name: string) =>
  instance.put(`/api/team/${id}`, {
    team_name: name,
  });

export const updateBranch = (id: number, name: string) =>
  instance.put(`/api/branch/${id}`, {
    branch_name: name,
  });

export const getBranchList = () => instance.get('/api/branch/all');
export const getTeamList = (branchId: number) =>
  instance.get('/api/team/all', {
    params: {
      branch_id: branchId,
    },
  });

export const insertUser = (
  branch_id: string,
  team_id: string,
  admin_id: string,
  name: string,
  user_name: string,
  user_pass: string,
  number: string,
  ziboxip: string,
) =>
  instance.post('/api/auth/signup', {
    branch_id,
    team_id,
    admin_id,
    name,
    user_name,
    user_pass,
    number,
    ziboxip,
  });

export const updateUser = (
  user_id: string,
  branch_id: string,
  team_id: string,
  admin_id: string,
  name: string,
  user_name: string,
  user_pass: string,
  number: string,
  ziboxip: string,
) =>
  instance.patch('/api/auth', {
    user_id,
    branch_id,
    team_id,
    admin_id,
    name,
    user_name,
    user_pass,
    number,
    ziboxip,
  });

export const deleteUser = (id: string) =>
  instance.delete('/api/auth', {
    data: {
      user_id: id,
    },
  });

export const deleteTeam = (branchId: number, teamId: number) =>
  instance.delete(`/api/team/${teamId}`, {
    data: {
      branch_id: String(branchId),
    },
  });

export const deleteBranch = (id: number) => instance.delete(`api/branch/${id}`);
