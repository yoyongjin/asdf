import { darken } from 'polished';
import React from 'react';
import { IconType } from 'react-icons';
import styled from 'styled-components';

const StyledWrapper = styled.span<IStyledIcon>`
  color: ${(props) => props.themeColor};
  cursor: ${(props) => {
    if (props.onClick) {
      return 'pointer';
    }
    return '';
  }};

  &:hover {
    color: ${(props) => {
      if (props.onClick && props.themeColor) {
        return darken(0.1, props.themeColor);
      }

      return '';
    }};
  }
`;

/**
 * @description 아이콘 컴포넌트
 */
function Icon({ ReactIcon, size, ...rest }: IIcon) {
  return (
    <StyledWrapper {...rest}>
      <ReactIcon size={size} />
    </StyledWrapper>
  );
}

interface IStyledIcon {
  onClick?: () => void; // 클릭 이벤트
  themeColor?: string; // 색상
}

interface IIcon extends IStyledIcon {
  ReactIcon: IconType; // react-icons전용 컴포넌트
  size: number; // 크기
}

Icon.defaultProps = {
  size: 30,
};

export default Icon;
