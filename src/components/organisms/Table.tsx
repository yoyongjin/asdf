import React from 'react';
import styled from 'styled-components';

import { TableTitle, TableContent } from 'components/molecules';
import { COLORS } from 'utils/color';
import { UserInfo } from 'modules/types/user';

const StyledWrapper = styled.table`
  width: 100%;
  height: 100%;
  /* max-height: 20rem; */
  /* min-height: 4rem; */
  border-collapse: collapse;
`;

const StyledHead = styled.thead<StyledProps>`
  /* Display */
  height: 1.87rem;

  /* Color */
  background-color: ${(props) => props.bgColor};
`;

const StyledBody = styled.tbody`
  height: calc(100% - 1.87rem);
  text-align: center;
`;

function Table({
  tableTitle,
  bgColor,
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
  onClickResetPassword,
  page,
  branchId,
  teamId,
}: TableProps) {
  return (
    <StyledWrapper>
      <StyledHead bgColor={bgColor}>
        <TableTitle titleList={tableTitle} />
      </StyledHead>
      <StyledBody>
        <TableContent
          userInfo={userInfo}
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
          branchId={branchId}
          teamId={teamId}
          onClickResetPassword={onClickResetPassword!}
        ></TableContent>
      </StyledBody>
    </StyledWrapper>
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

interface StyledProps {
  bgColor?: string;
}

interface TableProps extends StyledProps {
  tableTitle: Array<string>;
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

Table.defaultProps = {
  bgColor: COLORS.dark_gray1,
};

export default Table;
