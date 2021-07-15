import React from 'react';
import styled from 'styled-components';

import { TableTitle, TableContent } from 'components/molecules';
import { Colors } from 'utils/color';
import { LoginData } from 'types/auth';
import { TableContentData, TableTitleData } from './UserView';

const StyledWrapper = styled.table`
  /* Display */
  border-collapse: collapse;
  height: 100%;
  table-layout: fixed;
  width: 100%;
`;

const StyledHead = styled.thead<StyledHeadProps>`
  /* Display */
  height: 30px;

  /* Color */
  background-color: ${(props) => props.titleColor};
`;

const StyledBody = styled.tbody`
  /* Display */
  height: calc(100% - 30px);

  /* Text */
  text-align: center;
`;

function Table({ contents, titleColor, titles }: TableProps) {
  return (
    <StyledWrapper>
      <StyledHead titleColor={titleColor}>
        <TableTitle titles={titles} />
      </StyledHead>
      <StyledBody>
        <TableContent contents={contents} />
      </StyledBody>
    </StyledWrapper>
  );
}

interface StyledHeadProps {
  titleColor: string;
}

interface TableProps extends StyledHeadProps {
  contents: TableContentData;
  titles: Array<TableTitleData>;
}

Table.defaultProps = {
  titleColor: Colors.gray4,
};

export default React.memo(Table);
