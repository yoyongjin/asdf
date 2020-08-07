import React, { useState } from 'react';
import styled from 'styled-components';

import { Image, List, Text } from 'components/atoms';
import { COLORS } from 'utils/color';

const StyledWrapper = styled.td`
  /* Display */
  border-bottom: 1px solid ${COLORS.dark_gray4};
`;

const StyledProperty = styled.div`
  /* Position */
  float: right;

  /* Display */
  width: 2rem;
`;

const StyledList = styled.div`
  /* Position */
  position: relative;

  /* Display */
  width: 10rem;
`;

function TableProperty({
  info,
  threeDotsIcon,
  hoverThreeDotsIcon,
}: TableContentProps) {
  const menuList = ['정보 수정', '비밀번호 초기화', '삭제'];
  const [isHover, setIsHover] = useState<boolean>(false);
  const onMouseIn = () => {
    setIsHover(true);
  };

  const onMouseOut = () => {
    setIsHover(false);
  };
  return (
    <>
      <StyledWrapper>
        <Text>{info.id}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.branch_name!}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.team_name!}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.admin_id}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.user_name}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.name}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.number}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.ziboxip}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <StyledProperty onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}>
          {isHover && (
            <StyledList>
              <List menu={menuList}></List>
            </StyledList>
          )}
          <Image
            src={threeDotsIcon}
            width={2}
            height={2}
            hoverImage={hoverThreeDotsIcon}
          />
        </StyledProperty>
      </StyledWrapper>
    </>
  );
}

interface consultInfoType {
  id: number;
  branch_name: string | null;
  team_name: string | null;
  admin_id: string;
  name: string;
  user_name: string;
  number: string;
  ziboxip: string;
  login_at: number;
  call_time?: number;
  call_type?: string;
  diff?: number;
}

interface TableContentProps {
  info: consultInfoType;
  threeDotsIcon: string;
  hoverThreeDotsIcon: string;
}

TableProperty.defaultProps = {};

export default TableProperty;
