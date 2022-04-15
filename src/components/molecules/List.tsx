import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { Colors } from 'utils/color';
import constants, { COMPANY_TYPE, USER_TYPE } from 'utils/constants';
import { UserData } from 'types/user';
import { OnClickRemoveUser, OnClickResetPassword } from 'hooks/useUser';
import { SetSeletedConsultantData } from 'components/organisms/UserView';

const StyledWrapper = styled.ul`
  /* Position */
  right: 100px;
  position: absolute;

  /* Display */
  height: 40px;
  list-style-type: none;
  width: 100%;
`;

const StyledContent = styled.li`
  /* Position */
  text-align: center;

  /* Display */
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  list-style-type: none;

  /* Color */
  background-color: ${Colors.gray8};

  &:hover {
    background-color: ${constants.COMPANY === COMPANY_TYPE.DBLIFE ||
    constants.COMPANY === COMPANY_TYPE.LINA
      ? Colors.green2
      : Colors.blue5};
    cursor: pointer;
  }
`;

function List({
  currentBranchId,
  currentLimit,
  currentPage,
  currentSearchText,
  currentTeamId,
  menus,
  userData,
  onClickRemoveUser,
  onClickUserDataPopup,
  onClickResetPassword,
}: ListProps) {
  return (
    <StyledWrapper>
      {menus.map((values) => {
        if (!values.isVisible) {
          return null;
        }

        if (!userData.user_name && values.id === 1) {
          // 상담원일 경우 비밀번호 초기화 부분 삭제
          return null;
        }

        return (
          <StyledContent
            key={`styled-content-${values.id}`}
            onClick={() => {
              if (values.id === 0) {
                onClickUserDataPopup(userData);
              } else if (values.id === 1) {
                onClickResetPassword(userData.id);
              } else if (values.id === 2) {
                onClickRemoveUser!(
                  userData.id,
                  currentBranchId!,
                  currentTeamId,
                  currentLimit,
                  currentPage,
                  currentSearchText,
                );
              }
            }}
          >
            <Text
              fontColor={Colors.gray4}
              fontFamily="NanumBarunGothic"
              fontSize={13}
              fontWeight={700}
            >
              {values.name}
            </Text>
          </StyledContent>
        );
      })}
    </StyledWrapper>
  );
}

interface ListProps {
  currentBranchId: number;
  currentLimit: number;
  currentSearchText: string;
  currentPage: number;
  currentTeamId: number;
  menus: Array<MenuData>;
  userData: UserData;
  onClickUserDataPopup: SetSeletedConsultantData;
  onClickRemoveUser: OnClickRemoveUser;
  onClickResetPassword: OnClickResetPassword;
}

export interface MenuData {
  id: number;
  name: string;
  isVisible: boolean;
}

List.defaultProps = {};

export default List;
