import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'components/atoms';
import { Title, TablePagination, UserInfo } from 'components/molecules';
import { Table } from 'components/organisms';
import { COLORS } from 'utils/color';
import { TeamInfo, BranchInfo } from 'modules/types/branch';
import useUser from 'hooks/useUser';
import usePage from 'hooks/usePage';
import useVisible from 'hooks/useVisible';
import useBranch from 'hooks/useBranch';
import useInputForm from 'hooks/useInputForm';
import useAuth from 'hooks/useAuth';

import optionIcon from 'images/bt-user-modi-nor@2x.png';
import optionHoverIcon from 'images/bt-user-modi-over@2x.png';
import addUserImage from 'images/bt-add-u-1-nor@3x.png';
import addUserHoverImage from 'images/bt-add-u-1-over@3x.png';
import { UserInfo as UserInfoType } from 'modules/types/user';

const StyledWrapper = styled.div`
  /* Display */
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 3.75rem;
  width: 100%;
`;

const StyledUserListArea = styled.div`
  /* Display */
  height: calc(100% - 3.75rem);
  width: 100%;
`;

const StyledUserList = styled.div`
  /* Position */
  padding-top: 20px;
`;

const StyledUserPage = styled.div`
  /* Position */
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

let branch = -1;
let team = -1;
let currentPage = 0;

function UserView({ location }: UserViewProps) {
  const [tempUserInfo, setTempUserInfo] = useState<UserInfoType>();
  const [search, setSearch] = useState<string>('');
  const { loginInfo } = useAuth();
  const { branchList, teamList, getBranchList, getTeamList } = useBranch();
  const { form, onChangeSelect, onChangeInput, setKeyValue } = useInputForm({
    branch: -1,
    team: -1,
    search: '',
  });
  const {
    userInfo,
    filterUserInfo,
    getUsersInfo,
    resetFilteredList,
    onClickInsertUser,
    onClickUpdateUser,
    onClickDeleteUser,
    onClickResetPassword,
  } = useUser();
  const {
    countUser,
    filterCountUser,
    page,
    onChangeCurrentPage,
    onChangePageFirst,
    onClickNextPage,
    onClickPrevPage,
  } = usePage();
  const { visible, onClickVisible } = useVisible();

  const selectInfo = useMemo(() => {
    return {
      color: COLORS.dark_gray1,
      borderRadius: 1,
      borderColor: COLORS.dark_gray4,
      data1: branchList as Array<BranchInfo>,
      data2: teamList as Array<TeamInfo>,
      width: 9.3,
      height: 1.5,
      paddingLeft: 16,
    };
  }, [branchList, teamList]);

  const buttonInfo = useMemo(() => {
    return {
      title: '+ 사용자 등록',
      bgImage: addUserImage,
      bgHoverImage: addUserHoverImage,
      type: 'user',
      onClick: onClickVisible,
    };
  }, [onClickVisible]);

  const onClickSearch = useCallback(() => {
    setSearch(form.search);
    onChangePageFirst();
  }, [form.search, onChangePageFirst]);

  const getUsers = useCallback(
    (
      branchId: number,
      teamId: number,
      count: number,
      page: number,
      path: string,
      search = '',
      adminId: number,
    ) => {
      // 서버로부터 데이터 요청
      getUsersInfo(branchId, teamId, count, page, search, path, adminId);
    },
    [getUsersInfo],
  );

  const getUserInfo = useCallback(
    (info?: UserInfoType) => {
      // 사용자 등록, 수정 눌렀을 때 타는 로직
      setTempUserInfo(info);
      onClickVisible();
    },
    [setTempUserInfo, onClickVisible],
  );

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      // 슈퍼관리자
      if (form.branch === -1 && filterUserInfo.length > 0) {
        // 필터링된 유저 리스트에서 전체 지점명을 볼 경우 필터링된 유저 리스트 초기화
        if (search.trim() && currentPage === page) {
          if (!form.search.trim() && form.search !== search) {
            // 실제 검색 내용과 입력중
            setSearch('');
          }
          return;
        }
        resetFilteredList(1);
      }

      if (form.search.trim() !== search.trim() && currentPage === page) {
        // 실제 검색 내용과 입력한 내용이 다를 경우
        if (!form.search.trim() && search.trim()) {
          setSearch('');
        }
        return;
      }

      getUsers(
        form.branch,
        form.team,
        5,
        page,
        location.pathname,
        search,
        loginInfo.admin_id,
      );
      currentPage = page;
    } else if (loginInfo.admin_id === 1) {
      // 일반 관리자
      if (form.team === -1 && filterUserInfo.length > 0) {
        // 필터링된 유저 리스트에서 전체 지점명을 볼 경우 필터링된 유저 리스트 초기화
        if (search.trim() && currentPage === page) {
          if (!form.search.trim() && form.search !== search) {
            // 실제 검색 내용과 입력중
            setSearch('');
          }
          return;
        }
        resetFilteredList(1);
      }

      if (form.search.trim() !== search.trim() && currentPage === page) {
        // 실제 검색 내용과 입력한 내용이 다를 경우
        if (!form.search.trim() && search.trim()) {
          setSearch('');
        }
        return;
      }

      getUsers(
        loginInfo.branch_id,
        form.team,
        5,
        page,
        location.pathname,
        search,
        loginInfo.admin_id,
      );
      currentPage = page;
    }
  }, [
    loginInfo.admin_id,
    loginInfo.branch_id,
    form.branch,
    form.team,
    form.search,
    search,
    page,
    filterUserInfo.length,
    location.pathname,
    getUsers,
    resetFilteredList,
  ]);

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      // 슈퍼관리자일 경우에만 지점명 리스트 가져오기
      getBranchList();
    }
  }, [loginInfo.admin_id, getBranchList]);

  useEffect(() => {
    // 관리자의 권한에 따라 팀명 리스트 다르게 가져오기
    if (loginInfo.admin_id === 2) {
      getTeamList(form.branch);
    } else if (loginInfo.admin_id === 1) {
      getTeamList(loginInfo.branch_id);
    }
  }, [loginInfo.admin_id, loginInfo.branch_id, form.branch, getTeamList]);

  useEffect(() => {
    // 지점명이 변경될 때 team id 초기화
    setKeyValue('team', -1);
  }, [form.branch, setKeyValue]);

  useEffect(() => {
    // 페이지가 이동된 상태에서 지점명이나 팀명을 필터링했을 때, 현재 페이지를 변경시키는 부분
    if (filterCountUser > 0) {
      onChangeCurrentPage(page, filterCountUser);
    } else {
      onChangeCurrentPage(page, countUser);
    }
  }, [countUser, filterCountUser, page, onChangeCurrentPage]);

  console.log('Lendering UserView');
  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <Title
            buttonType={buttonInfo}
            selectType={selectInfo}
            isSearch
            branch={
              loginInfo.admin_id === 1 ? loginInfo.branch_id : form.branch
            }
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
              adminId={loginInfo.admin_id}
              adminList={adminList}
              branchId={loginInfo.branch_id}
              branchList={selectInfo.data1}
              branchName={loginInfo.branch_name}
              page={page}
              tableTitle={tableTitle}
              teamId={form.team}
              teamList={selectInfo.data2}
              userInfo={
                loginInfo.admin_id === 2
                  ? search.trim() && form.search.trim()
                    ? filterUserInfo
                    : form.branch === -1 && form.team === -1
                    ? userInfo
                    : filterUserInfo
                  : search.trim() && form.search.trim()
                  ? filterUserInfo
                  : form.team === -1
                  ? userInfo
                  : filterUserInfo
              }
              optionIcon={optionIcon}
              optionHoverIcon={optionHoverIcon}
              getBranchList={getBranchList}
              getTeamList={getTeamList}
              getUserInfo={getUserInfo}
              onClickDeleteUser={onClickDeleteUser}
              onClickResetPassword={onClickResetPassword}
              onClickUpdateUser={onClickUpdateUser}
            />
          </StyledUserList>
          <StyledUserPage>
            <TablePagination
              count={
                search.trim() && form.search.trim()
                  ? filterCountUser
                  : form.branch !== -1
                  ? filterCountUser
                  : countUser
              }
              curPage={page}
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
            adminId={loginInfo.admin_id}
            adminList={adminList}
            branchId={loginInfo.branch_id}
            branchName={loginInfo.branch_name}
            data={tempUserInfo}
            isVisible={visible}
            onClickVisible={getUserInfo}
            onClickInsertUser={onClickInsertUser}
            onClickUpdateUser={onClickUpdateUser}
          />
        }
      />
    </>
  );
}

interface UserViewProps extends RouteComponentProps {}

UserView.defaultProps = {};

export default UserView;
