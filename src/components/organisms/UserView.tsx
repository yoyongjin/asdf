import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'components/atoms';
import { Title, TablePagination, UserInfo } from 'components/molecules';
import { Table } from 'components/organisms';
import { COLORS } from 'utils/color';
import useUser from 'hooks/useUser';
import usePage from 'hooks/usePage';
import useVisible from 'hooks/useVisible';
import useBranch from 'hooks/useBranch';

import threeDotsIcon from 'images/bt-user-modi-nor@2x.png';
import hoverThreeDotsIcon from 'images/bt-user-modi-over@2x.png';
import { TeamInfo } from 'modules/types/branch';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  width: 100%;
  height: 3.75rem;
`;

const StyledUserListArea = styled.div`
  width: 100%;
  height: calc(100% - 3.75rem);
`;

const StyledUserList = styled.div`
  padding-top: 1.25rem;
`;

const StyledUserPage = styled.div`
  padding-top: 2.5rem;
  padding-left: 20rem;
  padding-right: 20rem;
`;

const adminList = [
  { id: 0, data: '상담원' },
  { id: 1, data: '관리자' },
];

function UserView({ location }: UserViewProps) {
  const { consultantInfo, getConsultantsInfo, onClickInsertUser, onClickUpdateUser } = useUser();
  const { branchList, teamList, getBranchList, getTeamList } = useBranch();
  const { countUser, page, onClickNextPage, onClickPrevPage } = usePage();
  const { visible, onClickVisible } = useVisible();

  const selectInfo = {
    color: COLORS.dark_gray1,
    borderRadius: 1,
    borderColor: COLORS.dark_gray4,
    data1: branchList as Array<BranchInfo>,
    data2: teamList as Array<TeamInfo>,
  };

  const tableTitle = [
    'No.',
    '지점명',
    '팀명',
    '권한',
    '이름',
    '아이디',
    '전화번호',
    'ZiBox IP',
    '',
  ];

  useEffect(() => {
    getConsultantsInfo(location, -1, -1, 5, page);
  }, [getConsultantsInfo, page]);

  useEffect(() => {
    getBranchList();
    getTeamList(1);
  }, [getBranchList, getTeamList]);

  const buttonInfo = {
    title: '+ 사용자 등록',
    onClick: onClickVisible,
  };

  console.log('Lendering UserView');
  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <Title buttonType={buttonInfo} selectType={selectInfo} isSearch>
            사용자 관리
          </Title>
        </StyledTitle>
        <StyledUserListArea>
          <StyledUserList>
            <Table
              tableTitle={tableTitle}
              consultantInfo={consultantInfo}
              threeDotsIcon={threeDotsIcon}
              hoverThreeDotsIcon={hoverThreeDotsIcon}
              branchList={selectInfo.data1}
              teamList={selectInfo.data2}
              adminList={adminList}
              onClickUpdateUser={onClickUpdateUser}
            ></Table>
          </StyledUserList>
          <StyledUserPage>
            <TablePagination
              curPage={page}
              count={countUser}
              onClickNextPage={onClickNextPage}
              onClickPrevPage={onClickPrevPage}
            ></TablePagination>
          </StyledUserPage>
        </StyledUserListArea>
      </StyledWrapper>
      <Modal
        isVisible={visible}
        Component={
          <UserInfo
            onClickVisible={onClickVisible}
            branchList={selectInfo.data1}
            teamList={selectInfo.data2}
            adminList={adminList}
            onClickInsertUser={onClickInsertUser}
          />
        }
      />
    </>
  );
}

interface BranchInfo {
  branch_name: string;
  created_at: string;
  id: number;
}

interface UserViewProps extends RouteComponentProps {}

UserView.defaultProps = {};

export default UserView;
