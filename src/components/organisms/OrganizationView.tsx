import React from 'react';
import styled from 'styled-components';

import { Organization, Title } from 'components/molecules';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 10%;
`;

const StyledOrganizationArea = styled.div`
  height: 90%;
  display: flex;
  flex-wrap: wrap;

  /* Other */
  overflow-x: auto;
`;

const StyledOrganization = styled.div`
  padding-top: 1rem;
`;

function OrganizationView() {
  const buttonType = {
    title: '+ 지점 추가하기',
  };
  const explanType = {
    title: '※ 팀추가 : 팀명 입력 후 엔터',
  };

  console.log('Lendering OrganizationView');
  return (
    <StyledWrapper>
      <StyledTitle>
        <Title buttonType={buttonType} explanType={explanType}>
          조직 관리
        </Title>
      </StyledTitle>
      <StyledOrganizationArea>
        <StyledOrganization>
          <Organization />
        </StyledOrganization>
      </StyledOrganizationArea>
    </StyledWrapper>
  );
}

interface OrganizationViewProps {}

OrganizationView.defaultProps = {};

export default OrganizationView;
