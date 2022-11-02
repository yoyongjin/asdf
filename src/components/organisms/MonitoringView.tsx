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
  USER_TYPE,
  ZIBOX_TRANSPORT,
  CONSULTANT_TEXT_STATUS,
  ZIBOX_MONIT_STATUS,
  CALL_STATUS_V2,
} from 'utils/constants';
import useMultiSelect from 'hooks/useMultiSelect';
import { Colors } from 'utils/color';
import useToggle from 'hooks/useToggle';
import { tableTitleMonitoring } from 'utils/table/title';
import TableRow from 'utils/table/row';
import MonitoringFormat from 'utils/format/monitoring';
import Utils from 'utils/new_utils';
import Toast from 'utils/toast';
import useCalculateCallTime from 'hooks/useCalculateCallTime';

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
  const { form, onChangeCheckBox, onChangeInput } = useInputForm({
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
    setInitializeConsultatns,
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
  const [isFirst, setIsFirst] = useState(false); // 최초 요청인지 여부
  useCalculateCallTime();

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

  const handleTapping = useCallback(
    (consultInfo: UserDataV2) => {
      const monitStatus =
        consultInfo.zibox?.monit_user === -1 ? '시작' : '종료';
      Toast.notification(`감청을 ${monitStatus}합니다.`);

      requestTapping(
        consultInfo.number!,
        loginInfo.id,
        consultInfo.zibox?.monit_user === -1 ? 1 : 0,
        constants.TRANSPORT === ZIBOX_TRANSPORT.OCX
          ? consultInfo.pc_ip!
          : consultInfo.zibox_ip!,
      );

      changeTappingData(
        1,
        constants.TRANSPORT === ZIBOX_TRANSPORT.OCX
          ? consultInfo.pc_ip!
          : consultInfo.zibox_ip!,
        consultInfo.id,
        consultInfo.number!,
      );

      const mode = constants.TRANSPORT;

      if (consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE) {
        if (consultInfo.zibox.monit_user !== loginInfo.id) {
          // 내가 감청을 하는 대상이 아닌 경우
          return;
        }

        // 감청 대상인 경우
        // 연결 끊기
        if (mode !== ZIBOX_TRANSPORT.SERVER) {
          setTimeout(() => {
            stopTapping();
          }, 2000);
        }
        return;
      }

      if (mode === ZIBOX_TRANSPORT.MQTT) {
        const options = {
          ip: consultInfo.zibox_ip!,
          mic_vol: consultInfo.zibox_mic!,
          spk_vol: consultInfo.zibox_spk!,
          target_id: loginInfo.id!,
          key: consultInfo.number!,
        };

        startTapping(options);
      } else if (mode === ZIBOX_TRANSPORT.OCX) {
        const options = {
          ip: consultInfo.pc_ip!,
          target_id: loginInfo.id!,
          key: consultInfo.number!,
        };

        startTapping(options);
      } else if (mode === ZIBOX_TRANSPORT.PACKET) {
        const options = {
          key: consultInfo.number!,
          ip: consultInfo.zibox?.zibox_ip!,
        };

        startTapping(options);
      }
    },
    [
      changeTappingData,
      loginInfo.id,
      requestTapping,
      startTapping,
      stopTapping,
    ],
  );

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
            handleTapping={handleTapping}
            loginData={loginInfo}
            setSeletedConsultantData={setSeletedConsultantData}
            tappingStatus={tappingStatus}
            tappingTarget={tappingTarget}
          />
        </StyledConsultant>
      );
    },
    [
      handleTapping,
      loginInfo,
      setSeletedConsultantData,
      tappingStatus,
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

  useEffect(() => {
    document.addEventListener('change-link', (event) => {});

    return () => {
      window.removeEventListener('change-link', handleWindowResize);
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

  const isValidateStatistics = useCallback((ids: string) => {
    if (ids.length < 1) {
      // 선택된 상담원이 없을 경우
      return {
        status: false,
        message: '상담원을 선택해주세요.',
      };
    }

    return {
      status: true,
      message: '',
    };
  }, []);

  const onClickGetUsers = useCallback(() => {
    const ids = pluralConsultantSelectedOption
      .map((consultant) => consultant.value)
      .join(','); // 상담원 여러명 선택

    const { status, message } = isValidateStatistics(ids);

    if (!status) {
      Toast.warning(`${message}🙄`);

      return;
    }

    getConsultants(ids, form.limit, form.page);
  }, [
    form.limit,
    form.page,
    getConsultants,
    isValidateStatistics,
    pluralConsultantSelectedOption,
  ]);

  const handleGetUsers = useCallback(() => {
    if (tappingTarget.id !== -1) {
      // 감청 중이기 때문에 조회하면 안 됨
      Toast.warning('감청을 종료해주세요.');
      return;
    }

    onClickGetUsers();
  }, [onClickGetUsers, tappingTarget.id]);

  /**
   * @description 타이틀에 들어갈 버튼 정보들
   */
  const titleButtonData = useMemo(() => {
    const buttonConfig1 = {
      type: 'button',
      data: {
        text: '조회',
        onClick: handleGetUsers,
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
  }, [handleGetUsers]);

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
              onClick: text ? handleTapping : undefined,
            },
            styles: {
              backgroundColor: 'inherit',
              height: 2.6,
              width: 7.5,
              fontColor: 'white',
              fontSize: 13,
              fontWeight: 800,
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

        if (type === '') {
          return {
            data: {
              text: '',
            },
            type: 'text',
          };
        }

        const [text, color] = (data as string).split(constants.PARSING_KEY);

        return {
          data: {
            text,
          },
          styles: {
            fontColor: color ?? 'inherit',
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
  }, [
    filteredConsultantInfo,
    handleTapping,
    loginInfo.id,
    tappingStatus,
    tappingTarget.id,
  ]);

  /**
   * @description 로그인한 유저가 상담원 권한일 경우 html title을 통화시간으로 보여주기
   */
  useEffect(() => {
    if (loginInfo.admin_id === USER_TYPE.CONSULTANT) {
      const [consultInfo] = filteredConsultantInfo.filter(
        (consultant) => consultant.id === loginInfo.id,
      );

      if (_.isEmpty(consultInfo)) return;

      if (consultInfo.call?.status === CALL_STATUS_V2.CONNECT) {
        document.title = consultInfo.calling_time
          ? Utils.getHourMinSecBySecond(consultInfo.calling_time)
          : '00:00:00';
      } else {
        document.title = '00:00:00';
      }
    }
  }, [filteredConsultantInfo, loginInfo.admin_id, loginInfo.id]);

  useEffect(() => {
    filteredConsultantInfo.map((consultInfo) => {
      if (
        consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE &&
        consultInfo.zibox?.monit_user === loginInfo.id &&
        tappingStatus !== 2
      ) {
        // 감청 중인 경우
        changeTappingData(
          2,
          constants.TRANSPORT === ZIBOX_TRANSPORT.OCX
            ? consultInfo.pc_ip!
            : consultInfo.zibox_ip!,
          consultInfo.id,
          consultInfo.number!,
        );
      } else if (
        consultInfo.id === tappingTarget.id &&
        consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.DISABLE &&
        tappingStatus !== 1
      ) {
        // 감청이 끝난 경우
        changeTappingData(0, '', -1, '');
      }

      if (
        consultInfo.call?.status === CALL_STATUS_V2.IDLE &&
        consultInfo.zibox?.monitoring === ZIBOX_MONIT_STATUS.ENABLE &&
        consultInfo.zibox?.monit_user === loginInfo.id
      ) {
        // 감청하고 있는 상담원이 통화 종료 했을 때 감청 종료 명령 날려주는 부분
        const mode = constants.TRANSPORT;

        if (mode === ZIBOX_TRANSPORT.SERVER) {
          requestTapping(
            consultInfo.number!,
            loginInfo.id,
            consultInfo.zibox?.monit_user === -1 ? 1 : 0,
            consultInfo.zibox_ip!,
          );
        } else {
          stopTapping();
        }
      }
    });
  }, [
    changeTappingData,
    filteredConsultantInfo,
    loginInfo.id,
    requestTapping,
    stopTapping,
    tappingStatus,
    tappingTarget.id,
  ]);

  /**
   * @description 리스트 초기화
   */
  useEffect(() => {
    return () => {
      setInitializeConsultatns();
    };
  }, [setInitializeConsultatns]);

  useEffect(() => {
    if (loginInfo.admin_id < USER_TYPE.ADMIN) {
      // 일반 관리자 하위 권한일 경우
      const selectedBranchs = pluralBranchOption.filter((item) => {
        return item.value === loginInfo.branch_id;
      });

      handlePluralBranchSelectedOption(selectedBranchs);

      return;
    }

    handlePluralBranchSelectedOption(pluralBranchOption);
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

      return;
    }

    handlePluralTeamSelectedOption(pluralTeamOption);
  }, [
    handlePluralTeamSelectedOption,
    loginInfo.admin_id,
    loginInfo.team_id,
    pluralBranchSelectedOption,
    pluralTeamOption,
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

    handlePluralConsultantSelectedOption(pluralConsultantOption);
  }, [
    handlePluralConsultantSelectedOption,
    pluralBranchSelectedOption,
    pluralConsultantOption,
    pluralTeamOption,
  ]);

  useEffect(() => {
    if (!isFirst && pluralConsultantSelectedOption.length > 0) {
      handleGetUsers();

      setIsFirst(true);
    }
  }, [
    handleGetUsers,
    isFirst,
    pluralConsultantSelectedOption.length,
    setIsFirst,
  ]);

  /**
   * @description 모니터링 테이블 내용 정보들
   */
  const tableContentMonitoring = useMemo(() => {
    return {
      data: tablePropertyMonitoring,
      originData: filteredConsultantInfo,
      styles: {
        rowHeight: 50,
      },
      type: 'monitoring',
    };
  }, [filteredConsultantInfo, tablePropertyMonitoring]);

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
                type={constants.IS_IE_BROWSER ? 'table' : 'grid'}
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
export type THandleTapping = (info: UserDataV2) => void;

export default Monitoring;
