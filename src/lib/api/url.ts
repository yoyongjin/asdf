import constants from 'utils/constants';

export default {
  zms: {
    api: {
      host: `${constants.API_SERVER}`,
      path: {
        login: '/api/auth/login',
        auto_login: '/api/auth/auto-login',
        logout: '/api/auth/logout',
        get_users: '/api/auth',
        get_organization: '/api/branch',
        get_branches: '/api/branch/all',
        get_temas: '/api/team/all',
        add_branch: '/api/branch',
        add_team: '/api/team',
        modify_branch: '/api/branch',
        modify_team: '/api/team',
        remove_branch: '/api/branch',
        remove_team: '/api/team',
      },
    },
  },
};
