import React from 'react';
import styled from 'styled-components';

import { TableProperty } from 'components/molecules';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.tr`
  height: 4rem;
  color: ${COLORS.dark_gray1};
  font-weight: 600;
`;

function TableContent({
  consultantInfo,
  threeDotsIcon,
  hoverThreeDotsIcon,
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
            />
          </StyledWrapper>
        );
      })}
    </>
  );
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

interface TableContentProps {
  consultantInfo: Array<consultInfoType>;
  threeDotsIcon: string;
  hoverThreeDotsIcon: string;
}

TableContent.defaultProps = {};

export default TableContent;
