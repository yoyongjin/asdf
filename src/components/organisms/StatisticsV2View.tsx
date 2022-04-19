import _ from 'lodash';
import React, { useMemo, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { TablePagination, TitleV2 } from 'components/molecules';
import { IProperty as ITableProperty } from 'components/molecules/TableProperty';
import { Table } from 'components/organisms';
import useAuth from 'hooks/useAuth';
import useDatePicker from 'hooks/useDatePicker';
import useInputForm from 'hooks/useInputForm';
import useMultiSelect from 'hooks/useMultiSelect';
import useOrganization from 'hooks/useOrganization';
import usePage from 'hooks/usePage';
import useStatistics from 'hooks/useStatistics';
import useTab from 'hooks/useTab';
import useUser from 'hooks/useUser';
import { Colors } from 'utils/color';
import Utils from 'utils/new_utils';

const callStatisticsByConsultantTableTitles = [
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '센터',
    width: 140,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '팀(상담조직)',
    width: 143,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '상담사 명',
    width: 81,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '상담사 ID',
    width: 109,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '일시',
    width: 119,
  },
  {
    backgroundColor: Colors.blue8,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '전체',
    width: 727,
  },
  {
    backgroundColor: Colors.yellow1,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '발신',
    width: 727,
  },
  {
    backgroundColor: Colors.red1,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '수신',
    width: 727,
  },
];

const callStatisticsByTeamTableTitles = [
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '센터',
    width: 140,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '팀(상담조직)',
    width: 143,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '일시',
    width: 119,
  },
  {
    backgroundColor: Colors.blue8,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '전체',
    width: 727,
  },
  {
    backgroundColor: Colors.yellow1,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '발신',
    width: 727,
  },
  {
    backgroundColor: Colors.red1,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '수신',
    width: 727,
  },
];

const smsStatisticsTableTitles = [
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '일자',
    width: 10,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '센터',
    width: 15,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '팀',
    width: 15,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: 'TMR 코드',
    width: 15,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: 'TMR 명',
    width: 5,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '일 최대발송수량',
    width: 5,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '일 총사용량',
    width: 5,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '일 자동문자',
    width: 5,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '일 MMS',
    width: 5,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '당월 최대발송수량',
    width: 5,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '당월 총사용량',
    width: 5,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '당월 자동문자',
    width: 5,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '당월 MMS',
    width: 5,
  },
];

const notificationStatisticsTableTitles = [
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '일자',
    width: 5,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '센터',
    width: 10,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '팀',
    width: 10,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: 'TMR 코드',
    width: 10,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: 'TMR 명',
    width: 5,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '제목',
    width: 20,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '발송 조건',
    width: 25,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '발송 건수',
    width: 5,
  },
];

const dependencyCallStatisticsTitles = [
  [
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '시도콜',
      width: 47,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결콜',
      width: 47,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '부재콜',
      width: 47,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결률(%)',
      width: 63,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간',
      width: 57,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '평균통화시간',
      width: 79,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간',
      width: 57,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간',
      width: 81,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간(초)',
      width: 99,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '시도콜',
      width: 47,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결콜',
      width: 47,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '부재콜',
      width: 47,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결률(%)',
      width: 63,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간',
      width: 57,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '평균통화시간',
      width: 79,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간',
      width: 57,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간',
      width: 81,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간(초)',
      width: 100,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '시도콜',
      width: 47,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결콜',
      width: 47,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '부재콜',
      width: 47,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결률(%)',
      width: 63,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간',
      width: 57,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '평균통화시간',
      width: 79,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간',
      width: 57,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간',
      width: 81,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간(초)',
      width: 100,
    },
  ],
];

const tabTitle = [
  {
    name: '상담원별 통화 통계',
  },
  {
    name: '팀별 통화 통계',
  },
  {
    name: '문자 통계',
  },
  {
    name: '자동 문자 통계',
  },
];

const selectBoxConditionOption = [
  {
    id: 1,
    data: '일별',
  },
  {
    id: 2,
    data: '월별',
  },
  {
    id: 3,
    data: '시간별',
  },
  {
    id: 4,
    data: '30분',
  },
  {
    id: 5,
    data: '15분',
  },
  {
    id: 6,
    data: '일+시간',
  },
];

const selectBoxHoursOption = [...new Array(24)].map((values, index) => {
  return {
    id: index,
    data: `${Utils.pad(String(index))}`,
  };
});

const selectBoxMinutesOption = [...new Array(4)].map((values, index) => {
  return {
    id: 15 * index,
    data: `${Utils.pad(String(15 * index))}`,
  };
});

const selectBoxPageLimitOption = [...new Array(3)].map((values, index) => {
  return {
    id: 25 * (index + 2),
    data: `${Utils.pad(String(25 * (index + 2)))}`,
  };
});

const dayOfWeekTimestamp = 518400000;

const StyledWrapper = styled.div`
  height: 100%;
`;

const StyledTitle = styled.div`
  height: 4.275rem;
  width: 100%;
`;

const StyledContent = styled.div`
  height: calc(100% - 8.5rem - 100px);
  overflow: auto;
`;

const StyledFooter = styled.div`
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
`;

let prevPage = 1;
let callByTeamPrevPage = 1;
let autoMessagePrevPage = 1;
let meessagePrevPage = 1;

