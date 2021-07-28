import React from 'react';
import styled, { css } from 'styled-components';

import { Text, TextArea } from 'components/atoms';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div<StyledWrapperProps>`
  padding-bottom: 20px;
  ${(props) => {
    if (props.isRightFloat) {
      return css`
        display: flex;
        width: 100%;
        justify-content: flex-end;
      `;
    }
  }}
`;
const StyledBlank = styled.span<StyledBlankProps>`
  padding-left: 0.5rem;
  padding-right: ${(props) =>
    props.padRight ? `${props.padRight}px` : '0.5rem'};
`;

function TextTextArea({
  isRightFloat,
  textareaBorderRadius,
  textareaCustomStyle,
  textareaDisabled,
  textareaHeight,
  textareaImage,
  textareaMaxLength,
  textareaName,
  textareaOnChange,
  textareaPlaceHolder,
  textareaSize,
  textareaValue,
  textareaWeight,
  textareaWidth,
  padRight,
  textColor,
  textSize,
  textValue,
  textWeight,
}: TextTextAreaProps) {
  return (
    <StyledWrapper isRightFloat={isRightFloat}>
      <Text fontColor={textColor} fontSize={textSize} fontWeight={textWeight}>
        {textValue}
      </Text>
      <StyledBlank padRight={padRight} />
      <TextArea
        borderRadius={textareaBorderRadius}
        customStyle={textareaCustomStyle}
        disabled={textareaDisabled}
        fontSize={textareaSize}
        fontWeight={textareaWeight}
        height={textareaHeight}
        logoImg={textareaImage}
        maxLength={textareaMaxLength}
        name={textareaName}
        onChange={textareaOnChange}
        placeholder={textareaPlaceHolder}
        value={textareaValue}
        width={textareaWidth}
      />
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  isRightFloat: boolean;
}

interface StyledBlankProps {
  padRight?: number;
}

interface TextTextAreaProps extends StyledBlankProps, StyledWrapperProps {
  textareaBorderRadius: number;
  textareaCustomStyle?: string;
  textareaDisabled: boolean;
  textareaHeight?: number;
  textareaImage?: string;
  textareaMaxLength?: number;
  textareaName: string;
  textareaOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  textareaPlaceHolder: string;
  textareaSize: number;
  textareaValue: string;
  textareaWeight: number | string;
  textareaWidth: number;
  textColor: string;
  textSize: number;
  textValue: string;
  textWeight: string;
}

TextTextArea.defaultProps = {
  isRightFloat: false,
  textareaBorderRadius: 0,
  textareaDisabled: false,
  textareaPlaceHolder: '',
  textareaSize: 1,
  textareaWeight: 700,
  textareaWidth: 50,
  textColor: Colors.gray9,
  textSize: 1,
  textWeight: 600,
};

export default TextTextArea;
