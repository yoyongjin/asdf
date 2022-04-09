import _ from 'lodash';
import React, { useMemo, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { TitleV2 } from 'components/molecules';
import { Table } from 'components/organisms';
import useDatePicker from 'hooks/useDatePicker';
import useInputForm from 'hooks/useInputForm';
import useMultiSelect from 'hooks/useMultiSelect';
import useOrganization from 'hooks/useOrganization';
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
    title: '일 알림문자',
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
    title: '당월 알림문자',
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
    name: '알림 문자 통계',
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
    id: index + 1,
    data: `${Utils.pad(String(index + 1))}`,
  };
});

const selectBoxMinutesOption = [...new Array(4)].map((values, index) => {
  return {
    id: index + 1,
    data: `${15 * (index + 1)}`,
  };
});

const StyledWrapper = styled.div`
  height: 100%;
`;

const StyledTitle = styled.div`
  height: 4.275rem;
  width: 100%;
`;

const StyledStatisticsArea = styled.div`
  height: calc(100% - 8.5rem);
  overflow: auto;
  width: 100%;
`;

const StyledTableContent = styled.div``;

function StatisticsV2View() {
  const { form, onChangeCheckBox } = useInputForm({
    break_up: false,
  });
  const {
    datePicker: startDatePicker,
    onChangeDatePicker: onChangeStartDatePicker,
  } = useDatePicker();
  const {
    onChangeDatePicker: onChangeEndDatePicker,
    datePicker: endDatePicker,
  } = useDatePicker();
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

  const tableContents = useMemo(() => {
    return {
      data: [],
      styles: {
        rowHeight: 30,
      },
      type: 'stat',
    };
  }, []);

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

    const buttonConfig2 = {
      type: 'button',
      data: {
        text: '조회',
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
  }, []);

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
        textChoice: '개 지점',
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
        name: 'test111',
        options: selectBoxConditionOption,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
      },
    };

    const selectConfig2 = {
      type: 'select',
      data: {
        name: 'test222',
        options: selectBoxHoursOption,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
        width: 50,
      },
    };

    const selectConfig3 = {
      type: 'select',
      data: {
        name: 'test333',
        options: selectBoxMinutesOption,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
        width: 50,
      },
    };

    const selectConfig4 = {
      type: 'select',
      data: {
        name: 'test444',
        options: selectBoxHoursOption,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
        width: 50,
      },
    };

    const selectConfig5 = {
      type: 'select',
      data: {
        name: 'test555',
        options: selectBoxMinutesOption,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
        width: 50,
      },
    };

    return [
      selectConfig1,
      selectConfig2,
      selectConfig3,
      selectConfig4,
      selectConfig5,
    ];
  }, []);

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

        const [dataPickerConfig1] = dateRangePickerData;

        const [buttonConfig1, ...buttonConfig] = buttonData;

        renderData.push(...multiSelectData);
        renderData.push(...textCheckBoxData);
        renderData.push(dataPickerConfig1);
        renderData.push(...selectData);
        renderData.push(...buttonConfig);

        const renderStyle = [];

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

          if (i === 3 || i === 5 || i === 9) {
            defaultRenderStyle.paddingRight = 20;
          }

          if (i === 4 || i === 6 || i === 7 || i === 8) {
            defaultRenderStyle.paddingRight = 10;
          }

          renderStyle.push(defaultRenderStyle);
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
      tabData,
      textCheckBoxData,
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

  // pluralBranchSelectedOption 변경되면 하위 데이터 초기화
  useEffect(() => {
    handlePluralTeamSelectedOption([]);
    handlePluralConsultantSelectedOption([]);
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
        <StyledStatisticsArea>
          <StyledTableContent>
            {selectedTabIndex === 0 ? (
              // 상담원별 통화 통계
              <Table
                borderItem={borderItem}
                contents={tableContents}
                dependencyTitles={dependencyCallStatisticsTitles}
                headColor={Colors.white}
                headHeight={52}
                titles={callStatisticsByConsultantTableTitles}
              />
            ) : selectedTabIndex === 1 ? (
              // 팀별 통화 통계
              <Table
                borderItem={borderItem}
                contents={tableContents}
                dependencyTitles={dependencyCallStatisticsTitles}
                headColor={Colors.white}
                headHeight={52}
                titles={callStatisticsByTeamTableTitles}
              />
            ) : selectedTabIndex === 2 ? (
              // 문자 통계
              <Table
                borderItem={borderItem}
                contents={tableContents}
                headColor={Colors.white}
                headHeight={52}
                titles={smsStatisticsTableTitles}
              />
            ) : (
              // 알림 문자 통계
              <Table
                borderItem={borderItem}
                contents={tableContents}
                headColor={Colors.white}
                headHeight={33}
                titles={notificationStatisticsTableTitles}
              />
            )}
          </StyledTableContent>
        </StyledStatisticsArea>
      </StyledWrapper>
    </>
  );
}

StatisticsV2View.defaultProps = {};

export default StatisticsV2View;
