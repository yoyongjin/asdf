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
        add_user: '/api/auth/signup',
        modify_user: '/api/auth',
        remove_user: '/api/auth',
        reset_user_password: '/api/auth/password',
        change_user_password: '/api/auth/password',
        get_statistics: 'api/statistics',
        modify_zibox_volume: '/api/auth/zibox-vol',
        get_telecom: '/api/phone/telecom',
        get_plan: '/api/phone/plan',
        get_info: '/api/phone/info',
        get_message_count: '/api/message/sms-count',
        get_auto_message: '/api/message/auto-message',
        set_used_auto_message: '/api/message/auto-message-usage',
        remove_auto_message: '/api/message/auto-message',
        add_auto_message: '/api/message/auto-message',
        get_plural_branch: '/api/statistics_v2/branch',
        get_plural_user: '/api/statistics_v2/user',
        get_plural_team: '/api/statistics_v2/team',
        get_call_statistics_by_consultant: 'api/statistics_v2/call',
        get_call_statistics_by_team: 'api/statistics_v2/call',
        get_auto_message_statistics: 'api/statistics_v2/auto-message',
        get_message_statistics: 'api/statistics_v2/message',
        get_phone: '/api/phone/list',
        sync_branch_user: '/api/cron/sync-branch-user',
        sync_ksvc: '/api/cron/ksvc',
        sync_ip: '/api/cron/sync-vdi-ip',
        sync_phone_info: '/api/cron/sync-phone-info',
        modify_phone_info: '/api/phone',
        remove_phone_info: '/api/phone',
        get_phone_hist: '/api/phone/hist',
      },
    },
  },
};
