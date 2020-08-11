import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.ul`
  /* Position */
  position: absolute;

  /* Display */
  width: 100%;
  right: 10rem;
  list-style-type: none;
`;

const StyledContent = styled.li`
  /* Position */
  text-align: center;

  /* Display */
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  list-style-type: none;

  /* Color */
  background-color: ${COLORS.dark_gray5};

  &:hover {
    background-color: ${COLORS.light_green};
    cursor: pointer;
  }
`;

function List({ menu, onClickVisible }: ListProps) {
  return (
    <StyledWrapper>
      {menu.map((title, i) => {
        return (
          <StyledContent
            key={`styled-content-${i}`}
            onClick={() => {
              if(i === 0){
                onClickVisible!();
              }else if(i === 1) {
                alert("비밀번호 초기화 예정")
              }else if(i === 2){
                alert("삭제 예정")
              }
            }}
          >
            <Text fontWeight={600} fontColor={COLORS.dark_gray1}>
              {title}
            </Text>
          </StyledContent>
        );
      })}
    </StyledWrapper>
  );
}

interface ListProps {
  menu: Array<string>;
  onClickVisible?: () => void;
}

List.defaultProps = {};

export default List;
