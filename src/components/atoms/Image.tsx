import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img<ImageProps>`
  width: ${(props) => {
    if (typeof props.width === 'number') return `${props.width}rem`;
    else if (typeof props.width === 'string') return props.width;
  }};
  height: ${(props) => {
    if (typeof props.height === 'number') return `${props.height}rem`;
    else if (typeof props.height === 'string') return props.height;
  }};
`;

function Image({ src, alt, ...rest }: ImageProps) {
  return <StyledImage src={src} alt={alt} {...rest}></StyledImage>;
}

interface ImageProps {
  src: string;
  alt?: string;
  width: number | string;
  height: number | string;
}

Image.defaultProps = {
  width: 20,
  height: 7,
};

export default Image;
