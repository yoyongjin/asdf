import React from 'react';
import styled from 'styled-components';

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

function List({ menu }: ListProps) {
  return (
    <StyledWrapper>
      {menu.map((title, i) => {
        return (
          <StyledContent key={`styled-content-${i}`}>{title}</StyledContent>
        );
      })}
    </StyledWrapper>
  );
}

interface ListProps {
  menu: Array<string>;
}

List.defaultProps = {};

export default List;
