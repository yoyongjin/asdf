import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Modal } from 'components/atoms';
import {
  AutoMessagePopup,
  TablePagination,
  TitleV2,
} from 'components/molecules';
import { IProperty as ITableProperty } from 'components/molecules/TableProperty';
import { Table } from 'components/organisms';
import useAuth from 'hooks/useAuth';
import useInputForm from 'hooks/useInputForm';
import useMessage from 'hooks/useMessage';
import useOrganization from 'hooks/useOrganization';
import useTab from 'hooks/useTab';
import usePage from 'hooks/usePage';
import useVisible from 'hooks/useVisible';
import { IAutoMessageItem } from 'types/message';
import { Colors } from 'utils/color';
import constants, { ANSWER_VALUE, USER_TYPE } from 'utils/constants';
import Utils from 'utils/new_utils';

import AUTO_MESSAGE_IMAGE from 'images/bt-add-auto-msg.png';
import useFetch from 'hooks/useFetch';

const tabTitle = [
  {
    name: '자동 문자 설정',
  },
  {
    name: '발송 수량 설정',
  },
];

const settingAutoMessageTableTitles = [
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '등록일시 / 번호',
    width: 10,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    textAlign: 'left',
    title: '제목',
    width: 15,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    textAlign: 'left',
    title: '발송 조건 / 문자 내용',
    width: 45,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    textAlign: 'left',
    title: '사용 / 미사용',
    width: 15,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    // isWidthPercent: true,
    letterSpacing: -0.6,
    textAlign: 'left',
    title: '삭제 / 수정',
    width: 70,
  },
];

const settingMessageCountTableTitles = [
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '센터명',
    width: 20,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    textAlign: 'left',
    title: '일일 최대 발송수량',
    width: 15,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    textAlign: 'left',
    title: '월 최대 발송수량',
    width: 15,
  },
  {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    textAlign: 'left',
    title: '',
    width: 50,
  },
];

const defaultPageCount = 15;

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  height: 4.275rem;
  width: 100%;
`;

const StyledContent = styled.div`
  height: calc(100% - 8.5rem - 100px);
  overflow-x: auto;
