import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Main from 'lib/api/zms/main';
import Logger from 'utils/log';

class User {
  static async getUsers(
    branchId: number,
    teamId: number,
    limit: number,
    page: number,
    searchName: string,
  ) {
    try {
      const token = Main.getAccessToken();

      const payload = {
        branch_id: branchId,
        team_id: teamId,
        limit,
        page,
        search_name: searchName,
      };

      const { data } = await APIManager.get(
        url.zms.api.path.get_users,
        payload,
        {
          token,
        },
      );
      Logger.log('Logout Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }
}

export default User;
