import React from 'react';
import styled, { css } from 'styled-components';

const StyledImage = styled.img<ImageProps>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  /* background-image: url(${(props) => props.src}) no-repeat; */
  /* background-repeat: no-repeat; */

  ${(props) => {
    if (props.bgHoverImage) {
      // hover 이미지가 있을 때
      return css<ImageProps>`
        &:hover {
          cursor: pointer;
          content: url(${(props) => props.bgHoverImage});
        }
        &:active {
          opacity: 0.8;
        }
      `;
    }
  }}

  ${(props) => {
    if (props.onClick) {
      // 이미지 클릭이 가능할 때
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

function Image({ src, alt, onClick, ...rest }: ImageProps) {
  return <StyledImage src={src} alt={alt} onClick={onClick} {...rest}></StyledImage>;
}

interface ImageProps {
  readonly src: string;
  readonly alt?: string;
  readonly width: number;
  readonly height: number;
  readonly bgHoverImage?: string;
  readonly onClick?: () => void;
}

Image.defaultProps = {
  width: 15,
  height: 7,
};

export default Image;
