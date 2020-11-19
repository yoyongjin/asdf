import React, {useCallback} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { Text } from 'components/atoms';
import { COLORS } from 'utils/color';

import {
  sortUserList
} from 'modules/actions/user';

const StyledWrapper = styled.tr`
  /* Display */
  width: 100%;
  height: 1.87rem;
`;

const StyledTitle = styled.th<StyledProps>`
  width: ${props => props.width}%;
`;

function TableTitle({ titleList, fontColor }: TableTitleProps) {
  const dispatch = useDispatch();

  const handleClick = useCallback(
    (id: number) => {
      dispatch(sortUserList(id));
    },
    [dispatch],
  );

  return (
    <StyledWrapper>
      {titleList.map((values, i) => {
        return (
          <StyledTitle key={`styled-title-${i}`} width={values.width}>
            <Text fontSize={0.81} fontColor={fontColor} fontWeight={700} onClick={()=>handleClick(i)}> 
              {values.title}
            </Text>
          </StyledTitle>
        );
      })}
    </StyledWrapper>
  );
}

interface StyledProps {
  width: number;
}

interface TitleProps extends StyledProps{
  title: string;
}

interface TableTitleProps {
  titleList: Array<TitleProps>;
  fontColor: string;
}

TableTitle.defaultProps = {
  bgColor: COLORS.dark_gray1,
  fontColor: COLORS.white,
};

export default TableTitle;
