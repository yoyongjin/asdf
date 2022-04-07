import React from 'react';
import styled from 'styled-components';

import { DatePicker, Text } from 'components/atoms';
import { StyledCommonBothWhiteSpace } from 'styles/common';
import { Colors } from 'utils/color';
import { TonChangeDatePicker } from 'hooks/useDatePicker';

const StyledDatePickerWrapper = styled.div`
  display: inline-block;
`;

/**
 * @description 기간 날짜 선택 컴포넌트
 */
function DateRangePicker({
  datePickerBorderStyle,
  datePickerDisabled,
  datePickerEndOnChange,
  datePickerEndSelectedDate,
  datePickerFormat,
  datePickerHeight,
  datePickerIsShowTime,
  datePickerIsShowTimeOnly,
  datePickerStartOnChange,
  datePickerStartSelectedDate,
  datePickerWidth,
  textFontColor,
  textFontFamily,
  textFontSize,
  textFontWeight,
  textValue,
}: IDateRangePicker) {
  return (
    <div>
      <StyledDatePickerWrapper>
        <DatePicker
          borderStyle={datePickerBorderStyle}
          disabled={datePickerDisabled}
          format={datePickerFormat}
          height={datePickerHeight}
          isShowTime={datePickerIsShowTime}
          isShowTimeOnly={datePickerIsShowTimeOnly}
          onChange={datePickerStartOnChange}
          selectedDate={datePickerStartSelectedDate}
          width={datePickerWidth}
        />
      </StyledDatePickerWrapper>
      <StyledCommonBothWhiteSpace pixel={6} />

      <Text
        fontColor={textFontColor}
        fontFamily={textFontFamily}
        fontSize={textFontSize}
        fontWeight={textFontWeight}
      >
        {textValue}
      </Text>
      <StyledCommonBothWhiteSpace pixel={6} />
      <StyledDatePickerWrapper>
        <DatePicker
          borderStyle={datePickerBorderStyle}
          disabled={datePickerDisabled}
          format={datePickerFormat}
          height={datePickerHeight}
          isShowTime={datePickerIsShowTime}
          isShowTimeOnly={datePickerIsShowTimeOnly}
          onChange={datePickerEndOnChange}
          selectedDate={datePickerEndSelectedDate}
          width={datePickerWidth}
        />
      </StyledDatePickerWrapper>
    </div>
  );
}

interface IDateRangePicker {
  datePickerBorderStyle?: string;
  datePickerDisabled: boolean;
  datePickerEndOnChange: TonChangeDatePicker;
  datePickerEndSelectedDate?: Date;
  datePickerFormat?: string;
  datePickerHeight?: number;
  datePickerIsShowTime: boolean;
  datePickerIsShowTimeOnly: boolean;
  datePickerStartOnChange: TonChangeDatePicker;
  datePickerStartSelectedDate?: Date;
  datePickerWidth?: number;
  textFontColor: string;
  textFontFamily: string;
  textFontSize: number;
  textFontWeight: number;
  textValue: string;
}

DateRangePicker.defaultProps = {
  datePickerDisabled: false,
  datePickerIsShowTime: false,
  datePickerIsShowTimeOnly: false,
  textFontColor: Colors.navy2,
  textFontFamily: 'MalgunGothic',
  textFontSize: 12,
  textFontWeight: 800,
  textValue: '~',
};

export default DateRangePicker;
