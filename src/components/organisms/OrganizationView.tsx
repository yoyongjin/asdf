import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { Organization, Title } from 'components/molecules';
import useBranch from 'hooks/useBranch';
import usePage from 'hooks/usePage';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 3.75rem;
`;

const StyledOrganizationArea = styled.div`
  /* Display */
  height: calc(100% - 3.75rem);
  display: flex;
  overflow-y: auto;
`;

const StyledOrganization = styled.div`
  padding-top: 1rem;
`;

function OrganizationView() {
  const {
    branchInfo,
    getBranchInfo,
    onClickAddTempBranch,
    handleAddBranch,
    handleAddTeam,
    handleUpdateTeam,
    handleUpdateBranch,
  } = useBranch();
  const { page, countBranch } = usePage();

  useEffect(() => {
    getBranchInfo();
  }, [getBranchInfo]);

  const buttonType = {
    title: '+ 지점 추가하기',
    onClick: onClickAddTempBranch,
  };

  const explanType = {
    title: '※ 팀추가 : 팀명 입력 후 엔터',
  };

  const pageType = useCallback(() => {
    const type = {
      curPage: page,
      count: countBranch,
    };
    return type;
  }, [countBranch, page]);

  const branchKeys = Object.getOwnPropertyNames(branchInfo).reverse();
  const branchValues = Object.values(branchInfo).reverse();

  console.log('Lendering OrganizationView');
  return (
    <StyledWrapper>
      <StyledTitle>
        <Title
          buttonType={buttonType}
          explanType={explanType}
          pageType={pageType()}
        >
          조직 관리
        </Title>
      </StyledTitle>
      <StyledOrganizationArea>
        {branchKeys.map((value, i) => {
          return (
            <StyledOrganization key={`styled-organization-${value}`}>
              <Organization
                key={`organization-${value}`}
                branch={branchValues[i]}
                branchId={Number(value)}
                handleAddBranch={handleAddBranch}
                handleAddTeam={handleAddTeam}
                handleUpdateTeam={handleUpdateTeam}
                handleUpdateBranch={handleUpdateBranch}
              />
            </StyledOrganization>
          );
        })}
      </StyledOrganizationArea>
    </StyledWrapper>
  );
}

interface OrganizationViewProps {}

OrganizationView.defaultProps = {};

export default OrganizationView;
