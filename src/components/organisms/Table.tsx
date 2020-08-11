import React from 'react';
import styled from 'styled-components';

import { TableTitle, TableContent } from 'components/molecules';
import { COLORS } from 'utils/color';

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
  consultantInfo,
  threeDotsIcon,
  hoverThreeDotsIcon,
  branchList,
  teamList,
  adminList,
  onClickUpdateUser
}: TableProps) {
  return (
    <StyledWrapper>
      <StyledHead bgColor={bgColor}>
        <TableTitle titleList={tableTitle} />
      </StyledHead>
      <StyledBody>
        <TableContent
          consultantInfo={consultantInfo}
          threeDotsIcon={threeDotsIcon}
          hoverThreeDotsIcon={hoverThreeDotsIcon}
          branchList={branchList}
          teamList={teamList}
          adminList={adminList}
          onClickUpdateUser={onClickUpdateUser}
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

interface consultInfoType {
  id: number;
  branch_id: string;
  branch_name: string | null;
  team_id: string;
  team_name: string | null;
  admin_id: string;
  name: string;
  user_name: string;
  number: string;
  ziboxip: string;
  login_at: number;
  call_time?: number;
  call_type?: string;
  diff?: number;
}

interface TableProps extends StyledProps {
  tableTitle: Array<string>;
  consultantInfo: Array<consultInfoType>;
  threeDotsIcon: string;
  hoverThreeDotsIcon: string;
  branchList: Array<BranchInfo>;
  teamList: Array<TeamInfo>;
  adminList: Array<SelectDataType>;
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
}

Table.defaultProps = {
  bgColor: COLORS.dark_gray1,
};

export default Table;
