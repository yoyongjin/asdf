import React from 'react';
import styled from 'styled-components';

import { TableTitle, TableContent } from 'components/molecules';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.table`
  width: 100%;
  max-height: 20rem;
  min-height: 4rem;
  border-collapse: collapse;
`;

const StyledHead = styled.thead<StyledProps>`
  background-color: ${(props) => props.bgColor};
`;

const StyledBody = styled.tbody`
  text-align: center;
`;

function Table({
  tableTitle,
  bgColor,
  consultantInfo,
  threeDotsIcon,
  hoverThreeDotsIcon,
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
        ></TableContent>
      </StyledBody>
    </StyledWrapper>
  );
}

interface StyledProps {
  bgColor?: string;
}

interface consultInfoType {
  id: number;
  branch_name: string | null;
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
}

Table.defaultProps = {
  bgColor: COLORS.dark_gray1,
};

export default Table;
