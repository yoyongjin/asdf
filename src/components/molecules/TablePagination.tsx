import React from 'react';
import styled from 'styled-components';

import { Image } from 'components/atoms';
import { PageCount } from 'components/molecules';
import Utils from 'utils/new_utils';

import nextIcon from 'images/list-page-n.png';
import prevIcon from 'images/list-page-p.png';
import firstIcon from 'images/list-page-pp.png';
import endIcon from 'images/list-page-nn.png';

const StyledWrapper = styled.div`
  /* Display */
  display: flex;
  justify-content: center;
`;

const StyledPrev = styled.span`
  /* Display */
  padding-right: 33px;
`;

const StyledBlankSpace = styled.span`
  /* Display */
  /* padding-left: 12.5px; */
  padding-right: 12.5px;
`;

const StyledPage = styled.span`
  align-self: center;
`;

const StyledNext = styled.span`
  /* Display */
  padding-left: 43px;
`;

function TablePagination({
  curPage,
  count,
  divide,
  onClickNextPage,
  onClickPrevPage,
}: TablePaginationProps) {
  return (
    <StyledWrapper>
      <StyledPrev>
        <StyledBlankSpace>
          <Image
            src={firstIcon}
            width={16}
            height={17}
            onClick={() => onClickPrevPage(curPage, count, true)}
          />
        </StyledBlankSpace>
        <StyledBlankSpace>
          <Image
            src={prevIcon}
            width={11}
            height={17}
            onClick={() => onClickPrevPage(curPage, count, false)}
          />
        </StyledBlankSpace>
      </StyledPrev>
      <StyledPage>
        <PageCount
          curPage={curPage}
          maxPage={Utils.getMaxPage(count, divide)}
          padding={1}
        ></PageCount>
      </StyledPage>
      <StyledNext>
        <StyledBlankSpace>
          <Image
            src={nextIcon}
            width={11}
            height={17}
            onClick={() => onClickNextPage(curPage, count, divide, false)}
          ></Image>
        </StyledBlankSpace>
        <StyledBlankSpace>
          <Image
            src={endIcon}
            width={16}
            height={17}
            onClick={() => onClickNextPage(curPage, count, divide, true)}
          ></Image>
        </StyledBlankSpace>
      </StyledNext>
    </StyledWrapper>
  );
}

interface TablePaginationProps {
  curPage: number;
  count: number;
  divide: number;
  onClickNextPage: (
    cur: number,
    total: number,
    divide: number,
    isEnd?: boolean,
  ) => void;
  onClickPrevPage: (cur: number, total: number, isStart?: boolean) => void;
}

TablePagination.defaultProps = {};

export default React.memo(TablePagination);
