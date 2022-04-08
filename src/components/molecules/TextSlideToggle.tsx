import React, { useCallback } from 'react';
import styled from 'styled-components';

import { Text, SlideToggle } from 'components/atoms';
import { TonChangeCheckBox } from 'hooks/useInputForm';
import { StyledCommonBothWhiteSpace } from 'styles/common';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;

/**
 * @description text + slide toggle 컴포넌트
 */
function TextSlideToggle({
  slideToggleBallColor,
  slideToggleBorderColor,
  slideToggleHeight,
  slideToggleId,
  slideToggleIsChecked,
  slideToggleOnChange,
  slideToggleOnClick,
  slideToggleWidth,
  distance,
  isReverse,
  textTitle,
  textFontColor,
  textFontFamily,
  textFontSize,
  textFontWeight,
}: ITextSlideToggle) {
  /**
   * @description 슬라이드 토글 view
   */
  const SlideToggleView = useCallback(() => {
    return (
      <SlideToggle
        ballColor={slideToggleBallColor}
        borderColor={slideToggleBorderColor}
        id={slideToggleId}
        height={slideToggleHeight}
        isChecked={slideToggleIsChecked}
        width={slideToggleWidth}
        onChange={slideToggleOnChange}
        onClick={slideToggleOnClick}
      />
    );
  }, [
    slideToggleBallColor,
    slideToggleBorderColor,
    slideToggleHeight,
    slideToggleId,
    slideToggleIsChecked,
    slideToggleOnChange,
    slideToggleOnClick,
    slideToggleWidth,
  ]);

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
          {SlideToggleView()}
          <StyledCommonBothWhiteSpace pixel={distance} />
          {TextView()}
        </>
      );
    }

    return (
      <>
        {TextView()}
        <StyledCommonBothWhiteSpace pixel={distance} />
        {SlideToggleView()}
      </>
    );
  }, [SlideToggleView, TextView, distance, isReverse]);

  return <StyledWrapper>{RenderView()}</StyledWrapper>;
}

/**
 * @description
 * prefix slide toggle : slide toggle 관련 props
 * prefix text : text 관련 props
 */
interface ITextSlideToggle {
  distance: number; // Text와 slide toggle의 거리
  isReverse: boolean; // 뒤집을지에 대한 여부
  slideToggleBallColor?: string;
  slideToggleBorderColor?: string;
  slideToggleHeight: number;
  slideToggleId: string;
  slideToggleIsChecked: boolean;
  slideToggleOnChange?: TonChangeCheckBox;
  slideToggleOnClick?: () => void;
  slideToggleWidth: number;
  textFontColor?: string;
  textFontFamily?: string;
  textFontSize?: number;
  textFontWeight?: number;
  textTitle: string;
}

TextSlideToggle.defaultProps = {
  distance: 5,
  isReverse: false,
  slideToggleHeight: 20,
  slideToggleWidth: 40,
  textFontColor: Colors.gray13,
  textFontFamily: 'Malgun Gothic',
  textFontSize: 12,
  textFontWeight: 800,
};

export default TextSlideToggle;
