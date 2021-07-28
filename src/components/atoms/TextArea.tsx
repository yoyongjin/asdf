import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import { Colors } from 'utils/color';

const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  /* Initialized */
  border: none;
  outline: none;
  resize: none;

  /* Position */
  padding-left: 10px;

  /* Display */
  border-radius: ${(props) => props.borderRadius}px;
  border-style: ${(props) => props.borderStyle};
  border-width: ${(props) => props.borderWidth}px;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;

  /* Text */
  font-size: ${(props) => props.fontSize}px;
  font-weight: ${(props) => props.fontWeight};
  font-family: ${(props) => props.fontFamily};
  text-align: ${(props) => {
    if (props.textAlign === 1) {
      return 'left';
    } else if (props.textAlign === 2) {
      return 'center';
    } else if (props.textAlign === 3) {
      return 'right';
    }
  }};
  font-stretch: normal;
  letter-spacing: normal;
  box-sizing: border-box;

  /* Color */
  border-color: ${(props) => props.borderColor};
  color: ${(props) => props.fontColor};

  /* Other */
  :focus {
    box-shadow: 0 0 5px ${(props) => darken(0.1, props.borderColor)};
    outline: none !important;
  }
  ::placeholder {
    /* Display */
    color: ${(props) => props.phColor};
  }

  ${(props) => props.customStyle};
`;

function TextArea({
  disabled,
  name,
  placeholder,
  maxLength,
  readOnly,
  value,
  onChange,
  ...rest
}: TextAreaProps) {
  return (
    <StyledTextArea
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      maxLength={maxLength}
      readOnly={readOnly}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
}

interface StyledTextAreaProps {
  readonly borderColor: string;
  readonly borderRadius: number;
  readonly borderStyle: string;
  readonly borderWidth: number;
  readonly customStyle?: string;
  readonly fontColor: string;
  readonly fontFamily: string;
  readonly fontSize: number;
  readonly fontWeight: number | string;
  readonly height: number;
  readonly logoImg?: string;
  readonly phColor?: string;
  readonly textAlign: number;
  readonly width: number;
}

interface TextAreaProps extends StyledTextAreaProps {
  readonly disabled: boolean;
  readonly maxLength: number;
  readonly name?: string;
  readonly placeholder?: string;
  readonly value: string;
  readonly readOnly: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

TextArea.defaultProps = {
  value: '',
  width: 20,
  height: 15,
  borderColor: Colors.gray3,
  borderRadius: 16,
  borderStyle: 'solid',
  borderWidth: 1,
  fontSize: 10,
  fontWeight: 'normal',
  fontFamily: 'inherit',
  textAlign: 1,
  fontColor: Colors.gray4,
  disabled: false,
  maxLength: 524288,
  readOnly: false,
};

export default React.memo(TextArea);
