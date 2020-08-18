import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Consultant, Title, UserInfo } from 'components/molecules';
import { COLORS } from 'utils/color';
import useUser from 'hooks/useUser';
import useMonitoring from 'hooks/useMonitoring';
import useBranch from 'hooks/useBranch';
import { TeamInfo, BranchInfo } from 'modules/types/branch';
import useInputForm from 'hooks/useInputForm';
import useAuth from 'hooks/useAuth';
import { Modal } from 'components/atoms';
import useVisible from 'hooks/useVisible';
import useZibox from 'hooks/useZibox';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 3.75rem;
`;

const StyledConsultantArea = styled.div`
  /* Display */
  height: calc(100%-3.75rem);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledConsultant = styled.span`
  /* Display */
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const adminList = [
  { id: 0, data: '상담원' },
  { id: 1, data: '관리자' },
];

function Monitoring({ location }: MonitoringProps) {
  const [tappingState, setTappingState] = useState<boolean>(false);
  const { loginInfo } = useAuth();
  const { visible, onClickVisible } = useVisible();
  const { consultantInfo, getConsultantsInfo, onClickUpdateUser } = useUser();
  const { onRunTimer, onRemoveTimer } = useMonitoring();
  const { branchList, teamList, getBranchList, getTeamList } = useBranch();
  const { form, onChangeSelect, initTempValue } = useInputForm({
    branch: '-1',
    team: '-1',
  });
  const { initZibox, startMonitoring, stopMonitoring, emitMonitoring } = useZibox();

  const selectInfo = {
    color: COLORS.green,
    borderRadius: 0,
    borderColor: COLORS.green,
    data1: branchList as Array<BranchInfo>,
    data2: teamList as Array<TeamInfo>,
  };

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      // 슈퍼관리자일 경우에만 요청
      getBranchList();
    }
  }, [getBranchList, loginInfo]);

  useEffect(() => {
    if (form.branch) {
      initTempValue('team', '-1');
    }
  }, [initTempValue, form.branch]);

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      getTeamList(Number(form.branch));
    }
    if (loginInfo.admin_id === 1) {
      getTeamList(loginInfo.branch_id);
    }
  }, [getTeamList, form.branch, loginInfo]);

  useEffect(() => {
    getConsultantsInfo(
      Number(form.branch),
      Number(form.team),
      2000,
      1,
      '',
      location,
    );
  }, [getConsultantsInfo, form.branch, form.team]);

  useEffect(() => {
    onRunTimer();
    return () => {
      onRemoveTimer();
    };
  }, [onRunTimer, onRemoveTimer]);

  // console.log('Lendering MonitoringView');
  return (
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
              <>
                <StyledConsultant key={`styled-consultant-${consultant.id}`}>
                  <Consultant
                    key={`consultant-${consultant.id}`}
                    consultInfo={consultant}
                    onClickVisible={onClickVisible}
                    initZibox={initZibox}
                    startMonitoring={startMonitoring}
                    stopMonitoring={stopMonitoring}
                    tappingState={tappingState}
                    setTappingState={setTappingState}
                    loginId={loginInfo.id}
                    emitMonitoring={emitMonitoring}
                  />
                </StyledConsultant>
                <Modal
                  isVisible={visible}
                  Component={
                    <UserInfo
                      isVisible={visible}
                      onClickVisible={onClickVisible}
                      adminList={adminList}
                      onClickUpdateUser={onClickUpdateUser}
                      data={consultant}
                    />
                  }
                />
              </>
            );
          } else {
            return null;
          }
        })}
      </StyledConsultantArea>
    </StyledWrapper>
    
  );
}

interface MonitoringProps extends RouteComponentProps {}

export default Monitoring;
