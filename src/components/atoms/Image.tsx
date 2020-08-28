import React from 'react';
import styled, { css } from 'styled-components';

const StyledImage = styled.img<ImageProps>`
  /* Display */
  height: ${(props) => props.height}rem;
  width: ${(props) => props.width}rem;
  /* background-image: url(${(props) => props.src}) no-repeat; */
  /* background-repeat: no-repeat; */

  ${(props) => {
    if (props.bgHoverImg) {
      // hover 이미지가 있을 때
      return css<StyledImageProps>`
        &:hover {
          content: url(${(props) => props.bgHoverImg});
          cursor: pointer;
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
      return css<StyledImageProps>`
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

function Image({ alt, src, onClick, ...rest }: ImageProps) {
  return <StyledImage src={src} alt={alt} onClick={onClick} {...rest} />;
}

interface StyledImageProps {
  readonly bgHoverImg?: string;
  readonly width: number;
  readonly height: number;
}

interface ImageProps extends StyledImageProps {
  readonly alt?: string;
  readonly src: string;
  readonly onClick?: () => void;
}

Image.defaultProps = {
  height: 3,
  width: 10,
};

export default Image;
