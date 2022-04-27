import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { StatisticsTotal, Title } from 'components/molecules';
import { Table } from 'components/organisms';
import useInputForm from 'hooks/useInputForm';
import { UserData as UserDataV2 } from 'types/user';
import { Colors } from 'utils/color';
import useStatistics from 'hooks/useStatistics';
import useAuth from 'hooks/useAuth';
import Utils from 'utils/new_utils';
import { USER_TYPE } from 'utils/constants';
import Toast from 'utils/toast';

const StyledWrapper = styled.div`
  /* Display */
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 6rem;
  width: 100%;
`;

const StyledUserListArea = styled.div`
  /* Display */
  height: calc(100% - 6rem - 66px);
  overflow-x: auto;
`;

const StyledUserList = styled.div`
  /* Position */
  padding-top: 20px;
`;

const StyledTotal = styled.div`
  padding-top: 50px;
`;

const statisticsTableTitle = [
  {
    fontColor: Colors.white,
    fontSize: 13,
    isNotShow: true,
    isWidthPercent: true,
    title: 'No.',
    width: 5,
  },
  {
    fontColor: Colors.white,
    fontSize: 13,
    isWidthPercent: true,
    title: '팀명',
    width: 15,
  },
  {
    fontColor: Colors.white,
    fontSize: 13,
    isWidthPercent: true,
    title: '법인폰 번호',
    width: 15,
  },
  {
    fontColor: Colors.white,
    fontSize: 13,
    isWidthPercent: true,
    title: 'OB 총 건수',
    width: 10,
  },
  {
    fontColor: Colors.white,
    fontSize: 13,
    isWidthPercent: true,
    title: '연결 성공',
    width: 10,
  },
  {
    fontColor: Colors.white,
    fontSize: 13,
    isWidthPercent: true,
    title: '연결률',
    width: 10,
  },
  {
    fontColor: Colors.white,
    fontSize: 13,
    isWidthPercent: true,
    title: '콜백 건수',
    width: 10,
  },
  {
    fontColor: Colors.white,
    fontSize: 13,
    isWidthPercent: true,
    title: '총 통화시간',
    width: 15,
  },
];

const tableTitles = [
  { title: 'No.', width: 5 },
  { title: '팀명', width: 15 },
  { title: '법인폰 번호', width: 15 },
  { title: 'OB 총 건수', width: 10 },
  { title: '연결 성공', width: 10 },
  { title: '연결률', width: 10 },
  { title: '콜백 건수', width: 10 },
  { title: '총 통화시간', width: 15 },
];

const searchSubjectData = [{ id: 1, data: '법인폰' }];

