import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Consultant, Title, UserInfo } from 'components/molecules';
import { COLORS } from 'utils/color';
import { TeamInfo, BranchInfo } from 'modules/types/branch';
import { Modal } from 'components/atoms';
import useUser from 'hooks/useUser';
import useMonitoring from 'hooks/useMonitoring';
import useBranch from 'hooks/useBranch';
import useInputForm from 'hooks/useInputForm';
import useAuth from 'hooks/useAuth';
import useVisible from 'hooks/useVisible';
import useZibox from 'hooks/useZibox';

const StyledWrapper = styled.div`
  /* Display */
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 3.75rem;
`;

const StyledConsultantArea = styled.div`
  /* Display */
  height: calc(100% - 3.75rem - 5px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: flex-start;
  margin-top: 5px;

  /* Other */
  overflow: auto;
`;

const StyledConsultant = styled.span`
  /* Display */
  padding-top: 7px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
`;

const adminList = [
  { id: 0, data: '상담원' },
  { id: 1, data: '관리자' },
];

function Monitoring({ location }: MonitoringProps) {
  const [tappingState, setTappingState] = useState<boolean>(false);
  const [tempConsultInfo, setTempConsultInfo] = useState();
  const { loginInfo } = useAuth();
  const { visible, onClickVisible } = useVisible();
  const { consultantInfo, getConsultantsInfo, onClickUpdateUser } = useUser();
  const { onRunTimer, onRemoveTimer } = useMonitoring();
  const { branchList, teamList, getBranchList, getTeamList } = useBranch();
  const { form, onChangeSelect, initTempValue } = useInputForm({
    branch: '-1',
    team: '-1',
  });
  const {
    initZibox,
    startMonitoring,
    stopMonitoring,
  } = useZibox();

  const selectInfo = useMemo(() => {
    return {
      color: COLORS.green,
      borderRadius: 0,
      borderColor: COLORS.green,
      data1: branchList as Array<BranchInfo>,
      data2: teamList as Array<TeamInfo>,
      width: 7.5,
      height: 1.75,
    };
  }, [branchList, teamList])

  const getConsultant = useCallback(
    (data: any) => {
      setTempConsultInfo(data);
      onClickVisible();
    },
    [setTempConsultInfo, onClickVisible],
  );

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      // 슈퍼관리자일 경우에만 요청
      getBranchList();
    }
  }, [getBranchList, loginInfo.admin_id]);

  useEffect(() => {
    if (form.branch) {
      initTempValue('team', '-1');
    }
  }, [initTempValue, form.branch]);

  useEffect(() => {
    let branchId = 0;
    if (loginInfo.admin_id === 2) {
      branchId = Number(form.branch);
      // getTeamList(Number(form.branch));
    } else if (loginInfo.admin_id === 1) {
      branchId = loginInfo.branch_id;
      // getTeamList(loginInfo.branch_id);
    } else {
      return;
    }

    getTeamList(branchId);
  }, [form.branch, loginInfo.admin_id, loginInfo.branch_id, getTeamList]);

  useEffect(() => {
    if (loginInfo.id) {
      getConsultantsInfo(
        Number(form.branch),
        Number(form.team),
        2000,
        1,
        '',
        location,
      );
    }
  }, [loginInfo, form.branch, form.team, location, getConsultantsInfo]);

  useEffect(() => {
    if (loginInfo.id) {
      onRunTimer();
    }
    return () => {
      onRemoveTimer();
    };
  }, [loginInfo, onRunTimer, onRemoveTimer]);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <Title
            selectType={selectInfo}
            onChangeSelect={onChangeSelect}
            branch={form.branch}
            team={form.team}
          >
            상담원 모니터링
          </Title>
        </StyledTitle>
        <StyledConsultantArea>
          {consultantInfo.map((consultant, i) => {
            if (loginInfo.admin_id === 0) {
              // 상담원이 로그인 했을 경우
              return null;
            }

            if (consultant.admin_id === 2 || consultant.admin_id === 1) {
              // 가져온 데이터 중 관리자 제거
              return null;
            }

            if (
              loginInfo.admin_id === 2 ||
              loginInfo.branch_id === consultant.branch_id
            ) {
              // 슈퍼관리자일 경우
              return (
                <StyledConsultant key={`styled-consultant-${consultant.id}`}>
                  <Consultant
                    key={`consultant-${consultant.id}`}
                    consultInfo={consultant}
                    onClickVisible={getConsultant}
                    initZibox={initZibox}
                    startMonitoring={startMonitoring}
                    stopMonitoring={stopMonitoring}
                    tappingState={tappingState}
                    setTappingState={setTappingState}
                    loginId={loginInfo.id}
                  />
                </StyledConsultant>
              );
            } else {
              return null;
            }
          })}
        </StyledConsultantArea>
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
            adminType={loginInfo.admin_id}
            branchId={loginInfo.branch_id}
            branchName={loginInfo.branch_name}
          />
        }
      />
    </>
  );
}

interface MonitoringProps extends RouteComponentProps {}

export default Monitoring