import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'components/atoms';
import { Consultant, Title, UserInfo } from 'components/molecules';
import { COLORS } from 'utils/color';
import { TeamInfo, BranchInfo } from 'modules/types/branch';
import { ConsultantInfoType } from 'types/user';
import useUser from 'hooks/useUser';
import useMonitoring from 'hooks/useMonitoring';
import useBranch from 'hooks/useBranch';
import useInputForm from 'hooks/useInputForm';
import useAuth from 'hooks/useAuth';
import useVisible from 'hooks/useVisible';
import useZibox from 'hooks/useZibox';

import {
  company,
  COMPANY_MAP,
  CONSULTANT_BOX_WIDTH,
  SOCKET_CONNECTION,
} from 'utils/constants';

const AREAMAGIN = 27; //상담사 박스 영역 마진
const BOXMAGIN = 5; //상담사 박스 마진

const StyledWrapper = styled.div`
  /* Display */
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 3.75rem;
`;

const StyledConsultantAreaWrap = styled.div`
  /* Display */
  height: calc(100% - 3.75rem - 10px);
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
  /* padding-top: 7px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px; */

  margin: 7px ${BOXMAGIN}px 8px;
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
  const [tempConsultInfo, setTempConsultInfo] = useState<ConsultantInfoType>();
  const { loginInfo, socketConnection } = useAuth();
  const { branchList, teamList, getBranchList, getTeamList } = useBranch();
  const { form, onChangeSelect, setKeyValue, onChangeInput } = useInputForm({
    branch: -1,
    team: -1,
    left: 1.5,
    right: 1.5,
  });
  const { tapping, changeTapping } = useMonitoring();
  const {
    consultantInfo,
    filterConsultantInfo,
    getUsers,
    resetFilteredList,
    onClickUpdateUser,
    onClickDisconnect,
  } = useUser();
  const { visible, onClickVisible } = useVisible();
  const { connectZibox, startTapping, stopTapping, setVolume } = useZibox();

  const volumeInfo = useMemo(() => {
    return {
      left_vol: form.left,
      right_vol: form.right,
    };
  }, [form.left, form.right]);

  const selectInfo = useMemo(() => {
    return {
      color:
        company === COMPANY_MAP.DBLIFE
          ? COLORS.green
          : COMPANY_MAP.LINA
          ? COLORS.blue
          : COLORS.light_blue,
      borderRadius: 0,
      borderColor:
        company === COMPANY_MAP.DBLIFE
          ? COLORS.green
          : COMPANY_MAP.LINA
          ? COLORS.blue
          : COLORS.light_blue,
      data1: branchList as Array<BranchInfo>,
      data2: teamList as Array<TeamInfo>,
      height: 1.75,
      width: 7.5,
    };
  }, [branchList, teamList]);

  const getConsultantInfo = useCallback(
    (consultantInfo: ConsultantInfoType) => {
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
    (consultant: ConsultantInfoType) => {
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
            changeTapping={changeTapping}
            tapping={tapping}
            startTapping={startTapping}
            stopTapping={stopTapping}
          />
        </StyledConsultant>
      );
    },
    [
      getConsultantInfo,
      loginInfo.id,
      loginInfo.admin_id,
      form.branch,
      form.team,
      tapping,
      changeTapping,
      connectZibox,
      startTapping,
      stopTapping,
    ],
  );

  useEffect(() => {
    if (tapping) {
      setVolume(0, form.left);
    }
  }, [tapping, form.left, setVolume]);

  useEffect(() => {
    if (tapping) {
      setVolume(1, form.right);
    }
  }, [tapping, form.right, setVolume]);

  useEffect(() => {
    let index: number = consultantInfo.findIndex((consultant, i) => {
      return tempConsultInfo?.id === consultant.id;
    });
    if (index > -1) {
      setTempConsultInfo(consultantInfo[index]);
    }
  }, [tempConsultInfo, consultantInfo]);

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
        (windowWidth - 2 * AREAMAGIN) / (CONSULTANT_BOX_WIDTH + 2 * BOXMAGIN),
      ) *
      (CONSULTANT_BOX_WIDTH + 2 * BOXMAGIN)
    );
  };

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <Title
            selectType={selectInfo}
            volumeType={volumeInfo}
            onChangeSelect={onChangeSelect}
            onChangeInput={onChangeInput}
            setVolume={setVolume}
            branch={
              loginInfo.admin_id === 1 ? loginInfo.branch_id : form.branch
            }
            team={form.team}
            color={
              company === COMPANY_MAP.DBLIFE ? COLORS.green : COLORS.light_blue2
            }
            bdBottomColor={
              company === COMPANY_MAP.DBLIFE ? COLORS.green : COLORS.light_blue
            }
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
          <UserInfo
            isVisible={visible}
            onClickVisible={onClickVisible}
            adminList={adminList}
            onClickUpdateUser={onClickUpdateUser}
            data={tempConsultInfo}
            adminId={loginInfo.admin_id}
            branchId={loginInfo.branch_id}
            branchName={loginInfo.branch_name}
            onClickDisconnect={onClickDisconnect}
          />
        }
      />
    </>
  );
}

interface MonitoringProps extends RouteComponentProps {}

export default Monitoring;
