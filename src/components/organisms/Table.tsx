import React from 'react';
import styled, { css } from 'styled-components';

import { TableTitle, TableContent } from 'components/molecules';
import { ITableTitleData } from 'components/molecules/TableTitle';
import { Colors } from 'utils/color';
import { ITableContentData } from 'components/molecules/TableContent';

const StyledWrapper = styled.table`
  border-collapse: collapse;
  height: 100%;
  table-layout: fixed;
  width: 100%;
`;

const StyledHead = styled.thead<IStyledHeadProps>`
  background-color: ${(props) => props.backgroundColor};
  height: ${(props) => props.height}px;

  ${(props) => {
    // border bottom
    if (props.borderItem?.borderBottom) {
      return css<IStyledHeadProps>`
        border-bottom-color: ${(props) =>
          props.borderItem?.borderBottom
            ? `${props.borderItem?.borderBottom.color} !important`
            : ''};
        border-bottom-style: ${(props) =>
          props.borderItem?.borderBottom
            ? `${props.borderItem?.borderBottom.style} !important`
            : ''};
        border-bottom-width: ${(props) =>
          props.borderItem?.borderBottom
            ? `${props.borderItem?.borderBottom.width}px !important`
            : ''};
      `;
    }
  }}

  ${(props) => {
    // border left
    if (props.borderItem?.borderLeft) {
      return css<IStyledHeadProps>`
        border-left-color: ${(props) =>
          props.borderItem?.borderLeft
            ? `${props.borderItem?.borderLeft.color} !important`
            : ''};
        border-left-style: ${(props) =>
          props.borderItem?.borderLeft
            ? `${props.borderItem?.borderLeft.style} !important`
            : ''};
        border-left-width: ${(props) =>
          props.borderItem?.borderLeft
            ? `${props.borderItem?.borderLeft.width}px !important`
            : ''};
      `;
    }
  }}

${(props) => {
    // border right
    if (props.borderItem?.borderRight) {
      return css<IStyledHeadProps>`
        border-right-color: ${(props) =>
          props.borderItem?.borderRight
            ? `${props.borderItem?.borderRight.color} !important`
            : ''};
        border-right-style: ${(props) =>
          props.borderItem?.borderRight
            ? `${props.borderItem?.borderRight.style} !important`
            : ''};
        border-right-width: ${(props) =>
          props.borderItem?.borderRight
            ? `${props.borderItem?.borderRight.width}px !important`
            : ''};
      `;
    }
  }}

${(props) => {
    // border top
    if (props.borderItem?.borderTop) {
      return css<IStyledHeadProps>`
        border-top-color: ${(props) =>
          props.borderItem?.borderTop
            ? `${props.borderItem?.borderTop.color} !important`
            : ''};
        border-top-style: ${(props) =>
          props.borderItem?.borderTop
            ? `${props.borderItem?.borderTop.style} !important`
            : ''};
        border-top-width: ${(props) =>
          props.borderItem?.borderTop
            ? `${props.borderItem?.borderTop.width}px !important`
            : ''};
      `;
    }
  }}

${(props) => {
    // common
    if (props.borderItem?.common) {
      return css<IStyledHeadProps>`
        border-color: ${(props) =>
          props.borderItem?.common
            ? `${props.borderItem?.common.color} !important`
            : ''};
        border-style: ${(props) =>
          props.borderItem?.common
            ? `${props.borderItem?.common.style} !important`
            : ''};
        border-width: ${(props) =>
          props.borderItem?.common
            ? `${props.borderItem?.common.width}px !important`
            : ''};
      `;
    }
  }}
`;

const StyledBody = styled.tbody`
  height: calc(100% - 30px);
  text-align: center;
`;

function Table({
  borderItem,
  contents,
  dependencyTitles,
  headColor,
  headHeight,
  titles,
}: ITableProps) {
  return (
    <StyledWrapper>
      <StyledHead
        borderItem={borderItem}
        backgroundColor={headColor}
        height={headHeight}
      >
        <TableTitle titles={titles} />
        {dependencyTitles
          ? dependencyTitles.map((titles) => {
              return <TableTitle titles={titles} />;
            })
          : null}
      </StyledHead>
      <StyledBody>
        <TableContent contents={contents} />
      </StyledBody>
    </StyledWrapper>
  );
}

interface IStyledBorderItem {
  color: string;
  style: string;
  width: number;
}

interface IStyledCustomBorder {
  borderBottom?: IStyledBorderItem;
  borderLeft?: IStyledBorderItem;
  borderRight?: IStyledBorderItem;
  borderTop?: IStyledBorderItem;
  common?: IStyledBorderItem; // 공통
}

interface IStyledHeadProps {
  borderItem?: IStyledCustomBorder;
  backgroundColor: string;
  height: number;
}

interface ITableProps {
  borderItem?: IStyledCustomBorder;
  contents: ITableContentData;
  dependencyTitles?: ITableTitleData[][];
  headColor: string;
  headHeight: number;
  titles: Array<ITableTitleData>;
}

Table.defaultProps = {
  headColor: Colors.gray4,
  headHeight: 30,
};

export default React.memo(Table);
