import React, { useCallback } from 'react';

import { Text, CheckBox } from 'components/atoms';
import { TonChangeCheckBox } from 'hooks/useInputForm';
import { StyledCommonBothWhiteSpace } from 'styles/common';

/**
 * @description text + checkbox 컴포넌트
 */
function TextCheckBox({
  checkBoxIsChecked,
  checkBoxName,
  checkBoxOnChange,
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
          <StyledCommonBothWhiteSpace pixel={6} />
          {TextView()}
        </>
      );
    }

    return (
      <>
        {TextView()}
        <StyledCommonBothWhiteSpace pixel={6} />
        {CheckBoxView()}
      </>
    );
  }, [CheckBoxView, TextView, isReverse]);

  return <div>{RenderView()}</div>;
}

/**
 * @description
 * prefix checkBox : checkbox 관련 props
 * prefix text : text 관련 props
 */
interface ITextCheckBox {
  checkBoxIsChecked: boolean;
  checkBoxName: string;
  checkBoxOnChange: TonChangeCheckBox;
  isReverse: boolean; // 뒤집을지에 대한 여부
  textFontColor?: string;
  textFontFamily?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textTitle: string;
}

TextCheckBox.defaultProps = {
  isReverse: false,
};

export default TextCheckBox;
