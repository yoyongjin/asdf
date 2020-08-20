import React from 'react';
import styled from 'styled-components';

import { Image } from 'components/atoms';
import { PageCount } from 'components/molecules';
import { getMaxPage } from 'utils/utils';
import nextIcon from 'images/list-page-n@2x.png';
import prevIcon from 'images/list-page-p@2x.png';
import firstIcon from 'images/list-page-pp@2x.png';
import endIcon from 'images/list-page-nn@2x.png';

const StyledWrapper = styled.div`
  /* Display */
  display: flex;
  justify-content: center;
`;

const StyledPrev = styled.span`
  /* Display */
  padding-right: 3rem;
`;

const StyledBlankSpace = styled.span`
  /* Display */
  padding-left: 1rem;
  padding-right: 1rem;
`;

const StyledPage = styled.span`
  align-self: center;
`;

const StyledNext = styled.span`
  /* Display */
  padding-left: 3rem;
`;

function TablePagination({
  curPage,
  count,
  onClickNextPage,
  onClickPrevPage,
}: TablePaginationProps) {
  return (
    <StyledWrapper>
      <StyledPrev>
        <StyledBlankSpace>
          <Image
            src={firstIcon}
            width={2}
            height={2}
            onClick={() => onClickPrevPage(curPage, count, true)}
          ></Image>
        </StyledBlankSpace>
        <StyledBlankSpace>
          <Image
            src={prevIcon}
            width={2}
            height={2}
            onClick={() => onClickPrevPage(curPage, count, false)}
          ></Image>
        </StyledBlankSpace>
      </StyledPrev>
      <StyledPage>
        <PageCount
          curPage={curPage}
          maxPage={getMaxPage(count)}
          padding={1}
        ></PageCount>
      </StyledPage>
      <StyledNext>
        <StyledBlankSpace>
          <Image
            src={nextIcon}
            width={2}
            height={2}
            onClick={() => onClickNextPage(curPage, count, false)}
          ></Image>
        </StyledBlankSpace>
        <StyledBlankSpace>
          <Image
            src={endIcon}
            width={2}
            height={2}
            onClick={() => onClickNextPage(curPage, count, true)}
          ></Image>
        </StyledBlankSpace>
      </StyledNext>
    </StyledWrapper>
  );
}

interface TablePaginationProps {
  curPage: number;
  count: number;
  onClickNextPage: (cur:number, total:number, isEnd?: boolean) => void;
  onClickPrevPage: (cur: number, total: number, isStart?: boolean) => void;
}

TablePagination.defaultProps = {};

export default TablePagination;
