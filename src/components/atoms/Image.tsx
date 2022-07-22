import React from 'react';
import styled, { css } from 'styled-components';

const StyledImage = styled.img<ImageProps>`
  /* Display */
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;

  &:hover {
    ${(props) => {
      if (props.hoverImg) {
        return css<StyledImageProps>`
          cursor: pointer;
          content: url(${(props) => props.hoverImg});
        `;
      }

      if (props.onClick) {
        return css<StyledImageProps>`
          cursor: pointer;
          opacity: 0.6;
        `;
      }
    }}
  }

  &:active {
    ${(props) => {
      if (props.hoverImg || props.onClick) {
        return css<StyledImageProps>`
          opacity: 0.8;
        `;
      }
    }}
  }
`;

function Image({ alt, src, onClick, ...rest }: ImageProps) {
  return <StyledImage alt={alt} src={src} onClick={onClick} {...rest} />;
}

interface StyledImageProps {
  readonly height: number;
  readonly hoverImg?: string;
  readonly width: number;
}

interface ImageProps extends StyledImageProps {
  readonly alt?: string;
  readonly src: string;
  readonly onClick?: () => void;
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement>;
}

Image.defaultProps = {
  height: 2,
  width: 5,
};

export default Image;
