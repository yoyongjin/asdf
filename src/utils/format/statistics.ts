import { DynamicJSON } from 'types/common';
import {
  IAutoMessageStatisticsItem,
  ICallStatisticsItem,
  ICustomCallStatisticeByConsultantItem,
  ICustomCallStatisticeByTeamItem,
  IMessageStatisticsItem,
} from 'types/statistics';
import Utils from 'utils/new_utils';

class Statistics {
  static getCustomCallStatisticsByConsultantItem(
    all: ICallStatisticsItem,
    incoming: ICallStatisticsItem,
    outcoming: ICallStatisticsItem,
    branchName: string,
    teamName = '',
    name = '',
    tmrCode = '',
    date = '',
  ) {
    return {
      branch_name: branchName,
      team_name: teamName,
      name,
      tmr_cd: tmrCode,
      date,
      all_total_call: all.total_call,
      all_connect_call: all.connect_call,
      all_fail_call: all.fail_call,
      all_total_time: all.total_time,
      all_ring_time: all.ring_time,
      all_talk_time: all.talk_time,
      incoming_total_call: incoming.total_call,
      incoming_connect_call: incoming.connect_call,
      incoming_fail_call: incoming.fail_call,
      incoming_total_time: incoming.total_time,
      incoming_ring_time: incoming.ring_time,
      incoming_talk_time: incoming.talk_time,
      outcoming_total_call: outcoming.total_call,
      outcoming_connect_call: outcoming.total_call,
      outcoming_fail_call: outcoming.total_call,
      outcoming_total_time: outcoming.total_call,
      outcoming_ring_time: outcoming.total_call,
      outcoming_talk_time: outcoming.total_call,
    };
  }

  static getCustomCallStatisticsByTeamItem(
    all: ICallStatisticsItem,
    incoming: ICallStatisticsItem,
    outcoming: ICallStatisticsItem,
    branchName: string,
    teamName = '',
    date = '',
  ) {
    return {
      branch_name: branchName,
      team_name: teamName,
      date,
      all_total_call: all.total_call,
      all_connect_call: all.connect_call,
      all_fail_call: all.fail_call,
      all_total_time: all.total_time,
      all_ring_time: all.ring_time,
      all_talk_time: all.talk_time,
      incoming_total_call: incoming.total_call,
      incoming_connect_call: incoming.connect_call,
      incoming_fail_call: incoming.fail_call,
      incoming_total_time: incoming.total_time,
      incoming_ring_time: incoming.ring_time,
      incoming_talk_time: incoming.talk_time,
      outcoming_total_call: outcoming.total_call,
      outcoming_connect_call: outcoming.total_call,
      outcoming_fail_call: outcoming.total_call,
      outcoming_total_time: outcoming.total_call,
      outcoming_ring_time: outcoming.total_call,
      outcoming_talk_time: outcoming.total_call,
    };
  }

  static getExcelAllCallStatisticsByConsultantItem(
    titles: Array<string>,
    contents: ICustomCallStatisticeByConsultantItem,
  ) {
    const {
      all_connect_call,
      all_fail_call,
      all_ring_time,
      all_talk_time,
      all_total_call,
      all_total_time,
      branch_name,
      date,
      name,
      team_name,
      tmr_cd,
    } = contents;

    const items: DynamicJSON = {};

    // 공통
    items[titles[0]] = branch_name;
    items[titles[1]] = team_name;
    items[titles[2]] = name;
    items[titles[3]] = tmr_cd;
    items[titles[4]] = date;

    // 전체
    items[titles[5]] = `${all_total_call}`; // 전체 시도콜
    items[titles[6]] = `${all_connect_call}`; // 전체 연결콜
    items[titles[7]] = `${all_fail_call}`; // 전체 부재콜

    let allConnectionRate = all_connect_call / all_total_call || 0;
    allConnectionRate = Utils.getDecimalNumber(allConnectionRate * 100);
    items[titles[8]] = `${allConnectionRate}%`; // 전체 연결률

    items[titles[9]] = Utils.getHourMinSecBySecond(all_total_time); // 전체 통화 시간
    items[titles[10]] = `${all_total_time}`; // 전체 통화 시간(초)

    let allAverageCallTime = all_total_time / all_total_call;
    allAverageCallTime = allAverageCallTime || 0;
    items[titles[11]] = Utils.getHourMinSecBySecond(allAverageCallTime); // 전체 평균 통화 시간

    items[titles[12]] = Utils.getHourMinSecBySecond(all_ring_time); // 전체 링 시간
    items[titles[13]] = `${all_ring_time}`; // 전체 링시간(초)
    items[titles[14]] = Utils.getHourMinSecBySecond(all_talk_time); // 전체 순수통화시간
    items[titles[15]] = `${all_talk_time}`; // 전체 순수통화시간(초)

    return items;
  }

