import _ from 'lodash';
import React, { useMemo, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { TablePagination, TitleV2 } from 'components/molecules';
import { IProperty as ITableProperty } from 'components/molecules/TableProperty';
import { Table } from 'components/organisms';
import useAuth from 'hooks/useAuth';
import useDatePicker from 'hooks/useDatePicker';
import useExcel from 'hooks/useExcel';
import useInputForm from 'hooks/useInputForm';
import useMultiSelect from 'hooks/useMultiSelect';
import useOrganization from 'hooks/useOrganization';
import usePage from 'hooks/usePage';
import useStatistics from 'hooks/useStatistics';
import useTab from 'hooks/useTab';
import useUser from 'hooks/useUser';
import { Colors } from 'utils/color';
import Utils from 'utils/new_utils';
import {
  tableTitleAutoMessageStatistics,
  tableTitleCallStatisticsByConsultant,
  tableTitleCallStatisticsByTeam,
  tableTitleDependencyCallStatistics,
  tableTitleDependencyCallStatisticsByConsultant,
  tableTitleDependencyCallStatisticsByTeam,
  tableTitleMessageStatistics,
} from 'utils/table/title';
import TableRow from 'utils/table/row';
import constants, { USER_TYPE, ZIBOX_TRANSPORT } from 'utils/constants';
import Toast from 'utils/toast';

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
    data: `${Utils.pad(String(index))}시`,
  };
});

