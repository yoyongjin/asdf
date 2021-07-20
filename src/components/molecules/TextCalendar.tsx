import { ko } from 'date-fns/esm/locale';
import React from 'react';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';

import { Input } from 'components/atoms';

import calendarIcon from 'images/cale.png';
import Utils from 'utils/new_utils';
import { SetSpecificValue } from 'hooks/useInputForm';

const StyledDatePickerWrapper = styled.label`
  background-image: url(${calendarIcon});
  background-repeat: 'no-repeat';
  width: 23px;
  height: 27px;
  cursor: pointer;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 23px;
  height: 27px;
  font-size: 14px;
  visibility: hidden;
`;

const StyledWhiteSpace = styled.span<StyledWhiteSpaceProps>`
  padding-right: 5px;
`;

function TextCalendar({
  datePickerMaxDate,
  datePickerMinDate,
  datePickerOnChange,
  inputName,
  inputValue,
  inputFontSize,
  inputHeight,
  inputFontFamily,
  inputWidth,
}: TextCalendarProps) {
  return (
    <>
      <StyledWhiteSpace pixel={10} />
      <Input
        fontFamily={inputFontFamily}
        fontSize={inputFontSize}
        height={inputHeight}
        name={inputName}
        value={inputValue}
        width={inputWidth}
        readOnly
      />
      <StyledWhiteSpace pixel={5} />
      <StyledDatePickerWrapper>
        <StyledDatePicker
          locale={ko}
          maxDate={datePickerMaxDate}
          minDate={datePickerMinDate}
          onChange={(date: Date, e) => {
            e?.preventDefault();

            const timestamp = new Date(date).getTime();
            const yyyymmdd = Utils.getYYYYMMDD(timestamp, '-');

            datePickerOnChange(inputName, yyyymmdd);
          }}
          selected={new Date(inputValue)}
        />
      </StyledDatePickerWrapper>
      <StyledWhiteSpace pixel={10} />
    </>
  );
}

interface StyledWhiteSpaceProps {
  pixel: number;
}

export interface TextCalendarProps {
  datePickerMaxDate?: Date;
  datePickerMinDate?: Date;
  datePickerOnChange: SetSpecificValue;
  inputFontFamily: string;
  inputFontSize: number;
  inputHeight: number;
  inputName: string;
  inputValue: string;
  inputWidth: number;
}

TextCalendar.defaultProps = {
  inputFontFamily: 'NanumBarunGothic',
  inputFontSize: 14,
  inputHeight: 2.5,
  inputWidth: 13,
};

export default TextCalendar;
