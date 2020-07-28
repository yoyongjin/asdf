import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img.attrs<ImageProps>((props) => ({
  src: props.src,
  alt: props.alt || props.src,
}))<ImageProps>`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
`;

function Image({ ...props }: ImageProps) {
  return <StyledImage {...props}></StyledImage>;
}

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

Image.defaultProps = {
  width: 20,
  height: 7,
};

export default Image;
