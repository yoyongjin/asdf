import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'components/atoms';
import { Consultant, Title, UserData } from 'components/molecules';
import { ConsultantInfo } from 'types/user';
import useUser from 'hooks/useUser';
import useMonitoring from 'hooks/useMonitoring';
import useBranch from 'hooks/useBranch';
import useInputForm from 'hooks/useInputForm';
import useAuth from 'hooks/useAuth';
import useVisible from 'hooks/useVisible';
import useZibox from 'hooks/useZibox';

import { CONSULTANT_BOX_WIDTH, SOCKET_CONNECTION } from 'utils/constants';

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
  height: calc(100% - 6rem - 10px);
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

const adminList = [
  { id: 0, data: '상담원' },
  { id: 1, data: '관리자' },
];

let branch = -1; // 임시 지점 번호
let team = -1; // 임시 팀 번호
let request = false;

function Monitoring({ location }: MonitoringProps) {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [tempConsultInfo, setTempConsultInfo] = useState<ConsultantInfo>();
  const { loginInfo, socketConnection } = useAuth();
  const { branchList, teamList, getBranchList, getTeamList } = useBranch();
  const { form, onChangeSelect, setKeyValue, onChangeInput } = useInputForm({
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
  const {
    consultantInfo,
    filterConsultantInfo,
    getUsers,
    resetFilteredList,
    onClickUpdateUser,
    onClickDisconnect,
  } = useUser();
  const { visible, onClickVisible } = useVisible();
  const { connectZibox, requestTapping, startTapping, stopTapping, setVolume } =
    useZibox();

  const selectData = useMemo(() => {
    return {
      count: 2,
      data: [branchList, teamList],
      info: [
        {
          id: loginInfo.admin_id === 1 ? loginInfo.branch_id : form.branch,
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
    branchList,
    form.branch,
    form.team,
    loginInfo.admin_id,
    loginInfo.branch_id,
    onChangeSelect,
    teamList,
  ]);

  const volumeData = useMemo(() => {
    return {
      count: 2,
      data: [Number(form.left), Number(form.right)],
      info: [
        {
          name: 'left',
          step: 0.1,
          min: 0,
          max: 3,
          text: '고객',
          change: onChangeInput,
        },
        {
          name: 'right',
          step: 0.1,
          min: 0,
          max: 3,
          text: '상담원',
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
  }, [form.left, form.right, onChangeInput]);

  const getConsultantInfo = useCallback(
    (consultantInfo: ConsultantInfo) => {
      setTempConsultInfo(consultantInfo);
      onClickVisible();
    },
    [setTempConsultInfo, onClickVisible],
  );

  const getUsers2 = useCallback(
    (
      branchId: number,
      teamId: number,
      count: number,
      page: number,
      path: string,
      adminId?: number,
      loginId?: number,
    ) => {
      getUsers(branchId, teamId, count, page, '', path, adminId, loginId);
    },
    [getUsers],
  );

  const consultantView = useCallback(
    (consultant: ConsultantInfo) => {
      return (
        <StyledConsultant
          key={`${loginInfo.admin_id}-${form.branch}-${form.team}-styled-consultant-${consultant.id}`}
        >
          <Consultant
            key={`${loginInfo.admin_id}-${form.branch}-${form.team}-consultant-${consultant.id}`}
            consultInfo={consultant}
            loginId={loginInfo.id}
            getConsultantInfo={getConsultantInfo}
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
      loginInfo.admin_id,
      loginInfo.id,
      form.branch,
      form.team,
      getConsultantInfo,
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

  useEffect(() => {
    if (!tempConsultInfo) {
      return;
    }
    const consultant = consultantInfo.find((consultant) => {
      return consultant.id === tempConsultInfo!.id;
    });

    if (
      consultant?.zibox !== tempConsultInfo?.zibox ||
      consultant?.phone !== tempConsultInfo?.phone
    ) {
      setTempConsultInfo(consultant);
    }
  }, [consultantInfo, tempConsultInfo]);

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
    if (socketConnection !== SOCKET_CONNECTION.SUCCESS) return;

    if (loginInfo.admin_id === 2) {
      // 슈퍼 관리자
      if (form.branch === -1 && filterConsultantInfo.length > 0) {
        // 필터링된 유저 리스트에서 전체 지점명을 볼 경우 필터링된 유저 리스트 초기화
        resetFilteredList(2);
      }

      if (consultantInfo.length > 0) {
        if (form.branch === -1 && request) {
          branch = form.branch;
          team = form.team;
          return;
        }

        if (form.branch !== branch || form.team !== team || !request) {
          // 지점명 또는 팀명 선택이 변경될 경우
          getUsers2(
            form.branch,
            form.team,
            2000,
            1,
            location.pathname,
            loginInfo.admin_id,
            loginInfo.id,
          );
          branch = form.branch;
          team = form.team;
        }
        return;
      }

      // 첫 상담원 정보 가져올 때
      getUsers2(
        form.branch,
        form.team,
        2000,
        1,
        location.pathname,
        loginInfo.admin_id,
        loginInfo.id,
      );
      branch = form.branch;
      team = form.team;
      request = true;
    } else if (loginInfo.admin_id === 1) {
      // 일반 관리자
      if (form.team === -1 && filterConsultantInfo.length > 0) {
        // 필터링된 유저 리스트에서 전체 지점명을 볼 경우 필터링된 유저 리스트 초기화
        resetFilteredList(2);
      }

      if (consultantInfo.length > 0) {
        if (form.team === -1 && request) {
          team = form.team;
          return;
        }

        if (form.team !== team || !request) {
          // 지점 또는 팀 선택이 변경될 경우
          getUsers2(
            loginInfo.branch_id,
            form.team,
            2000,
            1,
            location.pathname,
            loginInfo.admin_id,
            loginInfo.id,
          );
          team = form.team;
        }
        return;
      }

      // 첫 상담원 정보 가져올 때
      getUsers2(
        loginInfo.branch_id,
        form.team,
        2000,
        1,
        location.pathname,
        loginInfo.admin_id,
        loginInfo.id,
      );
      team = form.team;
    }
  }, [
    socketConnection,
    loginInfo.id,
    loginInfo.admin_id,
    loginInfo.branch_id,
    form.branch,
    form.team,
    consultantInfo.length,
    filterConsultantInfo.length,
    location.pathname,
    getUsers2,
    resetFilteredList,
  ]);

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      // 슈퍼관리자일 경우에만 지점명 가져오기
      getBranchList();
    }
  }, [getBranchList, loginInfo.admin_id]);

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      // 슈퍼 관리자
      getTeamList(form.branch);
    } else if (loginInfo.admin_id === 1) {
      // 일반 관리자
      getTeamList(loginInfo.branch_id);
    }
  }, [loginInfo.admin_id, loginInfo.branch_id, form.branch, getTeamList]);

  useEffect(() => {
    // 지점명 변경 시 팀 id 초기화
    setKeyValue('team', -1);
  }, [form.branch, setKeyValue]);

  useEffect((): any => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleWindowResize = (): void => {
    setWindowWidth(window.innerWidth);
  };

  const calculateMaxWidth = (): number => {
    return (
      Math.floor(
        (windowWidth - 2 * AREA_MAGIN) / (CONSULTANT_BOX_WIDTH + 2 * BOX_MAGIN),
      ) *
      (CONSULTANT_BOX_WIDTH + 2 * BOX_MAGIN)
    );
  };

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
            {loginInfo.admin_id === 2
              ? form.branch === -1 && form.team === -1
                ? consultantInfo.map((consultant, i) => {
                    return consultantView(consultant);
                  })
                : filterConsultantInfo.map((consultant, i) => {
                    return consultantView(consultant);
                  })
              : loginInfo.admin_id === 1
              ? form.team === -1
                ? consultantInfo.map((consultant, i) => {
                    if (consultant.branch_id !== loginInfo.branch_id)
                      return null;
                    return consultantView(consultant);
                  })
                : filterConsultantInfo.map((consultant, i) => {
                    if (consultant.branch_id !== loginInfo.branch_id)
                      return null;
                    return consultantView(consultant);
                  })
              : null}
          </StyledConsultantArea>
        </StyledConsultantAreaWrap>
      </StyledWrapper>
      <Modal
        isVisible={visible}
        Component={
          <UserData
            isVisible={visible}
            onClickVisible={onClickVisible}
            adminList={adminList}
            onClickUpdateUser={onClickUpdateUser}
            data={tempConsultInfo}
            adminId={loginInfo.admin_id}
            branchId={loginInfo.branch_id}
            branchName={loginInfo.branch_name!}
            onClickDisconnect={onClickDisconnect}
          />
        }
      />
    </>
  );
}

interface MonitoringProps extends RouteComponentProps {}

export default Monitoring;
