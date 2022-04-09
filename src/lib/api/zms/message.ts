import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Main from 'lib/api/zms/main';
import Logger from 'utils/log';

class Message {
  /**
   * @description 자동문자 추가하기
   * @param id 지점 ID
   * @param title 제목
   * @param content 내용
   * @param startDate 시작 날짜
   * @param endDate 끝 날짜
   * @param startTime 시작 시각
   * @param endTime 끝 시각
   * @param days 요일
   */
  static async addAutoMessage(
    id: number,
    title: string,
    content: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    days: string,
  ) {
    const params = {
      branch_id: id,
      content,
      days,
      end_date: endDate,
      end_time: endTime + ':00',
      start_date: startDate,
      start_time: startTime + ':00',
      title,
    };

    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.post(
        url.zms.api.path.add_auto_message,
        params,
        {
          token,
        },
      );

      Logger.log('Add Auto Message Data', JSON.stringify(data));

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

  static async getAutoMessage(id: number, page: number, count: number) {
    const params = {
      branch_id: id,
      page,
      page_count: count,
    };

    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(
        url.zms.api.path.get_auto_message,
        params,
        {
          token,
        },
      );

      Logger.log('Get Auto Message Data', JSON.stringify(data));

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
   * @description 발송 수량 가져오기
   */
  static async getSmsCount() {
    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.get(
        url.zms.api.path.get_sms_count,
        null,
        {
          token,
        },
      );

      Logger.log('Get SMS Count Data', JSON.stringify(data));

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
   * @description 자동문자 수정하기
   * @param id 자동문자 ID
   * @param branchId 지점 ID
   * @param title 제목
   * @param content 내용
   * @param startDate 시작 날짜
   * @param endDate 끝 날짜
   * @param startTime 시작 시각
   * @param endTime 끝 시각
   * @param days 요일
   */
  static async modifyAutoMessage(
    id: number,
    branchId: number,
    title: string,
    content: string,
    startDate: string,
    endDate: string,
    startTime: string,
    endTime: string,
    days: string,
  ) {
    const params = {
      id,
      branch_id: branchId,
      content,
      days,
      end_date: endDate,
      end_time: endTime + ':00',
      start_date: startDate,
      start_time: startTime + ':00',
      title,
    };

    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.patch(
        url.zms.api.path.add_auto_message,
        params,
        {
          token,
        },
      );

      Logger.log('Modify Auto Message Data', JSON.stringify(data));

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
   * @description 발송 수량 수정하기
   * @param {number} id 지점 ID
   * @param {number} maxCountDate 일일 최대 발송 수량
   * @param {number} maxCountMonth 월 최대 발송 수량
   */
  static async modifySmsCount(
    id: number,
    maxCountDate: number,
    maxCountMonth: number,
  ) {
    const params = {
      branch_id: id,
      max_count_date: maxCountDate,
      max_count_month: maxCountMonth,
    };

    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.patch(
        url.zms.api.path.get_sms_count,
        params,
        {
          token,
        },
      );

      Logger.log('Modify SMS Count Data', JSON.stringify(data));

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
   * @description 자동문자 사용 유무 설정하기
   * @param id 자동문자 ID
   * @returns
   */
  static async removeAutoMessage(id: number) {
    const params = {
      id,
    };

    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.delete(
        url.zms.api.path.remove_auto_message,
        params,
        {
          token,
        },
      );

      Logger.log('Remove Auto Message Data', JSON.stringify(data));

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
   * @description 자동문자 사용 유무 설정하기
   * @param id 자동문자 ID
   * @param used 사용 유무 (Y/N)
   * @returns
   */
  static async setUsedAutoMessage(id: number, used: string) {
    const params = {
      id,
      use_yn: used,
    };

    try {
      const token = Main.getAccessToken();

      const { data } = await APIManager.patch(
        url.zms.api.path.set_used_auto_message,
        params,
        {
          token,
        },
      );

      Logger.log('Set Used Auto Message Data', JSON.stringify(data));

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

export default Message;
