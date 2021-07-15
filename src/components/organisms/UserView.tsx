import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'components/atoms';
import { Title, TablePagination, UserData } from 'components/molecules';
import { Table } from 'components/organisms';
import useUser from 'hooks/useUser';
import usePage from 'hooks/usePage';
import useVisible from 'hooks/useVisible';
import useOrganization from 'hooks/useOrganization';
import useInputForm from 'hooks/useInputForm';
import useAuth from 'hooks/useAuth';
import { UserData as UserDataV2, UserInfo } from 'types/user';
import { Colors } from 'utils/color';
import constants, { COMPANY_TYPE, USER_TYPE } from 'utils/constants';

import optionIcon from 'images/bt-user-modi-nor@2x.png';
import optionHoverIcon from 'images/bt-user-modi-over@2x.png';
import DB_addUserImage from 'images/bt-add-u-1-nor.png';
import addUserImage from 'images/zms/bt-add-u-1-nor.png';

const StyledWrapper = styled.div`
  /* Display */
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  height: 6rem;
  width: 100%;
`;

const StyledUserListArea = styled.div`
  /* Display */
  height: 100%;
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
  // { title: 'No.', width: 7 },
  { title: '지점명', width: 14 },
  { title: '팀명', width: 7 },
  { title: '권한', width: 7 },
  { title: '이름.', width: 7 },
  { title: '아이디.', width: 14 },
  { title: '전화번호.', width: 14 },
  { title: 'ZiBox IP.', width: 20 },
  { title: 'ZiBox Mac.', width: 20 },
  { title: 'ZiBox Mic.', width: 7 },
  { title: 'ZiBox Spk.', width: 7 },
  { title: '', width: 10 },
];

const userCountData = [
  { id: 5, data: 5 },
  { id: 10, data: 10 },
  { id: 15, data: 15 },
];

let currentPage = 0;

function UserView({ location }: UserViewProps) {
  const [tempUserInfo, setTempUserInfo] = useState<UserDataV2>();
  const [search, setSearch] = useState<string>('');
  const { loginInfo } = useAuth();
  const { branches, teams, getBranches, getTeams } = useOrganization();
  const { form, onChangeSelect, onChangeInput, setKeyValue } = useInputForm({
    userListCount: 5,
    branch: -1,
    team: -1,
    search: '',
  });
  const {
    userInfo,
    filterUserInfo,
    getUsers,
    resetFilteredList,
    onClickAddUser,
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

  const selectData = useMemo(() => {
    const _branches = branches!.map((values) => {
      return {
        id: values.id,
        data: values.branch_name,
      };
    });

    const _teams = teams!.map((values) => {
      return {
        id: values.id,
        data: values.team_name,
      };
    });

    if (loginInfo.admin_id === USER_TYPE.ADMIN) {
      return {
        count: 2,
        data: [userCountData, _teams],
        style: [
          {
            width: 50,
            height: 25,
            borderRadius: 12.5,
            borderColor: Colors.gray7,
            fontColor: Colors.gray4,
          },
          {
            width: 150,
            height: 25,
            borderRadius: 12.5,
            borderColor: Colors.gray7,
            fontColor: Colors.gray4,
            paddingLeft: 16,
          },
        ],
        info: [
          {
            id: form.userListCount,
            name: 'user',
            click: onChangeSelect,
          },
          {
            id: form.team,
            name: 'team',
            click: onChangeSelect,
          },
        ],
      };
    }

    return {
      count: 3,
      data: [userCountData, _branches, _teams],
      style: [
        {
          width: 50,
          height: 25,
          borderRadius: 12.5,
          borderColor: Colors.gray7,
          fontColor: Colors.gray4,
        },
        {
          width: 150,
          height: 25,
          borderRadius: 12.5,
          borderColor: Colors.gray7,
          fontColor: Colors.gray4,
          paddingLeft: 16,
        },
        {
          width: 150,
          height: 25,
          borderRadius: 12.5,
          borderColor: Colors.gray7,
          fontColor: Colors.gray4,
          paddingLeft: 16,
        },
      ],
      info: [
        {
          id: form.userListCount,
          name: 'user',
          click: onChangeSelect,
        },
        {
          id: loginInfo.admin_id === 1 ? loginInfo.branch_id : form.branch,
          name: 'branch',
          click: onChangeSelect,
        },
        {
          id: form.team,
          name: 'team',
          click: onChangeSelect,
        },
      ],
    };
  }, [
    branches,
    form.branch,
    form.team,
    form.userListCount,
    loginInfo.admin_id,
    loginInfo.branch_id,
    onChangeSelect,
    teams,
  ]);

  const buttonData = useMemo(() => {
    return {
      count: 1,
      info: [
        {
          image:
            constants.COMPANY === COMPANY_TYPE.DBLIFE
              ? DB_addUserImage
              : addUserImage,
          click: onClickVisible,
        },
      ],
      hidden: false,
    };
  }, [onClickVisible]);

  const onClickSearch = useCallback(() => {
    setSearch(form.search);
    onChangePageFirst();
  }, [form.search, onChangePageFirst]);

  const searchData = useMemo(() => {
    return {
      count: 1,
      data: [form.search],
      info: [
        {
          change: onChangeInput,
          click: onClickSearch,
        },
      ],
    };
  }, [form.search, onChangeInput, onClickSearch]);

  const getUsers2 = useCallback(
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
      getUsers(branchId, teamId, count, page, search, path, adminId);
    },
    [getUsers],
  );

  const getUserInfo = useCallback(
    (info?: UserDataV2) => {
      // 사용자 등록, 수정 눌렀을 때 타는 로직
      setTempUserInfo(info);
      onClickVisible();
    },
    [setTempUserInfo, onClickVisible],
  );

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      // 슈퍼관리자
      // if (form.branch === -1 && filterUserInfo.length > 0) {
      //   // 필터링된 유저 리스트에서 전체 지점명을 볼 경우 필터링된 유저 리스트 초기화
      //   if (search.trim() && currentPage === page) {
      //     if (!form.search.trim() && form.search !== search) {
      //       // 실제 검색 내용과 입력중
      //       setSearch('');
      //     }
      //     return;
      //   }
      //   resetFilteredList(1);
      // }

      // if (form.search.trim() !== search.trim() && currentPage === page) {
      //   // 실제 검색 내용과 입력한 내용이 다를 경우
      //   if (!form.search.trim() && search.trim()) {
      //     setSearch('');
      //   }
      //   return;
      // }

      getUsers2(
        form.branch,
        form.team,
        form.userListCount,
        page,
        location.pathname,
        search,
        loginInfo.admin_id,
      );
      currentPage = page;
    } else if (loginInfo.admin_id === 1) {
      // 일반 관리자
      // if (form.team === -1 && filterUserInfo.length > 0) {
      //   // 필터링된 유저 리스트에서 전체 지점명을 볼 경우 필터링된 유저 리스트 초기화
      //   if (search.trim() && currentPage === page) {
      //     if (!form.search.trim() && form.search !== search) {
      //       // 실제 검색 내용과 입력중
      //       setSearch('');
      //     }
      //     return;
      //   }
      //   resetFilteredList(1);
      // }

      // if (form.search.trim() !== search.trim() && currentPage === page) {
      //   // 실제 검색 내용과 입력한 내용이 다를 경우
      //   if (!form.search.trim() && search.trim()) {
      //     setSearch('');
      //   }
      //   return;
      // }

      getUsers2(
        loginInfo.branch_id,
        form.team,
        form.userListCount,
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
    form.userListCount,
    form.branch,
    form.team,
    form.search,
    search,
    page,
    filterUserInfo.length,
    location.pathname,
    getUsers2,
    resetFilteredList,
  ]);

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      // 슈퍼관리자일 경우에만 지점명 리스트 가져오기
      getBranches();
    }
  }, [loginInfo.admin_id, getBranches]);

  useEffect(() => {
    // 관리자의 권한에 따라 팀명 리스트 다르게 가져오기
    if (loginInfo.admin_id === 2) {
      getTeams(form.branch);
    } else if (loginInfo.admin_id === 1) {
      getTeams(loginInfo.branch_id);
    }
  }, [loginInfo.admin_id, loginInfo.branch_id, form.branch, getTeams]);

  useEffect(() => {
    // 지점명이 변경될 때 team id 초기화
    setKeyValue('team', -1);
  }, [form.branch, setKeyValue]);

  useEffect(() => {
    // 페이지가 이동된 상태에서 지점명이나 팀명을 필터링했을 때, 현재 페이지를 변경시키는 부분
    if (filterCountUser > 0) {
      onChangeCurrentPage(page, filterCountUser, form.userListCount);
    } else {
      onChangeCurrentPage(page, countUser, form.userListCount);
    }
  }, [
    countUser,
    filterCountUser,
    page,
    form.userListCount,
    onChangeCurrentPage,
  ]);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <Title
            isButton
            isSearch
            isSelect
            buttonData={buttonData}
            searchData={searchData}
            selectData={selectData}
            rightBottomPixel={9}
          >
            사용자 관리
          </Title>
        </StyledTitle>
        <StyledUserListArea>
          <StyledUserList>
            <Table
              adminId={loginInfo.admin_id}
              branchId={loginInfo.branch_id}
              page={page}
              tableTitle={tableTitle}
              teamId={form.team}
              userInfo={
                loginInfo.admin_id === 2
                  ? search.trim() && form.search.trim()
                    ? userInfo
                    : // filterUserInfo
                    form.branch === -1 && form.team === -1
                    ? userInfo
                    : userInfo
                  : //filterUserInfo
                  search.trim() && form.search.trim()
                  ? userInfo
                  : //filterUserInfo
                  form.team === -1
                  ? userInfo
                  : userInfo
                //filterUserInfo
              }
              optionIcon={optionIcon}
              optionHoverIcon={optionHoverIcon}
              getUserInfo={getUserInfo}
              onClickDeleteUser={onClickDeleteUser}
              onClickResetPassword={onClickResetPassword}
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
              divide={form.userListCount}
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
          <UserData
            adminId={loginInfo.admin_id}
            adminList={adminList}
            branchId={loginInfo.branch_id}
            branchName={loginInfo.branch_name!}
            userData={tempUserInfo}
            isVisible={visible}
            onClickVisible={getUserInfo}
            onClickAddUser={onClickAddUser}
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
