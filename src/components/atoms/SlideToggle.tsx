import React from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { TonChangeCheckBox } from 'hooks/useInputForm';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledLabel = styled.label<IStyledLabel>`
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
  border-color: ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius}px;
  border-style: ${(props) => props.borderStyle};
  border-width: ${(props) => props.borderWidth}px;
  cursor: pointer;
  display: flex;
  height: ${(props) => props.height}px;
  justify-content: space-between;
  width: ${(props) => props.width}px;
`;

const StyledBall = styled.span<IStyledBall>`
  background-color: ${(props) => props.ballColor};
  border-radius: ${(props) => props.size}px;
  content: '';
  height: ${(props) => props.size}px;
  position: relative;
  transition: width 0.5s;
  width: ${(props) => props.size}px;

  &:active {
    width: ${(props) => props.size + 5}px;
  }
`;

const StyledEmoji = styled.span`
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const StyledToggle = styled.input`
  height: 0;
  visibility: hidden;
  width: 0;

  &:checked + ${StyledLabel} ${StyledBall} {
    left: calc(100% - 2px);
    right: calc(100% + 2px);
    transform: translateX(-100%);
  }
`;

/**
 * @description 슬라이드 토글 컴포넌트
 */
function SlideToggle({
  ballColor,
  emoji,
  id,
  isChecked,
  onChange,
  onClick,
  ...rest
}: ISlideToggle) {
  return (
    <StyledWrapper>
      <StyledToggle
        checked={isChecked}
        id={id}
        onChange={onChange}
        type="checkbox"
        readOnly
      />
      <StyledLabel htmlFor={id} onClick={onClick} {...rest}>
        <StyledBall size={rest.height - 5} ballColor={ballColor}>
          {emoji && (
            <StyledEmoji>
              <Text fontSize={5}>{emoji}</Text>
            </StyledEmoji>
          )}
        </StyledBall>
      </StyledLabel>
    </StyledWrapper>
  );
}

interface IStyledBall {
  ballColor: string;
  size: number;
}

interface IStyledLabel {
  backgroundColor?: string;
  borderColor: string;
  borderStyle: string;
  borderRadius: number;
  borderWidth: number;
  height: number;
  width: number;
}

interface ISlideToggle extends IStyledLabel {
  ballColor: string;
  emoji?: string; // 이모지 사용 시
  id: string;
  isChecked: boolean;
  onChange?: TonChangeCheckBox;
  onClick?: () => void;
}

SlideToggle.defaultProps = {
  backgroundColor: Colors.white,
  ballColor: Colors.gray13, // 볼 색
  borderColor: Colors.gray13,
  borderRadius: 100,
  borderStyle: 'solid',
  borderWidth: 2,
  height: 20,
  width: 40,
};

export default SlideToggle;
