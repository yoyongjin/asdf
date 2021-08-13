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
import { UserData as UserDataV2 } from 'types/user';
import { Colors } from 'utils/color';
import constants, { COMPANY_TYPE, USER_TYPE } from 'utils/constants';

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
  height: calc(100% - 6rem - 66px);
  overflow-x: auto;
`;

const StyledUserList = styled.div`
  /* Position */
  padding-top: 20px;
`;

const StyledUserPage = styled.div`
  /* Position */
  padding-top: 46px;
`;

const tableTitles = [
  // { title: 'No.', width: 7 },
  { title: '지점명', width: 10 },
  { title: '팀명', width: 10 },
  { title: '권한', width: 5 },
  { title: '이름.', width: 5 },
  { title: '아이디.', width: 15 },
  { title: '전화번호.', width: 15 },
  { title: 'ZiBox IP.', width: 15 },
  { title: 'ZiBox Mac.', width: 15 },
  { title: '', width: 10 },
];

const userCountData = [
  { id: 5, data: 5 },
  { id: 10, data: 10 },
  { id: 15, data: 15 },
];

function UserView({ location }: UserViewProps) {
  const [selectedConsultant, setSelectedConsultant] = useState<UserDataV2>();
  const [search, setSearch] = useState<string>('');
  const { loginInfo } = useAuth();
  const { branches, teams, getBranches, getTeams } = useOrganization();
  const { form, onChangeSelect, onChangeInput, setSpecificValue } =
    useInputForm({
      userCount: 15,
      branch: -1,
      team: -1,
      search: '',
    });
  const {
    userInfo,
    getUsers,
    onChangeUserCount,
    onClickAddUser,
    onClickModifyUser,
    onClickRemoveUser,
    onClickResetPassword,
  } = useUser();
  const {
    maxUser,
    page,
    onChangeCurrentPage,
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

    if (loginInfo.admin_id === USER_TYPE.TEAM_ADMIN) {
      return {
        count: 1,
        data: [userCountData],
        style: [
          {
            width: 50,
            height: 25,
            borderRadius: 12.5,
            borderColor: Colors.gray7,
            fontColor: Colors.gray4,
          },
        ],
        info: [
          {
            id: form.userCount,
            name: 'userCount',
            click: onChangeSelect,
          },
        ],
      };
    }

    if (loginInfo.admin_id === USER_TYPE.BRANCH_ADMIN) {
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
            id: form.userCount,
            name: 'userCount',
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
          id: form.userCount,
          name: 'userCount',
          click: onChangeSelect,
        },
        {
          id: form.branch,
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
    form.userCount,
    loginInfo.admin_id,
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
  }, [form.search]);

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
      option: {
        placeHolder: '이름, 전화번호, 계정',
      },
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

  const setSeletedConsultantData = useCallback(
    (userInfo: UserDataV2) => {
      setSelectedConsultant(userInfo);
      onClickVisible();
    },
    [onClickVisible],
  );

  const tableContents = useMemo(() => {
    return {
      data: userInfo,
      click: [
        setSeletedConsultantData,
        onClickResetPassword,
        onClickRemoveUser,
      ],
      option: {
        currentBranchId:
          loginInfo.admin_id === USER_TYPE.ADMIN ||
          loginInfo.admin_id === USER_TYPE.SUPER_ADMIN
            ? form.branch
            : loginInfo.admin_id,
        currentPage: page,
        currentSearchText: form.search,
        currentTeamId:
          loginInfo.admin_id === USER_TYPE.TEAM_ADMIN
            ? loginInfo.admin_id
            : form.team,
        currentLimit: form.userCount,
      },
      styles: {
        tableHeight: 50,
      },
      type: 'user',
    };
  }, [
    form.branch,
    form.search,
    form.team,
    form.userCount,
    loginInfo.admin_id,
    onClickRemoveUser,
    onClickResetPassword,
    page,
    setSeletedConsultantData,
    userInfo,
  ]);

  useEffect(() => {
    if (
      loginInfo.admin_id === USER_TYPE.SUPER_ADMIN ||
      loginInfo.admin_id === USER_TYPE.ADMIN
    ) {
      // 슈퍼 관리자 / 일반 관리자
      getUsers2(
        form.branch,
        form.team,
        form.userCount,
        page,
        location.pathname,
        search,
        loginInfo.admin_id,
      );
    } else if (loginInfo.admin_id === USER_TYPE.BRANCH_ADMIN) {
      // 일반 관리자
      getUsers2(
        loginInfo.branch_id,
        form.team,
        form.userCount,
        page,
        location.pathname,
        search,
        loginInfo.admin_id,
      );
    } else if (loginInfo.admin_id === USER_TYPE.TEAM_ADMIN) {
      // 일반 관리자
      getUsers2(
        loginInfo.branch_id,
        loginInfo.team_id,
        form.userCount,
        page,
        location.pathname,
        search,
        loginInfo.admin_id,
      );
    }
  }, [
    form.branch,
    search,
    form.team,
    form.userCount,
    getUsers2,
    location.pathname,
    loginInfo.admin_id,
    loginInfo.branch_id,
    page,
    loginInfo.team_id,
  ]);

  useEffect(() => {
    if (
      loginInfo.admin_id === USER_TYPE.SUPER_ADMIN ||
      loginInfo.admin_id === USER_TYPE.ADMIN
    ) {
      // 슈퍼관리자일 경우에만 지점명 리스트 가져오기
      getBranches();
    }
  }, [loginInfo.admin_id, getBranches]);

  useEffect(() => {
    // 관리자의 권한에 따라 팀명 리스트 다르게 가져오기
    if (
      loginInfo.admin_id === USER_TYPE.SUPER_ADMIN ||
      loginInfo.admin_id === USER_TYPE.ADMIN
    ) {
      getTeams(form.branch);
    } else if (loginInfo.admin_id === USER_TYPE.BRANCH_ADMIN) {
      getTeams(loginInfo.branch_id);
    }
  }, [form.branch, getTeams, loginInfo.admin_id, loginInfo.branch_id]);

  useEffect(() => {
    // 지점명 변경 시 팀 id 초기화
    setSpecificValue('team', -1);
  }, [form.branch, setSpecificValue]);

  useEffect(() => {
    if (form.search === '') {
      setSearch(form.search);
    }
  }, [form.search]);

  useEffect(() => {
    onChangeUserCount(form.userCount);
  }, [form.userCount, onChangeUserCount]);

  useEffect(() => {
    onChangeCurrentPage(page, maxUser, form.userCount);
  }, [maxUser, form.userCount, onChangeCurrentPage, page]);

  useEffect(() => {
    if (!visible) {
      setSelectedConsultant(undefined);
    }
  }, [visible]);

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
            <Table contents={tableContents} titles={tableTitles} />
          </StyledUserList>
          <StyledUserPage>
            <TablePagination
              count={maxUser}
              divide={form.userCount}
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
            loginData={loginInfo}
            isVisible={visible}
            onClickAddUser={onClickAddUser}
            onClickModifyUser={onClickModifyUser}
            onClickVisible={onClickVisible}
            userData={selectedConsultant}
          />
        }
      />
    </>
  );
}

interface UserViewProps extends RouteComponentProps {}

export type SetSeletedConsultantData = (consultantData: UserDataV2) => void;

export interface TableTitleData {
  title: string;
  width: number;
}

export interface TableContentData {
  click?: Array<any>;
  data: Array<any>;
  option?: TableContentOption;
  styles?: TableContentStyles;
  type: string;
}

export interface TableContentStyles {
  tableHeight: number;
}

export interface TableContentOption {
  currentBranchId?: number;
  currentPage?: number;
  currentSearchText?: string;
  currentTeamId?: number;
  currentLimit?: number;
}
UserView.defaultProps = {};

export default UserView;