`;

const StyledFooter = styled.div`
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
`;

function SMSView() {
  const [selectedAutoMessage, setSelectedAutoMessage] =
    useState<IAutoMessageItem | null>(null);
  const { loginInfo } = useAuth();
  const { onChangeSelectedTabIndex, selectedTabIndex } = useTab();
  const { form, onChangeSelect } = useInputForm({
    branch:
      loginInfo.admin_id < USER_TYPE.ADMIN
        ? loginInfo.branch_id
        : constants.DEFAULT_ID, // 지점 관리자부터 하위 관리자들은 자신의 지점만 볼 수 있다.
  });
  const { branches, getBranches } = useOrganization();
  const {
    addAutoMessage,
    autoMessageData,
    getAutoMessage,
    getSmsCount,
    setUsedAutoMessage,
    removeAutoMessage,
    maxCountData,
    modifyAutoMessage,
    modifySmsCount,
  } = useMessage();
  const { visible, onClickVisible } = useVisible();
  const { maxAutoMessage, page, onClickNextPage, onClickPrevPage } = usePage();
  const {
    addAutoMessageStatus,
    modifyAutoMessageStatus,
    removeAutoMessageStatus,
  } = useFetch();

  const branchSelectOption = useMemo(() => {
    return branches!.map((values) => {
      return {
        id: values.id,
        data: values.branch_name,
      };
    });
  }, [branches]);

  const onClickModifyAutoMessagePopup = useCallback(
    (item: IAutoMessageItem) => {
      onClickVisible();
      setSelectedAutoMessage(item);
    },
    [onClickVisible],
  );

  /**
   * @description 자동 메시지 테이블 상세 내용 정보들
   */
  const tablePropertyAutoMessage = useMemo(() => {
    let _autoMessageData = _.cloneDeep(autoMessageData);

    return _autoMessageData.map((values) => {
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
      } = values;

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

      const fullTime = `[${startTime} ~ ${endTime}]`;

      let fullDays = '';
      if (days) {
        fullDays = Utils.parsingDays(days).join(', ');
        fullDays = `[${fullDays}]`;
      }

      const autoMessageValues = [
        `${createdAtfullDate}${constants.PARSING_KEY}${id}`,
        title,
        `${fullDate} ${fullTime} ${fullDays}${constants.PARSING_KEY}${content}`,
        use_yn,
      ];

      const autoMessageItems: Array<ITableProperty> = autoMessageValues.map(
        (value, index) => {
          if (index === 3) {
            const commonColor =
              value.toUpperCase() === ANSWER_VALUE.YES
                ? Colors.blue4
                : Colors.gray13; // 공통 색상

            return {
              data: {
                isReverse: true,
                isChecked: value.toUpperCase() === ANSWER_VALUE.YES,
                text:
                  value.toUpperCase() === ANSWER_VALUE.YES
                    ? '사용중'
                    : '미사용',
                onClick: setUsedAutoMessage,
              },
              styles: {
                ballColor: commonColor,
                borderColor: commonColor,
                fontColor: commonColor,
              },
              type: 'text-slide-toggle',
            };
          }

          return {
            data: {
              count: 2,
              text: String(value),
            },
            type: 'text',
            propertyStyles: {
              paddingLeft: index === 0 ? 10 : 0, // 처음 요소만 padding left 적용
            },
          };
        },
      );

      const removeData = {
        data: {
          text: '삭제',
          onClick: removeAutoMessage,
        },
        styles: {
          backgroundColor: Colors.white,
          borderColor: Colors.gray13,
          borderRadius: 12,
          borderStyle: 'solid',
          borderWidth: 1,
          fontColor: Colors.gray13,
          fontSize: 12,
          height: 2.4,
          width: 6.8,
        },
        type: 'button',
      };

      const modifyData = {
        data: {
          text: '수정',
          onClick: onClickModifyAutoMessagePopup,
        },
        styles: {
          backgroundColor: Colors.white,
          borderColor: Colors.gray13,
          borderRadius: 12,
          borderStyle: 'solid',
          borderWidth: 1,
          fontColor: Colors.gray13,
          fontSize: 12,
          height: 2.4,
          width: 6.8,
        },
        type: 'button',
      };

      autoMessageItems.push(removeData, modifyData);

      return autoMessageItems;
    });
  }, [
    autoMessageData,
    onClickModifyAutoMessagePopup,
    removeAutoMessage,
    setUsedAutoMessage,
  ]);

  /**
   * @description 발송 수량 설정 테이블 상세 내용 정보들
   */
  const tablePropertyMaxCount = useMemo(() => {
    let _maxCountData = _.cloneDeep(maxCountData);

    if (form.branch !== constants.DEFAULT_ID) {
      // 지점이 선택된 경우
      _maxCountData = maxCountData.filter(
        (values) => values.branch_id === form.branch,
      );
    }

    return _maxCountData.map((values: any) => {
      const maxCountKeys = Object.keys(values);
      const maxCountValues = Object.values(values);

      const maxCountItems: Array<ITableProperty> = maxCountKeys
        .map((key, index) => {
          if (key === 'branch_name') {
            return {
              data: {
                text: String(maxCountValues[index]),
              },
              type: 'text',
              propertyStyles: {
                paddingLeft: 10,
              },
            };
          } else if (key === 'max_count_date' || key === 'max_count_month') {
            return {
              data: {
                disabled: loginInfo.admin_id < USER_TYPE.BRANCH_ADMIN, // 지점관리자보다 낮을 경우 수정 불가
                isNumber: true,
                value: maxCountValues[index],
              },
              styles: {
                borderRadius: 0,
                height: 2.8,
                textAlign: 1,
                width: 9.9,
              },
              type: 'input',
            };
          } else {
            return {
              data: {},
              type: 'none',
            };
          }
        })
        .filter((values) => values.type !== 'none');

      const addData = {
        data: {
          text: '저장',
          onClick: modifySmsCount,
        },
        styles: {
          backgroundColor: Colors.white,
          borderColor: Colors.gray13,
          borderRadius: 12,
          borderStyle: 'solid',
          borderWidth: 1,
          fontColor: Colors.gray13,
          fontSize: 12,
          height: 2.4,
          width: 6.8,
        },
        type: 'button',
        propertyStyles: {
          textAlign: 'right',
          paddingRight: 10,
        },
      };

      maxCountItems.push(addData);

      return maxCountItems;
    });
  }, [form.branch, loginInfo.admin_id, maxCountData, modifySmsCount]);

  /**
   * @description 자동 메시지 테이블 내용 정보들
   */
  const tableContentAutoMessage = useMemo(() => {
    return {
      data: tablePropertyAutoMessage,
      originData: autoMessageData,
      styles: {
        rowHeight: 55,
      },
      type: 'auto-message',
    };
  }, [autoMessageData, tablePropertyAutoMessage]);

  /**
   * @description 테이블 내용 정보들
   */
  const tableContentMaxCount = useMemo(() => {
    return {
      data: tablePropertyMaxCount,
      originData: maxCountData,
      styles: {
        rowHeight: 45,
      },
      type: 'sms-count',
    };
  }, [maxCountData, tablePropertyMaxCount]);

  /**
   * @description 테이블 헤더 border style
   */
  const tableHeadBorderStyle = useMemo(() => {
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

  /**
   * @description 타이틀에 들어갈 버튼 정보들
   */
  const titleButtonData = useMemo(() => {
    const buttonConfig1 = {
      type: 'button',
      data: {
        image: AUTO_MESSAGE_IMAGE,
        onClick: onClickVisible,
      },
      styles: {
        height: 2.5,
        width: 13.6,
      },
    };

    return [buttonConfig1];
  }, [onClickVisible]);

  /**
   * @description 타이틀에 들어갈 select 정보들
   */
  const titleSelectData = useMemo(() => {
    const selectConfig1 = {
      type: 'select',
      data: {
        disabled: loginInfo.admin_id < USER_TYPE.ADMIN,
        value: form.branch,
        name: 'branch',
        onChange: onChangeSelect,
        options: branchSelectOption,
      },
      styles: {
        borderColor: Colors.gray13,
        borderRadius: 0,
        fontColor: Colors.navy2,
        width: 251,
      },
    };

    return [selectConfig1];
  }, [branchSelectOption, form.branch, loginInfo.admin_id, onChangeSelect]);

  /**
   * @description 타이틀에 들어갈 tab 정보들
   */
  const titleTabData = useMemo(() => {
    const tabConfig1 = {
      type: 'tab',
      data: {
        onclick: onChangeSelectedTabIndex,
        selected: selectedTabIndex,
        tabs: tabTitle,
      },
    };

    return [tabConfig1];
  }, [onChangeSelectedTabIndex, selectedTabIndex]);

  /**
   * @description 타이틀 왼쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleRenderLeft = useCallback(
    (type: number) => {
      if (type === 1) {
        const renderData = [];

        renderData.push(...titleSelectData);

        return {
          renderConfig: renderData,
        };
      } else if (type === 2) {
        const renderData = [];

        renderData.push(...titleTabData);

        return {
          renderConfig: renderData,
        };
      }
    },
    [titleSelectData, titleTabData],
  );

  /**
   * @description 타이틀 오른쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleRenderRight = useCallback(
    (type: number) => {
      if (type === 1) {
      } else if (type === 2) {
        const renderData = [];

        renderData.push(...titleButtonData);

        if (selectedTabIndex === 1) {
          // 발송 수량은 버튼이 필요 없음
          renderData.pop();
        }

        return {
          renderConfig: renderData,
        };
      }
    },
    [titleButtonData, selectedTabIndex],
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
        leftMarginTop: 10,
      };
    } else if (type === 2) {
      return {
        borderBottomStyle: 'none',
        borderBottomWidth: 0,
        leftMarginTop: 7,
        rightMarginTop: 7,
      };
    }
  }, []);

  const getTableContent = useCallback(() => {
    if (selectedTabIndex === 0) {
      return tableContentAutoMessage;
    } else if (selectedTabIndex === 1) {
      return tableContentMaxCount;
    }

    return {
      data: [],
      type: 'none',
    };
  }, [selectedTabIndex, tableContentAutoMessage, tableContentMaxCount]);

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  useEffect(() => {
    if (!visible) {
      setSelectedAutoMessage(null);
    }
  }, [visible]);

  /**
   * @description 발송 수량 설정 화면인 경우 발송 수량 데이터 가져오기
   */
  useEffect(() => {
    if (selectedTabIndex === 0) {
      // 자동 문자 화면
      let branchId = form.branch;

      if (loginInfo.admin_id < USER_TYPE.ADMIN) {
        // 일반 관리자보다 권한이 낮은 경우 자기 지점만 볼 수 있음
        branchId = loginInfo.branch_id;
      }

      if (
        !removeAutoMessageStatus ||
        !addAutoMessageStatus ||
        !modifyAutoMessageStatus
      ) {
        getAutoMessage(branchId, page, defaultPageCount);
      }
    } else if (selectedTabIndex === 1) {
      // 발송 수량 설정 화면
      getSmsCount();
    }
  }, [
    addAutoMessageStatus,
    form.branch,
    getAutoMessage,
    getSmsCount,
    loginInfo.admin_id,
    loginInfo.branch_id,
    modifyAutoMessageStatus,
    page,
    removeAutoMessageStatus,
    selectedTabIndex,
  ]);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <TitleV2
            renderLeft={getTitleRenderLeft(1)}
            titleStyle={getTitleStyle(1)}
          />
        </StyledTitle>
        <StyledTitle>
          <TitleV2
            renderLeft={getTitleRenderLeft(2)}
            renderRight={getTitleRenderRight(2)}
            titleStyle={getTitleStyle(2)}
          />
        </StyledTitle>
        <StyledContent>
          <div>
            {selectedTabIndex === 0 ? (
              // 자동 문자
              <Table
                borderItem={tableHeadBorderStyle}
                contents={getTableContent()}
                headColor={Colors.white}
                headHeight={33.5}
                titles={settingAutoMessageTableTitles}
              />
            ) : (
              // 발송 수량 설정
              <Table
                borderItem={tableHeadBorderStyle}
                contents={getTableContent()}
                headColor={Colors.white}
                headHeight={33.5}
                titles={settingMessageCountTableTitles}
              />
            )}
          </div>
        </StyledContent>
        <StyledFooter>
          {selectedTabIndex === 0 ? (
            // 자동 문자
            <TablePagination
              count={maxAutoMessage}
              divide={defaultPageCount}
              curPage={page}
              onClickNextPage={onClickNextPage}
              onClickPrevPage={onClickPrevPage}
            />
          ) : null}
        </StyledFooter>
      </StyledWrapper>
      <Modal
        backgroundColor={Colors.white}
        Component={
          <AutoMessagePopup
            addAutoMessage={addAutoMessage}
            isVisible={visible}
            modifyAutoMessage={modifyAutoMessage}
            onClickVisible={onClickVisible}
            selectedAutoMessageData={selectedAutoMessage}
          />
        }
        height={643}
        isVisible={visible}
        paddingBottom={21}
        paddingLeft={36}
        paddingRight={36}
        paddingTop={24}
        width={400}
      />
    </>
  );
}

SMSView.defaultProps = {};

export default SMSView;

export type TOnClickModifyAutoMessagePopup = (item: IAutoMessageItem) => void;