const selectBoxMinutesOption = [...new Array(4)].map((values, index) => {
  return {
    id: 15 * index,
    data: `${Utils.pad(String(15 * index))}분`,
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

  ${(props) => {
    if (constants.IS_IE_BROWSER) {
      return css`
        overflow: auto;
      `;
    }
  }}
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
  const { form, onChangeCheckBox, onChangeSelect, setSpecificValue } =
    useInputForm({
      break_up: false, // 해촉여부
      search_type: 1, // 조회 조건
      start_hour: 8, // 시작 시
      start_minute: 0, // 시작 분
      end_hour: 21, // 끝 시
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
    handleInitializeCallStatisticsByTeam,
    handleGetMessageStatistics,
    handleGetCallStatisticsByTeam,
    callStatisticsByTeamData,
  } = useStatistics();
  const {
    maxCallStatisticsByConsultant,
    page,
    onClickNextPage,
    onClickPrevPage,
    onChangeCurrentPage,
  } = usePage();
  const {
    maxAutoMessageStatistics,
    page: autoMessageStatisticsPage,
    onClickNextPage: onClickNextPageAutoMessage,
    onClickPrevPage: onClickPrevPageAutoMessage,
    onChangeCurrentPage: onChangeCurrentPageAutoMessage,
  } = usePage();
  const {
    maxMessageStatistics,
    page: messageStatisticsPage,
    onClickNextPage: onClickNextPageMessage,
    onClickPrevPage: onClickPrevPageMessage,
    onChangeCurrentPage: onChangeCurrentPageMessage,
  } = usePage();
  const {
    maxCallStatisticsByTeam,
    page: callStatisticsByTeamPage,
    onClickNextPage: onClickNextPageCallStatisticsByTeam,
    onClickPrevPage: onClickPrevPageCallStatisticsByTeam,
    onChangeCurrentPage: onChangeCurrentPageCallStatisticsByTeam,
  } = usePage();
  const { excelDownloadStatus } = useExcel();

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
      let label = `${values.name}`;
      if (values.user_name) {
        label += `(${values.user_name})`;
      }

      return {
        value: values.id,
        label,
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

      if (selectedTabIndex < 2) {
        // 통화 통계인 경우
        if (form.search_type !== 2) {
          // 월별 조회 조건이 아닌 경우
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
        }
      } else {
        // 그 외 통계인 경우
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
    [form.search_type, selectedTabIndex],
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

    const breakUp = form.break_up;
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
    (isAlert = true, isExcel = false) => {
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
          Toast.warning(`${message}🙄`);
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
        isExcel,
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
    (isAlert = true, isExcel = false) => {
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
          Toast.warning(`${message}🙄`);
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
        callStatisticsByTeamPage,
        limit,
        isExcel,
      );
    },
    [
      callStatisticsByTeamPage,
      getTitleParams,
      handleGetCallStatisticsByTeam,
      isValidateStatistics,
    ],
  );

  const getAutoMessageStatistice = useCallback(
    (isAlert = true, isExcel = false) => {
      const { ids, breakUp, startDate, endDate, limit } = getTitleParams;

      const { status, message } = isValidateStatistics(ids, startDate, endDate);

      if (!status) {
        if (isAlert) {
          Toast.warning(`${message}🙄`);
        }

        return;
      }

      handleGetAutoMessageStatistics(
        ids,
        breakUp,
        startDate,
        endDate,
        autoMessageStatisticsPage,
        limit,
        isExcel,
      );
    },
    [
      autoMessageStatisticsPage,
      getTitleParams,
      handleGetAutoMessageStatistics,
      isValidateStatistics,
    ],
  );

  const getMessageStatistice = useCallback(
    (isAlert = true, isExcel = false) => {
      const { ids, breakUp, startDate, endDate, limit } = getTitleParams;

      const { status, message } = isValidateStatistics(ids, startDate, endDate);

      if (!status) {
        if (isAlert) {
          Toast.warning(`${message}🙄`);
        }

        return;
      }

      handleGetMessageStatistics(
        ids,
        breakUp,
        startDate,
        endDate,
        messageStatisticsPage,
        limit,
        isExcel,
      );
    },
    [
      getTitleParams,
      handleGetMessageStatistics,
      isValidateStatistics,
      messageStatisticsPage,
    ],
  );

  /**
   * @description 타이틀에 들어갈 버튼 정보들
   */
  const buttonData = useMemo(() => {
    let onClickExcel: any;
    if (selectedTabIndex === 0) {
      onClickExcel = _.debounce(
        () => getCallStatisticeByConsultant(true, true),
        1000,
      );
    } else if (selectedTabIndex === 1) {
      onClickExcel = _.debounce(
        () => getCallStatisticeByTeam(true, true),
        1000,
      );
    } else if (selectedTabIndex === 2) {
      onClickExcel = _.debounce(() => getMessageStatistice(true, true), 1000);
    } else if (selectedTabIndex === 3) {
      onClickExcel = _.debounce(
        () => getAutoMessageStatistice(true, true),
        1000,
      );
    }

    const buttonConfig1 = {
      type: 'button',
      data: {
        disabled: excelDownloadStatus,
        text: excelDownloadStatus ? '처리 중..' : '엑셀파일 다운로드',
        onClick: onClickExcel,
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

    let onClick: any = null;
    if (selectedTabIndex === 0) {
      onClick = _.debounce(getCallStatisticeByConsultant, 500);
    } else if (selectedTabIndex === 1) {
      onClick = _.debounce(getCallStatisticeByTeam, 500);
    } else if (selectedTabIndex === 2) {
      onClick = _.debounce(getMessageStatistice, 500);
    } else if (selectedTabIndex === 3) {
      onClick = _.debounce(getAutoMessageStatistice, 500);
    }

    const buttonConfig2 = {
      type: 'button',
      data: {
        text: '조회',
        onClick: onClick,
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
    excelDownloadStatus,
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
        disabled: loginInfo.admin_id < USER_TYPE.ADMIN,
        onChange: handlePluralBranchSelectedOption,
        options: pluralBranchOption,
        selectedOptions: pluralBranchSelectedOption,
        textChoice: '개 센터',
      },
    };

    const multiSelectConfig2 = {
      type: 'multi-select',
      data: {
        disabled: loginInfo.admin_id < USER_TYPE.BRANCH_ADMIN,
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
    loginInfo.admin_id,
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
    const disabledMinutesSearchType = [1, 2, 3, 6]; // 분 select box가 비활성화 되어야하는 조건

    let selectBoxMinutesCustomOption = _.cloneDeep(selectBoxMinutesOption);

    if (form.search_type === 4) {
      // 조회 조건이 30분 인 경우 분의 값은 0분/30분 만 남겨둠
      selectBoxMinutesCustomOption = selectBoxMinutesOption.filter(
        (values) => values.id % 2 === 0,
      );
    }

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
        width: 60,
      },
    }; // 시작 시 관련 정보

    const selectConfig2 = {
      type: 'select',
      data: {
        disabled: disabledMinutesSearchType.includes(form.search_type),
        name: 'start_minute',
        onChange: onChangeSelect,
        options: selectBoxMinutesCustomOption,
        value: form.start_minute,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
        width: 60,
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
        width: 60,
      },
    }; // 끝 시 관련 정보

    const selectConfig4 = {
      type: 'select',
      data: {
        disabled: disabledMinutesSearchType.includes(form.search_type),
        name: 'end_minute',
        onChange: onChangeSelect,
        options: selectBoxMinutesCustomOption,
        value: form.end_minute,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
        width: 60,
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

            if (i === 1 || i === 2 || i === 7 || i === 8 || i === 9) {
              defaultRenderStyle.paddingRight = 20;
            }

            if (i === 3 || i === 4 || i === 5 || i === 6) {
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
      const row = TableRow.getRowMessageStatistics(values);

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
              justifyContent: 'center',
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
      const row = TableRow.getRowAutoMessageStatistics(values);

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
      const row = TableRow.getRowCallStatisticsByConsultant(values);

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
              justifyContent: 'center',
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
      const row = TableRow.getRowCallStatisticsByTeam(values);

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
              justifyContent: 'center',
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
    if (!_.isEmpty(callStatisticsByConsultantData) && page !== prevPage) {
      getCallStatisticeByConsultant(false);
    }

    prevPage = page;
  }, [callStatisticsByConsultantData, getCallStatisticeByConsultant, page]);

  /**
   * @description 페이지가 변경됐을 때 팀별 통화 통계 데이터를 가져오기
   */
  useEffect(() => {
    if (
      !_.isEmpty(callStatisticsByTeamData) &&
      callByTeamPrevPage !== callStatisticsByTeamPage
    ) {
      getCallStatisticeByTeam(false);
    }

    callByTeamPrevPage = callStatisticsByTeamPage;
  }, [
    callStatisticsByTeamData,
    callStatisticsByTeamPage,
    getCallStatisticeByTeam,
  ]);

  /**
   * @description 페이지가 변경됐을 때 자동 문자 통계 데이터를 가져오기
   */
  useEffect(() => {
    if (
      !_.isEmpty(autoMessageStatisticsData) &&
      autoMessagePrevPage !== autoMessageStatisticsPage
    ) {
      getAutoMessageStatistice(false);
    }

    autoMessagePrevPage = autoMessageStatisticsPage;
  }, [
    autoMessageStatisticsData,
    autoMessageStatisticsPage,
    getAutoMessageStatistice,
  ]);

  /**
   * @description 페이지가 변경됐을 때 문자 통계 데이터를 가져오기
   */
  useEffect(() => {
    if (
      !_.isEmpty(messageStatisticsData) &&
      meessagePrevPage !== messageStatisticsPage
    ) {
      getMessageStatistice(false);
    }

    meessagePrevPage = messageStatisticsPage;
  }, [getMessageStatistice, messageStatisticsData, messageStatisticsPage]);

  const setInitData = useCallback(
    (type: number) => {
      const tabIndexs = [0, 1, 2, 3];

      tabIndexs.forEach((selected) => {
        if (selected === type) {
          return;
        }

        switch (type) {
          case 0: {
            // 상담원별 통화 통계
            handleInitializeCallStatisticsByConsultant();

            break;
          }
          case 1: {
            // 팀별 통화 통계
            handleInitializeCallStatisticsByTeam();

            break;
          }
          case 2: {
            // 문자 통계
            handleInitializeMessageStatistics();

            break;
          }
          case 3: {
            // 자동 문자 통계
            handleInitializeAutoMessageStatistics();

            break;
          }
        }
      });
    },
    [
      handleInitializeAutoMessageStatistics,
      handleInitializeCallStatisticsByConsultant,
      handleInitializeCallStatisticsByTeam,
      handleInitializeMessageStatistics,
    ],
  );

  /**
   * @description 기존 데이터 초기화하기
   */
  useEffect(() => {
    if (!loginInfo.id) {
      return;
    }

    setInitData(selectedTabIndex);
  }, [loginInfo.id, selectedTabIndex, setInitData]);

  useEffect(() => {
    if (!loginInfo.id) {
      // 비로그인인 경우
      return;
    }

    if (selectedTabIndex === 0) {
      if (maxCallStatisticsByConsultant < 1) {
        prevPage = 1;
      }

      onChangeCurrentPage(page, maxCallStatisticsByConsultant, form.limit);
    } else if (selectedTabIndex === 1) {
      if (maxCallStatisticsByTeam < 1) {
        callByTeamPrevPage = 1;
      }

      onChangeCurrentPageCallStatisticsByTeam(
        callStatisticsByTeamPage,
        maxCallStatisticsByTeam,
        form.limit,
      );
    } else if (selectedTabIndex === 2) {
      if (maxMessageStatistics < 1) {
        meessagePrevPage = 1;
      }

      onChangeCurrentPageMessage(
        messageStatisticsPage,
        maxMessageStatistics,
        form.limit,
      );
    } else if (selectedTabIndex === 3) {
      if (maxAutoMessageStatistics < 1) {
        autoMessagePrevPage = 1;
      }

      onChangeCurrentPageAutoMessage(
        autoMessageStatisticsPage,
        maxAutoMessageStatistics,
        form.limit,
      );
    }
  }, [
    autoMessageStatisticsPage,
    callStatisticsByTeamPage,
    form.limit,
    loginInfo.id,
    maxAutoMessageStatistics,
    maxCallStatisticsByConsultant,
    maxCallStatisticsByTeam,
    maxMessageStatistics,
    messageStatisticsPage,
    onChangeCurrentPage,
    onChangeCurrentPageAutoMessage,
    onChangeCurrentPageCallStatisticsByTeam,
    onChangeCurrentPageMessage,
    page,
    selectedTabIndex,
  ]);

  useEffect(() => {
    if (loginInfo.admin_id < USER_TYPE.ADMIN) {
      // 일반 관리자 하위 권한일 경우
      const selectedBranchs = pluralBranchOption.filter((item) => {
        return item.value === loginInfo.branch_id;
      });

      handlePluralBranchSelectedOption(selectedBranchs);
    }
  }, [
    handlePluralBranchSelectedOption,
    loginInfo.admin_id,
    loginInfo.branch_id,
    pluralBranchOption,
  ]);

  useEffect(() => {
    if (_.isEmpty(pluralBranchSelectedOption)) {
      // 비어있으면 할 필요 없음
      return;
    }

    if (_.isEmpty(pluralTeamOption)) {
      // 팀이 비어있으면 할 필요 없음
      return;
    }

    if (loginInfo.admin_id === USER_TYPE.TEAM_ADMIN) {
      // 팀 관리자일 경우
      const selectedteams = pluralTeamOption.filter((item) => {
        return item.value === loginInfo.team_id;
      });

      handlePluralTeamSelectedOption(selectedteams);
    }
  }, [
    handlePluralTeamSelectedOption,
    loginInfo.admin_id,
    loginInfo.team_id,
    pluralBranchSelectedOption,
    pluralTeamOption,
  ]);

  useEffect(() => {
    if (form.search_type === 4 || form.search_type === 5) {
      return;
    }

    if (form.start_minute !== 0) {
      setSpecificValue('start_minute', 0);
    }

    if (form.end_minute !== 0) {
      setSpecificValue('end_minute', 0);
    }
  }, [form.end_minute, form.search_type, form.start_minute, setSpecificValue]);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <TitleV2
            isExcel={true}
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
          {selectedTabIndex === 0 ? (
            // 상담원별 통화 통계
            <Table
              borderItem={borderItem}
              contents={tableContentCallStatisticsByConsultant}
              dependencyTitles={
                constants.IS_IE_BROWSER
                  ? tableTitleDependencyCallStatistics
                  : undefined
              }
              headColor={Colors.white}
              headHeight={52}
              titles={
                constants.IS_IE_BROWSER
                  ? tableTitleCallStatisticsByConsultant
                  : tableTitleDependencyCallStatisticsByConsultant
              }
              type={constants.IS_IE_BROWSER ? 'table' : 'grid'}
            />
          ) : selectedTabIndex === 1 ? (
            // 팀별 통화 통계
            <Table
              borderItem={borderItem}
              contents={tableContentCallStatisticsByTeam}
              dependencyTitles={
                constants.IS_IE_BROWSER
                  ? tableTitleDependencyCallStatistics
                  : undefined
              }
              headColor={Colors.white}
              headHeight={52}
              titles={
                constants.IS_IE_BROWSER
                  ? tableTitleCallStatisticsByTeam
                  : tableTitleDependencyCallStatisticsByTeam
              }
              type={constants.IS_IE_BROWSER ? 'table' : 'grid'}
            />
          ) : selectedTabIndex === 2 ? (
            // 문자 통계
            <Table
              borderItem={borderItem}
              contents={tableContentMessageStatistics}
              headColor={Colors.white}
              headHeight={52}
              titles={tableTitleMessageStatistics}
              type={constants.IS_IE_BROWSER ? 'table' : 'grid'}
            />
          ) : (
            // 자동 문자 통계
            <Table
              borderItem={borderItem}
              contents={tableContentAutoMessageStatistics}
              headColor={Colors.white}
              headHeight={33}
              titles={tableTitleAutoMessageStatistics}
              type={constants.IS_IE_BROWSER ? 'table' : 'grid'}
            />
          )}
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
