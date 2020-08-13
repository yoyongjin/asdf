import React from 'react';
import styled from 'styled-components';

import { TableProperty } from 'components/molecules';
import { COLORS } from 'utils/color';
import { UserInfo } from 'modules/types/user';

const StyledWrapper = styled.tr`
  height: 3.12rem;
  color: ${COLORS.dark_gray1};
  font-weight: 600;
`;

function TableContent({
  userInfo,
  threeDotsIcon,
  hoverThreeDotsIcon,
  branchList,
  teamList,
  adminList,
  onClickUpdateUser,
  getBranchList,
  getTeamList,
  onClickDeleteUser,
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
              page={page!}
              branchId={branchId!}
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
  onClickDeleteUser?: (id: string,page: number, branchId: number, teamId: number) => void;
  getBranchList?: () => void;
  getTeamList?: (branch_id: number) => void;
}

TableContent.defaultProps = {};

export default TableContent;
