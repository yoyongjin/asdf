import React, { useMemo } from 'react';
import { ScrollSyncPane } from 'react-scroll-sync';
import styled, { css } from 'styled-components';

import { ITableTitleData } from 'components/molecules/TableTitle';
import { Colors } from 'utils/color';
import { ITableContentData } from 'components/molecules/TableContent';
import { TableBody, TableHeader } from 'components/molecules';

const StyledHead = styled.div<IStyledHeadProps>`
  background-color: ${(props) => props.backgroundColor};
  display: grid;
  height: ${(props) => props.height}px;
  overflow: auto;

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

const StyledBody = styled.div`
  height: calc(100% - 30px);
  overflow: auto;
  width: 100%;
`;

function Table({
  borderItem,
  contents,
  headColor,
  headHeight,
  isVirtual,
  titles,
}: ITableProps) {
  const gridTemplate = useMemo(() => {
    const filteredTitles = titles.filter((titleData) => !titleData.isNotShow);
    const filteredTitlesFinalIndex = filteredTitles.length - 1;

    let sum = 0;

    return filteredTitles
      .map((titleData, index) => {
        if (!titleData.width) {
          // 맨 마지막
          if (filteredTitlesFinalIndex === index) {
            return `calc(100% - ${sum}${
              titleData.isWidthPercent ? '%' : 'px'
            })`;
          }

          return '';
        }

        sum += titleData.width;

        if (titleData.isWidthPercent) {
          return `${titleData.width}%`;
        }

        return `${titleData.width}px`;
      })
      .join(' ');
  }, [titles]);

  return (
    <>
      <ScrollSyncPane group="one">
        <StyledHead
          borderItem={borderItem}
          backgroundColor={headColor}
          height={headHeight}
        >
          <TableHeader titles={titles} widthTemplate={gridTemplate} />
        </StyledHead>
      </ScrollSyncPane>
      <StyledBody>
        <TableBody
          contents={contents}
          isVirtual={isVirtual}
          widthTemplate={gridTemplate}
        />
      </StyledBody>
    </>
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
  widthTemplate?: string;
  widthSum?: number;
}

interface ITableProps {
  borderItem?: IStyledCustomBorder;
  contents: ITableContentData;
  dependencyTitles?: ITableTitleData[][];
  headColor: string;
  headHeight: number;
  titles: Array<ITableTitleData>;
  isVirtual: boolean;
}

Table.defaultProps = {
  headColor: Colors.gray4,
  headHeight: 30,
  isVirtual: false,
};

export default React.memo(Table);
