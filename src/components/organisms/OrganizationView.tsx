import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { Organization, Title } from 'components/molecules';
import useAuth from 'hooks/useAuth';
import useBranch from 'hooks/useBranch';
import usePage from 'hooks/usePage';
import constants, { COMPANY_TYPE, USER_TYPE } from 'utils/constants';

import DB_addBranchImage from 'images/bt-add-g-1-nor.png';
import addBranchImage from 'images/zms/bt-add-g-1-nor.png';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 6rem;
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

  const buttonData = useMemo(() => {
    return {
      count: 1,
      info: [
        {
          image:
            constants.COMPANY === COMPANY_TYPE.DBLIFE
              ? DB_addBranchImage
              : addBranchImage,
          click: onClickAddTempBranch,
        },
      ],
      hidden: loginInfo.admin_id !== USER_TYPE.SUPER_ADMIN ? true : false,
    };
  }, [loginInfo.admin_id, onClickAddTempBranch]);

  const explanData = {
    title: '※ 팀추가 : 팀명 입력 후 엔터',
  };

  const pageData = useMemo(() => {
    return {
      max: countBranch,
      cur: page,
      click_next: onClickNextPage,
      click_prev: onClickPrevPage,
    };
  }, [countBranch, onClickNextPage, onClickPrevPage, page]);

  const branchKeys = Object.getOwnPropertyNames(branchInfo).reverse();
  const branchValues = Object.values(branchInfo).reverse();

  return (
    <StyledWrapper>
      <StyledTitle>
        <Title
          isButton
          isExplan
          isPage
          buttonData={buttonData}
          explanData={explanData}
          pageData={pageData}
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
