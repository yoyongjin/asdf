import React from 'react';
import styled from 'styled-components';

import { TableTitle, TableContent } from 'components/molecules';
import { COLORS } from 'utils/color';
import { UserInfo } from 'modules/types/user';
import { BranchInfo, TeamInfo } from 'modules/types/branch';

const StyledWrapper = styled.table`
  /* Display */
  border-collapse: collapse;
  height: 100%;
  table-layout: fixed;
  width: 100%;
`;

const StyledHead = styled.thead<StyledProps>`
  /* Display */
  height: 1.87rem;

  /* Color */
  background-color: ${(props) => props.bgColor};
`;

const StyledBody = styled.tbody`
  /* Display */
  height: calc(100% - 1.87rem);
  /* height: 100%; */

  /* Text */
  text-align: center;
`;

function Table({
  adminList,
  adminId,
  branchId,
  branchList,
  branchName,
  page,
  tableTitle,
  teamId,
  teamList,
  userInfo,
  bgColor,
  optionIcon,
  optionHoverIcon,
  getBranchList,
  getTeamList,
  getUserInfo,
  onClickDeleteUser,
  onClickResetPassword,
  onClickUpdateUser,
}: TableProps) {
  return (
    <StyledWrapper>
      <StyledHead bgColor={bgColor}>
        <TableTitle titleList={tableTitle} />
      </StyledHead>
      <StyledBody>
        <TableContent
          adminId={adminId}
          adminList={adminList}
          branchId={branchId}
          branchList={branchList}
          branchName={branchName}
          page={page!}
          teamId={teamId}
          teamList={teamList}
          userInfo={userInfo}
          optionIcon={optionIcon}
          optionHoverIcon={optionHoverIcon}
          getBranchList={getBranchList!}
          getTeamList={getTeamList!}
          getUserInfo={getUserInfo!}
          onClickDeleteUser={onClickDeleteUser!}
          onClickResetPassword={onClickResetPassword!}
          onClickUpdateUser={onClickUpdateUser}
        ></TableContent>
      </StyledBody>
    </StyledWrapper>
  );
}

interface StyledProps {
  bgColor?: string;
}
interface SelectDataType {
  id: number;
  data: string;
}

interface TitleProps {
  title: string;
  width: number;
}

interface TableProps extends StyledProps {
  adminId?: number;
  adminList: Array<SelectDataType>;
  branchId?: number;
  branchList: Array<BranchInfo>;
  branchName?: string;
  page?: number;
  tableTitle: Array<TitleProps>;
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
    mic: number,
    spk: number,
  ) => void;
}

Table.defaultProps = {
  bgColor: COLORS.dark_gray1,
};

export default React.memo(
  Table,
  (preProps, nextProps) => preProps.userInfo === nextProps.userInfo,
);
