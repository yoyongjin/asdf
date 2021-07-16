import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { Organization, Title } from 'components/molecules';
import useAuth from 'hooks/useAuth';
import useOrganization from 'hooks/useOrganization';
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
  padding-top: 20px;
  padding-right: 20px;
`;

function OrganizationView() {
  const { loginInfo } = useAuth();
  const {
    organizations,
    getOrganizations,
    onClickAddTempBranch,
    handleAddBranch,
    handleAddTeam,
    handleModifyBranch,
    handleModifyTeam,
    handleRemoveBranch,
    handleRemoveTeam,
  } = useOrganization();
  const { page, countBranch, onClickNextPage, onClickPrevPage } = usePage();

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

  const branchIdList = Object.getOwnPropertyNames(organizations).reverse();
  const organizationDataList = Object.values(organizations).reverse();

  useEffect(() => {
    if (loginInfo.id) {
      // 로그인 시 조직 정보 가져오기
      getOrganizations();
    }
  }, [loginInfo, getOrganizations]);

  console.log(organizations);

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
        {branchIdList.map((value, i) => {
          if (Math.floor(i / 5) + 1 === page) {
            return (
              <StyledOrganization key={`styled-organization-${value}`}>
                <Organization
                  index={i}
                  key={`organization-${value}`}
                  organizationDataList={organizationDataList[i]}
                  branchId={Number(value)}
                  handleAddBranch={handleAddBranch}
                  handleAddTeam={handleAddTeam}
                  handleModifyBranch={handleModifyBranch}
                  handleModifyTeam={handleModifyTeam}
                  handleRemoveBranch={handleRemoveBranch}
                  handleRemoveTeam={handleRemoveTeam}
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
