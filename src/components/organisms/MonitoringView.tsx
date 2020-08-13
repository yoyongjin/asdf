import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Consultant, Title } from 'components/molecules';
import { COLORS } from 'utils/color';
import useUser from 'hooks/useUser';
import useMonitoring from 'hooks/useMonitoring';
import useSocket from 'hooks/useSocket';
import useAuth from 'hooks/useAuth';

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

function Monitoring({ location }: MonitoringProps) {
  const { consultantInfo, getConsultantsInfo } = useUser();
  const { onRunTimer, onRemoveTimer } = useMonitoring();

  const selectInfo = {
    color: COLORS.green,
    borderRadius: 0,
    data: [
      {
        id: 1,
        option: ['전체 지점', '대박', '쪽박'],
      },
      { id: 2, option: ['팀', '1팀', '2팀', '3팀'] },
    ],
  };

  // useEffect(() => {
  //   if (loginInfo && loginInfo.id) {
  //     getInitInfo(consultantInfo);
  //     getCallStates(consultantInfo);
  //   }
  // }, [getInitInfo, getCallStates, loginInfo, consultantInfo]);

  useEffect(() => {
    getConsultantsInfo(-1, -1, 2000, 1, '', location);
  }, [getConsultantsInfo]);

  useEffect(() => {
    onRunTimer();
    return () => {
      onRemoveTimer();
    };
  }, [onRunTimer, onRemoveTimer]);

  console.log('Lendering MonitoringView');
  return (
    <StyledWrapper>
      <StyledTitle>
        <Title>상담원 모니터링</Title>
      </StyledTitle>
      <StyledConsultantArea>
        {consultantInfo.map((consultant, i) => {
          if (consultant.admin_id === '2') {
            return null;
          }
          return (
            <StyledConsultant key={`styled-consultant-${consultant.id}`}>
              <Consultant
                key={`consultant-${consultant.id}`}
                consultInfo={consultant}
              />
            </StyledConsultant>
          );
        })}
      </StyledConsultantArea>
    </StyledWrapper>
  );
}

interface MonitoringProps extends RouteComponentProps {}

export default Monitoring;
