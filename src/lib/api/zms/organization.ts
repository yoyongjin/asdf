import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Main from 'lib/api/zms/main';
import Logger from 'utils/log';

class Organization {
  static async getOrganization() {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(
        url.zms.api.path.get_organization,
        null,
        {
          token,
        },
      );
      Logger.log('Get Organization Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }

  static async getBranches() {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(
        url.zms.api.path.get_branches,
        null,
        {
          token,
        },
      );
      Logger.log('Get Branches Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }

  static async getTeams(id: number) {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(
        url.zms.api.path.get_temas,
        {
          branch_id: id,
        },
        {
          token,
        },
      );
      Logger.log('Get Teams Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }

  /**
   * @description 지점 추가하기
   * @param name 지점명
   * @returns
   */
  static async addBranch(name: string) {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.post(
        url.zms.api.path.add_branch,
        {
          branch_name: name,
        },
        {
          token,
        },
      );
      Logger.log('Add Branch Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }

  /**
   * @description 팀 추가하기
   * @param id 지점 ID
   * @param name 팀명
   * @returns
   */
  static async addTeam(id: number, name: string) {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.post(
        url.zms.api.path.add_team,
        {
          branch_id: id,
          team_name: name,
        },
        {
          token,
        },
      );
      Logger.log('Add Team Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }

  /**
   * @description 지점 수정하기
   * @param id 지점 ID
   * @param name 지점명
   * @returns
   */
  static async modifyBranch(id: number, name: string) {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.put(
        `${url.zms.api.path.modify_branch}/${id}`,
        {
          branch_name: name,
        },
        {
          token,
        },
      );
      Logger.log('Modify Branch Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }

  /**
   * @description 팀 수정하기
   * @param id 팀 ID
   * @param name 팀명
   * @returns
   */
  static async modifyTeam(id: number, name: string) {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.put(
        `${url.zms.api.path.modify_team}/${id}`,
        {
          team_name: name,
        },
        {
          token,
        },
      );
      Logger.log('Modify Team Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }

  /**
   * @description 지점 삭제하기
   * @param id 지점 ID
   * @returns
   */
  static async removeBranch(id: number) {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.delete(
        `${url.zms.api.path.remove_branch}/${id}`,
        null,
        {
          token,
        },
      );
      Logger.log('Remove Branch Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }

  static async removeTeam(branchId: number, teamId: number) {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.delete(
        `${url.zms.api.path.remove_team}/${teamId}`,
        {
          branch_id: branchId,
        },
        {
          token,
        },
      );
      Logger.log('Remove Team Data', JSON.stringify(data));

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

export default Organization;
