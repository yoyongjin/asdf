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
import useFetch from 'hooks/useFetch';
import useInputForm from 'hooks/useInputForm';
import useMessage from 'hooks/useMessage';
import useOrganization from 'hooks/useOrganization';
import useTab from 'hooks/useTab';
import usePage from 'hooks/usePage';
import useVisible from 'hooks/useVisible';
import AUTO_MESSAGE_IMAGE from 'images/bt-add-auto-msg.png';
import { IAutoMessageItem } from 'types/message';
import { Colors } from 'utils/color';
import constants, { ANSWER_VALUE, USER_TYPE } from 'utils/constants';
import TableRow from 'utils/table/row';
import {
  tableTitleSettingAutoMessage,
  tableTitleSettingMessageCount,
} from 'utils/table/title';
import Toast from 'utils/toast';

const tabTitle = [
  {
    name: '자동 문자 설정',
  },
  {
    name: '발송 수량 설정',
  },
];

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

const selectBoxPageLimitOption = [...new Array(3)].map((values, index) => {
  return {
    id: 5 * (index + 1),
    data: `${5 * (index + 1)}`,
  };
});

function MessageView() {
  const [selectedAutoMessage, setSelectedAutoMessage] =
    useState<IAutoMessageItem | null>(null);
  const { loginInfo } = useAuth();
  const { onChangeSelectedTabIndex, selectedTabIndex } = useTab();
  const { form, onChangeSelect } = useInputForm({
    branch:
      loginInfo.admin_id < USER_TYPE.ADMIN
        ? loginInfo.branch_id
        : constants.DEFAULT_ID, // 센터 관리자부터 하위 관리자들은 자신의 센터만 볼 수 있다.
    limit: 15,
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
  const {
    maxAutoMessage,
    page,
    onChangeCurrentPage,
    onClickNextPage,
    onClickPrevPage,
  } = usePage();
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

  const handleRemoveAutoMessage = useCallback(
    (id: number) => {
      if (loginInfo.admin_id < constants.ADMIN.REMOVE_AUTO_MESSAGE) {
        Toast.warning('삭제 권한이 없습니다.🙄');

        return;
      }

      removeAutoMessage(id);
    },
    [loginInfo.admin_id, removeAutoMessage],
  );

  const handleUsedAutoMessage = useCallback(
    (id: number, used: string) => {
      if (loginInfo.admin_id < constants.ADMIN.MODIFY_AUTO_MESSAGE) {
        Toast.warning('수정 권한이 없습니다.🙄');

        return;
      }

      setUsedAutoMessage(id, used);
    },
    [loginInfo.admin_id, setUsedAutoMessage],
  );

  const handleModifyMessageCount = useCallback(
    (id: number, maxCountDate: number, maxCountMonth: number) => {
      if (loginInfo.admin_id < constants.ADMIN.MODIFY_MESSAGE_COUNT_ADMIN) {
        Toast.warning('수정 권한이 없습니다.🙄');

        return;
      }

      modifySmsCount(id, maxCountDate, maxCountMonth);
    },
    [loginInfo.admin_id, modifySmsCount],
  );

  /**
   * @description 자동 메시지 테이블 상세 내용 정보들
   */
  const tablePropertyAutoMessage = useMemo(() => {
    let _autoMessageData = _.cloneDeep(autoMessageData);

    return _autoMessageData.map((values) => {
      const row = TableRow.getRowAutoMessage(values);

      const autoMessageItems: Array<ITableProperty> = row.map(
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
                onClick: handleUsedAutoMessage,
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
              paddingLeft: 10,
            },
          };
        },
      );

      const removeData = {
        data: {
          text: '삭제',
          onClick: handleRemoveAutoMessage,
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
    handleRemoveAutoMessage,
    handleUsedAutoMessage,
    onClickModifyAutoMessagePopup,
  ]);

  /**
   * @description 발송 수량 설정 테이블 상세 내용 정보들
   */
  const tablePropertyMaxCount = useMemo(() => {
    let _maxCountData = _.cloneDeep(maxCountData);

    if (form.branch !== constants.DEFAULT_ID) {
      // 센터이 선택된 경우
      _maxCountData = maxCountData.filter(
        (values) => values.branch_id === form.branch,
      );
    }

    return _maxCountData.map((values) => {
      const row = TableRow.getRowMaxMessage(values);

      const maxCountItems: Array<ITableProperty> = row.map((value, index) => {
        if (index === 1 || index === 2) {
          return {
            data: {
              disabled: loginInfo.admin_id < USER_TYPE.BRANCH_ADMIN, // 센터관리자보다 낮을 경우 수정 불가
              isNumber: true,
              value: value,
            },
            styles: {
              borderRadius: 0,
              height: 2.8,
              textAlign: 1,
              width: 9.9,
            },
            type: 'input',
            propertyStyles: {
              paddingLeft: 10,
            },
          };
        }

        return {
          data: {
            text: value,
          },
          type: 'text',
          propertyStyles: {
            paddingLeft: 10,
          },
        };
      });

      const addData = {
        data: {
          text: '저장',
          onClick: handleModifyMessageCount,
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
        },
      };

      maxCountItems.push(addData);

      return maxCountItems;
    });
  }, [form.branch, handleModifyMessageCount, loginInfo.admin_id, maxCountData]);

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
    let _maxCountData = _.cloneDeep(maxCountData);

    if (form.branch !== constants.DEFAULT_ID) {
      // 센터이 선택된 경우
      _maxCountData = maxCountData.filter(
        (values) => values.branch_id === form.branch,
      );
    }

    return {
      data: tablePropertyMaxCount,
      originData: _maxCountData,
      styles: {
        rowHeight: 45,
      },
      type: 'message-count',
    };
  }, [form.branch, maxCountData, tablePropertyMaxCount]);

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

    const selectConfig2 = {
      type: 'select',
      data: {
        name: 'limit',
        onChange: onChangeSelect,
        options: selectBoxPageLimitOption,
        value: form.limit,
      },
      styles: {
        borderColor: Colors.gray7,
        borderRadius: 12.5,
        fontColor: Colors.gray4,
        width: 50,
      },
    }; // 페이지 개수

    return [selectConfig1, selectConfig2];
  }, [
    branchSelectOption,
    form.branch,
    form.limit,
    loginInfo.admin_id,
    onChangeSelect,
  ]);

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

  const titleTextData = useMemo(() => {
    const textConfig1 = {
      type: 'text',
      data: {
        text: `발송수량의 값이 0이면, "제한없음"을 뜻함`,
      },
      styles: {
        fontColor: Colors.gray1,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        minWidth: 300,
      },
    };

    const textConfig2 = {
      type: 'text',
      data: {
        text: '조회 개수 : ',
      },
      styles: {
        fontColor: Colors.gray1,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        minWidth: 30,
      },
    };

    return [textConfig1, textConfig2];
  }, []);

  /**
   * @description 타이틀 왼쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleRenderLeft = useCallback(
    (type: number) => {
      if (type === 1) {
        const renderData = [];

        const [selectConfig1] = titleSelectData;

        renderData.push(selectConfig1);

        return {
          renderConfig: renderData,
        };
      } else if (type === 2) {
        const renderData = [];

        renderData.push(...titleTabData);

        if (selectedTabIndex === 1) {
          // 발송 수량 설정 화면에 설명 text 필요
          const [textConfig1] = titleTextData;

          renderData.push(textConfig1);
        }

        const renderStyle = [];

        for (let i = 0; i < renderData.length; i++) {
          const defaultRenderStyle = {
            paddingRight: 50,
          };

          if (selectedTabIndex === 1) {
            // 발송 수량 설정 화면에 설명 text로 인한 css
            renderStyle.push(defaultRenderStyle);
          }
        }

        return {
          renderConfig: renderData,
          renderStyle: renderStyle.length < 1 ? undefined : renderStyle,
        };
      }
    },
    [selectedTabIndex, titleSelectData, titleTabData, titleTextData],
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
        const renderStyle = [];

        if (selectedTabIndex === 0) {
          // 자동 문자 설정
          const [selectConfig1, selectConfig2] = titleSelectData;
          const [textConfig1, textConfig2] = titleTextData;

          renderData.push(textConfig2);
          renderData.push(selectConfig2);

          if (loginInfo.admin_id >= constants.ADMIN.ADD_AUTO_MESSAGE) {
            // 로그인 유저의 권한이 정의된 자동 문자 추가 권한보다 클 경우
            renderData.push(...titleButtonData);
          }

          for (let i = 0; i < renderData.length; i++) {
            const defaultRenderStyle = {
              paddingRight: 0,
            };

            if (i === 0) {
              defaultRenderStyle.paddingRight = 10;
            }

            if (i === 1) {
              defaultRenderStyle.paddingRight = 20;
            }

            renderStyle.push(defaultRenderStyle);
          }

          return {
            renderConfig: renderData,
            renderStyle,
          };
        } else if (selectedTabIndex === 1) {
        }
      }
    },
    [
      loginInfo.admin_id,
      selectedTabIndex,
      titleButtonData,
      titleSelectData,
      titleTextData,
    ],
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
    if (loginInfo.id) {
      if (selectedTabIndex === 0) {
        // 자동 문자 화면
        let branchId = form.branch;

        if (loginInfo.admin_id < USER_TYPE.ADMIN) {
          // 일반 관리자보다 권한이 낮은 경우 자기 센터만 볼 수 있음
          branchId = loginInfo.branch_id;
        }

        if (
          !removeAutoMessageStatus &&
          !addAutoMessageStatus &&
          !modifyAutoMessageStatus
        ) {
          getAutoMessage(branchId, page, form.limit);
        }
      }
    }
  }, [
    addAutoMessageStatus,
    form.branch,
    form.limit,
    getAutoMessage,
    loginInfo.admin_id,
    loginInfo.branch_id,
    loginInfo.id,
    modifyAutoMessageStatus,
    page,
    removeAutoMessageStatus,
    selectedTabIndex,
  ]);

  useEffect(() => {
    if (selectedTabIndex === 1) {
      // 발송 수량 설정 화면
      getSmsCount();
    }
  }, [getSmsCount, selectedTabIndex]);

  /**
   * @description 현재 페이지가 최대 페이지보다 큰 경우 현재 페이지를 최대 페이지로 변경
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // 비로그인인 경우
      return;
    }

    onChangeCurrentPage(page, maxAutoMessage, form.limit);
  }, [form.limit, loginInfo.id, maxAutoMessage, onChangeCurrentPage, page]);

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
                titles={tableTitleSettingAutoMessage}
              />
            ) : (
              // 발송 수량 설정
              <Table
                borderItem={tableHeadBorderStyle}
                contents={getTableContent()}
                headColor={Colors.white}
                headHeight={33.5}
                titles={tableTitleSettingMessageCount}
              />
            )}
          </div>
        </StyledContent>
        <StyledFooter>
          {selectedTabIndex === 0 ? (
            // 자동 문자
            <TablePagination
              count={maxAutoMessage}
              divide={form.limit}
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
            loginInfo={loginInfo}
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

MessageView.defaultProps = {};

export default MessageView;

export type TOnClickModifyAutoMessagePopup = (item: IAutoMessageItem) => void;
