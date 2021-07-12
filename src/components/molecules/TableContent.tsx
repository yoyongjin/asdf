import React from 'react';
import styled from 'styled-components';

import { TableProperty } from 'components/molecules';
import { UserInfo } from 'modules/types/user';
import { Colors } from 'utils/color';

const StyledWrapper = styled.tr`
  width: 100%;
  height: 50px;
  border-bottom: 1px solid ${Colors.gray7};
`;

function TableContent({
  adminId,
  branchId,
  page,
  teamId,
  userInfo,
  optionIcon,
  optionHoverIcon,
  getUserInfo,
  onClickDeleteUser,
  onClickResetPassword,
}: TableContentProps) {
  return (
    <>
      {userInfo.map((user, i) => {
        return (
          <StyledWrapper key={`styled-property-${i}`}>
            <TableProperty
              key={`table-property-${i}`}
              adminId={adminId}
              branchId={branchId!}
              info={user}
              page={page!}
              teamId={teamId!}
              optionIcon={optionIcon}
              optionHoverIcon={optionHoverIcon}
              getUserInfo={getUserInfo!}
              onClickDeleteUser={onClickDeleteUser!}
              onClickResetPassword={onClickResetPassword!}
            />
          </StyledWrapper>
        );
      })}
    </>
  );
}

interface TableContentProps {
  adminId?: number;
  branchId?: number;
  page?: number;
  teamId?: number;
  userInfo: Array<UserInfo>;
  optionIcon: string;
  optionHoverIcon: string;
  getUserInfo?: (info: UserInfo) => void;
  onClickDeleteUser?: (
    id: number,
    page: number,
    branchId: number,
    teamId: number,
    adminId: number,
  ) => void;
  onClickResetPassword?: (id: number) => void;
}

TableContent.defaultProps = {};

export default TableContent;
