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

function List({
  menu,
  onClickVisible,
  onClickDeleteUser,
  onClickResetPassword,
  id,
  page,
  branchId,
  teamId,
  adminType,
}: ListProps) {
  return (
    <StyledWrapper>
      {menu.map((title, i) => {
        if (adminType === 0 && i === 1) return null;
        return (
          <StyledContent
            key={`styled-content-${i}`}
            onClick={() => {
              if (i === 0) {
                onClickVisible!();
              } else if (i === 1) {
                onClickResetPassword!(id);
              } else if (i === 2) {
                onClickDeleteUser!(String(id), page!, branchId!, teamId!);
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
  id: number;
  page?: number;
  branchId?: number;
  teamId?: number;
  adminType: number;
  onClickVisible?: () => void;
  onClickDeleteUser?: (
    id: string,
    page: number,
    branchId: number,
    teamId: number,
  ) => void;
  onClickResetPassword?: (id: number) => void;
}

List.defaultProps = {};

export default List;
