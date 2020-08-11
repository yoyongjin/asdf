import React from 'react';
import styled from 'styled-components';

import { TableProperty } from 'components/molecules';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.tr`
  height: 3.12rem;
  color: ${COLORS.dark_gray1};
  font-weight: 600;
`;

function TableContent({
  consultantInfo,
  threeDotsIcon,
  hoverThreeDotsIcon,
  branchList,
  teamList,
  adminList,
  onClickUpdateUser
}: TableContentProps) {
  return (
    <>
      {consultantInfo.map((consultant, i) => {
        return (
          <StyledWrapper key={`styled-property-${i}`}>
            <TableProperty
              key={`table-property-${i}`}
              info={consultant}
              threeDotsIcon={threeDotsIcon}
              hoverThreeDotsIcon={hoverThreeDotsIcon}
              branchList={branchList}
              teamList={teamList}
              adminList={adminList}
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

interface TableContentProps {
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

TableContent.defaultProps = {};

export default TableContent;
