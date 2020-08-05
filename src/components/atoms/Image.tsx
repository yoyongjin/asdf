import React from 'react';
import styled, { css } from 'styled-components';

const StyledImage = styled.img<ImageProps>`
  width: ${(props) => {
    if (typeof props.width === 'number') return `${props.width}rem`;
    else if (typeof props.width === 'string') return props.width;
  }};
  height: ${(props) => {
    if (typeof props.height === 'number') return `${props.height}rem`;
    else if (typeof props.height === 'string') return props.height;
  }};
  background-image: url(${(props) => props.src}) no-repeat;
  /* background-repeat: no-repeat; */
  ${(props) => {
    if (props.hoverImage) {
      return css<ImageProps>`
        &:hover {
          cursor: pointer;
          content: url(${(props) => props.hoverImage});
        }
        &:active {
          opacity: 0.8;
        }
      `;
    }
  }}

  ${(props) => {
    if (props.onClick) {
      return css<ImageProps>`
        &:hover {
          cursor: pointer;
          opacity: 0.5;
        }
        &:active {
          opacity: 0.8;
        }
      `;
    }
  }}
`;

function Image({ alt, onClick, ...rest }: ImageProps) {
  return <StyledImage alt={alt} onClick={onClick} {...rest}></StyledImage>;
}

interface ImageProps {
  src: string;
  alt?: string;
  width: number | string;
  height: number | string;
  hoverImage?: string;
  onClick?: () => void;
}

Image.defaultProps = {
  width: 20,
  height: 7,
};

export default Image;