  static getExcelIncomingCallStatisticsByConsultantItem(
    titles: Array<string>,
    contents: ICustomCallStatisticeByConsultantItem,
  ) {
    const {
      branch_name,
      date,
      incoming_connect_call,
      incoming_fail_call,
      incoming_ring_time,
      incoming_talk_time,
      incoming_total_call,
      incoming_total_time,
      name,
      team_name,
      tmr_cd,
    } = contents;

    const items: DynamicJSON = {};

    // 공통
    items[titles[0]] = branch_name;
    items[titles[1]] = team_name;
    items[titles[2]] = name;
    items[titles[3]] = tmr_cd;
    items[titles[4]] = date;

    // 수신
    items[titles[5]] = `${incoming_total_call}`; // 수신 시도콜
    items[titles[6]] = `${incoming_connect_call}`; // 수신 연결콜
    items[titles[7]] = `${incoming_fail_call}`; // 수신 부재콜

    let incomingConnectionRate =
      incoming_connect_call / incoming_total_call || 0;
    incomingConnectionRate = Utils.getDecimalNumber(
      incomingConnectionRate * 100,
    );
    items[titles[8]] = `${incomingConnectionRate}%`; // 수신 연결률

    items[titles[9]] = Utils.getHourMinSecBySecond(incoming_total_time); // 수신 통화 시간
    items[titles[10]] = `${incoming_total_time}`; // 수신 통화 시간(초)

    let incomingAverageCallTime = incoming_total_time / incoming_total_call;
    incomingAverageCallTime = incomingAverageCallTime || 0;
    items[titles[11]] = Utils.getHourMinSecBySecond(incomingAverageCallTime); // 수신 평균 통화 시간

    items[titles[12]] = Utils.getHourMinSecBySecond(incoming_ring_time); // 수신 링 시간
    items[titles[13]] = `${incoming_ring_time}`; // 수신 링시간(초)
    items[titles[14]] = Utils.getHourMinSecBySecond(incoming_talk_time); // 수신 순수통화시간
    items[titles[15]] = `${incoming_talk_time}`; // 수신 순수통화시간(초)

    return items;
  }

  static getExcelOutcomingCallStatisticsByConsultantItem(
    titles: Array<string>,
    contents: ICustomCallStatisticeByConsultantItem,
  ) {
    const {
      branch_name,
      date,
      name,
      outcoming_connect_call,
      outcoming_fail_call,
      outcoming_ring_time,
      outcoming_talk_time,
      outcoming_total_call,
      outcoming_total_time,
      team_name,
      tmr_cd,
    } = contents;

    const items: DynamicJSON = {};

    // 공통
    items[titles[0]] = branch_name;
    items[titles[1]] = team_name;
    items[titles[2]] = name;
    items[titles[3]] = tmr_cd;
    items[titles[4]] = date;

    // 발신
    items[titles[5]] = `${outcoming_total_call}`; // 발신 시도콜
    items[titles[6]] = `${outcoming_connect_call}`; // 발신 연결콜
    items[titles[7]] = `${outcoming_fail_call}`; // 발신 부재콜

    let outcomingConnectionRate =
      outcoming_connect_call / outcoming_total_call || 0;
    outcomingConnectionRate = Utils.getDecimalNumber(
      outcomingConnectionRate * 100,
    );
    items[titles[8]] = `${outcomingConnectionRate}%`; // 발신 연결률

    items[titles[9]] = Utils.getHourMinSecBySecond(outcoming_total_time); // 발신 통화 시간
    items[titles[10]] = `${outcoming_total_time}`; // 발신 통화 시간(초)

    let outcomingAverageCallTime = outcoming_total_time / outcoming_total_call;
    outcomingAverageCallTime = outcomingAverageCallTime || 0;
    items[titles[11]] = Utils.getHourMinSecBySecond(outcomingAverageCallTime); // 발신 평균 통화 시간

    items[titles[12]] = Utils.getHourMinSecBySecond(outcoming_ring_time); // 발신 링 시간
    items[titles[13]] = `${outcoming_ring_time}`; // 발신 링시간(초)
    items[titles[14]] = Utils.getHourMinSecBySecond(outcoming_talk_time); // 발신 순수통화시간
    items[titles[15]] = `${outcoming_talk_time}`; // 발신 순수통화시간(초)

    return items;
  }

  static getExcelAllCallStatisticsByTeamItem(
    titles: Array<string>,
    contents: ICustomCallStatisticeByTeamItem,
  ) {
    const {
      all_connect_call,
      all_fail_call,
      all_ring_time,
      all_talk_time,
      all_total_call,
      all_total_time,
      branch_name,
      date,
      team_name,
    } = contents;

    const items: DynamicJSON = {};

    // 공통
    items[titles[0]] = branch_name;
    items[titles[1]] = team_name;
    items[titles[2]] = date;

    // 전체
    items[titles[3]] = `${all_total_call}`; // 전체 시도콜
    items[titles[4]] = `${all_connect_call}`; // 전체 연결콜
    items[titles[5]] = `${all_fail_call}`; // 전체 부재콜

    let allConnectionRate = all_connect_call / all_total_call || 0;
    allConnectionRate = Utils.getDecimalNumber(allConnectionRate * 100);
    items[titles[6]] = `${allConnectionRate}%`; // 전체 연결률

    items[titles[7]] = Utils.getHourMinSecBySecond(all_total_time); // 전체 통화 시간
    items[titles[8]] = `${all_total_time}`; // 전체 통화 시간(초)

    let allAverageCallTime = all_total_time / all_total_call;
    allAverageCallTime = allAverageCallTime || 0;
    items[titles[9]] = Utils.getHourMinSecBySecond(allAverageCallTime); // 전체 평균 통화 시간

    items[titles[10]] = Utils.getHourMinSecBySecond(all_ring_time); // 전체 링 시간
    items[titles[11]] = `${all_ring_time}`; // 전체 링시간(초)
    items[titles[12]] = Utils.getHourMinSecBySecond(all_talk_time); // 전체 순수통화시간
    items[titles[13]] = `${all_talk_time}`; // 전체 순수통화시간(초)

    return items;
  }

