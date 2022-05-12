import { IAutoMessageItem, IMaxMessageItem } from 'types/message';
import { IPhoneItem } from 'types/phone';
import {
  IAutoMessageStatisticsItem,
  ICustomCallStatisticeByConsultantItem,
  ICustomCallStatisticeByTeamItem,
  IMessageStatisticsItem,
} from 'types/statistics';
import { UserData } from 'types/user';
import constants, {
  USED_PHONE_STATUS,
  USER_TYPE,
  ZIBOX_VERSION,
} from 'utils/constants';
import Utils from 'utils/new_utils';

class TableRow {
  static getRowCallStatisticsByConsultant(
    contents: ICustomCallStatisticeByConsultantItem,
  ) {
    const row: Array<string> = [];

    const {
      all_connect_call,
      all_fail_call,
      all_ring_time,
      all_talk_time,
      all_total_call,
      all_total_time,
      branch_name,
      date,
      incoming_connect_call,
      incoming_fail_call,
      incoming_ring_time,
      incoming_talk_time,
      incoming_total_call,
      incoming_total_time,
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

    // 공통
    row.push(branch_name); // 센터명
    row.push(team_name); // 팀명
    row.push(name); // 이름
    row.push(tmr_cd); // ID
    row.push(date); // 일시

    // 전체
    row.push(`${all_total_call}`); // 전체 시도콜
    row.push(`${all_connect_call}`); // 전체 연결콜
    row.push(`${all_fail_call}`); // 전체 부재콜

    let allConnectionRate = all_connect_call / all_total_call || 0;
    allConnectionRate = Utils.getDecimalNumber(allConnectionRate * 100);
    row.push(`${allConnectionRate}%`); // 전체 연결률

    row.push(Utils.getHourMinSecBySecond(all_total_time)); // 전체 통화 시간
    row.push(`${all_total_time}`); // 전체 통화 시간(초)

    let allAverageCallTime = all_total_time / all_total_call;
    allAverageCallTime = allAverageCallTime || 0;
    row.push(Utils.getHourMinSecBySecond(allAverageCallTime)); // 전체 평균 통화 시간

    row.push(Utils.getHourMinSecBySecond(all_ring_time)); // 전체 링 시간
    row.push(`${all_ring_time}`); // 전체 링시간(초)
    row.push(Utils.getHourMinSecBySecond(all_talk_time)); // 전체 순수통화시간
    row.push(`${all_talk_time}`); // 전체 순수통화시간(초)

    // 발신
    row.push(`${outcoming_total_call}`); // 발신 시도콜
    row.push(`${outcoming_connect_call}`); // 발신 연결콜
    row.push(`${outcoming_fail_call}`); // 발신 부재콜

    let outcomingConnectionRate =
      outcoming_connect_call / outcoming_total_call || 0;
    outcomingConnectionRate = Utils.getDecimalNumber(
      outcomingConnectionRate * 100,
    );
    row.push(`${outcomingConnectionRate}%`); // 발신 연결률

    row.push(Utils.getHourMinSecBySecond(outcoming_total_time)); // 발신 통화 시간
    row.push(`${outcoming_total_time}`); // 발신 통화 시간(초)

    let outcomingAverageCallTime = outcoming_total_time / outcoming_total_call;
    outcomingAverageCallTime = outcomingAverageCallTime || 0;
    row.push(Utils.getHourMinSecBySecond(outcomingAverageCallTime)); // 발신 평균 통화 시간

    row.push(Utils.getHourMinSecBySecond(outcoming_ring_time)); // 발신 링 시간
    row.push(`${outcoming_ring_time}`); // 발신 링시간(초)
    row.push(Utils.getHourMinSecBySecond(outcoming_talk_time)); // 발신 순수통화시간
    row.push(`${outcoming_talk_time}`); // 발신 순수통화시간(초)

    // 수신
    row.push(`${incoming_total_call}`); // 수신 시도콜
    row.push(`${incoming_connect_call}`); // 수신 연결콜
    row.push(`${incoming_fail_call}`); // 수신 부재콜

    let incomingConnectionRate =
      incoming_connect_call / incoming_total_call || 0;
    incomingConnectionRate = Utils.getDecimalNumber(
      incomingConnectionRate * 100,
    );
    row.push(`${incomingConnectionRate}%`); // 수신 연결률

    row.push(Utils.getHourMinSecBySecond(incoming_total_time)); // 수신 통화 시간
    row.push(`${incoming_total_time}`); // 수신 통화 시간(초)

    let incomingAverageCallTime = incoming_total_time / incoming_total_call;
    incomingAverageCallTime = incomingAverageCallTime || 0;
    row.push(Utils.getHourMinSecBySecond(incomingAverageCallTime)); // 수신 평균 통화 시간

    row.push(Utils.getHourMinSecBySecond(incoming_ring_time)); // 수신 링 시간
    row.push(`${incoming_ring_time}`); // 수신 링시간(초)
    row.push(Utils.getHourMinSecBySecond(incoming_talk_time)); // 수신 순수통화시간
    row.push(`${incoming_talk_time}`); // 수신 순수통화시간(초)

    return row;
  }

  static getRowCallStatisticsByTeam(contents: ICustomCallStatisticeByTeamItem) {
    const row: Array<string> = [];

    const {
      all_connect_call,
      all_fail_call,
      all_ring_time,
      all_talk_time,
      all_total_call,
      all_total_time,
      branch_name,
      date,
      incoming_connect_call,
      incoming_fail_call,
      incoming_ring_time,
      incoming_talk_time,
      incoming_total_call,
      incoming_total_time,
      outcoming_connect_call,
      outcoming_fail_call,
      outcoming_ring_time,
      outcoming_talk_time,
      outcoming_total_call,
      outcoming_total_time,
      team_name,
    } = contents;

    // 공통
    row.push(branch_name); // 센터명
    row.push(team_name); // 팀명
    row.push(date); // 일시

    // 전체
    row.push(`${all_total_call}`); // 전체 시도콜
    row.push(`${all_connect_call}`); // 전체 연결콜
    row.push(`${all_fail_call}`); // 전체 부재콜

    let allConnectionRate = all_connect_call / all_total_call || 0;
    allConnectionRate = Utils.getDecimalNumber(allConnectionRate * 100);
    row.push(`${allConnectionRate}%`); // 전체 연결률

    row.push(Utils.getHourMinSecBySecond(all_total_time)); // 전체 통화 시간
    row.push(`${all_total_time}`); // 전체 통화 시간(초)

    let allAverageCallTime = all_total_time / all_total_call;
    allAverageCallTime = allAverageCallTime || 0;
    row.push(Utils.getHourMinSecBySecond(allAverageCallTime)); // 전체 평균 통화 시간

    row.push(Utils.getHourMinSecBySecond(all_ring_time)); // 전체 링 시간
    row.push(`${all_ring_time}`); // 전체 링시간(초)
    row.push(Utils.getHourMinSecBySecond(all_talk_time)); // 전체 순수통화시간
    row.push(`${all_talk_time}`); // 전체 순수통화시간(초)

    // 발신
    row.push(`${outcoming_total_call}`); // 발신 시도콜
    row.push(`${outcoming_connect_call}`); // 발신 연결콜
    row.push(`${outcoming_fail_call}`); // 발신 부재콜

    let outcomingConnectionRate =
      outcoming_connect_call / outcoming_total_call || 0;
    outcomingConnectionRate = Utils.getDecimalNumber(
      outcomingConnectionRate * 100,
    );
    row.push(`${outcomingConnectionRate}%`); // 발신 연결률

    row.push(Utils.getHourMinSecBySecond(outcoming_total_time)); // 발신 통화 시간
    row.push(`${outcoming_total_time}`); // 발신 통화 시간(초)

    let outcomingAverageCallTime = outcoming_total_time / outcoming_total_call;
    outcomingAverageCallTime = outcomingAverageCallTime || 0;
    row.push(Utils.getHourMinSecBySecond(outcomingAverageCallTime)); // 발신 평균 통화 시간

    row.push(Utils.getHourMinSecBySecond(outcoming_ring_time)); // 발신 링 시간
    row.push(`${outcoming_ring_time}`); // 발신 링시간(초)
    row.push(Utils.getHourMinSecBySecond(outcoming_talk_time)); // 발신 순수통화시간
    row.push(`${outcoming_talk_time}`); // 발신 순수통화시간(초)

    // 수신
    row.push(`${incoming_total_call}`); // 수신 시도콜
    row.push(`${incoming_connect_call}`); // 수신 연결콜
    row.push(`${incoming_fail_call}`); // 수신 부재콜

    let incomingConnectionRate =
      incoming_connect_call / incoming_total_call || 0;
    incomingConnectionRate = Utils.getDecimalNumber(
      incomingConnectionRate * 100,
    );
    row.push(`${incomingConnectionRate}%`); // 수신 연결률

    row.push(Utils.getHourMinSecBySecond(incoming_total_time)); // 수신 통화 시간
    row.push(`${incoming_total_time}`); // 수신 통화 시간(초)

    let incomingAverageCallTime = incoming_total_time / incoming_total_call;
    incomingAverageCallTime = incomingAverageCallTime || 0;
    row.push(Utils.getHourMinSecBySecond(incomingAverageCallTime)); // 수신 평균 통화 시간

    row.push(Utils.getHourMinSecBySecond(incoming_ring_time)); // 수신 링 시간
    row.push(`${incoming_ring_time}`); // 수신 링시간(초)
    row.push(Utils.getHourMinSecBySecond(incoming_talk_time)); // 수신 순수통화시간
    row.push(`${incoming_talk_time}`); // 수신 순수통화시간(초)

    return row;
  }

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

    row.push(date);
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

    row.push(date);
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

  static getRowAutoMessage(contents: IAutoMessageItem) {
    const row: Array<string> = [];
    const {
      branch_id,
      code,
      content,
      created_at,
      days,
      end_date,
      end_time,
      id,
      priority,
      start_date,
      start_time,
      title,
      use_yn,
    } = contents;

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

    const createdAt = Utils.replace(created_at, '-', '/');
    const createdAtfullDate = Utils.getFullDate(
      new Date(createdAt).getTime(),
      false,
      '.',
      '.',
    );

    row.push(`${createdAtfullDate}${constants.PARSING_KEY}${id}`); // 등록 일시, 번호
    row.push(title); // 제목

    const fullDate = startDate && endDate && `[${startDate} ~ ${endDate}]`;

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

    const fullTime = startTime && endTime && `[${startTime} ~ ${endTime}]`;

    let fullDays = '';
    if (days) {
      fullDays = Utils.parsingDays(days).join(', ');
      fullDays = `[${fullDays}]`;
    }

    row.push(
      `${fullDate} ${fullTime} ${fullDays}${constants.PARSING_KEY}${content}`,
    ); // 발송 조건, 문자 내용
    row.push(use_yn); // 사용, 미사용

    return row;
  }

  static getRowMaxMessage(contents: IMaxMessageItem) {
    const row: Array<string> = [];
    const { branch_id, branch_name, max_count_date, max_count_month } =
      contents;

    row.push(branch_name); // 센터명
    row.push(`${max_count_date}`); // 일일 최대 발송수량
    row.push(`${max_count_month}`); // 월 최대 발송수량

    return row;
  }

  static getRowUserInfo(contents: UserData) {
    const row: Array<string> = [];

    const {
      admin_id,
      branch_name,
      name,
      number,
      pc_ip,
      team_name,
      user_name,
      zibox_ip,
      zibox_mac,
    } = contents;

    row.push(branch_name); // 센터명
    row.push(team_name); // 팀명

    let admin = '';
    if (admin_id > USER_TYPE.BRANCH_ADMIN) {
      admin = '관리자';
    } else if (admin_id === USER_TYPE.BRANCH_ADMIN) {
      admin = '센터관리자';
    } else if (admin_id === USER_TYPE.TEAM_ADMIN) {
      admin = '팀관리자';
    } else if (admin_id === USER_TYPE.CONSULTANT) {
      admin = '상담원';
    } else {
      admin = '알수없음';
    }

    row.push(admin); // 권한

    row.push(name); // 사용자명
    row.push(`${user_name ?? ''}`); // 아이디
    row.push(`${number ? Utils.formatPhoneNumber(number) : ''}`); // 전화번호
    row.push(`${pc_ip ?? ''}`); // PC IP

    if (constants.ZIBOX_VERSION === ZIBOX_VERSION.ZIBOX) {
      // ZiBox1인 경우
      row.push(`${zibox_ip ?? ''}`); // 지박스 IP
      row.push(`${zibox_mac ?? ''}`); // 지박스 MAC
    }

    return row;
  }

  static getRowPhoneInfo(contents: IPhoneItem) {
    const row: Array<string> = [];

    const {
      branch_name,
      number,
      plan,
      team_name,
      telecom,
      tmr_cd,
      tmr_name,
      updated_at,
      used,
    } = contents;

    row.push(Utils.formatPhoneNumber(number)); // 전화번호
    row.push(`${telecom ?? ''}`); // 통신사
    row.push(`${plan ?? ''}`); // 요금제

    let open = '';
    if (used === USED_PHONE_STATUS.OPEN) {
      open = '개통';
    } else if (used === USED_PHONE_STATUS.PAUSE) {
      open = '일시정지';
    } else if (used === USED_PHONE_STATUS.TERMINATION) {
      open = '해지';
    } else {
      open = '알수없음';
    }
    row.push(open); // 개통상태

    row.push(`${branch_name ?? ''}`); // 센터명
    row.push(`${team_name ?? ''}`); // 팀명
    row.push(`${tmr_name ?? ''}`); // 상담원명
    row.push(`${tmr_cd ?? ''}`); // 상담원 코드
    row.push(updated_at); // 변경 일시

    return row;
  }
}

export default TableRow;
