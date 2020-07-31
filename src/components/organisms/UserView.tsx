import React from 'react';
import styled from 'styled-components';

import { Title } from 'components/molecules';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 10%;
`;

const StyledUserListArea = styled.div`
  height: 90%;
  display: flex;
`;

const StyledUserList = styled.div`
  padding-top: 1rem;
`;

function User() {
  const buttonInfo = {
    title: '+ 사용자 등록',
  };
  const selectInfo = {
    color: COLORS.dark_gray4,
    borderRadius: 1,
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
        <Title buttonType={buttonInfo} selectType={selectInfo} isSearch>
          사용자 관리
        </Title>
      </StyledTitle>
      <StyledUserListArea>
        <StyledUserList>test</StyledUserList>
      </StyledUserListArea>
    </StyledWrapper>
  );
}

interface UserProps {}

User.defaultProps = {};

export default User;
