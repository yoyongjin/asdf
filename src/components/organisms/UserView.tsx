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
    onClickAddUser,
    onClickModifyUser,
    onClickRemoveUser,
    onClickResetPassword,
  } = useUser();
  const {
    countUser,
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
    form.userCount,
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
        currentBranchId: form.branch,
        currentPage: page,
        currentSearchText: form.search,
        currentTeamId: form.team,
        currentLimit: form.userCount,
      },
      type: 'user',
    };
  }, [
    form.branch,
    form.search,
    form.team,
    form.userCount,
    onClickRemoveUser,
    onClickResetPassword,
    page,
    setSeletedConsultantData,
    userInfo,
  ]);

  useEffect(() => {
    if (loginInfo.admin_id === 2) {
      // 슈퍼관리자
      getUsers2(
        form.branch,
        form.team,
        form.userCount,
        page,
        location.pathname,
        form.search,
        loginInfo.admin_id,
      );
    } else if (loginInfo.admin_id === 1) {
      // 일반 관리자
      getUsers2(
        loginInfo.branch_id,
        form.team,
        form.userCount,
        page,
        location.pathname,
        form.search,
        loginInfo.admin_id,
      );
    }
  }, [
    form.branch,
    form.search,
    form.team,
    form.userCount,
    getUsers2,
    location.pathname,
    loginInfo.admin_id,
    loginInfo.branch_id,
    page,
  ]);

  useEffect(() => {
    if (loginInfo.admin_id === USER_TYPE.SUPER_ADMIN) {
      // 슈퍼관리자일 경우에만 지점명 리스트 가져오기
      getBranches();
    }
  }, [loginInfo.admin_id, getBranches]);

  useEffect(() => {
    // 관리자의 권한에 따라 팀명 리스트 다르게 가져오기
    if (loginInfo.admin_id === USER_TYPE.SUPER_ADMIN) {
      getTeams(form.branch);
    } else if (loginInfo.admin_id === USER_TYPE.ADMIN) {
      getTeams(loginInfo.branch_id);
    }
  }, [form.branch, getTeams, loginInfo.admin_id, loginInfo.branch_id]);

  useEffect(() => {
    // 지점명 변경 시 팀 id 초기화
    setSpecificValue('team', -1);
  }, [form.branch, setSpecificValue]);

  useEffect(() => {
    onChangeCurrentPage(page, countUser, form.userCount);
  }, [countUser, form.userCount, onChangeCurrentPage, page]);

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
              count={countUser}
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
            adminList={adminList}
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
  type: string;
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