function StatisticsV2View() {
  const { loginInfo } = useAuth();
  const { form, onChangeCheckBox, onChangeSelect } = useInputForm({
    break_up: false, // 해촉여부
    search_type: 1, // 조회 조건
    start_hour: 0, // 시작 시
    start_minute: 0, // 시작 분
    end_hour: 0, // 끝 시
    end_minute: 0, // 끝 분
    limit: 100, // 페이징 개수
  });
  const {
    datePicker: startDatePicker,
    onChangeDatePicker: onChangeStartDatePicker,
  } = useDatePicker(new Date());
  const {
    onChangeDatePicker: onChangeEndDatePicker,
    datePicker: endDatePicker,
  } = useDatePicker(new Date());
  const { onChangeSelectedTabIndex, selectedTabIndex } = useTab();
  const {
    getPluralBranch,
    getPluralTeam,
    pluralBranch,
    pluralTeam,
    setInitializePluralTeam,
  } = useOrganization();
  const {
    getPluralConsultant,
    pluralConsultant,
    setInitializePluralConsultant,
  } = useUser();
  const {
    handleSelectedOption: handlePluralBranchSelectedOption,
    selectedOption: pluralBranchSelectedOption,
  } = useMultiSelect();
  const {
    handleSelectedOption: handlePluralTeamSelectedOption,
    selectedOption: pluralTeamSelectedOption,
  } = useMultiSelect();
  const {
    handleSelectedOption: handlePluralConsultantSelectedOption,
    selectedOption: pluralConsultantSelectedOption,
  } = useMultiSelect();
  const {
    callStatisticsByConsultantData,
    handleGetCallStatisticsByConsultant,
    autoMessageStatisticsData,
    messageStatisticsData,
    handleGetAutoMessageStatistics,
    handleInitializeCallStatisticsByConsultant,
    handleInitializeMessageStatistics,
    handleInitializeAutoMessageStatistics,
    handleGetMessageStatistics,
    handleGetCallStatisticsByTeam,
    callStatisticsByTeamData,
  } = useStatistics();
  const {
    maxCallStatisticsByConsultant,
    page,
    onClickNextPage,
    onClickPrevPage,
  } = usePage();
  const {
    maxAutoMessageStatistics,
    page: autoMessageStatisticsPage,
    onClickNextPage: onClickNextPageAutoMessage,
    onClickPrevPage: onClickPrevPageAutoMessage,
  } = usePage();
  const {
    maxMessageStatistics,
    page: messageStatisticsPage,
    onClickNextPage: onClickNextPageMessage,
    onClickPrevPage: onClickPrevPageMessage,
  } = usePage();
  const {
    maxCallStatisticsByTeam,
    page: callStatisticsByTeamPage,
    onClickNextPage: onClickNextPageCallStatisticsByTeam,
    onClickPrevPage: onClickPrevPageCallStatisticsByTeam,
  } = usePage();

  const pluralBranchOption = useMemo(() => {
    return pluralBranch.map((values) => {
      return {
        value: values.id,
        label: values.branch_name,
      };
    });
  }, [pluralBranch]);

  const pluralTeamOption = useMemo(() => {
    return pluralTeam.map((values) => {
      return {
        value: values.id,
        label: values.team_name,
      };
    });
  }, [pluralTeam]);

  const pluralConsultantOption = useMemo(() => {
    return pluralConsultant.map((values) => {
      return {
        value: values.id,
        label: values.name,
      };
    });
  }, [pluralConsultant]);

  const borderItem = useMemo(() => {
    return {
      borderTop: {
        color: Colors.blue4,
        style: 'solid',
        width: 2,
      },
      borderBottom: {
        color: Colors.navy2,
        style: 'solid',
        width: 1.5,
      },
    };
  }, []);

  const isValidateStatistics = useCallback(
    (
      ids: string,
      startDate: string,
      endDate: string,
      startTime?: string,
      endTime?: string,
    ) => {
      if (ids.length < 1) {
        // 선택된 팀/상담원이 없을 경우

        return {
          status: false,
          message: `${
            selectedTabIndex === 1 ? '팀' : '상담원'
          }을 선택해주세요.`,
        };
      }

      if (startDate > endDate) {
        // 시작날짜가 끝날짜보다 큰 경우

        return {
          status: false,
          message: '날짜 조건을 확인해주세요.',
        };
      }

      if (
        new Date(endDate).getTime() - new Date(startDate).getTime() >
        dayOfWeekTimestamp
      ) {
        // 기간이 7일 이상일 경우

        return {
          status: false,
          message: '날짜는 7일 이상 선택할 수 없습니다.',
        };
      }

      if (startTime && endTime && startTime > endTime) {
        // 시작시간이 끝시간보다 큰 경우

        return {
          status: false,
          message: '시간 조건을 확인해주세요.',
        };
      }

      return {
        status: true,
        message: '',
      };
    },
    [selectedTabIndex],
  );

  const getTitleParams = useMemo(() => {
    let ids = '';

    if (selectedTabIndex === 1) {
      ids = pluralTeamSelectedOption.map((team) => team.value).join(','); // 팀 여러개 선택
    } else {
      ids = pluralConsultantSelectedOption
        .map((consultant) => consultant.value)
        .join(','); // 상담원 여러명 선택
    }

    const breakUp = form.break_up ? '1' : '0'; // 1: 해촉 포함 0: 해촉 미포함
    let startDate = '';
    let endDate = '';
    const startTime =
      Utils.pad(String(form.start_hour)) +
      ':' +
      Utils.pad(String(form.start_minute));
    const endTime =
      Utils.pad(String(form.end_hour)) +
      ':' +
      Utils.pad(String(form.end_minute));
    const searchType = form.search_type;
    const limit = form.limit;

    if (startDatePicker && endDatePicker) {
      startDate = Utils.getYYYYMMDD(startDatePicker.getTime(), '-');
      endDate = Utils.getYYYYMMDD(endDatePicker.getTime(), '-');
    }

    return {
      ids,
      breakUp,
      startDate,
      endDate,
      startTime,
      endTime,
      searchType,
      limit,
    };
  }, [
    endDatePicker,
    form.break_up,
    form.end_hour,
    form.end_minute,
    form.limit,
    form.search_type,
    form.start_hour,
    form.start_minute,
    pluralConsultantSelectedOption,
    pluralTeamSelectedOption,
    selectedTabIndex,
    startDatePicker,
  ]);

  const getCallStatisticeByConsultant = useCallback(
    (isAlert = true) => {
      const {
        ids,
        breakUp,
        startDate,
        endDate,
        startTime,
        endTime,
        searchType,
        limit,
      } = getTitleParams;

      const { status, message } = isValidateStatistics(
        ids,
        startDate,
        endDate,
        startTime,
        endTime,
      );

      if (!status) {
        if (isAlert) {
          alert(message);
        }
        return;
      }

      handleGetCallStatisticsByConsultant(
        ids,
        breakUp,
        startDate,
        endDate,
        startTime,
        endTime,
        searchType,
        page,
        limit,
      );
    },
    [
      getTitleParams,
      handleGetCallStatisticsByConsultant,
      isValidateStatistics,
      page,
    ],
  );

  const getCallStatisticeByTeam = useCallback(
    (isAlert = true) => {
      const {
        ids,
        breakUp,
        startDate,
        endDate,
        startTime,
        endTime,
        searchType,
        limit,
      } = getTitleParams;

      const { status, message } = isValidateStatistics(
        ids,
        startDate,
        endDate,
        startTime,
        endTime,
      );

      if (!status) {
        if (isAlert) {
          alert(message);
        }
        return;
      }

      handleGetCallStatisticsByTeam(
        ids,
        breakUp,
        startDate,
        endDate,
        startTime,
        endTime,
        searchType,
        page,
        limit,
      );
    },
    [getTitleParams, handleGetCallStatisticsByTeam, isValidateStatistics, page],
  );

  const getAutoMessageStatistice = useCallback(
    (isAlert = true) => {
      const { ids, breakUp, startDate, endDate, limit } = getTitleParams;

      const { status, message } = isValidateStatistics(ids, startDate, endDate);

      if (!status) {
        if (isAlert) {
          alert(message);
        }
        return;
      }

      handleGetAutoMessageStatistics(
        ids,
        breakUp,
        startDate,
        endDate,
        page,
        limit,
      );
    },
    [getTitleParams, handleGetAutoMessageStatistics, page],
  );

  const getMessageStatistice = useCallback(
    (isAlert = true) => {
      const { ids, breakUp, startDate, endDate, limit } = getTitleParams;

      const { status, message } = isValidateStatistics(ids, startDate, endDate);

      if (!status) {
        if (isAlert) {
          alert(message);
        }
        return;
      }

      handleGetMessageStatistics(ids, breakUp, startDate, endDate, page, limit);
    },
    [getTitleParams, handleGetMessageStatistics, page],
  );

  /**
   * @description 타이틀에 들어갈 버튼 정보들
   */
  const buttonData = useMemo(() => {
    const buttonConfig1 = {
      type: 'button',
      data: {
        text: '엑셀파일 다운로드',
      },
      styles: {
        backgroundColor: Colors.white,
        borderColor: Colors.gray14,
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        fontColor: Colors.gray13,
        fontSize: 12,
        fontWeight: 800,
        height: 2.8,
        width: 12.4,
      },
    };

    let onClick: any;
    if (selectedTabIndex === 0) {
      onClick = getCallStatisticeByConsultant;
    } else if (selectedTabIndex === 1) {
      onClick = getCallStatisticeByTeam;
    } else if (selectedTabIndex === 2) {
      onClick = getMessageStatistice;
    } else if (selectedTabIndex === 3) {
      onClick = getAutoMessageStatistice;
    }

    const buttonConfig2 = {
      type: 'button',
      data: {
        text: '조회',
        onClick,
      },
      styles: {
        backgroundColor: Colors.blue4,
        borderRadius: 8,
        fontColor: Colors.white,
        fontSize: 12,
        fontWeight: 800,
        height: 2.8,
        width: 6.4,
      },
    };

    return [buttonConfig1, buttonConfig2];
  }, [
    getAutoMessageStatistice,
    getCallStatisticeByConsultant,
    getCallStatisticeByTeam,
    getMessageStatistice,
    selectedTabIndex,
  ]);

  /**
   * @description 타이틀에 들어갈 date picker 정보들
   */
  const dateRangePickerData = useMemo(() => {
    const dateRangePickerConfig1 = {
      type: 'date-range-picker',
      data: {
        format: 'yyyy년 MM월 dd일',
        endSelectedDate: endDatePicker,
        endOnChange: onChangeEndDatePicker,
        startOnChange: onChangeStartDatePicker,
        startSelectedDate: startDatePicker,
      },
      styles: {
        borderStyle: 'solid',
        height: 2.8,
        width: 11.9,
      },
    };

    return [dateRangePickerConfig1];
  }, [
    endDatePicker,
    onChangeEndDatePicker,
    onChangeStartDatePicker,
    startDatePicker,
  ]);

  /**
   * @description 타이틀에 들어갈 multi selectbox 정보들
   */
  const multiSelectData = useMemo(() => {
    const multiSelectConfig1 = {
      type: 'multi-select',
      data: {
        onChange: handlePluralBranchSelectedOption,
        options: pluralBranchOption,
        selectedOptions: pluralBranchSelectedOption,
        textChoice: '개 센터',
      },
    };

    const multiSelectConfig2 = {
      type: 'multi-select',
      data: {
        onChange: handlePluralTeamSelectedOption,
        options: pluralTeamOption,
        selectedOptions: pluralTeamSelectedOption,
        textChoice: '개 팀',
      },
    };

    const multiSelectConfig3 = {
      type: 'multi-select',
      data: {
        onChange: handlePluralConsultantSelectedOption,
        options: pluralConsultantOption,
        selectedOptions: pluralConsultantSelectedOption,
        textChoice: '명',
      },
    };

    return [multiSelectConfig1, multiSelectConfig2, multiSelectConfig3];
  }, [
    handlePluralBranchSelectedOption,
    handlePluralConsultantSelectedOption,
    handlePluralTeamSelectedOption,
    pluralBranchOption,
    pluralBranchSelectedOption,
    pluralConsultantOption,
    pluralConsultantSelectedOption,
    pluralTeamOption,
    pluralTeamSelectedOption,
  ]);

  /**
   * @description 타이틀에 들어갈 selectbox 정보들
   */
  const selectData = useMemo(() => {
    const selectConfig1 = {
      type: 'select',
      data: {
        name: 'start_hour',
        onChange: onChangeSelect,
        options: selectBoxHoursOption,
        value: form.start_hour,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
        width: 50,
      },
    }; // 시작 시 관련 정보

    const selectConfig2 = {
      type: 'select',
      data: {
        name: 'start_minute',
        onChange: onChangeSelect,
        options: selectBoxMinutesOption,
        value: form.start_minute,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
        width: 50,
      },
    }; // 시작 분 관련 정보

    const selectConfig3 = {
      type: 'select',
      data: {
        name: 'end_hour',
        onChange: onChangeSelect,
        options: selectBoxHoursOption,
        value: form.end_hour,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
        width: 50,
      },
    }; // 끝 시 관련 정보

    const selectConfig4 = {
      type: 'select',
      data: {
        name: 'end_minute',
        onChange: onChangeSelect,
        options: selectBoxMinutesOption,
        value: form.end_minute,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
        width: 50,
      },
    }; // 끝 분 관련 정보

    const selectConfig5 = {
      type: 'select',
      data: {
        name: 'search_type',
        onChange: onChangeSelect,
        options: selectBoxConditionOption,
        value: form.search_type,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
      },
    }; // 조회 조건 관련 정보

    const selectConfig6 = {
      type: 'select',
      data: {
        name: 'limit',
        onChange: onChangeSelect,
        options: selectBoxPageLimitOption,
        value: form.limit,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
      },
    }; // 페이지 개수

    return [
      selectConfig1,
      selectConfig2,
      selectConfig3,
      selectConfig4,
      selectConfig5,
      selectConfig6,
    ];
  }, [
    form.end_hour,
    form.end_minute,
    form.limit,
    form.search_type,
    form.start_hour,
    form.start_minute,
    onChangeSelect,
  ]);

  /**
   * @description 타이틀에 들어갈 tab 정보들
   */
  const tabData = useMemo(() => {
    const tabConfig = {
      type: 'tab',
      data: {
        onclick: onChangeSelectedTabIndex,
        selected: selectedTabIndex,
        tabs: tabTitle,
      },
    };

    return [tabConfig];
  }, [onChangeSelectedTabIndex, selectedTabIndex]);

  /**
   * @description 타이틀에 들어갈 text 정보들
   */
  const textData = useMemo(() => {
    const textConfig = {
      type: 'text',
      data: {
        text: '~',
      },
      styles: {
        fontColor: Colors.navy2,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        fontWeight: 800,
      },
    };

    return [textConfig];
  }, []);

  /**
   * @description 타이틀에 들어갈 text + checkbox 정보들
   */
  const textCheckBoxData = useMemo(() => {
    const textCheckBoxConfig = {
      type: 'text-checkbox',
      data: {
        isChecked: form.break_up,
        isReverse: true,
        name: 'break_up',
        onChange: onChangeCheckBox,
        text: '해촉 포함',
      },
      styles: {
        fontColor: Colors.navy2,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        fontWeight: 800,
      },
    };

    return [textCheckBoxConfig];
  }, [form.break_up, onChangeCheckBox]);

  /**
   * @description 타이틀 왼쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getRenderLeft = useCallback(
    (type: number) => {
      if (type === 1) {
        const renderData = [];

        renderData.push(...tabData);

        return {
          renderConfig: renderData,
        };
      } else if (type === 2) {
        const renderData = [];
        const renderStyle = [];

        const [multiSelectConfig1, multiSelectConfig2, multiSelectConfig3] =
          multiSelectData;

        const [buttonConfig1, ...buttonConfig] = buttonData;

        const [
          selectConfig1,
          selectConfig2,
          selectConfig3,
          selectConfig4,
          selectConfig5,
          selectConfig6,
        ] = selectData;

        if (selectedTabIndex === 0) {
          // 상담원별 통화 통계
          renderData.push(...multiSelectData); // 조직 / 팀 / 상담원 선택
          renderData.push(...textCheckBoxData); // 해촉 여부
          renderData.push(...dateRangePickerData); // 날짜 선택
          renderData.push(selectConfig1, selectConfig2); // 시작 시간 선택
          renderData.push(...textData); // 물결 텍스트
          renderData.push(
            selectConfig3,
            selectConfig4,
            selectConfig5,
            selectConfig6,
          ); // 끝 시간 선택, 조회 조건 선택, 조회 개수
          renderData.push(...buttonConfig); // 조회 버튼

          for (let i = 0; i < renderData.length; i++) {
            const defaultRenderStyle = {
              paddingRight: 0,
            };

            if (i === 0 || i === 1) {
              defaultRenderStyle.paddingRight = 4;
            }

            if (i === 2) {
              defaultRenderStyle.paddingRight = 12;
            }

            if (i === 3 || i === 4 || i === 9 || i === 10 || i === 11) {
              defaultRenderStyle.paddingRight = 20;
            }

            if (i === 5 || i === 6 || i === 7 || i === 8) {
              defaultRenderStyle.paddingRight = 10;
            }

            renderStyle.push(defaultRenderStyle);
          }
        } else if (selectedTabIndex === 1) {
          // 팀별 통화 통계
          renderData.push(multiSelectConfig1, multiSelectConfig2); // 조직 / 팀 / 상담원 선택
          renderData.push(...textCheckBoxData); // 해촉 여부
          renderData.push(...dateRangePickerData); // 날짜 선택
          renderData.push(selectConfig1, selectConfig2); // 시작 시간 선택
          renderData.push(...textData); // 물결 텍스트
          renderData.push(
            selectConfig3,
            selectConfig4,
            selectConfig5,
            selectConfig6,
          ); // 끝 시간 선택, 조회 조건 선택, 조회 개수
          renderData.push(...buttonConfig); // 조회 버튼

          for (let i = 0; i < renderData.length; i++) {
            const defaultRenderStyle = {
              paddingRight: 0,
            };

            if (i === 0) {
              defaultRenderStyle.paddingRight = 4;
            }

            if (i === 1) {
              defaultRenderStyle.paddingRight = 12;
            }

            if (i === 2 || i === 3 || i === 8 || i === 9 || i === 10) {
              defaultRenderStyle.paddingRight = 20;
            }

            if (i === 4 || i === 5 || i === 6 || i === 7) {
              defaultRenderStyle.paddingRight = 10;
            }

            renderStyle.push(defaultRenderStyle);
          }
        } else {
          // 문자 통계 / 자동문자 통계
          renderData.push(...multiSelectData); // 조직 / 팀 / 상담원 선택
          renderData.push(...textCheckBoxData); // 해촉 여부
          renderData.push(...dateRangePickerData); // 날짜 선택
          renderData.push(selectConfig6); // 조회 개수
          renderData.push(...buttonConfig); // 조회 버튼

          for (let i = 0; i < renderData.length; i++) {
            const defaultRenderStyle = {
              paddingRight: 0,
            };

            if (i === 0 || i === 1) {
              defaultRenderStyle.paddingRight = 4;
            }

            if (i === 2 || i === 4) {
              defaultRenderStyle.paddingRight = 12;
            }

            if (i === 3 || i === 5) {
              defaultRenderStyle.paddingRight = 20;
            }

            renderStyle.push(defaultRenderStyle);
          }
        }

        return {
          renderConfig: renderData,
          renderStyle: renderStyle,
        };
      }
    },
    [
      buttonData,
      dateRangePickerData,
      multiSelectData,
      selectData,
      selectedTabIndex,
      tabData,
      textCheckBoxData,
      textData,
    ],
  );

  /**
   * @description 타이틀 오른쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getRenderRight = useCallback(
    (type: number) => {
      if (type === 1) {
        const renderData = [];

        const [buttonConfig1] = buttonData;

        renderData.push(buttonConfig1);

        return {
          renderConfig: renderData,
        };
      }
    },
    [buttonData],
  );

  /**
   * @description 타이틀 style 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleStyle = useCallback((type: number) => {
    if (type === 1) {
      return {
        borderBottomStyle: 'none',
        borderBottomWidth: 0,
        rightMarginTop: 10,
      };
    } else if (type === 2) {
      return {
        borderBottomStyle: 'none',
        borderBottomWidth: 0,
        leftMarginTop: 7,
      };
    }
  }, []);

  /**
   * @description 문자 통계 테이블 상세 내용 정보들
   */
  const tablePropertyMessageStatistics = useMemo(() => {
    return messageStatisticsData.map((values) => {
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
      } = values;

      row.push(date.substring(0, 10));
      row.push(branch_name);
      row.push(team_name);
      row.push(tmr_cd ?? '');
      row.push(tmr_name);
      row.push(`${max_count_date}`);
      row.push(`${daily_cnt_message}`);
      row.push(`${daily_cnt_auto_message}`);
      row.push(`${daily_cnt_mms}`);
      row.push(`${max_count_month}`);
      row.push(`${monthly_cnt_message}`);
      row.push(`${monthly_cnt_auto_message}`);
      row.push(`${monthly_cnt_mms}`);

      const messageStatisticsItems: Array<ITableProperty> = row.map(
        (value, index) => {
          return {
            data: {
              text: value,
            },
            styles: {
              fontSize: 12,
            },
            type: 'text',
            propertyStyles: {
              textAlign: 'center',
            },
          };
        },
      );

      return messageStatisticsItems;
    });
  }, [messageStatisticsData]);

  /**
   * @description 문자 통계 테이블 내용 정보들
   */
  const tableContentMessageStatistics = useMemo(() => {
    return {
      data: tablePropertyMessageStatistics,
      originData: autoMessageStatisticsData,
      styles: {
        rowHeight: 35,
      },
      type: 'message-statistics',
    };
  }, [autoMessageStatisticsData, tablePropertyMessageStatistics]);

  /**
   * @description 자동 문자 통계 테이블 상세 내용 정보들
   */
  const tablePropertyAutoMessageStatistics = useMemo(() => {
    return autoMessageStatisticsData.map((values) => {
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
      } = values;

      row.push(date.substring(0, 10));
      row.push(branch_name);
      row.push(team_name);
      row.push(tmr_cd ?? '');
      row.push(tmr_name);
      row.push(title);

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

      let fullDays = '';
      if (days) {
        fullDays = Utils.parsingDays(days).join(', ');
      }

      const conditionOfSendMessage = `[${fullDate}${
        fullDate && fullTime ? ' ' : ''
      }${fullTime}${fullTime && fullDays ? ' ' : ''}${fullDays}]`;

      row.push(conditionOfSendMessage);
      row.push(`${cnt}`);

      const autoMessageStatisticsItems: Array<ITableProperty> = row.map(
        (value, index) => {
          return {
            data: {
              text: value,
            },
            styles: {
              fontSize: 12,
            },
            type: 'text',
            propertyStyles: {
              paddingLeft: 10, // 처음 요소만 padding left 적용
            },
          };
        },
      );

      return autoMessageStatisticsItems;
    });
  }, [autoMessageStatisticsData]);

  /**
   * @description 상담원별 통화 통계 테이블 내용 정보들
   */
  const tableContentAutoMessageStatistics = useMemo(() => {
    return {
      data: tablePropertyAutoMessageStatistics,
      originData: autoMessageStatisticsData,
      styles: {
        rowHeight: 35,
      },
      type: 'auto-message-statistics',
    };
  }, [autoMessageStatisticsData, tablePropertyAutoMessageStatistics]);

  /**
   * @description 상담원별 통화 통계 테이블 상세 내용 정보들
   */
  const tablePropertyCallStatisticsByConsultant = useMemo(() => {
    return callStatisticsByConsultantData.map((values) => {
      const row: Array<string> = [];

      // 공통
      row.push(values.branch_name); // 센터명
      row.push(values.team_name); // 팀명
      row.push(values.name); // 이름
      row.push(values.tmr_cd); // ID
      row.push(values.date); // 일시

      // 전체
      row.push(`${values.all_total_call}`); // 전체 시도콜
      row.push(`${values.all_connect_call}`); // 전체 연결콜
      row.push(`${values.all_fail_call}`); // 전체 부재콜
      let allConnectionRate =
        values.all_connect_call / values.all_total_call || 0;
      allConnectionRate = Utils.getDecimalNumber(allConnectionRate * 100);
      row.push(`${allConnectionRate}%`); // 전체 연결률
      row.push(Utils.getHourMinSecBySecond(values.all_total_time)); // 전체 통화 시간
      row.push(`${values.all_total_time}`); // 전체 통화 시간(초)
      let allAverageCallTime = values.all_total_time / values.all_total_call;
      allAverageCallTime = allAverageCallTime || 0;
      row.push(Utils.getHourMinSecBySecond(allAverageCallTime)); // 전체 평균 통화 시간
      row.push(Utils.getHourMinSecBySecond(values.all_ring_time)); // 전체 링 시간
      row.push(`${values.all_ring_time}`); // 전체 링시간(초)
      row.push(Utils.getHourMinSecBySecond(values.all_talk_time)); // 전체 순수통화시간
      row.push(`${values.all_talk_time}`); // 전체 순수통화시간(초)

      // 발신
      row.push(`${values.outcoming_total_call}`); // 발신 시도콜
      row.push(`${values.outcoming_connect_call}`); // 발신 연결콜
      row.push(`${values.outcoming_fail_call}`); // 발신 부재콜
      let outcomingConnectionRate =
        values.outcoming_connect_call / values.outcoming_total_call || 0;
      outcomingConnectionRate = Utils.getDecimalNumber(
        outcomingConnectionRate * 100,
      );
      row.push(`${outcomingConnectionRate}%`); // 발신 연결률
      row.push(Utils.getHourMinSecBySecond(values.outcoming_total_time)); // 발신 통화 시간
      row.push(`${values.outcoming_total_time}`); // 발신 통화 시간(초)
      let outcomingAverageCallTime =
        values.outcoming_total_time / values.outcoming_total_call;
      outcomingAverageCallTime = outcomingAverageCallTime || 0;
      row.push(Utils.getHourMinSecBySecond(outcomingAverageCallTime)); // 발신 평균 통화 시간
      row.push(Utils.getHourMinSecBySecond(values.outcoming_ring_time)); // 발신 링 시간
      row.push(`${values.outcoming_ring_time}`); // 발신 링시간(초)
      row.push(Utils.getHourMinSecBySecond(values.outcoming_talk_time)); // 발신 순수통화시간
      row.push(`${values.outcoming_talk_time}`); // 발신 순수통화시간(초)

      // 수신
      row.push(`${values.incoming_total_call}`); // 수신 시도콜
      row.push(`${values.incoming_connect_call}`); // 수신 연결콜
      row.push(`${values.incoming_fail_call}`); // 수신 부재콜
      let incomingConnectionRate =
        values.incoming_connect_call / values.incoming_total_call || 0;
      incomingConnectionRate = Utils.getDecimalNumber(
        incomingConnectionRate * 100,
      );
      row.push(`${incomingConnectionRate}%`); // 수신 연결률
      row.push(Utils.getHourMinSecBySecond(values.incoming_total_time)); // 수신 통화 시간
      row.push(`${values.incoming_total_time}`); // 수신 통화 시간(초)
      let incomingAverageCallTime =
        values.incoming_total_time / values.incoming_total_call;
      incomingAverageCallTime = incomingAverageCallTime || 0;
      row.push(Utils.getHourMinSecBySecond(incomingAverageCallTime)); // 수신 평균 통화 시간
      row.push(Utils.getHourMinSecBySecond(values.incoming_ring_time)); // 수신 링 시간
      row.push(`${values.incoming_ring_time}`); // 수신 링시간(초)
      row.push(Utils.getHourMinSecBySecond(values.incoming_talk_time)); // 수신 순수통화시간
      row.push(`${values.incoming_talk_time}`); // 수신 순수통화시간(초)

      let backgroundColor = '';
      if (values.branch_name === '소계') {
        backgroundColor = Colors.gray15;
      } else if (values.branch_name === '합계') {
        backgroundColor = Colors.blue9;
      }
      const callStatisticsByConsultantItems: Array<ITableProperty> = row.map(
        (value, index) => {
          return {
            data: {
              text: value,
            },
            styles: {
              fontSize: 12,
            },
            type: 'text',
            propertyStyles: {
              backgroundColor,
              textAlign: 'center',
            },
          };
        },
      );

      return callStatisticsByConsultantItems;
    });
  }, [callStatisticsByConsultantData]);

  /**
   * @description 상담원별 통화 통계 테이블 내용 정보들
   */
  const tableContentCallStatisticsByConsultant = useMemo(() => {
    return {
      data: tablePropertyCallStatisticsByConsultant,
      originData: callStatisticsByConsultantData,
      styles: {
        rowHeight: 35,
      },
      type: 'call-statistics-by-consultant',
    };
  }, [callStatisticsByConsultantData, tablePropertyCallStatisticsByConsultant]);

  /**
   * @description 팀별 통화 통계 테이블 상세 내용 정보들
   */
  const tablePropertyCallStatisticsByTeam = useMemo(() => {
    return callStatisticsByTeamData.map((values) => {
      const row: Array<string> = [];

      // 공통
      row.push(values.branch_name); // 센터명
      row.push(values.team_name); // 팀명
      row.push(values.date); // 일시

      // 전체
      row.push(`${values.all_total_call}`); // 전체 시도콜
      row.push(`${values.all_connect_call}`); // 전체 연결콜
      row.push(`${values.all_fail_call}`); // 전체 부재콜
      let allConnectionRate =
        values.all_connect_call / values.all_total_call || 0;
      allConnectionRate = Utils.getDecimalNumber(allConnectionRate * 100);
      row.push(`${allConnectionRate}%`); // 전체 연결률
      row.push(Utils.getHourMinSecBySecond(values.all_total_time)); // 전체 통화 시간
      row.push(`${values.all_total_time}`); // 전체 통화 시간(초)
      let allAverageCallTime = values.all_total_time / values.all_total_call;
      allAverageCallTime = allAverageCallTime || 0;
      row.push(Utils.getHourMinSecBySecond(allAverageCallTime)); // 전체 평균 통화 시간
      row.push(Utils.getHourMinSecBySecond(values.all_ring_time)); // 전체 링 시간
      row.push(`${values.all_ring_time}`); // 전체 링시간(초)
      row.push(Utils.getHourMinSecBySecond(values.all_talk_time)); // 전체 순수통화시간
      row.push(`${values.all_talk_time}`); // 전체 순수통화시간(초)

      // 발신
      row.push(`${values.outcoming_total_call}`); // 발신 시도콜
      row.push(`${values.outcoming_connect_call}`); // 발신 연결콜
      row.push(`${values.outcoming_fail_call}`); // 발신 부재콜
      let outcomingConnectionRate =
        values.outcoming_connect_call / values.outcoming_total_call || 0;
      outcomingConnectionRate = Utils.getDecimalNumber(
        outcomingConnectionRate * 100,
      );
      row.push(`${outcomingConnectionRate}%`); // 발신 연결률
      row.push(Utils.getHourMinSecBySecond(values.outcoming_total_time)); // 발신 통화 시간
      row.push(`${values.outcoming_total_time}`); // 발신 통화 시간(초)
      let outcomingAverageCallTime =
        values.outcoming_total_time / values.outcoming_total_call;
      outcomingAverageCallTime = outcomingAverageCallTime || 0;
      row.push(Utils.getHourMinSecBySecond(outcomingAverageCallTime)); // 발신 평균 통화 시간
      row.push(Utils.getHourMinSecBySecond(values.outcoming_ring_time)); // 발신 링 시간
      row.push(`${values.outcoming_ring_time}`); // 발신 링시간(초)
      row.push(Utils.getHourMinSecBySecond(values.outcoming_talk_time)); // 발신 순수통화시간
      row.push(`${values.outcoming_talk_time}`); // 발신 순수통화시간(초)

      // 수신
      row.push(`${values.incoming_total_call}`); // 수신 시도콜
      row.push(`${values.incoming_connect_call}`); // 수신 연결콜
      row.push(`${values.incoming_fail_call}`); // 수신 부재콜
      let incomingConnectionRate =
        values.incoming_connect_call / values.incoming_total_call || 0;
      incomingConnectionRate = Utils.getDecimalNumber(
        incomingConnectionRate * 100,
      );
      row.push(`${incomingConnectionRate}%`); // 수신 연결률
      row.push(Utils.getHourMinSecBySecond(values.incoming_total_time)); // 수신 통화 시간
      row.push(`${values.incoming_total_time}`); // 수신 통화 시간(초)
      let incomingAverageCallTime =
        values.incoming_total_time / values.incoming_total_call;
      incomingAverageCallTime = incomingAverageCallTime || 0;
      row.push(Utils.getHourMinSecBySecond(incomingAverageCallTime)); // 수신 평균 통화 시간
      row.push(Utils.getHourMinSecBySecond(values.incoming_ring_time)); // 수신 링 시간
      row.push(`${values.incoming_ring_time}`); // 수신 링시간(초)
      row.push(Utils.getHourMinSecBySecond(values.incoming_talk_time)); // 수신 순수통화시간
      row.push(`${values.incoming_talk_time}`); // 수신 순수통화시간(초)

      let backgroundColor = '';
      if (values.branch_name === '소계') {
        backgroundColor = Colors.gray15;
      } else if (values.branch_name === '합계') {
        backgroundColor = Colors.blue9;
      }
      const callStatisticsByConsultantItems: Array<ITableProperty> = row.map(
        (value, index) => {
          return {
            data: {
              text: value,
            },
            styles: {
              fontSize: 12,
            },
            type: 'text',
            propertyStyles: {
              backgroundColor,
              textAlign: 'center',
            },
          };
        },
      );

      return callStatisticsByConsultantItems;
    });
  }, [callStatisticsByTeamData]);

  /**
   * @description 팀별 통화 통계 테이블 내용 정보들
   */
  const tableContentCallStatisticsByTeam = useMemo(() => {
    return {
      data: tablePropertyCallStatisticsByTeam,
      originData: callStatisticsByTeamData,
      styles: {
        rowHeight: 35,
      },
      type: 'call-statistics-by-team',
    };
  }, [callStatisticsByTeamData, tablePropertyCallStatisticsByTeam]);

  // pluralBranchSelectedOption 변경되면 하위 데이터 초기화
  useEffect(() => {
    handlePluralTeamSelectedOption([]);
    handlePluralConsultantSelectedOption([]);
    setInitializePluralConsultant();
    setInitializePluralTeam();
  }, [
    handlePluralConsultantSelectedOption,
    handlePluralTeamSelectedOption,
    pluralBranchSelectedOption,
    setInitializePluralConsultant,
    setInitializePluralTeam,
  ]);

  // pluralTeamSelectedOption이 변경되면 하위 데이터 초기화
  useEffect(() => {
    handlePluralConsultantSelectedOption([]);
    setInitializePluralConsultant();
  }, [
    handlePluralConsultantSelectedOption,
    handlePluralTeamSelectedOption,
    pluralTeamSelectedOption,
    setInitializePluralConsultant,
    setInitializePluralTeam,
  ]);

  useEffect(() => {
    getPluralBranch();
  }, [getPluralBranch]);

  useEffect(() => {
    if (!_.isEmpty(pluralBranchSelectedOption)) {
      getPluralTeam(pluralBranchSelectedOption);
    }
  }, [getPluralTeam, pluralBranchSelectedOption]);

  useEffect(() => {
    if (!_.isEmpty(pluralTeamSelectedOption)) {
      getPluralConsultant(pluralTeamSelectedOption);
    }
  }, [getPluralConsultant, pluralTeamSelectedOption]);

  /**
   * @description 페이지가 변경됐을 때 데이터를 가져오기
   */
  useEffect(() => {
    if (prevPage !== page) {
      getCallStatisticeByConsultant(false);
    }

    prevPage = page;
  }, [getCallStatisticeByConsultant, page]);

  /**
   * @description 페이지가 변경됐을 때 팀별 통화 통계 데이터를 가져오기
   */
  useEffect(() => {
    if (callByTeamPrevPage !== callStatisticsByTeamPage) {
      getCallStatisticeByTeam(false);
    }

    callByTeamPrevPage = callStatisticsByTeamPage;
  }, [callStatisticsByTeamPage, getCallStatisticeByTeam]);

  /**
   * @description 페이지가 변경됐을 때 자동 문자 통계 데이터를 가져오기
   */
  useEffect(() => {
    if (autoMessagePrevPage !== autoMessageStatisticsPage) {
      getAutoMessageStatistice(false);
    }

    autoMessagePrevPage = autoMessageStatisticsPage;
  }, [autoMessageStatisticsPage, getAutoMessageStatistice]);

  /**
   * @description 페이지가 변경됐을 때 문자 통계 데이터를 가져오기
   */
  useEffect(() => {
    if (meessagePrevPage !== messageStatisticsPage) {
      getMessageStatistice(false);
    }

    meessagePrevPage = messageStatisticsPage;
  }, [getMessageStatistice, messageStatisticsPage]);

  const setInitData = useCallback(
    (type: number) => {
      switch (type) {
        case 0: {
          // 상담원별 통화 통계
          if (!_.isEmpty(callStatisticsByConsultantData)) {
            // 비어있지 않으면 초기화 시키기
            handleInitializeCallStatisticsByConsultant();
          }

          break;
        }
        case 1: {
          break;
        }
        case 2: {
          // 문자 통계
          if (!_.isEmpty(messageStatisticsData)) {
            // 비어있지 않으면 초기화 시키기
            handleInitializeMessageStatistics();
          }

          break;
        }
        case 3: {
          // 자동 문자 통계
          if (!_.isEmpty(autoMessageStatisticsData)) {
            // 비어있지 않으면 초기화 시키기
            handleInitializeAutoMessageStatistics();
          }

          break;
        }
      }
    },
    [
      autoMessageStatisticsData,
      callStatisticsByConsultantData,
      handleInitializeAutoMessageStatistics,
      handleInitializeCallStatisticsByConsultant,
      handleInitializeMessageStatistics,
      messageStatisticsData,
    ],
  );

  /**
   * @description 기존 데이터 초기화하기
   */
  useEffect(() => {
    if (!loginInfo.id) {
      return;
    }

    switch (selectedTabIndex) {
      case 0: {
        setInitData(1);
        setInitData(2);
        setInitData(3);

        break;
      }
      case 1: {
        setInitData(0);
        setInitData(2);
        setInitData(3);

        break;
      }
      case 2: {
        setInitData(0);
        setInitData(1);
        setInitData(3);

        break;
      }
      case 3: {
        setInitData(0);
        setInitData(1);
        setInitData(2);

        break;
      }
    }
  }, [
    autoMessageStatisticsData,
    callStatisticsByConsultantData,
    handleInitializeAutoMessageStatistics,
    handleInitializeCallStatisticsByConsultant,
    loginInfo.id,
    selectedTabIndex,
    setInitData,
  ]);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <TitleV2
            renderLeft={getRenderLeft(1)}
            renderRight={getRenderRight(1)}
            titleStyle={getTitleStyle(1)}
          />
        </StyledTitle>
        <StyledTitle>
          <TitleV2
            renderLeft={getRenderLeft(2)}
            titleStyle={getTitleStyle(2)}
          />
        </StyledTitle>
        <StyledContent>
          <div>
            {selectedTabIndex === 0 ? (
              // 상담원별 통화 통계
              <Table
                borderItem={borderItem}
                contents={tableContentCallStatisticsByConsultant}
                dependencyTitles={dependencyCallStatisticsTitles}
                headColor={Colors.white}
                headHeight={52}
                titles={callStatisticsByConsultantTableTitles}
              />
            ) : selectedTabIndex === 1 ? (
              // 팀별 통화 통계
              <Table
                borderItem={borderItem}
                contents={tableContentCallStatisticsByTeam}
                dependencyTitles={dependencyCallStatisticsTitles}
                headColor={Colors.white}
                headHeight={52}
                titles={callStatisticsByTeamTableTitles}
              />
            ) : selectedTabIndex === 2 ? (
              // 문자 통계
              <Table
                borderItem={borderItem}
                contents={tableContentMessageStatistics}
                headColor={Colors.white}
                headHeight={52}
                titles={smsStatisticsTableTitles}
              />
            ) : (
              // 자동 문자 통계
              <Table
                borderItem={borderItem}
                contents={tableContentAutoMessageStatistics}
                headColor={Colors.white}
                headHeight={33}
                titles={notificationStatisticsTableTitles}
              />
            )}
          </div>
        </StyledContent>
        <StyledFooter>
          {selectedTabIndex === 0 ? (
            // 상담원별 통화 통계
            <TablePagination
              count={maxCallStatisticsByConsultant}
              divide={form.limit}
              curPage={page}
              onClickNextPage={onClickNextPage}
              onClickPrevPage={onClickPrevPage}
            />
          ) : selectedTabIndex === 1 ? (
            // 팀별 통화 통계
            <TablePagination
              count={maxCallStatisticsByTeam}
              divide={form.limit}
              curPage={callStatisticsByTeamPage}
              onClickNextPage={onClickNextPageCallStatisticsByTeam}
              onClickPrevPage={onClickPrevPageCallStatisticsByTeam}
            />
          ) : selectedTabIndex === 2 ? (
            // 문자 통계
            <TablePagination
              count={maxMessageStatistics}
              divide={form.limit}
              curPage={messageStatisticsPage}
              onClickNextPage={onClickNextPageMessage}
              onClickPrevPage={onClickPrevPageMessage}
            />
          ) : (
            // 자동 문자 통계
            <TablePagination
              count={maxAutoMessageStatistics}
              divide={form.limit}
              curPage={autoMessageStatisticsPage}
              onClickNextPage={onClickNextPageAutoMessage}
              onClickPrevPage={onClickPrevPageAutoMessage}
            />
          )}
        </StyledFooter>
      </StyledWrapper>
    </>
  );
}

StatisticsV2View.defaultProps = {};

export default StatisticsV2View;
