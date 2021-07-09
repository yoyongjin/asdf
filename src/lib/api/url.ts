import constants from 'utils/constants';

export default {
  zms: {
    api: {
      host: `${constants.API_SERVER}`,
      path: {
        login: '/api/auth/login',
        auto_login: '/api/auth/auto-login',
        logout: '/api/auth/logout',
        get_consultant_data: '/api/auth',
      },
    },
  },
};
