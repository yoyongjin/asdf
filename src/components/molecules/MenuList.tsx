import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { THandleUserInfoPopup } from 'components/organisms/UserView';
import { THandleRemoveUser, THandleResetPassword } from 'hooks/useUser';
import { UserData } from 'types/user';
import { Colors } from 'utils/color';

const StyledWrapper = styled.ul`
  height: 40px;
  list-style-type: none;
  position: absolute;
  right: 40px;
  width: 100%;
`;

const StyledMenu = styled.li`
  background-color: ${Colors.gray8};
  list-style-type: none;
  padding-bottom: 1rem;
  padding-top: 1rem;
  text-align: center;
  width: 100%;

  &:hover {
    background-color: ${Colors.blue5};
    cursor: pointer;
  }
`;

function MenuList({
  data,
  menu,
  textFontColor,
  textFontFamily,
  textFontSize,
  textFontWeight,
  type,
}: IMenuList) {
  return (
    <StyledWrapper>
      {menu.map((item, index) => {
        if (!item.isVisible) {
          return null;
        }

        let onClick: (() => void) | undefined;

        if (type === 'user-info') {
          const _data = data as UserData;

          switch (index) {
            case 0: {
              // 정보 수정
              onClick = () => {
                const click = item.onClick as THandleUserInfoPopup;
                click(_data);
              };

              break;
            }
            case 1: {
              // 비밀번호 초기화
              if (!_data.user_name) {
                // 아이디가 없는 경우 비밀번호 초기화 부분 안보이게 처리
                return null;
              }

              onClick = () => {
                const click = item.onClick as THandleResetPassword;
                click(_data.id);
              };

              break;
            }
            case 2: {
              // 유저 삭제
              onClick = () => {
                const click = item.onClick as THandleRemoveUser;
                click(_data.id);
              };

              break;
            }
          }
        }

        return (
          <StyledMenu key={`styled-menu-${item.id}`} onClick={onClick}>
            <Text
              fontColor={textFontColor}
              fontFamily={textFontFamily}
              fontSize={textFontSize}
              fontWeight={textFontWeight}
            >
              {item.text}
            </Text>
          </StyledMenu>
        );
      })}
    </StyledWrapper>
  );
}

export interface IMenuItem {
  id: number; // unique key
  isVisible: boolean; // 보일지말지 여부
  onClick?: any; // 클릭 시 이벤트
  text: string; // 텍스트
}

interface IMenuItemStyle {
  textFontColor: string;
  textFontFamily: string;
  textFontSize: number;
  textFontWeight: number;
}

interface IMenuList extends IMenuItemStyle {
  data?: any;
  menu: Array<IMenuItem>;
  type: string;
}

MenuList.defaultProps = {
  textFontColor: Colors.gray4,
  textFontFamily: 'NanumBarunGothic',
  textFontSize: 13,
  textFontWeight: 700,
};

export default MenuList;
