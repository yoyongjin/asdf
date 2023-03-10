import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Text } from 'components/atoms';
import { TOnClickToggle } from 'hooks/useToggle';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div<IStyledWrapper>`
  align-items: center;
  background-color: ${(props) =>
    props.backgroundColor || props.theme.color.button};
  border-color: ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius}px;
  border-style: ${(props) => props.borderStyle};
  border-width: ${(props) => props.borderWidth}px;
  cursor: pointer;
  display: flex;
  height: ${(props) => props.height}px;
  justify-content: center;
  width: ${(props) => props.width}px;
`;

function Toggle({
  borderRadius,
  borderStyle,
  borderWidth,
  height,
  isSelected,
  onClick,
  notSelectedBackgroundColor,
  notSelectedBorderColor,
  selectedBackgroundColor,
  selectedBorderColor,
  textFontFamily,
  textFontSize,
  textFontWeight,
  textSelectedText,
  textNotSelectedText,
  textSelectedFontColor,
  textNotSelectedFontColor,
  width,
}: IToggle) {
  const backgroundColor = useMemo(() => {
    return isSelected ? selectedBackgroundColor : notSelectedBackgroundColor;
  }, [isSelected, notSelectedBackgroundColor, selectedBackgroundColor]);

  const borderColor = useMemo(() => {
    return isSelected ? selectedBorderColor : notSelectedBorderColor;
  }, [isSelected, notSelectedBorderColor, selectedBorderColor]);

  const fontColor = useMemo(() => {
    return isSelected ? textSelectedFontColor : textNotSelectedFontColor;
  }, [isSelected, textNotSelectedFontColor, textSelectedFontColor]);

  const text = useMemo(() => {
    return isSelected ? textSelectedText : textNotSelectedText;
  }, [isSelected, textNotSelectedText, textSelectedText]);

  return (
    <StyledWrapper
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      height={height}
      onClick={() => onClick && onClick()}
      width={width}
    >
      <Text
        fontColor={fontColor}
        fontFamily={textFontFamily}
        fontSize={textFontSize}
        fontWeight={textFontWeight}
      >
        {text}
      </Text>
    </StyledWrapper>
  );
}

interface IStyledWrapper {
  backgroundColor?: string;
  borderColor: string;
  borderRadius: number;
  borderStyle: string;
  borderWidth: number;
  height: number;
  width: number;
}

interface IStyledItem {
  borderRadius: number;
  borderStyle: string;
  borderWidth: number;
  height: number;
  notSelectedBorderColor: string; // ???????????? ????????? ??? ????????? ???
  selectedBorderColor: string; // ???????????? ??? ????????? ???
  notSelectedBackgroundColor?: string; // ???????????? ????????? ??? ?????????
  selectedBackgroundColor?: string; // ???????????? ??? ?????????
  width: number;
}

interface IToggle extends IStyledItem {
  isSelected: boolean; // ?????? ??????
  onClick?: TOnClickToggle;
  textFontFamily: string; // text font
  textFontSize: number; // text size
  textFontWeight: number; // text ??????
  textNotSelectedText: string; // ???????????? ????????? ??? text ??????
  textNotSelectedFontColor: string; // ???????????? ????????? ??? text ??????
  textSelectedText: string; // ???????????? ??? text ??????
  textSelectedFontColor: string; // ???????????? ??? text ??????
}

Toggle.defaultProps = {
  borderRadius: 8,
  borderStyle: 'solid',
  borderWidth: 1,
  height: 30,
  isSelected: false,
  notSelectedBackgroundColor: Colors.white,
  notSelectedBorderColor: Colors.white,
  selectedBackgroundColor: Colors.gray13,
  selectedBorderColor: Colors.gray13,
  textFontFamily: 'Malgun Gothic',
  textFontSize: 12,
  textFontWeight: 400,
  textNotSelectedFontColor: Colors.gray13,
  textSelectedFontColor: Colors.white,
  width: 30,
};

export default Toggle;
