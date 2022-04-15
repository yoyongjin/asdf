import { ko } from 'date-fns/esm/locale';
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import styled from 'styled-components';

import 'react-datepicker/dist/react-datepicker.css';

import { TonChangeDatePicker } from 'hooks/useDatePicker';
import { Colors } from 'utils/color';

const StyledDatePicker = styled(ReactDatePicker)<IStyledDatePicker>`
  border-color: ${(props) => props.borderColor};
  border-radius: ${(props) => props.borderRadius}px;
  border-style: ${(props) => props.borderStyle};
  border-width: ${(props) => props.borderWidth}px;
  cursor: pointer;
  font-size: ${(props) => props.fontSize}px;
  height: ${(props) => props.height}rem;
  text-align: ${(props) => props.textAlign};
  width: ${(props) => props.width}rem;
`;

function DatePicker({
  borderColor,
  borderRadius,
  borderStyle,
  borderWidth,
  disabled,
  fontSize,
  format,
  height,
  isShowTime,
  isShowTimeOnly,
  maxDate,
  minDate,
  onChange,
  placeholder,
  selectedDate,
  textAlign,
  width,
}: IDatePicker) {
  return (
    <StyledDatePicker
      borderColor={borderColor}
      borderRadius={borderRadius}
      borderStyle={borderStyle}
      borderWidth={borderWidth}
      dateFormat={format}
      fontSize={fontSize}
      height={height}
      locale={ko}
      maxDate={maxDate}
      minDate={minDate}
      onChange={onChange}
      onChangeRaw={(e: React.FocusEvent<HTMLInputElement>) => {
        e.preventDefault();
      }}
      placeholderText={placeholder}
      selected={selectedDate}
      showTimeSelect={isShowTime}
      showTimeSelectOnly={isShowTimeOnly}
      textAlign={textAlign}
      width={width}
      disabled={disabled}
    />
  );
}

interface IStyledDatePicker {
  readonly borderColor: string;
  readonly borderRadius: number;
  readonly borderStyle: string;
  readonly borderWidth: number;
  readonly fontSize: number;
  readonly height?: number;
  readonly textAlign: string;
  readonly width?: number;
}

interface IDatePicker extends IStyledDatePicker {
  readonly disabled: boolean; // 활성화/비활성화 여부
  readonly format: string; // 포맷
  readonly isShowTime: boolean; // 시간도 선택 하도록 할지에 대한 여부
  readonly isShowTimeOnly: boolean; // 시간만 선택 하도록 할지에 대한 여부
  readonly maxDate?: Date; // 최대 지정 날짜
  readonly minDate?: Date; // 최소 지정 날짜
  readonly onChange: TonChangeDatePicker;
  readonly selectedDate?: Date; // 선택된 날짜
  readonly placeholder: string; // 설명
}

DatePicker.defaultProps = {
  borderColor: Colors.gray14,
  borderRadius: 8,
  borderStyle: 'none',
  borderWidth: 1,
  disabled: false,
  fontSize: 12,
  format: 'yyyy-MM-dd',
  isShowTime: false,
  isShowTimeOnly: false,
  height: 3,
  placeholder: '',
  textAlign: 'center',
  width: 12,
};

export default DatePicker;
