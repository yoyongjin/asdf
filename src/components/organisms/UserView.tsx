import React, { useEffect, useCallback } from 'react';
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
import useInputForm from 'hooks/useInputForm';

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
  const {
    userInfo,
    getConsultantsInfo,
    onClickInsertUser,
    onClickUpdateUser,
    onClickDeleteUser,
  } = useUser();
  const { branchList, teamList, getBranchList, getTeamList } = useBranch();
  const { countUser, page, onClickNextPage, onClickPrevPage } = usePage();
  const { visible, onClickVisible } = useVisible();
  const { form, onChangeSelect, onChange, initTempValue } = useInputForm({
    branch: '-1',
    team: '-1',
    search: '',
  });

  const onClickSearch = useCallback(() => {
    let branch_id = -1;
    let team_id = -1;
    if (form.branch) {
      branch_id = Number(form.branch);
    }
    if (form.team) {
      team_id = Number(form.team);
    }
    getConsultantsInfo(branch_id, team_id, 5, page, form.search, location);
  }, [form.branch, form.team, form.search, getConsultantsInfo, page]);

  useEffect(() => {
    getBranchList();
  }, [getBranchList]);

  useEffect(() => {
    if (form.branch === '-1') {
      initTempValue('team', '-1');
    }
  }, [initTempValue, form.branch]);

  useEffect(() => {
    if (form.search === '') {
      let branch_id = -1;
      let team_id = -1;
      if (form.branch) {
        branch_id = Number(form.branch);
      }
      if (form.team) {
        team_id = Number(form.team);
      }

      getConsultantsInfo(branch_id, team_id, 5, page, '', location);
    }
  }, [getConsultantsInfo, page, form.branch, form.team, form.search]);

  useEffect(() => {
    getTeamList(Number(form.branch));
  }, [getTeamList, form.branch]);

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

  const buttonInfo = {
    title: '+ 사용자 등록',
    onClick: onClickVisible,
  };

  console.log('Lendering UserView');
  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <Title
            buttonType={buttonInfo}
            selectType={selectInfo}
            isSearch
            branch={form.branch}
            team={form.team}
            search={form.search}
            onChange={onChange}
            onChangeSelect={onChangeSelect}
            onClickSearch={onClickSearch}
          >
            사용자 관리
          </Title>
        </StyledTitle>
        <StyledUserListArea>
          <StyledUserList>
            <Table
              tableTitle={tableTitle}
              userInfo={userInfo}
              threeDotsIcon={threeDotsIcon}
              hoverThreeDotsIcon={hoverThreeDotsIcon}
              branchList={selectInfo.data1}
              teamList={selectInfo.data2}
              adminList={adminList}
              onClickUpdateUser={onClickUpdateUser}
              getBranchList={getBranchList}
              getTeamList={getTeamList}
              onClickDeleteUser={onClickDeleteUser}
              page={page}
              branchId={Number(form.branch)}
              teamId={Number(form.team)}
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
            // branchList={branchList!}
            // teamList={teamList!}
            adminList={adminList}
            onClickInsertUser={onClickInsertUser}
            // getBranchList={getBranchList}
            // getTeamList={getTeamList}
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
