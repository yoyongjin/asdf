import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Text, CheckBox } from 'components/atoms';
import { TonChangeCheckBox } from 'hooks/useInputForm';
import { StyledCommonBothWhiteSpace } from 'styles/common';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 80px;
`;

/**
 * @description text + checkbox 컴포넌트
 */
function TextCheckBox({
  checkBoxIsChecked,
  checkBoxName,
  checkBoxOnChange,
  distance,
  isReverse,
  textTitle,
  textFontColor,
  textFontFamily,
  textFontSize,
  textFontWeight,
}: ITextCheckBox) {
  /**
   * @description 체크박스 view
   */
  const CheckBoxView = useCallback(() => {
    return (
      <CheckBox
        isChecked={checkBoxIsChecked}
        name={checkBoxName}
        onChange={checkBoxOnChange}
      />
    );
  }, [checkBoxIsChecked, checkBoxName, checkBoxOnChange]);

  /**
   * @description 텍스트 view
   */
  const TextView = useCallback(() => {
    return (
      <Text
        fontColor={textFontColor}
        fontFamily={textFontFamily}
        fontSize={textFontSize}
        fontWeight={textFontWeight}
      >
        {textTitle}
      </Text>
    );
  }, [textFontColor, textFontFamily, textFontSize, textFontWeight, textTitle]);

  const RenderView = useCallback(() => {
    if (isReverse) {
      return (
        <>
          {CheckBoxView()}
          <StyledCommonBothWhiteSpace pixel={distance} />
          {TextView()}
        </>
      );
    }

    return (
      <>
        {TextView()}
        <StyledCommonBothWhiteSpace pixel={distance} />
        {CheckBoxView()}
      </>
    );
  }, [CheckBoxView, TextView, distance, isReverse]);

  return <StyledWrapper>{RenderView()}</StyledWrapper>;
}

/**
 * @description
 * prefix checkBox : checkbox 관련 props
 * prefix text : text 관련 props
 */
interface ITextCheckBox {
  checkBoxIsChecked: boolean;
  checkBoxName?: string;
  checkBoxOnChange: TonChangeCheckBox;
  distance: number; // Text와 CheckBox의 거리
  isReverse: boolean; // 뒤집을지에 대한 여부
  textFontColor?: string;
  textFontFamily?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textTitle: string;
}

TextCheckBox.defaultProps = {
  distance: 6,
  isReverse: false,
};

export default TextCheckBox;
