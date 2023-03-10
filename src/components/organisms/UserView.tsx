import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Modal } from 'components/atoms';
import { TablePagination, UserData, TitleV2 } from 'components/molecules';
import { IMenuItem } from 'components/molecules/MenuList';
import { IProperty as ITableProperty } from 'components/molecules/TableProperty';
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
import { tableTitleUserManagement } from 'utils/table/title';
import TableRow from 'utils/table/row';

import DB_ADD_USER_BUTTON_IMAGE from 'images/bt-add-u-1-nor.png';
import ADD_USER_BUTTON_IMAGE from 'images/zms/bt-add-u-1-nor.png';
import OPTION_IMAGE from 'images/bt-user-modi-nor.png';
import OPTION_HOVER_IMAGE from 'images/bt-user-modi-over.png';

import useFetch from 'hooks/useFetch';

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

  ${(props) => {
    if (constants.IS_IE_BROWSER) {
      return css`
        overflow-x: auto;
      `;
    }
  }}
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

const userInfoOptionMenu = [...new Array(3)].map((values, index) => {
  const property: IMenuItem = {
    id: index + 1,
    isVisible: true,
    text: '',
  };

  switch (index) {
    case 0: {
      property.text = '?????? ??????';

      break;
    }
    case 1: {
      property.text = '???????????? ?????????';

      break;
    }
    case 2: {
      property.text = '??????';

      break;
    }
  }

  return property;
});

