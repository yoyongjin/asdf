import React from 'react';
import styled from 'styled-components';

import { COLORS } from 'utils/color';
import { TableProperty } from 'components/molecules';
import { UserInfo } from 'modules/types/user';

const StyledWrapper = styled.tr`
  width: 100%;
  height: 3.12rem;
  border-bottom: 1px solid ${COLORS.dark_gray4};
`;

function TableContent({
  userInfo,
  threeDotsIcon,
  hoverThreeDotsIcon,
  branchList,
  teamList,
  adminList,
  branchName,
  adminType,
  onClickUpdateUser,
  getBranchList,
  getTeamList,
  onClickDeleteUser,
  onClickResetPassword,
  page,
  branchId,
  teamId,
}: TableContentProps) {
  return (
    <>
      {userInfo.map((user, i) => {
        return (
          <StyledWrapper key={`styled-property-${i}`}>
            <TableProperty
              key={`table-property-${i}`}
              info={user}
              threeDotsIcon={threeDotsIcon}
              hoverThreeDotsIcon={hoverThreeDotsIcon}
              branchList={branchList}
              teamList={teamList}
              adminList={adminList}
              onClickUpdateUser={onClickUpdateUser}
              getBranchList={getBranchList!}
              getTeamList={getTeamList!}
              onClickDeleteUser={onClickDeleteUser!}
              onClickResetPassword={onClickResetPassword!}
              page={page!}
              branchId={branchId!}
              branchName={branchName}
              adminType={adminType}
              teamId={teamId!}
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

interface BranchInfo {
  branch_name: string;
  created_at: string;
  id: number;
}

interface TeamInfo {
  branch_id: number;
  id: number;
  team_name: string;
}

interface TableContentProps {
  userInfo: Array<UserInfo>;
  threeDotsIcon: string;
  hoverThreeDotsIcon: string;
  branchList: Array<BranchInfo>;
  teamList: Array<TeamInfo>;
  adminList: Array<SelectDataType>;
  page?: number;
  branchId?: number;
  branchName?: string;
  adminType?: number;
  teamId?: number;
  onClickUpdateUser: (
    id: string,
    branchId: string,
    teamId: string,
    admin: string,
    name: string,
    userId: string,
    password: string,
    tel: string,
    ip: string,
  ) => void;
  onClickDeleteUser?: (
    id: string,
    page: number,
    branchId: number,
    teamId: number,
  ) => void;
  onClickResetPassword?: (id: number) => void;
  getBranchList?: () => void;
  getTeamList?: (branch_id: number) => void;
}

TableContent.defaultProps = {};

export default TableContent;
