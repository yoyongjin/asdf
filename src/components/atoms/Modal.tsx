import React from 'react';
import styled from 'styled-components';

import { Colors } from 'utils/color';

const StyledWrapper = styled.div<IStyleWrapper>`
  /* Position */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;

  /* Display */
  box-sizing: border-box;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  outline: 0;

  /* Color */
  background-color: rgba(0, 0, 0, 0.6);
`;

const StyledInner = styled.div<IStyledInner>`
  /* Position */
  position: relative;
  top: 50%;

  /* Display */
  box-sizing: border-box;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding-left: 51px;
  padding-top: 42px;
  padding-right: 51px;
  padding-bottom: 30px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  margin: 0 auto;
  transform: translateY(-50%);

  /* Color */
  background-color: ${(props) => props.backgroundColor};
`;

function Modal({
  backgroundColor,
  Component,
  height,
  isVisible,
  width,
}: IModalProps) {
  return (
    <StyledWrapper isVisible={isVisible}>
      <StyledInner
        backgroundColor={backgroundColor}
        height={height}
        width={width}
      >
        {Component}
      </StyledInner>
    </StyledWrapper>
  );
}

interface IStyleWrapper {
  isVisible: boolean;
}

interface IStyledInner {
  backgroundColor: string;
  height: number;
  width: number;
}

interface IModalProps extends IStyleWrapper, IStyledInner {
  Component?: React.ReactChild;
}

Modal.defaultProps = {
  backgroundColor: Colors.gray8,
  height: 570,
  width: 640,
};

export default React.memo(Modal);
