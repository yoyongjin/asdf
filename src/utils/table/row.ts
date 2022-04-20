import {
  IAutoMessageStatisticsItem,
  IMessageStatisticsItem,
} from 'types/statistics';
import Utils from 'utils/new_utils';

class TableRow {
  static getRowMessageStatistics(contents: IMessageStatisticsItem) {
    const row: Array<string> = [];

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

    row.push(date.substring(0, 10));
    row.push(branch_name);
    row.push(team_name);

    const trmCode = tmr_cd ?? '';
    row.push(trmCode);

    row.push(tmr_name);
    row.push(`${max_count_date}`);
    row.push(`${daily_cnt_message}`);
    row.push(`${daily_cnt_auto_message}`);
    row.push(`${daily_cnt_mms}`);
    row.push(`${max_count_month}`);
    row.push(`${monthly_cnt_message}`);
    row.push(`${monthly_cnt_auto_message}`);
    row.push(`${monthly_cnt_mms}`);

    return row;
  }

  static getRowAutoMessageStatistics(contents: IAutoMessageStatisticsItem) {
    const row: Array<string> = [];
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

    row.push(date.substring(0, 10));
    row.push(branch_name);
    row.push(team_name);

    const trmCode = tmr_cd ?? '';
    row.push(trmCode);

    row.push(tmr_name);
    row.push(title);

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
    row.push(conditionOfSendMessage);

    row.push(`${cnt}`);

    return row;
  }
}

export default TableRow;
