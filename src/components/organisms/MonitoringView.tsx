import React from 'react';
import styled from 'styled-components';

import { Consultant, Title } from 'components/molecules';
import {COLORS} from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 10%;
`;

const StyledConsultantArea = styled.div`
  /* Display */
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  /* Other */
  overflow-x: auto;
`;

const StyledConsultant = styled.span`
  /* Display */
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

function Monitoring() {
  const consultantInfo = [
    {
      id: 9,
      branch_name: '을지로입구지',
      team_name: '1팀',
      admin_id: '1',
      name: 'name7',
      user_name: 'test07',
      number: '01044312797',
      ziboxip: '192.168.1.116',
      login_at: 1595984326361,
    },
    {
      id: 8,
      branch_name: '을지로입구지',
      team_name: '1팀',
      admin_id: '1',
      name: 'name6',
      user_name: 'test06',
      number: '01044312797',
      ziboxip: '192.168.1.116',
      login_at: 1595903545028,
    },
    {
      id: 7,
      branch_name: '을지로입구지',
      team_name: '1팀',
      admin_id: '1',
      name: 'name5',
      user_name: 'test05',
      number: '01044312797',
      ziboxip: '192.168.1.116',
      login_at: 1595903541751,
    },
  ];

  const callInfo = [
    {
      id: 9,
      number: '01044312797',
      status: 0, // 대기
      call_at: 0,
    },
    {
      id: 8,
      number: '01044312797',
      status: 1, // 통화 중
      call_at: 365,
    },
    {
      id: 7,
      number: '01044312797',
      status: 1,
      call_at: 593,
    },
  ];

  const selectInfo = {
    color: COLORS.green,
    data: [
      {
        id: 1,
        option: ['전체 지점', '대박', '쪽박'],
      },
      { id: 2, option: ['팀', '1팀', '2팀', '3팀'] },
    ],
  };

  return (
    <StyledWrapper>
      <StyledTitle>
        <Title selectType={selectInfo}>상담원 모니터링</Title>
      </StyledTitle>
      <StyledConsultantArea>
        {consultantInfo.map((consultant, i) => {
          return (
            <StyledConsultant key={`styled-consultant-${consultant.id}`}>
              <Consultant
                key={`consultant-${consultant.id}`}
                consultInfo={consultant}
                callInfo={callInfo[i]}
              />
            </StyledConsultant>
          );
        })}
      </StyledConsultantArea>
    </StyledWrapper>
  );
}

export default Monitoring;
