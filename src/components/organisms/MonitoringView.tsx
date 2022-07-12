import _ from 'lodash';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { BsList } from 'react-icons/bs';
import { FiGrid } from 'react-icons/fi';
import { RouteComponentProps } from 'react-router-dom';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeGrid } from 'react-window';
import styled from 'styled-components';

import { Modal } from 'components/atoms';
import { Consultant, TitleV2, UserData } from 'components/molecules';
import { IProperty as ITableProperty } from 'components/molecules/TableProperty';
import { Table } from 'components/organisms';
import { UserData as UserDataV2 } from 'types/user';
import useUser from 'hooks/useUser';
import useMonitoring from 'hooks/useMonitoring';
import useOrganization from 'hooks/useOrganization';
import useInputForm from 'hooks/useInputForm';
import useAuth from 'hooks/useAuth';
import useVisible from 'hooks/useVisible';
import useZibox from 'hooks/useZibox';
import constants, {
  SOCKET_CONNECTION,
  USER_TYPE,
  ZIBOX_TRANSPORT,
} from 'utils/constants';
import useMultiSelect from 'hooks/useMultiSelect';
import { Colors } from 'utils/color';
import useToggle from 'hooks/useToggle';
import { tableTitleMonitoring } from 'utils/table/title';
import TableRow from 'utils/table/row';
import MonitoringFormat from 'utils/format/monitoring';

const AREA_MAGIN = 27; //상담사 박스 영역 마진
const BOX_MAGIN = 5; //상담사 박스 마진

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  height: 4.275rem;
`;

const StyledConsultantAreaWrap = styled.div`
  display: flex;
  height: calc(100% - 8.5rem - 50px);
  justify-content: center;
  margin-top: 5px;
`;

const StyledConsultantArea = styled.div`
  flex: 1 1 auto;
  width: 100%;
`;

const StyledConsultant = styled.span`
  margin: 7px ${BOX_MAGIN}px 8px;
