import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'components/atoms';
import { Consultant, Title, UserData } from 'components/molecules';
import { UserData as UserDataV2 } from 'types/user';
import useUser from 'hooks/useUser';
import useMonitoring from 'hooks/useMonitoring';
import useOrganization from 'hooks/useOrganization';
import useInputForm from 'hooks/useInputForm';
import useAuth from 'hooks/useAuth';
import useVisible from 'hooks/useVisible';
import useZibox from 'hooks/useZibox';

import { SOCKET_CONNECTION, USER_TYPE } from 'utils/constants';

const AREA_MAGIN = 27; //상담사 박스 영역 마진
const BOX_MAGIN = 5; //상담사 박스 마진

const StyledWrapper = styled.div`
  /* Display */
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 6rem;
`;

const StyledConsultantAreaWrap = styled.div`
  /* Display */
  height: calc(100% - 6rem - 30px);
  display: flex;
  justify-content: center;
  margin-top: 5px;

  /* Other */
  overflow: auto;
`;

const StyledConsultantArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: row;
`;

const StyledConsultant = styled.span`
  /* Display */
  margin: 7px ${BOX_MAGIN}px 8px;
`;

function Monitoring({ location }: MonitoringProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [selectedConsultant, setSelectedConsultant] = useState<UserDataV2>();
  const { loginInfo, socketConnection } = useAuth();
  const { branches, teams, getBranches, getTeams } = useOrganization();
  const { form, onChangeSelect, setSpecificValue, onChangeInput } =
    useInputForm({
      branch: -1,
      team: -1,
      left: 1.5,
      right: 1.5,
    });
  const {
    tappingStatus,
    changeTappingData,
    changeTappingStatus,
    tappingTarget,
  } = useMonitoring();
  const { consultantInfo, getUsers, onClickModifyUser } = useUser();
  const { visible, onClickVisible } = useVisible();
  const { connectZibox, requestTapping, startTapping, stopTapping, setVolume } =
    useZibox();

  const selectData = useMemo(() => {
    const _branches = branches!.map((values) => {
      return {
        id: values.id,
        data: values.branch_name,
      };
    });

    const _teams = teams!.map((values) => {
      return {
        id: values.id,
        data: values.team_name,
      };
    });

    if (
      loginInfo.admin_id === USER_TYPE.TEAM_ADMIN ||
      loginInfo.admin_id === USER_TYPE.CONSULTANT
    ) {
      return {
        count: 0,
        data: [],
        info: [
          {
            id: 0,
            name: '',
            click: () => null,
          },
        ],
        style: [
          {
            width: 0,
            height: 0,
            borderRadius: 0,
          },
        ],
      };
    }

    if (loginInfo.admin_id === USER_TYPE.BRANCH_ADMIN) {
      return {
        count: 1,
        data: [_teams],
        info: [
          {
            id: form.team,
            name: 'team',
            click: onChangeSelect,
          },
        ],
        style: [
          {
            width: 120,
            height: 28,
            borderRadius: 0,
          },
        ],
      };
    }

    return {
      count: 2,
      data: [_branches, _teams],
      info: [
        {
          id: form.branch,
          name: 'branch',
          click: onChangeSelect,
        },
        {
          id: form.team,
          name: 'team',
          click: onChangeSelect,
        },
      ],
      style: [
        {
          width: 120,
          height: 28,
          borderRadius: 0,
        },
        {
          width: 120,
          height: 28,
          borderRadius: 0,
        },
      ],
    };
  }, [
    branches,
    form.branch,
    form.team,
    loginInfo.admin_id,
    onChangeSelect,
    teams,
  ]);

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

  const getUsers2 = useCallback(
    (
      branchId: number,
      teamId: number,
      count: number,
      page: number,
      path: string,
    ) => {
      getUsers(branchId, teamId, count, page, '', path);
    },
    [getUsers],
  );

  const consultantView = useCallback(
    (consultant: UserDataV2) => {
      return (
        <StyledConsultant
          key={`${loginInfo.admin_id}-${form.branch}-${form.team}-styled-consultant-${consultant.id}`}
        >
          <Consultant
            key={`${loginInfo.admin_id}-${form.branch}-${form.team}-consultant-${consultant.id}`}
            consultInfo={consultant}
            loginData={loginInfo}
            setSeletedConsultantData={setSeletedConsultantData}
            connectZibox={connectZibox}
            changeTappingData={changeTappingData}
            tappingStatus={tappingStatus}
            requestTapping={requestTapping}
            startTapping={startTapping}
            stopTapping={stopTapping}
            changeTappingStatus={changeTappingStatus}
            tappingTarget={tappingTarget}
          />
        </StyledConsultant>
      );
    },
    [
      loginInfo,
      form.branch,
      form.team,
      setSeletedConsultantData,
      connectZibox,
      changeTappingData,
      tappingStatus,
      requestTapping,
      startTapping,
      stopTapping,
      changeTappingStatus,
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
    if (socketConnection !== SOCKET_CONNECTION.SUCCESS) return;

    console.log(loginInfo.admin_id);
    if (
      loginInfo.admin_id === USER_TYPE.SUPER_ADMIN ||
      loginInfo.admin_id === USER_TYPE.ADMIN
    ) {
      // 슈퍼 관리자
      getUsers2(form.branch, form.team, 2000, 1, location.pathname);
    } else if (loginInfo.admin_id === USER_TYPE.BRANCH_ADMIN) {
      // 지점 관리자
      getUsers2(loginInfo.branch_id, form.team, 2000, 1, location.pathname);
    } else if (loginInfo.admin_id === USER_TYPE.TEAM_ADMIN) {
      // 팀 관리자
      getUsers2(
        loginInfo.branch_id,
        loginInfo.team_id,
        2000,
        1,
        location.pathname,
      );
    } else if (loginInfo.admin_id === USER_TYPE.CONSULTANT) {
      // 상담원
      getUsers2(
        loginInfo.branch_id,
        loginInfo.team_id,
        2000,
        1,
        location.pathname,
      );
    }
  }, [
    form.branch,
    form.team,
    getUsers2,
    location.pathname,
    loginInfo.admin_id,
    loginInfo.branch_id,
    loginInfo.id,
    loginInfo.team_id,
    socketConnection,
  ]);

  useEffect(() => {
    if (
      loginInfo.admin_id === USER_TYPE.SUPER_ADMIN ||
      loginInfo.admin_id === USER_TYPE.ADMIN
    ) {
      // 슈퍼관리자 / 일반 관리자일 경우에만 지점명 가져오기
      getBranches();
    }
  }, [getBranches, loginInfo.admin_id]);

  useEffect(() => {
    if (
      loginInfo.admin_id === USER_TYPE.SUPER_ADMIN ||
      loginInfo.admin_id === USER_TYPE.ADMIN
    ) {
      // 슈퍼 관리자 / 일반 관리자
      getTeams(form.branch);
    } else if (loginInfo.admin_id === USER_TYPE.BRANCH_ADMIN) {
      // 지점 관리자
      getTeams(loginInfo.branch_id);
    }
  }, [form.branch, getTeams, loginInfo.admin_id, loginInfo.branch_id]);

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

  useEffect(() => {
    // 지점명 변경 시 팀 id 초기화
    setSpecificValue('team', -1);
  }, [form.branch, setSpecificValue]);

  useEffect((): any => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <Title
            isSelect
            isVolume
            selectData={selectData}
            volumeData={volumeData}
          >
            상담원 모니터링
          </Title>
        </StyledTitle>
        <StyledConsultantAreaWrap>
          <StyledConsultantArea
            style={{ maxWidth: calculateMaxWidth() + 'px' }}
          >
            {consultantInfo.map((consultant, i) => {
              if (loginInfo.admin_id === USER_TYPE.CONSULTANT) {
                if (consultant.id === loginInfo.id) {
                  return consultantView(consultant);
                }

                return null;
              }

              return consultantView(consultant);
            })}
          </StyledConsultantArea>
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
