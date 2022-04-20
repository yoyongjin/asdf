import { DynamicJSON } from 'types/common';
import {
  IAutoMessageStatisticsItem,
  IMessageStatisticsItem,
} from 'types/statistics';
import Utils from 'utils/new_utils';

class Statistics {
  static getExcelMessageStatisticsItem(
    titles: Array<string>,
    contents: IMessageStatisticsItem,
  ) {
    const {
      branch_name,
      daily_cnt_auto_message,
      daily_cnt_message,
      daily_cnt_mms,
      date,
      max_count_date,
      max_count_month,
      monthly_cnt_auto_message,
      monthly_cnt_message,
      monthly_cnt_mms,
      team_name,
      tmr_cd,
      tmr_name,
    } = contents;

    const items: DynamicJSON = {};

    items[titles[0]] = date.substring(0, 10);
    items[titles[1]] = branch_name;
    items[titles[2]] = team_name;
    items[titles[3]] = tmr_name;
    items[titles[4]] = `${tmr_cd}`;
    items[titles[5]] = `${max_count_date}`;
    items[titles[6]] = `${daily_cnt_message}`;
    items[titles[7]] = `${daily_cnt_auto_message}`;
    items[titles[8]] = `${daily_cnt_mms}`;
    items[titles[9]] = `${max_count_month}`;
    items[titles[10]] = `${monthly_cnt_message}`;
    items[titles[11]] = `${monthly_cnt_auto_message}`;
    items[titles[12]] = `${monthly_cnt_mms}`;

    return items;
  }

  static getExcelAutoMessageStatisticsItem(
    titles: Array<string>,
    contents: IAutoMessageStatisticsItem,
  ) {
    const {
      branch_name,
      cnt,
      date,
      days,
      end_date,
      end_time,
      start_date,
      start_time,
      team_name,
      title,
      tmr_cd,
      tmr_name,
    } = contents;

    const items: DynamicJSON = {};

    items[titles[0]] = date.substring(0, 10);
    items[titles[1]] = branch_name;
    items[titles[2]] = team_name;

    const trmCode = tmr_cd ?? '';
    items[titles[3]] = trmCode;

    items[titles[4]] = tmr_name;
    items[titles[5]] = `${title}`;

    // 날짜
    let startYear = '';
    let startMonth = '';
    let startDay = '';
    let startDate = '';
    let endYear = '';
    let endMonth = '';
    let endDay = '';
    let endDate = '';

    if (start_date) {
      const { year, month, day } = Utils.parsingYYYYMMDD(start_date);
      startYear = year;
      startMonth = month;
      startDay = day;
      startDate = `${startYear}년 ${startMonth}월 ${startDay}일`;
    }

    if (end_date) {
      const { year, month, day } = Utils.parsingYYYYMMDD(end_date);
      endYear = year;
      endMonth = month;
      endDay = day;
      endDate = `${endYear}년 ${endMonth}월 ${endDay}일`;
    }

    const fullDate = startDate && endDate && `${startDate} ~ ${endDate}`;

    // 시간
    let startTime = '';
    let endTime = '';

    if (start_time) {
      const { hours, minutes, seconds } = Utils.parsingHHMMSS(start_time);
      startTime = `${hours}:${minutes}`;
    }

    if (end_time) {
      const { hours, minutes, seconds } = Utils.parsingHHMMSS(end_time);
      endTime = `${hours}:${minutes}`;
    }

    const fullTime = startTime && endTime && `${startTime} ~ ${endTime}`;

    // 요일
    let fullDays = '';

    if (days) {
      fullDays = Utils.parsingDays(days).join(', ');
    }

    const isExistDateAndTime = !!(fullDate && fullTime);
    const isExistTimeAndDay = !!(fullTime && fullDays);

    const conditionOfSendMessage = `[${fullDate}${
      isExistDateAndTime ? ' ' : ''
    }${fullTime}${isExistTimeAndDay ? ' ' : ''}${fullDays}]`;

    items[titles[6]] = `${conditionOfSendMessage}`;
    items[titles[7]] = `${cnt}`;

    return items;
  }
}

export default Statistics;