`;

function Monitoring({ location }: MonitoringProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [selectedConsultant, setSelectedConsultant] = useState<UserDataV2>();
  const { loginInfo, socketConnection, handleMonitoringView } = useAuth();
  const {
    getPluralBranch,
    getPluralTeam,
    pluralBranch,
    pluralTeam,
    setInitializePluralTeam,
  } = useOrganization();
  const { form, onChangeCheckBox, setSpecificValue, onChangeInput } =
    useInputForm({
      call: false, // 통화중
      wait: false, // 대기중
      logout: false, // 로그아웃
      page: 1,
      limit: 10000,
      left: 1.5,
      right: 1.5,
    });
  const { tappingStatus, changeTappingData, tappingTarget } = useMonitoring();
  const {
    consultantInfo,
    onClickModifyUser,
    getPluralConsultant,
    pluralConsultant,
    setInitializePluralConsultant,
    getConsultants,
  } = useUser();
  const { visible, onClickVisible } = useVisible();
  const { requestTapping, startTapping, stopTapping, setVolume } = useZibox();
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
  const { isToggle, onClickToggle } = useToggle(
    localStorage.getItem('monitoringView') === 'list',
  );

  const volumeData = useMemo(() => {
    if (loginInfo.admin_id === USER_TYPE.CONSULTANT) {
      return {
        count: 0,
        data: [],
        info: [],
        style: [],
      };
    }

    return {
      count: 2,
      data: [Number(form.left), Number(form.right)],
      info: [
        {
          name: 'left',
          step: 0.1,
          min: 0,
          max: 3,
          text: '상담원',
          change: onChangeInput,
        },
        {
          name: 'right',
          step: 0.1,
          min: 0,
          max: 3,
          text: '고객',
          change: onChangeInput,
        },
      ],
      style: [
        {
          textWeight: 700,
          textFamily: 'NanumBarunGothic',
        },
        {
          textWeight: 700,
          textFamily: 'NanumBarunGothic',
        },
      ],
    };
  }, [form.left, form.right, loginInfo.admin_id, onChangeInput]);

  const setSeletedConsultantData = useCallback(
    (consultantInfo: UserDataV2) => {
      setSelectedConsultant(consultantInfo);
      onClickVisible();
    },
    [onClickVisible],
  );

  const filteredConsultantInfo = useMemo(() => {
    return consultantInfo.filter((consultData) => {
      const { text } = MonitoringFormat.getConsultantStatus(
        consultData.call?.status,
        consultData.consultant?.status,
        consultData.phone?.connection,
      );

      if (!form.call && !form.logout && !form.wait) {
        return true;
      }

      if (
        form.call &&
        (text === CONSULTANT_TEXT_STATUS.CALL ||
          text === CONSULTANT_TEXT_STATUS.INCOMMING ||
          text === CONSULTANT_TEXT_STATUS.OFFHOOK)
      ) {
        // 발신, 수신, 통화 중인 경우
        return true;
      }

      if (
        form.logout &&
        (text === CONSULTANT_TEXT_STATUS.DISCONNECT ||
          text === CONSULTANT_TEXT_STATUS.LOGOUT)
      ) {
        // 미연결, 로그아웃인 경우
        return true;
      }

      if (form.wait && text === CONSULTANT_TEXT_STATUS.WAIT) {
        // 대기 중인경우
        return true;
      }

      return false;
    });
  }, [consultantInfo, form.call, form.logout, form.wait]);

  const consultantView = useCallback(
    (consultant: UserDataV2, style: React.CSSProperties) => {
      return (
        <StyledConsultant
          key={`${loginInfo.admin_id}-styled-consultant-${consultant.id}`}
          style={style}
        >
          <Consultant
            key={`${loginInfo.admin_id}-consultant-${consultant.id}`}
            consultInfo={consultant}
            loginData={loginInfo}
            setSeletedConsultantData={setSeletedConsultantData}
            changeTappingData={changeTappingData}
            tappingStatus={tappingStatus}
            requestTapping={requestTapping}
            startTapping={startTapping}
            stopTapping={stopTapping}
            tappingTarget={tappingTarget}
          />
        </StyledConsultant>
      );
    },
    [
      loginInfo,
      setSeletedConsultantData,
      changeTappingData,
      tappingStatus,
      requestTapping,
      startTapping,
      stopTapping,
      tappingTarget,
    ],
  );

  const handleWindowResize = (): void => {
    setWindowWidth(window.innerWidth);
  };

  const calculateMaxWidth = (): number => {
    const CONSULTANT_BOX_WIDTH = 200; // 상담사 박스 너비
    return (
      Math.floor(
        (windowWidth - 2 * AREA_MAGIN) / (CONSULTANT_BOX_WIDTH + 2 * BOX_MAGIN),
      ) *
      (CONSULTANT_BOX_WIDTH + 2 * BOX_MAGIN)
    );
  };

  useEffect(() => {
    if (tappingStatus === 2) {
      setVolume(1, form.left);
    }
  }, [tappingStatus, form.left, setVolume]);

  useEffect(() => {
    if (tappingStatus === 2) {
      setVolume(2, form.right);
    }
  }, [tappingStatus, form.right, setVolume]);

  useEffect((): any => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

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

  useEffect(() => {
    if (isToggle) {
      localStorage.setItem('monitoringView', 'list');
      handleMonitoringView('list');
      return;
    }

    localStorage.setItem('monitoringView', 'card');
    handleMonitoringView('card');
  }, [handleMonitoringView, isToggle]);

  const onClickGetUsers = useCallback(() => {
    const ids = pluralConsultantSelectedOption
      .map((consultant) => consultant.value)
      .join(','); // 상담원 여러명 선택

    getConsultants(ids, form.limit, form.page);
  }, [form.limit, form.page, getConsultants, pluralConsultantSelectedOption]);

  /**
   * @description 타이틀에 들어갈 버튼 정보들
   */
  const titleButtonData = useMemo(() => {
    const buttonConfig1 = {
      type: 'button',
      data: {
        text: '조회',
        onClick: () => onClickGetUsers(),
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

    return [buttonConfig1];
  }, [onClickGetUsers]);

  /**
   * @description 타이틀에 들어갈 text + checkbox 정보들
   */
  const titleTextCheckBoxData = useMemo(() => {
    const textCheckBoxConfig1 = {
      type: 'text-checkbox',
      data: {
        isChecked: form.call,
        isReverse: true,
        name: 'call',
        onChange: onChangeCheckBox,
        text: '통화중',
      },
      styles: {
        fontColor: Colors.navy2,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        fontWeight: 800,
      },
    };

    const textCheckBoxConfig2 = {
      type: 'text-checkbox',
      data: {
        isChecked: form.wait,
        isReverse: true,
        name: 'wait',
        onChange: onChangeCheckBox,
        text: '대기중',
      },
      styles: {
        fontColor: Colors.navy2,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        fontWeight: 800,
      },
    };

    const textCheckBoxConfig3 = {
      type: 'text-checkbox',
      data: {
        isChecked: form.logout,
        isReverse: true,
        name: 'logout',
        onChange: onChangeCheckBox,
        text: '로그아웃',
      },
      styles: {
        fontColor: Colors.navy2,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        fontWeight: 800,
      },
    };

    return [textCheckBoxConfig1, textCheckBoxConfig2, textCheckBoxConfig3];
  }, [form.call, form.logout, form.wait, onChangeCheckBox]);

  /**
   * @description 타이틀에 들어갈 multi selectbox 정보들
   */
  const titleMultiSelectData = useMemo(() => {
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
   * @description 타이틀에 들어갈 text 정보들
   */
  const titleTextData = useMemo(() => {
    const textConfig1 = {
      type: 'text',
      data: {
        text: '상담원 모니터링',
      },
      styles: {
        minWidth: 30,
      },
    };

    return [textConfig1];
  }, []);

  /**
   * @description 타이틀에 들어갈 icon 정보들
   */
  const titleIconData = useMemo(() => {
    const iconConfig1 = {
      type: 'icon',
      data: {
        icon: isToggle ? BsList : FiGrid,
        onClick: () => {
          onClickToggle();
        },
      },
    };

    return [iconConfig1];
  }, [isToggle, onClickToggle]);

  /**
   * @description 타이틀 왼쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getRenderLeft = useCallback(
    (type: number) => {
      if (type === 1) {
        const renderData = [];

        renderData.push(...titleTextData);

        return {
          renderConfig: renderData,
        };
      } else if (type === 2) {
        const renderData = [];
        const renderStyle = [];

        renderData.push(...titleMultiSelectData);
        renderData.push(...titleButtonData);

        for (let i = 0; i < renderData.length; i++) {
          const defaultRenderStyle = {
            paddingRight: 0,
          };

          if (i === 0 || i === 1) {
            defaultRenderStyle.paddingRight = 4;
          }

          if (i === 2) {
            defaultRenderStyle.paddingRight = 20;
          }

          renderStyle.push(defaultRenderStyle);
        }

        return {
          renderConfig: renderData,
          renderStyle,
        };
      }
    },
    [titleButtonData, titleMultiSelectData, titleTextData],
  );

  /**
   * @description 타이틀 오른쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getRenderRight = useCallback(
    (type: number) => {
      if (type === 1) {
        const renderData = [];

        renderData.push(...titleIconData);

        return {
          renderConfig: renderData,
        };
      } else if (type === 2) {
        const renderData = [];
        const renderStyle = [];
        renderData.push(...titleTextCheckBoxData);

        for (let i = 0; i < renderData.length; i++) {
          const defaultRenderStyle = {
            paddingRight: 0,
          };

          if (i === 0 || i === 1 || i === 2) {
            defaultRenderStyle.paddingRight = 5;
          }

          renderStyle.push(defaultRenderStyle);
        }

        return {
          renderConfig: renderData,
          renderStyle,
        };
      }
    },
    [titleIconData, titleTextCheckBoxData],
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
   * @description 모니터링 테이블 상세 내용 정보들
   */
  const tablePropertyMonitoring = useMemo(() => {
    return filteredConsultantInfo.map((values) => {
      const row = TableRow.getRowMonitoring(
        values,
        tappingStatus,
        loginInfo.id,
        tappingTarget.id === values.id,
      );

      const monitoringItems: Array<ITableProperty> = row.map((value, index) => {
        const { type, data } = value;

        if (type === 'button') {
          const { image, text } = data as { image: string; text: string };

          return {
            data: {
              image,
              text,
            },
            styles: {
              backgroundColor: 'inherit',
              height: 2.6,
              width: 7.5,
            },
            type: 'button',
          };
        }

        if (type === 'image') {
          const { image, text } = data as { image: string; text: string };

          return {
            data: {
              src: image,
              alt: text,
              height: 25,
              width: 27.5,
            },
            type: 'image',
          };
        }

        const [text, color] = (data as string).split(constants.PARSING_KEY);

        return {
          data: {
            text,
          },
          styles: {
            fontColor: color ?? 'inherit`',
            fontFamily: 'Malgun Gothic',
            fontSize: 12,
            fontWeight: color ? 700 : 400,
          },
          type: 'text',
          propertyStyles: {
            paddingLeft: index === 0 ? 10 : 0,
            width: tableTitleMonitoring[index].width,
          },
        };
      });

      return monitoringItems;
    });
  }, [filteredConsultantInfo, loginInfo.id, tappingStatus, tappingTarget.id]);

  /**
   * @description 모니터링 테이블 내용 정보들
   */
  const tableContentMonitoring = useMemo(() => {
    return {
      data: tablePropertyMonitoring,
      originData: consultantInfo,
      styles: {
        rowHeight: 50,
      },
      type: 'monitoring',
    };
  }, [consultantInfo, tablePropertyMonitoring]);

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
            renderRight={getRenderRight(2)}
            titleStyle={getTitleStyle(2)}
          />
        </StyledTitle>
        <StyledConsultantAreaWrap>
          {!isToggle ? (
            <StyledConsultantArea
              style={{ maxWidth: calculateMaxWidth() + 'px' }}
            >
              <AutoSizer defaultWidth={1920} defaultHeight={1080}>
                {({ width, height }) => {
                  const cardWidth = 210;
                  const cardHeight = 250;
                  const columnCount = Math.floor(width / cardWidth);
                  const rowCount = Math.ceil(
                    filteredConsultantInfo.length / columnCount,
                  );

                  return (
                    <FixedSizeGrid
                      style={{
                        overflowX: 'hidden',
                      }}
                      width={width}
                      height={height}
                      columnCount={columnCount}
                      columnWidth={cardWidth}
                      rowCount={rowCount}
                      rowHeight={cardHeight}
                      itemData={{
                        filteredConsultantInfo,
                        columnCount,
                      }}
                    >
                      {({ columnIndex, rowIndex, style, data }) => {
                        const { filteredConsultantInfo, columnCount } = data;
                        const singleColumnIndex =
                          columnIndex + rowIndex * columnCount;
                        const card = filteredConsultantInfo[singleColumnIndex];

                        if (!card) {
                          return null;
                        }

                        if (loginInfo.admin_id === USER_TYPE.CONSULTANT) {
                          if (card.id === loginInfo.id) {
                            return consultantView(card, style);
                          }
                          return null;
                        }

                        return consultantView(card, style);
                      }}
                    </FixedSizeGrid>
                  );
                }}
              </AutoSizer>
            </StyledConsultantArea>
          ) : (
            <StyledConsultantArea>
              <Table
                borderItem={tableHeadBorderStyle}
                contents={tableContentMonitoring}
                headColor={Colors.white}
                headHeight={33.5}
                isVirtual
                titles={tableTitleMonitoring}
              />
            </StyledConsultantArea>
          )}
        </StyledConsultantAreaWrap>
      </StyledWrapper>
      <Modal
        isVisible={visible}
        Component={
          <UserData
            loginData={loginInfo}
            isVisible={visible}
            onClickModifyUser={onClickModifyUser}
            onClickVisible={onClickVisible}
            userData={selectedConsultant}
          />
        }
      />
    </>
  );
}

interface MonitoringProps extends RouteComponentProps {}

export type SetSeletedConsultantData = (consultantData: UserDataV2) => void;

export default Monitoring;
