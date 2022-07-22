import React, { useCallback, useMemo } from 'react';
import { ScrollSyncPane } from 'react-scroll-sync';
import styled, { css } from 'styled-components';

import { TableTitle, TableContent } from 'components/molecules';
import { ITableTitleData } from 'components/molecules/TableTitle';
import { Colors } from 'utils/color';
import { ITableContentData } from 'components/molecules/TableContent';
import { TableBody, TableHeader } from 'components/molecules';

const StyledWrapper = styled.table<IStyledWrapper>`
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;

  ${(props) => {
    if (props.isVirtual) {
      return css`
        height: 100%;
      `;
    }
  }}
`;

const StyledTableHead = styled.thead<IStyledHeadProps>`
  background-color: ${(props) => props.backgroundColor};
  height: ${(props) => props.headHeight}px;

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

const StyledGridHead = styled.div<IStyledHeadProps>`
  background-color: ${(props) => props.backgroundColor};
  display: grid;
  height: ${(props) => props.headHeight}px;
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

const StyledTableBody = styled.tbody<IStyledBody>`
  width: 100%;
  height: calc(100% - ${(props) => props.height}px);
  overflow: auto;
`;

const StyledGridBody = styled.div<IStyledBody>`
  height: calc(100% - ${(props) => props.height}px);
  overflow: auto;
  width: 100%;
`;

function Table({
  borderItem,
  contents,
  dependencyTitles,
  headColor,
  headHeight,
  isVirtual,
  titles,
  type,
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

  const getTableWidths = useCallback((titles: Array<ITableTitleData>) => {
    const filteredTitles = titles.filter((titleData) => !titleData.isNotShow);
    const filteredTitlesFinalIndex = filteredTitles.length - 1;

    let sum = 0;

    return filteredTitles.map((titleData, index) => {
      if (!titleData.width) {
        // 맨 마지막
        if (filteredTitlesFinalIndex === index) {
          return `calc(100% - ${sum}${titleData.isWidthPercent ? '%' : 'px'})`;
        }

        return '';
      }

      sum += titleData.width;

      if (titleData.isWidthPercent) {
        return `${titleData.width}%`;
      }

      return `${titleData.width}px`;
    });
  }, []);

  const GridTableView = useCallback(() => {
    return (
      <>
        <ScrollSyncPane group="one">
          <StyledGridHead
            borderItem={borderItem}
            backgroundColor={headColor}
            headHeight={headHeight}
          >
            <TableHeader titles={titles} widthTemplate={gridTemplate} />
          </StyledGridHead>
        </ScrollSyncPane>
        <StyledGridBody height={headHeight}>
          <TableBody
            contents={contents}
            isVirtual={isVirtual}
            widthTemplate={gridTemplate}
            type={type}
          />
        </StyledGridBody>
      </>
    );
  }, [
    borderItem,
    contents,
    gridTemplate,
    headColor,
    headHeight,
    isVirtual,
    titles,
    type,
  ]);

  const DefaultTableView = useCallback(() => {
    return (
      <StyledWrapper isVirtual={isVirtual}>
        <StyledTableHead
          borderItem={borderItem}
          backgroundColor={headColor}
          headHeight={headHeight}
        >
          <TableTitle titles={titles} tableWidth={getTableWidths(titles)} />
          {dependencyTitles?.map((titles, index) => {
            const tableWidth = getTableWidths(titles);

            return (
              <TableTitle
                key={`Table-TableTitle-${index}`}
                titles={titles}
                tableWidth={tableWidth}
              />
            );
          })}
        </StyledTableHead>
        <StyledTableBody height={headHeight}>
          <TableContent
            isVirtual={isVirtual}
            contents={contents}
            type={type}
            tableWidth={getTableWidths(titles)}
          />
        </StyledTableBody>
      </StyledWrapper>
    );
  }, [
    borderItem,
    contents,
    dependencyTitles,
    getTableWidths,
    headColor,
    headHeight,
    isVirtual,
    titles,
    type,
  ]);

  const RenderView = useCallback(() => {
    if (type === 'table') {
      return DefaultTableView();
    }

    return GridTableView();
  }, [DefaultTableView, GridTableView, type]);

  return RenderView();
}

interface IStyledWrapper {
  isVirtual: boolean;
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
  headHeight: number;
  widthTemplate?: string;
  widthSum?: number;
}

interface IStyledBody {
  height?: number;
}

interface ITableProps {
  borderItem?: IStyledCustomBorder;
  contents: ITableContentData;
  dependencyTitles?: ITableTitleData[][];
  headColor: string;
  headHeight: number;
  titles: Array<ITableTitleData>;
  isVirtual: boolean;
  type: 'grid' | 'table';
}

Table.defaultProps = {
  headColor: Colors.gray4,
  headHeight: 30,
  isVirtual: false,
  type: 'grid',
};

export default Table;