function UserView({ location }: UserViewProps) {
  const [selectedUserInfo, setSelectedUserInfo] = useState<UserDataV2>();
  const [searchText, setSearchText] = useState<string>('');
  const { loginInfo } = useAuth();
  const { getBranches, getTeams, selectBoxBranchOption, selectBoxTeamOption } =
    useOrganization();
  const { form, onChangeCheckBox, onChangeSelect, setSpecificValue } =
    useInputForm({
      limit: 15,
      branch: constants.DEFAULT_ID,
      team: constants.DEFAULT_ID,
      break_up: false,
    });
  const {
    userInfo,
    getUsers,
    onChangeUserCount,
    onClickAddUser,
    onClickModifyUser,
    handleRemoveUser,
    handleResetPassword,
  } = useUser();
  const {
    maxUser,
    page,
    onChangeCurrentPage,
    onClickNextPage,
    onClickPrevPage,
  } = usePage();
  const { visible, onClickVisible } = useVisible();
  const { removeUserStatus } = useFetch();

  const getUsersData = useCallback(() => {
    let branchID = form.branch;
    let teamID = form.team;

    if (loginInfo.admin_id === USER_TYPE.BRANCH_ADMIN) {
      // ?????????????????? ?????? ????????? ???????????????
      branchID = loginInfo.branch_id;
    } else if (loginInfo.admin_id === USER_TYPE.TEAM_ADMIN) {
      // ??????????????? ?????? ????????? ?????? ???????????????
      branchID = loginInfo.branch_id;
      teamID = loginInfo.team_id;
    }

    if (!removeUserStatus) {
      getUsers(
        branchID,
        teamID,
        form.limit,
        page,
        searchText,
        form.break_up,
        location.pathname,
      );
    }
  }, [
    form.branch,
    form.break_up,
    form.limit,
    form.team,
    getUsers,
    location.pathname,
    loginInfo.admin_id,
    loginInfo.branch_id,
    loginInfo.team_id,
    page,
    removeUserStatus,
    searchText,
  ]);

  /**
   * @description ????????? ????????????
   */
  const applySearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  /**
   * @description ?????? ?????? ??? ????????? ????????? ?????? ??????
   */
  const handleUserInfoPopup = useCallback(
    (userInfo: UserDataV2) => {
      setSelectedUserInfo(userInfo);
      onClickVisible();
    },
    [onClickVisible],
  );

  /**
   * @description ???????????? ????????? ?????? ?????????
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

  /**
   * @description ???????????? ????????? search bar ?????????
   */
  const titleSearchBarData = useMemo(() => {
    const searchBarConfig1 = {
      type: 'search-bar',
      data: {
        buttonOnClick: applySearchText,
        name: 'search',
        placeholder: '??????, ??????, ????????????, IP',
      },
      styles: {
        width: 22,
      },
    };

    return [searchBarConfig1];
  }, [applySearchText]);

  /**
   * @description ???????????? ????????? selectbox ?????????
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
    }; // ????????? ??????

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
    }; // ?????? ?????? ??????

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
    }; // ??? ?????? ??????

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
   * @description ???????????? ????????? text + checkbox ?????????
   */
  const titleTextCheckBoxData = useMemo(() => {
    const textCheckBoxConfig = {
      type: 'text-checkbox',
      data: {
        isChecked: form.break_up,
        isReverse: true,
        name: 'break_up',
        onChange: onChangeCheckBox,
        text: '?????? ??????',
      },
      styles: {
        fontColor: Colors.navy2,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        fontWeight: 800,
      },
    };

    return [textCheckBoxConfig];
  }, [form.break_up, onChangeCheckBox]);

  /**
   * @description ???????????? ????????? text ?????????
   */
  const titleTextData = useMemo(() => {
    const textConfig1 = {
      type: 'text',
      data: {
        text: '????????? ??????',
      },
    };

    const textConfig2 = {
      type: 'text',
      data: {
        text: '?????? ?????? : ',
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
   * @description ????????? ?????? ?????? ????????????
   */
  const getTitleRenderLeft = useMemo(() => {
    const renderData = [];
    const renderStyle = [];

    const [titleTextConfig1] = titleTextData;

    renderData.push(titleTextConfig1);

    if (loginInfo.admin_id >= constants.ADMIN.ADD_USER) {
      // ????????? ????????? ????????? ????????? ????????? ?????? ???????????? ??? ??????
      renderData.push(...titleButtonData);
    }

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
  }, [loginInfo.admin_id, titleButtonData, titleTextData]);

  /**
   * @description ????????? ????????? ?????? ????????????
   */
  const getTitleRenderRight = useMemo(() => {
    const renderData = [];
    const renderStyle = [];

    const [titleTextConfig1, titleTextConfig2] = titleTextData;
    const [selectConfig1, selectConfig2, selectConfig3] = titleSelectData;

    renderData.push(titleTextConfig2);

    if (loginInfo.admin_id > USER_TYPE.BRANCH_ADMIN) {
      // ???????????????, ?????????????????? ??????
      renderData.push(
        selectConfig1,
        ...titleTextCheckBoxData,
        selectConfig2,
        selectConfig3,
      );
    } else if (loginInfo.admin_id === USER_TYPE.BRANCH_ADMIN) {
      // ?????????????????? ??????
      renderData.push(selectConfig1, ...titleTextCheckBoxData, selectConfig3);
    } else {
      // ??????????????? ??????
      renderData.push(selectConfig1, ...titleTextCheckBoxData);
    }

    renderData.push(...titleSearchBarData);

    for (let i = 0; i < renderData.length; i++) {
      const defaultRenderStyle = {
        paddingRight: 0,
      };

      if (i === 0 || i === 3 || i === 4) {
        defaultRenderStyle.paddingRight = 10;
      }

      if (i === 1 || i === 2) {
        defaultRenderStyle.paddingRight = 18;
      }

      renderStyle.push(defaultRenderStyle);
    }

    return {
      renderConfig: renderData,
      renderStyle,
    };
  }, [
    loginInfo.admin_id,
    titleSearchBarData,
    titleSelectData,
    titleTextCheckBoxData,
    titleTextData,
  ]);

  /**
   * @description ????????? style ????????????
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

  /**
   * @description ????????? ?????? ????????? ?????? ?????? ?????????
   */
  const tablePropertyUserInfo = useMemo(() => {
    return userInfo.map((values) => {
      const row = TableRow.getRowUserInfo(values);

      let backgroundColor = '';
      if (values.breakup_at) {
        backgroundColor = Colors.red1;
      }

      const userInfoItems: Array<ITableProperty> = row.map((value, index) => {
        return {
          data: {
            text: value,
          },
          styles: {
            fontFamily: 'NanumBarunGothic',
            fontSize: 13,
            fontWeight: 800,
          },
          type: 'text',
          propertyStyles: {
            backgroundColor,
            justifyContent: 'center',
            textAlign: 'center',
          },
        };
      });

      const customUserInfoOptionMenu = userInfoOptionMenu.map((item, index) => {
        switch (index) {
          case 0: {
            item.isVisible = true;
            item.onClick = handleUserInfoPopup;

            break;
          }
          case 1: {
            item.isVisible =
              loginInfo.admin_id >= constants.ADMIN.RESET_USER_PASSWORD_ADMIN;
            item.onClick = handleResetPassword;

            break;
          }
          case 2: {
            item.isVisible = loginInfo.admin_id >= constants.ADMIN.REMOVE_USER;
            item.onClick = handleRemoveUser;

            break;
          }
        }

        return item;
      });

      const optionData = {
        data: {
          image: OPTION_IMAGE,
          hoverImage: OPTION_HOVER_IMAGE,
          menu: customUserInfoOptionMenu,
        },
        styles: {
          backgroundColor: Colors.white,
          borderColor: Colors.gray13,
          borderRadius: 12,
          borderStyle: 'solid',
          borderWidth: 1,
          fontColor: Colors.gray13,
          fontSize: 12,
          height: 2.4,
          width: 6.8,
        },
        type: 'option',
        propertyStyles: {
          backgroundColor,
          justifyContent: 'flex-end',
          textAlign: 'right',
        },
      };

      userInfoItems.push(optionData);

      return userInfoItems;
    });
  }, [
    handleRemoveUser,
    handleResetPassword,
    handleUserInfoPopup,
    loginInfo.admin_id,
    userInfo,
  ]);

  /**
   * @description ????????? ?????? ?????? ?????? ?????????
   */
  const tableContentUserInfo = useMemo(() => {
    return {
      data: tablePropertyUserInfo,
      originData: userInfo,
      styles: {
        rowHeight: 50,
      },
      type: 'user-info',
    };
  }, [tablePropertyUserInfo, userInfo]);

  /**
   * @description ?????? ?????? ????????????
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // ??????????????? ??????
      return;
    }

    getUsersData();
  }, [getUsersData, loginInfo.id]);

  /**
   * @description ?????? ????????? ????????????
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // ??????????????? ??????
      return;
    }

    if (loginInfo.admin_id > USER_TYPE.BRANCH_ADMIN) {
      // ??????????????? ?????? ????????? ???????????? ??????
      getBranches();
    }
  }, [loginInfo.admin_id, getBranches, loginInfo.id]);

  /**
   * @description ??? ????????? ????????????
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // ??????????????? ??????
      return;
    }

    if (loginInfo.admin_id < USER_TYPE.BRANCH_ADMIN) {
      // ??????????????? ?????? ????????? ????????? ?????? ??????
      return;
    }

    let branchID = form.branch;

    if (loginInfo.admin_id === USER_TYPE.BRANCH_ADMIN) {
      // ?????????????????? ?????? ????????? ??????????????? ????????? ????????????
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

  /**
   * @description ?????? ?????? ??? ??? ?????????
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // ??????????????? ??????
      return;
    }

    setSpecificValue('team', -1);
  }, [form.branch, loginInfo.id, setSpecificValue]);

  /**
   * @description ?????? ?????? ?????? (????????? ?????? ??? ??????)
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // ??????????????? ??????
      return;
    }

    onChangeUserCount(form.limit);
  }, [form.limit, loginInfo.id, onChangeUserCount]);

  /**
   * @description ?????? ???????????? ?????? ??????????????? ??? ?????? ?????? ???????????? ?????? ???????????? ??????
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // ??????????????? ??????
      return;
    }

    onChangeCurrentPage(page, maxUser, form.limit);
  }, [maxUser, form.limit, onChangeCurrentPage, page, loginInfo.id]);

  /**
   * @description ????????? ?????? ?????? ?????? ????????? ????????? ?????? ?????????
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // ??????????????? ??????
      return;
    }

    if (!visible) {
      setSelectedUserInfo(undefined);
    }
  }, [loginInfo.id, visible]);

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
          <Table
            contents={tableContentUserInfo}
            titles={tableTitleUserManagement}
            type={constants.IS_IE_BROWSER ? 'table' : 'grid'}
          />
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
            onClickModifyUser={onClickModifyUser}
            onClickVisible={onClickVisible}
            userData={selectedUserInfo}
          />
        }
      />
    </>
  );
}

interface UserViewProps extends RouteComponentProps {}

export type THandleUserInfoPopup = (userInfo: UserDataV2) => void;

UserView.defaultProps = {};

export default UserView;
