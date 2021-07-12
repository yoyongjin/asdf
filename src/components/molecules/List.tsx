import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { UserInfo } from 'modules/types/user';
import { Colors } from 'utils/color';
import { company, COMPANY_TYPE } from 'utils/constants';

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
    background-color: ${company === COMPANY_TYPE.DBLIFE ||
    company === COMPANY_TYPE.LINA
      ? Colors.green2
      : Colors.blue5};
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
  loginAdmin,
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
                onClickDeleteUser!(id, page!, branchId!, teamId!, loginAdmin);
              }
            }}
          >
            <Text
              fontColor={Colors.gray4}
              fontFamily="NanumBarunGothic"
              fontSize={13}
              fontWeight={700}
            >
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
  loginAdmin: number;
  onClickGetUserInfo?: (info: UserInfo) => void;
  onClickDeleteUser?: (
    id: number,
    page: number,
    branchId: number,
    teamId: number,
    adminId: number,
  ) => void;
  onClickResetPassword?: (id: number) => void;
  onClickVisible?: () => void;
}

List.defaultProps = {};

export default List;
