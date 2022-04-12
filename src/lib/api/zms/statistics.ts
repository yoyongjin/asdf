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

  /**
   * @description 상담원별 통화 통계 가져오기
   * @param ids 상담원 id 여러개
   * @param breakUp 해촉 여부
   * @param startDate 시작 날짜
   * @param endDate 끝 날짜
   * @param startTime 시작 시간
   * @param endTime 끝 시간
   * @param searchType 통게 기준
   * @param page 페이지
   * @param limit 수
   */
  static async getCallStatisticsByConsultant(
    ids: string,
    breakUp: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    searchType: number,
    page: number,
    limit: number,
  ) {
    const token = Main.getAccessToken();

    try {
      const params = {
        ids,
        include_leaver: breakUp,
        start_date: startDate,
        end_date: endDate,
        start_time: startTime,
        end_time: endTime,
        search_type: searchType,
        page,
        page_count: limit,
      };

      const { data } = await APIManager.get(
        url.zms.api.path.get_call_statistics_by_consultant,
        params,
        {
          token,
        },
      );
      Logger.log(
        'Get Call Statistics By Consultant Data',
        JSON.stringify(data),
      );

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
