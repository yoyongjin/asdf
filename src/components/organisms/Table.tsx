import React from 'react';
import styled from 'styled-components';

import { TableTitle, TableContent } from 'components/molecules';
import { UserInfo } from 'modules/types/user';
import { Colors } from 'utils/color';
import { UserData } from 'types/user';

const StyledWrapper = styled.table`
  /* Display */
  border-collapse: collapse;
  height: 100%;
  table-layout: fixed;
  width: 100%;
`;

const StyledHead = styled.thead<StyledProps>`
  /* Display */
  height: 30px;

  /* Color */
  background-color: ${(props) => props.bgColor};
`;

const StyledBody = styled.tbody`
  /* Display */
  height: calc(100% - 30px);

  /* Text */
  text-align: center;
`;

function Table({
  adminId,
  branchId,
  page,
  tableTitle,
  teamId,
  userInfo,
  bgColor,
  optionIcon,
  optionHoverIcon,
  getUserInfo,
  onClickDeleteUser,
  onClickResetPassword,
}: TableProps) {
  return (
    <StyledWrapper>
      <StyledHead bgColor={bgColor}>
        <TableTitle titleList={tableTitle} />
      </StyledHead>
      <StyledBody>
        <TableContent
          adminId={adminId}
          branchId={branchId}
          page={page!}
          teamId={teamId}
          userInfo={userInfo}
          optionIcon={optionIcon}
          optionHoverIcon={optionHoverIcon}
          getUserInfo={getUserInfo!}
          onClickDeleteUser={onClickDeleteUser!}
          onClickResetPassword={onClickResetPassword!}
        ></TableContent>
      </StyledBody>
    </StyledWrapper>
  );
}

interface StyledProps {
  bgColor?: string;
}

interface TitleProps {
  title: string;
  width: number;
}

interface TableProps extends StyledProps {
  adminId?: number;
  branchId?: number;
  page?: number;
  tableTitle: Array<TitleProps>;
  teamId?: number;
  userInfo: Array<UserData>;
  optionIcon: string;
  optionHoverIcon: string;
  getUserInfo?: (info: UserData) => void;
  onClickDeleteUser?: (
    id: number,
    page: number,
    branchId: number,
    teamId: number,
    adminId: number,
  ) => void;
  onClickResetPassword?: (id: number) => void;
}

Table.defaultProps = {
  bgColor: Colors.gray4,
};

export default React.memo(
  Table,
  (preProps, nextProps) => preProps.userInfo === nextProps.userInfo,
);