  static getExcelIncomingCallStatisticsByTeamItem(
    titles: Array<string>,
    contents: ICustomCallStatisticeByTeamItem,
  ) {
    const {
      branch_name,
      date,
      incoming_connect_call,
      incoming_fail_call,
      incoming_ring_time,
      incoming_talk_time,
      incoming_total_call,
      incoming_total_time,
      team_name,
    } = contents;

    const items: DynamicJSON = {};

    // 공통
    items[titles[0]] = branch_name;
    items[titles[1]] = team_name;
    items[titles[2]] = date;

    // 수신
    items[titles[3]] = `${incoming_total_call}`; // 수신 시도콜
    items[titles[4]] = `${incoming_connect_call}`; // 수신 연결콜
    items[titles[5]] = `${incoming_fail_call}`; // 수신 부재콜

    let incomingConnectionRate =
      incoming_connect_call / incoming_total_call || 0;
    incomingConnectionRate = Utils.getDecimalNumber(
      incomingConnectionRate * 100,
    );
    items[titles[6]] = `${incomingConnectionRate}%`; // 수신 연결률

    items[titles[7]] = Utils.getHourMinSecBySecond(incoming_total_time); // 수신 통화 시간
    items[titles[8]] = `${incoming_total_time}`; // 수신 통화 시간(초)

    let incomingAverageCallTime = incoming_total_time / incoming_total_call;
    incomingAverageCallTime = incomingAverageCallTime || 0;
    items[titles[9]] = Utils.getHourMinSecBySecond(incomingAverageCallTime); // 수신 평균 통화 시간

    items[titles[10]] = Utils.getHourMinSecBySecond(incoming_ring_time); // 수신 링 시간
    items[titles[11]] = `${incoming_ring_time}`; // 수신 링시간(초)
    items[titles[12]] = Utils.getHourMinSecBySecond(incoming_talk_time); // 수신 순수통화시간
    items[titles[13]] = `${incoming_talk_time}`; // 수신 순수통화시간(초)

    return items;
  }

  static getExcelOutcomingCallStatisticsByTeamItem(
    titles: Array<string>,
    contents: ICustomCallStatisticeByTeamItem,
  ) {
    const {
      branch_name,
      date,
      outcoming_connect_call,
      outcoming_fail_call,
      outcoming_ring_time,
      outcoming_talk_time,
      outcoming_total_call,
      outcoming_total_time,
      team_name,
    } = contents;

    const items: DynamicJSON = {};

    // 공통
    items[titles[0]] = branch_name;
    items[titles[1]] = team_name;
    items[titles[2]] = date;

    // 발신
    items[titles[3]] = `${outcoming_total_call}`; // 발신 시도콜
    items[titles[4]] = `${outcoming_connect_call}`; // 발신 연결콜
    items[titles[5]] = `${outcoming_fail_call}`; // 발신 부재콜

    let outcomingConnectionRate =
      outcoming_connect_call / outcoming_total_call || 0;
    outcomingConnectionRate = Utils.getDecimalNumber(
      outcomingConnectionRate * 100,
    );
    items[titles[6]] = `${outcomingConnectionRate}%`; // 발신 연결률

    items[titles[7]] = Utils.getHourMinSecBySecond(outcoming_total_time); // 발신 통화 시간
    items[titles[8]] = `${outcoming_total_time}`; // 발신 통화 시간(초)

    let outcomingAverageCallTime = outcoming_total_time / outcoming_total_call;
    outcomingAverageCallTime = outcomingAverageCallTime || 0;
    items[titles[9]] = Utils.getHourMinSecBySecond(outcomingAverageCallTime); // 발신 평균 통화 시간

    items[titles[10]] = Utils.getHourMinSecBySecond(outcoming_ring_time); // 발신 링 시간
    items[titles[11]] = `${outcoming_ring_time}`; // 발신 링시간(초)
    items[titles[12]] = Utils.getHourMinSecBySecond(outcoming_talk_time); // 발신 순수통화시간
    items[titles[13]] = `${outcoming_talk_time}`; // 발신 순수통화시간(초)

    return items;
  }

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

    items[titles[0]] = date;
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

    items[titles[0]] = date;
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
