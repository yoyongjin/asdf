import APIManager from 'lib/api/manager';
import url from 'lib/api/url';
import Main from 'lib/api/zms/main';
import Logger from 'utils/log';

class Message {
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
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
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
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
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
      if (error.response?.data) {
        Logger.log(JSON.stringify(error.response.data));

        return error.response.data;
      }

      throw new Error(error);
    }
  }
}

export default Message;
