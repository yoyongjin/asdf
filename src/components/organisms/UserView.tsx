import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'components/atoms';
import { Title, TablePagination, UserInfo } from 'components/molecules';
import { Table } from 'components/organisms';
import { TeamInfo, BranchInfo } from 'modules/types/branch';
import { COLORS } from 'utils/color';
import useUser from 'hooks/useUser';
import usePage from 'hooks/usePage';
import useVisible from 'hooks/useVisible';
import useBranch from 'hooks/useBranch';
import useInputForm from 'hooks/useInputForm';
import useAuth from 'hooks/useAuth';

import threeDotsIcon from 'images/bt-user-modi-nor@2x.png';
import hoverThreeDotsIcon from 'images/bt-user-modi-over@2x.png';
import addUserImage from 'images/bt-add-u-1-nor@3x.png';
import addUserHoverImage from 'images/bt-add-u-1-over@3x.png';

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
  padding-top: 20px;
`;

const StyledUserPage = styled.div`
  padding-top: 46px;
`;

const adminList = [
  { id: 0, data: '상담원' },
  { id: 1, data: '관리자' },
];

const tableTitle = [
  { title: 'No.', width: 7 },
  { title: '지점명', width: 14 },
  { title: '팀명', width: 7 },
  { title: '권한', width: 7 },
  { title: '이름.', width: 7 },
  { title: '아이디.', width: 14 },
  { title: '전화번호.', width: 14 },
  { title: 'ZiBox IP.', width: 20 },
  { title: '', width: 10 },
];

function UserView({ location }: UserViewProps) {
  const { loginInfo } = useAuth();
  const {
    userInfo,
    getConsultantsInfo,
    onClickInsertUser,
    onClickUpdateUser,
    onClickDeleteUser,
    onClickResetPassword,
  } = useUser();
  const { branchList, teamList, getBranchList, getTeamList } = useBranch();
  const {
    countUser,
    page,
    onClickNextPage,
    onClickPrevPage,
    onChnageCurrentPage,
  } = usePage();
  const { visible, onClickVisible } = useVisible();
  const { form, onChangeSelect, onChangeInput, initTempValue } = useInputForm({
    branch: '-1',
    team: '-1',
    search: '',
  });

  const selectInfo = {
    color: COLORS.dark_gray1,
    borderRadius: 1,
    borderColor: COLORS.dark_gray4,
    data1: branchList as Array<BranchInfo>,
    data2: teamList as Array<TeamInfo>,
    width: 9.3,
    height: 1.5,
    paddingLeft: 16,
  };

  const buttonInfo = {
    title: '+ 사용자 등록',
    bgImage: addUserImage,
    bgHoverImage: addUserHoverImage,
    type: 'user',
    onClick: onClickVisible,
  };

  const onClickSearch = useCallback(() => {
    getConsultantsInfo(
      Number(form.branch),
      Number(form.team),
      5,
      page,
      form.search,
      location,
    );
  }, [form.branch, form.team, form.search, getConsultantsInfo, page]);

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      getBranchList();
    }
  }, [getBranchList, loginInfo]);

  useEffect(() => {
    if (form.branch) {
      initTempValue('team', '-1');
    }
  }, [initTempValue, form.branch]);

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      getTeamList(Number(form.branch));
    } else if (loginInfo.admin_id === 1) {
      getTeamList(loginInfo.branch_id);
    }
  }, [getTeamList, form.branch, loginInfo]);

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      getConsultantsInfo(
        Number(form.branch),
        Number(form.team),
        5,
        page,
        '',
        location,
      );
    } else if (loginInfo.admin_id === 1) {
      getConsultantsInfo(
        loginInfo.branch_id,
        Number(form.team),
        5,
        page,
        '',
        location,
      );
    }
  }, [getConsultantsInfo, loginInfo, page, form.branch, form.team]);

  useEffect(() => {
    onChnageCurrentPage(page, countUser);
  }, [countUser, page, onChnageCurrentPage]);

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
            onChange={onChangeInput}
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
              branchId={loginInfo.branch_id}
              teamId={Number(form.team)}
              adminType={loginInfo.admin_id}
              branchName={loginInfo.branch_name}
              onClickResetPassword={onClickResetPassword}
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
            isVisible={visible}
            onClickVisible={onClickVisible}
            branchId={loginInfo.branch_id}
            branchName={loginInfo.branch_name}
            adminType={loginInfo.admin_id}
            adminList={adminList}
            onClickInsertUser={onClickInsertUser}
          />
        }
      />
    </>
  );
}

interface UserViewProps extends RouteComponentProps {}

UserView.defaultProps = {};

export default UserView;
