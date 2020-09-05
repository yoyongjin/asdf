import React from 'react';
import styled from 'styled-components';

import { COLORS } from 'utils/color';
import { TableProperty } from 'components/molecules';
import { UserInfo } from 'modules/types/user';
import { BranchInfo, TeamInfo } from 'modules/types/branch';

const StyledWrapper = styled.tr`
  width: 100%;
  height: 3.12rem;
  border-bottom: 1px solid ${COLORS.dark_gray4};
`;

function TableContent({
  adminId,
  adminList,
  branchId,
  branchList,
  branchName,
  page,
  teamId,
  teamList,
  userInfo,
  optionIcon,
  optionHoverIcon,
  getBranchList,
  getTeamList,
  getUserInfo,
  onClickDeleteUser,
  onClickResetPassword,
  onClickUpdateUser,
}: TableContentProps) {
  return (
    <>
      {userInfo.map((user, i) => {
        return (
          <StyledWrapper key={`styled-property-${i}`}>
            <TableProperty
              key={`table-property-${i}`}
              adminId={adminId}
              adminList={adminList}
              branchId={branchId!}
              branchList={branchList}
              branchName={branchName}
              info={user}
              page={page!}
              teamId={teamId!}
              teamList={teamList}
              optionIcon={optionIcon}
              optionHoverIcon={optionHoverIcon}
              getBranchList={getBranchList!}
              getTeamList={getTeamList!}
              getUserInfo={getUserInfo!}
              onClickDeleteUser={onClickDeleteUser!}
              onClickResetPassword={onClickResetPassword!}
              onClickUpdateUser={onClickUpdateUser}
            />
          </StyledWrapper>
        );
      })}
    </>
  );
}

interface SelectDataType {
  id: number;
  data: string;
}

interface TableContentProps {
  adminId?: number;
  adminList: Array<SelectDataType>;
  branchId?: number;
  branchList: Array<BranchInfo>;
  branchName?: string;
  page?: number;
  teamId?: number;
  teamList: Array<TeamInfo>;
  userInfo: Array<UserInfo>;
  optionIcon: string;
  optionHoverIcon: string;
  getBranchList?: () => void;
  getTeamList?: (branch_id: number) => void;
  getUserInfo?: (info: UserInfo) => void;
  onClickDeleteUser?: (
    id: number,
    page: number,
    branchId: number,
    teamId: number,
    adminId: number,
  ) => void;
  onClickResetPassword?: (id: number) => void;
  onClickUpdateUser: (
    id: number,
    branchId: number,
    teamId: number,
    admin: number,
    name: string,
    userId: string,
    password: string,
    tel: string,
    ip: string,
  ) => void;
}

TableContent.defaultProps = {};

export default TableContent;
