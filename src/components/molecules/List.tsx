import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { COLORS } from 'utils/color';
import { UserInfo } from 'modules/types/user';

const StyledWrapper = styled.ul`
  /* Position */
  position: absolute;

  /* Display */
  width: 100%;
  right: 10rem;
  list-style-type: none;
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
  background-color: ${COLORS.dark_gray5};

  &:hover {
    background-color: ${COLORS.light_green};
    cursor: pointer;
  }
`;

function List({
  adminId,
  branchId,
  menu,
  id,
  info,
  page,
  teamId,
  onClickDeleteUser,
  onClickGetUserInfo,
  onClickResetPassword,
}: ListProps) {
  return (
    <StyledWrapper>
      {menu.map((title, i) => {
        // 상담원일 경우 비밀번호 초기화 부분 삭제
        if (adminId === 0 && i === 1) return null;

        return (
          <StyledContent
            key={`styled-content-${i}`}
            onClick={() => {
              if (i === 0) {
                onClickGetUserInfo!(info);
              } else if (i === 1) {
                onClickResetPassword!(id);
              } else if (i === 2) {
                onClickDeleteUser!(String(id), page!, branchId!, teamId!);
              }
            }}
          >
            <Text fontColor={COLORS.dark_gray1} fontWeight={600}>
              {title}
            </Text>
          </StyledContent>
        );
      })}
    </StyledWrapper>
  );
}

interface ListProps {
  adminId: number;
  branchId?: number;
  menu: Array<string>;
  id: number;
  info: UserInfo;
  page?: number;
  teamId?: number;
  onClickGetUserInfo?: (info: UserInfo) => void;
  onClickDeleteUser?: (
    id: string,
    page: number,
    branchId: number,
    teamId: number,
  ) => void;
  onClickResetPassword?: (id: number) => void;
  onClickVisible?: () => void;
}

List.defaultProps = {};

export default List;
