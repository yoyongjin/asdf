import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'components/atoms';
import { TablePagination, UserData, TitleV2 } from 'components/molecules';
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
import { tableTitleUserInfo } from 'utils/table/title';

import DB_ADD_USER_BUTTON_IMAGE from 'images/bt-add-u-1-nor.png';
import ADD_USER_BUTTON_IMAGE from 'images/zms/bt-add-u-1-nor.png';

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  height: 6rem;
  width: 100%;
`;

const StyledContent = styled.div`
  height: calc(100% - 6rem - 120px);
  overflow-x: auto;
  padding-top: 20px;
`;

const StyledFooter = styled.div`
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
`;

const selectBoxPageLimitOption = [...new Array(3)].map((values, index) => {
  return {
    id: 5 * (index + 1),
    data: `${5 * (index + 1)}`,
  };
});

function UserView({ location }: UserViewProps) {
  const [selectedConsultant, setSelectedConsultant] = useState<UserDataV2>();
  const [searchText, setSearchText] = useState<string>('');
  const { loginInfo } = useAuth();
  const { branches, teams, getBranches, getTeams } = useOrganization();
  const { form, onChangeSelect, setSpecificValue } = useInputForm({
    limit: 15,
    branch: -1,
    team: -1,
  });
  const {
    userInfo,
    getUsers,
    onChangeUserCount,
    onClickAddUser,
    onClickDisconnect,
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

  const selectBoxBranchOption = useMemo(() => {
    return branches.map((values) => {
      return {
        id: values.id,
        data: values.branch_name,
      };
    });
  }, [branches]);

  const selectBoxTeamOption = useMemo(() => {
    return teams.map((values) => {
      return {
        id: values.id,
        data: values.team_name,
      };
    });
  }, [teams]);

  const getUsersData = useCallback(() => {
    let branchID = form.branch;
    let teamID = form.team;

    if (loginInfo.admin_id === USER_TYPE.BRANCH_ADMIN) {
      branchID = loginInfo.branch_id;
    } else if (loginInfo.admin_id === USER_TYPE.TEAM_ADMIN) {
      branchID = loginInfo.branch_id;
      teamID = loginInfo.team_id;
    }

    getUsers(branchID, teamID, form.limit, page, searchText, location.pathname);
  }, [
    form.branch,
    form.limit,
    form.team,
    getUsers,
    location.pathname,
    loginInfo.admin_id,
    loginInfo.branch_id,
    loginInfo.team_id,
    page,
    searchText,
  ]);

  const onClickSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const setSeletedConsultantData = useCallback(
    (userInfo: UserDataV2) => {
      setSelectedConsultant(userInfo);
      onClickVisible();
    },
    [onClickVisible],
  );

  /**
   * @description 타이틀에 들어갈 search bar 정보들
   */
  const titleSearchBarData = useMemo(() => {
    const searchBarConfig1 = {
      type: 'search-bar',
      data: {
        buttonOnClick: onClickSearch,
        name: 'search',
        placeholder: '이름, 계정, 전화번호, IP',
      },
      styles: {
        width: 22,
      },
    };

    return [searchBarConfig1];
  }, [onClickSearch]);

  /**
   * @description 타이틀에 들어갈 selectbox 정보들
   */
  const titleSelectData = useMemo(() => {
    const selectConfig1 = {
      type: 'select',
      data: {
        name: 'limit',
        onChange: onChangeSelect,
        options: selectBoxPageLimitOption,
        value: form.limit,
      },
      styles: {
        borderColor: Colors.gray7,
        borderRadius: 12.5,
        fontColor: Colors.gray4,
        width: 50,
      },
    }; // 페이지 개수

    const selectConfig2 = {
      type: 'select',
      data: {
        name: 'branch',
        onChange: onChangeSelect,
        options: selectBoxBranchOption,
        value: form.branch,
      },
      styles: {
        borderColor: Colors.gray7,
        borderRadius: 12.5,
        fontColor: Colors.gray4,
        width: 150,
      },
    }; // 센터 관련 정보

    const selectConfig3 = {
      type: 'select',
      data: {
        name: 'team',
        onChange: onChangeSelect,
        options: selectBoxTeamOption,
        value: form.team,
      },
      styles: {
        borderColor: Colors.gray7,
        borderRadius: 12.5,
        fontColor: Colors.gray4,
        width: 150,
      },
    }; // 팀 관련 정보

    return [selectConfig1, selectConfig2, selectConfig3];
  }, [
    form.branch,
    form.limit,
    form.team,
    onChangeSelect,
    selectBoxBranchOption,
    selectBoxTeamOption,
  ]);

  /**
   * @description 타이틀에 들어갈 버튼 정보들
   */
  const titleButtonData = useMemo(() => {
    const buttonConfig1 = {
      type: 'button',
      data: {
        image:
          constants.COMPANY === COMPANY_TYPE.DBLIFE
            ? DB_ADD_USER_BUTTON_IMAGE
            : ADD_USER_BUTTON_IMAGE,
        onClick: onClickVisible,
      },
      styles: {
        height: 2.5,
        width: 11.8,
      },
    };

    return [buttonConfig1];
  }, [onClickVisible]);

  const titleTextData = useMemo(() => {
    const textConfig1 = {
      type: 'text',
      data: {
        text: '사용자 관리',
      },
    };

    const textConfig2 = {
      type: 'text',
      data: {
        text: '조회 개수 : ',
      },
      styles: {
        fontColor: Colors.gray1,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        minWidth: 30,
      },
    };

    return [textConfig1, textConfig2];
  }, []);

  /**
   * @description 타이틀 왼쪽 요소 가져오기
   */
  const getTitleRenderLeft = useMemo(() => {
    const renderData = [];
    const renderStyle = [];

    const [titleTextConfig1] = titleTextData;

    renderData.push(titleTextConfig1);
    renderData.push(...titleButtonData);

    for (let i = 0; i < renderData.length; i++) {
      const defaultRenderStyle = {
        paddingRight: 0,
      };

      if (i === 0) {
        defaultRenderStyle.paddingRight = 19;
      }

      renderStyle.push(defaultRenderStyle);
    }

    return {
      renderConfig: renderData,
      renderStyle,
    };
  }, [titleButtonData, titleTextData]);

  /**
   * @description 타이틀 오른쪽 요소 가져오기
   */
  const getTitleRenderRight = useMemo(() => {
    const renderData = [];
    const renderStyle = [];

    const [titleTextConfig1, titleTextConfig2] = titleTextData;

    renderData.push(titleTextConfig2);
    renderData.push(...titleSelectData);
    renderData.push(...titleSearchBarData);

    for (let i = 0; i < renderData.length; i++) {
      const defaultRenderStyle = {
        paddingRight: 0,
      };

      if (i === 0 || i === 2) {
        defaultRenderStyle.paddingRight = 10;
      }

      if (i === 1 || i === 3) {
        defaultRenderStyle.paddingRight = 18;
      }

      renderStyle.push(defaultRenderStyle);
    }

    return {
      renderConfig: renderData,
      renderStyle,
    };
  }, [titleSearchBarData, titleSelectData, titleTextData]);

  /**
   * @description 타이틀 style 가져오기
   */
  const getTitleStyle = useMemo(() => {
    return {
      borderBottomColor: Colors.blue3,
      borderBottomStyle: 'solid',
      borderBottomWidth: 1,
      leftMarginTop: 25,
      rightMarginTop: 20,
    };
  }, []);

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
        currentSearchText: searchText,
        currentTeamId:
          loginInfo.admin_id === USER_TYPE.TEAM_ADMIN
            ? loginInfo.admin_id
            : form.team,
        currentLimit: form.limit,
      },
      styles: {
        rowHeight: 50,
      },
      type: 'user',
    };
  }, [
    form.branch,
    form.limit,
    form.team,
    loginInfo.admin_id,
    onClickRemoveUser,
    onClickResetPassword,
    page,
    searchText,
    setSeletedConsultantData,
    userInfo,
  ]);

  /**
   * @description 유저 정보 가져오기
   */
  useEffect(() => {
    if (loginInfo.id) {
      getUsersData();
    }
  }, [getUsersData, loginInfo.id]);

  /**
   * @description 센터 리스트 가져오기
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // 비로그인인 경우
      return;
    }

    if (loginInfo.admin_id > USER_TYPE.BRANCH_ADMIN) {
      // 센터관리자 상위 권한일 경우에만 호출
      getBranches();
    }
  }, [loginInfo.admin_id, getBranches, loginInfo.id]);

  /**
   * @description 팀 리스트 가져오기
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // 비로그인인 경우
      return;
    }

    if (loginInfo.admin_id < USER_TYPE.BRANCH_ADMIN) {
      // 지점관리자 하위 권한은 요청할 필요 없음
      return;
    }

    let branchID = form.branch;

    if (loginInfo.admin_id === USER_TYPE.BRANCH_ADMIN) {
      // 지점관리자의 경우 지점이 정해져있기 때문에 고정값임
      branchID = loginInfo.branch_id;
    }

    getTeams(branchID);
  }, [
    form.branch,
    getTeams,
    loginInfo.admin_id,
    loginInfo.branch_id,
    loginInfo.id,
  ]);

  useEffect(() => {
    // 센터명 변경 시 팀 id 초기화
    setSpecificValue('team', -1);
  }, [form.branch, setSpecificValue]);

  useEffect(() => {
    onChangeUserCount(form.limit);
  }, [form.limit, onChangeUserCount]);

  useEffect(() => {
    onChangeCurrentPage(page, maxUser, form.limit);
  }, [maxUser, form.limit, onChangeCurrentPage, page]);

  useEffect(() => {
    if (!visible) {
      setSelectedConsultant(undefined);
    }
  }, [visible]);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <TitleV2
            renderLeft={getTitleRenderLeft}
            renderRight={getTitleRenderRight}
            titleStyle={getTitleStyle}
          />
        </StyledTitle>
        <StyledContent>
          <div>
            <Table contents={tableContents} titles={tableTitleUserInfo} />
          </div>
        </StyledContent>
        <StyledFooter>
          <TablePagination
            count={maxUser}
            divide={form.limit}
            curPage={page}
            onClickNextPage={onClickNextPage}
            onClickPrevPage={onClickPrevPage}
          />
        </StyledFooter>
      </StyledWrapper>
      <Modal
        isVisible={visible}
        Component={
          <UserData
            loginData={loginInfo}
            isVisible={visible}
            onClickAddUser={onClickAddUser}
            onClickDisconnect={onClickDisconnect}
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

UserView.defaultProps = {};

export default UserView;
