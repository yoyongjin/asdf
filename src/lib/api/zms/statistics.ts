import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Logger from 'utils/log';
import Main from 'lib/api/zms/main';
import { RequestGetStatistics } from 'types/statistics';

class Statistics {
  static async getStatistics(
    startDate: string,
    endDate: string,
    searchType?: number,
    searchText?: string,
  ) {
    const token = Main.getAccessToken();

    try {
      const params: RequestGetStatistics = {
        start_date: startDate,
        end_date: endDate,
      };

      if (searchType) {
        params.search_type = searchType;
      }

      if (searchText) {
        params.search_text = searchText;
      }

      const { data } = await APIManager.get(
        url.zms.api.path.get_statistics,
        params,
        {
          token,
        },
      );
      Logger.log('Get Statistics Data', JSON.stringify(data));

      return data;
    } catch (error) {
      if (error instanceof Error) {
        const isSuccess = APIManager.isError(error);

        if (isSuccess) {
          const info = APIManager.error(error);
          Logger.log(JSON.stringify(info));

          return info;
        }

        throw error;
      }

      return false;
    }
  }
}

export default Statistics;
