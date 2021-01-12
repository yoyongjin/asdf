import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { Organization, Title } from 'components/molecules';
import useBranch from 'hooks/useBranch';
import usePage from 'hooks/usePage';
import useAuth from 'hooks/useAuth';

import insertBranchImage from 'images/bt-add-g-1-nor@3x.png';
import insertBranchHoverImage from 'images/bt-add-g-1-over.png';
import zmsInsertBranchImage from 'images/zms/bt-add-g-1-nor@3x.png';
import Logger from 'utils/log';
import { COLORS } from 'utils/color';

import { company, COMPANY } from 'utils/constants';

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
  const { loginInfo } = useAuth();
  const {
    branchInfo,
    getBranchInfo,
    onClickAddTempBranch,
    handleAddBranch,
    handleAddTeam,
    handleUpdateTeam,
    handleUpdateBranch,
    handleDeleteTeam,
    handleDeleteBranch,
  } = useBranch();
  const { page, countBranch, onClickNextPage, onClickPrevPage } = usePage();

  useEffect(() => {
    if (loginInfo.id) {
      getBranchInfo();
    }
  }, [loginInfo, getBranchInfo]);

  const buttonType = {
    title: '',
    onClick: onClickAddTempBranch,
    bgImage: insertBranchImage,
    bgHoverImage: insertBranchHoverImage,
    type: 'organization',
  };

  const zmsButtonType = {
    title: '',
    onClick: onClickAddTempBranch,
    bgImage: zmsInsertBranchImage,
    bgHoverImage: zmsInsertBranchImage,
    type: 'organization',
  };

  const explanType = {
    title: '※ 팀추가 : 팀명 입력 후 엔터',
  };

  const pageType = useCallback(() => {
    const type = {
      curPage: page,
      count: countBranch,
      onClickNextPage: onClickNextPage,
      onClickPrevPage: onClickPrevPage,
    };
    return type;
  }, [countBranch, page, onClickPrevPage, onClickNextPage]);

  const branchKeys = Object.getOwnPropertyNames(branchInfo).reverse();
  const branchValues = Object.values(branchInfo).reverse();

  Logger.log('Lendering OrganizationView');
  return (
    <StyledWrapper>
      <StyledTitle>
        <Title
          buttonType={company === COMPANY.DBLIFE ? buttonType : zmsButtonType}
          explanType={explanType}
          pageType={pageType()}
          adminType={loginInfo.admin_id}
          color={company === COMPANY.DBLIFE ? COLORS.green : COLORS.light_blue2}
          bdBottomColor={
            company === COMPANY.DBLIFE ? COLORS.green : COLORS.light_blue
          }
        >
          조직 관리
        </Title>
      </StyledTitle>
      <StyledOrganizationArea>
        {branchKeys.map((value, i) => {
          if (Math.floor(i / 5) + 1 === page) {
            return (
              <StyledOrganization key={`styled-organization-${value}`}>
                <Organization
                  index={i}
                  key={`organization-${value}`}
                  branch={branchValues[i]}
                  branchId={Number(value)}
                  handleAddBranch={handleAddBranch}
                  handleAddTeam={handleAddTeam}
                  handleUpdateTeam={handleUpdateTeam}
                  handleUpdateBranch={handleUpdateBranch}
                  handleDeleteTeam={handleDeleteTeam}
                  handleDeleteBranch={handleDeleteBranch}
                />
              </StyledOrganization>
            );
          }
        })}
      </StyledOrganizationArea>
    </StyledWrapper>
  );
}

interface OrganizationViewProps {}

OrganizationView.defaultProps = {};

export default OrganizationView;