function StatisticsView() {
  const [search, setSearch] = useState<string>('');
  const [subject, setSubject] = useState<number>(1);
  const { loginInfo } = useAuth();
  const { form, onChangeSelect, onChangeInput, setSpecificValue } =
    useInputForm({
      start_date: Utils.getYYYYMMDD(new Date().getTime(), '-'),
      end_date: Utils.getYYYYMMDD(new Date().getTime(), '-'),
      search: '',
      subject: 1,
    });
  const { statistics, handleGetStatistics } = useStatistics();

  const selectData = useMemo(() => {
    return {
      count: 1,
      data: [searchSubjectData],
      style: [
        {
          width: 111,
          height: 25,
          borderRadius: 12.5,
          borderColor: Colors.gray7,
          fontColor: Colors.gray4,
          paddingLeft: 16,
        },
      ],
      info: [
        {
          id: form.subject,
          name: 'subject',
          click: onChangeSelect,
        },
      ],
    };
  }, [form.subject, onChangeSelect]);

  const calendarData = useMemo(() => {
    return {
      info: [
        {
          value: form.start_date,
          name: 'start_date',
          change: setSpecificValue,
        },
        {
          value: form.end_date,
          name: 'end_date',
          change: setSpecificValue,
        },
      ],
    };
  }, [form.end_date, form.start_date, setSpecificValue]);

  const onClickGetStatistics = useCallback(() => {
    const currentStart = new Date(form.start_date);
    const currentEnd = new Date(form.end_date);
    const currentStartYear = currentStart.getFullYear();
    const currentEndYear = currentEnd.getFullYear();
    const currentStartMonth = currentStart.getMonth() + 1;
    const currentEndMonth = currentEnd.getMonth() + 1;
    const currentStartDate = currentStart.getDate(); // 일
    const currentEndDate = currentEnd.getDate(); // 일

    if (currentStart > currentEnd) {
      // 시작 날짜가 끝 날짜보다 큰 경우
      Toast.warning('한달 조회만 가능합니다.🙄');
      return;
    }

    if (currentEndYear - currentStartYear > 1) {
      Toast.warning('한달 조회만 가능합니다.🙄');
      return;
    }

    if (currentEndYear - currentStartYear === 1) {
      if (currentEndMonth === 1 && currentStartMonth === 12) {
        if (currentStartDate < currentEndDate) {
          Toast.warning('한달 조회만 가능합니다.🙄');
          return;
        }
      } else {
        Toast.warning('한달 조회만 가능합니다.🙄');
        return;
      }
    }

    if (currentEndMonth - currentStartMonth === 1) {
      // 1달 차이가 날 경우
      if (currentStartDate < currentEndDate) {
        Toast.warning('한달 조회만 가능합니다.🙄');
        return;
      }
    }

    if (currentEndMonth - currentStartMonth > 1) {
      // 1달 이상 차이가 날 경우
      Toast.warning('한달 조회만 가능합니다.🙄');
      return;
    }

    currentEnd.setDate(currentEnd.getDate() + 1);

    const endDate = Utils.getYYYYMMDD(currentEnd.getTime(), '-');

    handleGetStatistics(form.start_date, endDate, subject, search);
  }, [form.end_date, form.start_date, handleGetStatistics, search, subject]);

  const syncData = useMemo(() => {
    return {
      count: 1,
      click: [onClickGetStatistics],
    };
  }, [onClickGetStatistics]);

  const onClickSearch = useCallback(() => {
    setSearch(form.search);
    setSubject(form.subject);
  }, [form.search, form.subject]);

  const searchData = useMemo(() => {
    return {
      count: 1,
      data: [form.search],
      info: [
        {
          change: onChangeInput,
          click: onClickSearch,
        },
      ],
      option: {
        placeHolder: '이름 및 전화번호',
      },
    };
  }, [form.search, onChangeInput, onClickSearch]);

  const tableContents = useMemo(() => {
    return {
      data: statistics,
      styles: {
        rowHeight: 30,
      },
      type: 'stat',
    };
  }, [statistics]);

  const totalStatistics = useMemo(() => {
    let outboundCount = 0;
    let successCount = 0;
    let successRatio = 0;
    let inboundCount = 0;
    let allCallTime = 0;

    statistics.map((values) => {
      outboundCount += values.outbound_count;
      successCount += values.success_count;
      successRatio += values.success_ratio;
      inboundCount += values.inbound_count;
      allCallTime += values.all_call_time;
    });

    return {
      outboundCount,
      successCount,
      successRatio,
      inboundCount,
      allCallTime,
      count: statistics.length,
    };
  }, [statistics]);

  const excelData = useMemo(() => {
    return {
      titles: statisticsTableTitle,
      contents: statistics,
    };
  }, [statistics]);

  useEffect(() => {
    if (form.search === '') {
      setSearch(form.search);
      setSubject(1);
      setSpecificValue('subject', 1);
    }
  }, [form.search, setSpecificValue]);

  useEffect(() => {
    if (loginInfo.id) {
      onClickGetStatistics();
    }
  }, [loginInfo.id, onClickGetStatistics]);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <Title
            calendarData={calendarData}
            isCalendar
            isExcel
            isSearch={loginInfo.admin_id !== USER_TYPE.CONSULTANT}
            // isSelect
            isSync
            rightBottomPixel={9}
            excelData={excelData}
            searchData={searchData}
            // selectData={selectData}
            syncData={syncData}
          >
            법인폰 통계
          </Title>
        </StyledTitle>
        <StyledUserListArea>
          <StyledUserList>
            <Table contents={tableContents} titles={statisticsTableTitle} />
          </StyledUserList>
          <StyledTotal>
            <StatisticsTotal
              titles={statisticsTableTitle}
              contents={totalStatistics}
            />
          </StyledTotal>
        </StyledUserListArea>
      </StyledWrapper>
    </>
  );
}

export type SetSeletedConsultantData = (consultantData: UserDataV2) => void;

export interface TableTitleData {
  title: string;
  width: number;
}

StatisticsView.defaultProps = {};

export default StatisticsView;
