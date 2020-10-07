import React from 'react';
import styled from 'styled-components';

import { COLORS } from 'utils/color';

const StyledWrapper = styled.div<ModalProps>`
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

const StyledInner = styled.div`
  /* Position */
  position: relative;
  top: 50%;

  /* Display */
  box-sizing: border-box;
  width: 640px;
  height: 570px;
  padding-left: 51px;
  padding-top: 42px;
  padding-right: 51px;
  padding-bottom: 30px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  margin: 0 auto;
  transform: translateY(-50%);

  /* Color */
  background-color: ${COLORS.dark_gray5};
`;

function Modal({ isVisible, Component }: ModalProps) {
  return (
    <StyledWrapper isVisible={isVisible}>
      <StyledInner>{Component}</StyledInner>
    </StyledWrapper>
  );
}

interface ModalProps {
  isVisible: boolean;
  Component?: React.ReactChild;
}

Modal.defaultProps = {};

export default Modal;
