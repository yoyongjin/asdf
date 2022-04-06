import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

import {
  Button,
  DatePicker,
  MultiSelect,
  Select,
  Text,
} from 'components/atoms';
import { IOption as ISelectOption } from 'components/atoms/Select';
import { IOption as IMultiSelectOption } from 'components/atoms/MultiSelect';
import { DateRangePicker, TabTitle, TextCheckBox } from 'components/molecules';
import { ITabItem } from 'components/molecules/TabTitle';
import { TonChangeDatePicker } from 'hooks/useDatePicker';
import { TonChangeCheckBox, TonChangeSelect } from 'hooks/useInputForm';
import { TOnClickVisible } from 'hooks/useVisible';
import { StyledCommonBothWhiteSpace } from 'styles/common';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div<IStyleWrapper>`
  height: 100%;

  ${(props) => {
    if (props.borderBottomWidth) {
      return css<IStyleWrapper>`
        border-bottom-color: ${(props) =>
          props.borderBottomColor || props.theme.color.sub};
        border-bottom-style: ${(props) => props.borderBottomStyle};
        border-bottom-width: ${(props) => props.borderBottomWidth}px;
      `;
    }
  }}
`;

const StyledPostion = styled.div<IStyledPostion>`
  align-items: center;
  display: flex;
  float: ${(props) => props.float};
  margin-top: ${(props) => props.marginTop}px;
`;

function TitleV2({ renderLeft, renderRight, titleStyle }: ITitleProps) {
  const ButtonView = useCallback(
    (data: IButtonItem, styles?: IButtonItemStyle) => {
      if (data.text) {
        return (
          <Button
            bgColor={styles?.backgroundColor}
            borderColor={styles?.borderColor}
            borderRadius={styles?.borderRadius}
            borderStyle={styles?.borderStyle}
            borderWidth={styles?.borderWidth}
            height={styles?.height}
            onClick={data.onClick}
            width={styles?.width}
          >
            <Text
              fontColor={styles?.fontColor}
              fontSize={styles?.fontSize}
              fontWeight={styles?.fontWeight}
            >
              {data.text}
            </Text>
          </Button>
        );
      }

      return (
        <Button
          image={data.image}
          height={styles?.height}
          onClick={data.onClick}
          width={styles?.width}
        />
      );
    },
    [],
  );

  const DatePickerView = useCallback(
    (data: IDatePickerItem, styles?: IDatePickerItemStyle) => {
      return (
        <DatePicker
          borderStyle={styles?.borderStyle}
          format={data.format}
          height={styles?.height}
          isShowTime={data.isShowTime}
          isShowTimeOnly={data.isShowTimeOnly}
          onChange={data.onChange}
          selectedDate={data.selectedDate}
          width={styles?.width}
        />
      );
    },
    [],
  );

  const DateRangePickerView = useCallback(
    (data: IDateRangePickerItem, styles?: IDateRangePickerItemStyle) => {
      return (
        <DateRangePicker
          datePickerBorderStyle={styles?.borderStyle}
          datePickerEndSelectedDate={data.endSelectedDate}
          datePickerEndOnChange={data.endOnChange}
          datePickerFormat={data.format}
          datePickerHeight={styles?.height}
          datePickerIsShowTime={data.isShowTime}
          datePickerIsShowTimeOnly={data.isShowTimeOnly}
          datePickerStartOnChange={data.startOnChange}
          datePickerStartSelectedDate={data.startSelectedDate}
          datePickerWidth={styles?.width}
        />
      );
    },
    [],
  );

  const MultiSelectView = useCallback((data: IMultiSelectItem) => {
    return (
      <MultiSelect
        labelledBy={data.labelledBy}
        options={data.options}
        value={data.selectedOptions}
      />
    );
  }, []);

  const SelectView = useCallback(
    (data: ISelectItem, styles?: ISelectItemStyle) => {
      return (
        <Select
          disabled={data.disabled}
          name={data.name}
          borderColor={styles?.borderColor}
          borderRadius={styles?.borderRadius}
          defaultValue={data.value}
          fontColor={styles?.fontColor}
          height={styles?.height}
          options={data.options}
          paddingLeft={styles?.paddingLeft}
          width={styles?.width}
          onChange={data.onChange}
        />
      );
    },
    [],
  );

  const TabView = useCallback((data: ITabsItem) => {
    return (
      <TabTitle
        selectedItem={data.selected}
        setSelectedItem={data.onclick}
        tabs={data.tabs}
      />
    );
  }, []);

  const TextCheckBoxView = useCallback(
    (data: ITextCheckBoxItem, styles?: ITextCheckBoxStyle) => {
      return (
        <TextCheckBox
          checkBoxIsChecked={data.isChecked}
          checkBoxOnChange={data.onChange}
          checkBoxName={data.name}
          isReverse={data.isReverse}
          textTitle={data.text}
          textFontColor={styles?.fontColor}
          textFontFamily={styles?.fontFamily}
          textFontSize={styles?.fontSize}
          textFontWeight={styles?.fontWeight}
        />
      );
    },
    [],
  );

  const TextView = useCallback((data: ITextItem, styles?: ITextItemStyle) => {
    return (
      <Text
        fontColor={styles?.fontColor || Colors.blue4}
        fontFamily={styles?.fontFamily || 'NanumGothic'}
        fontSize={styles?.fontSize || 18}
        fontWeight={styles?.fontWeight || 800}
        onClick={data.onClick}
      >
        {data.text}
      </Text>
    );
  }, []);

  const RenderView = useCallback(
    (config: IRenderConfig) => {
      const { data, type, styles } = config;

      switch (type) {
        case 'button': {
          const buttonData = data as IButtonItem;
          const buttonStyles = styles as IButtonItemStyle;
          return ButtonView(buttonData, buttonStyles);
        }
        case 'date-picker': {
          const datePickerData = data as IDatePickerItem;
          const datePickerStyles = styles as IDatePickerItemStyle;
          return DatePickerView(datePickerData, datePickerStyles);
        }
        case 'date-range-picker': {
          const dateRangePickerData = data as IDateRangePickerItem;
          const dateRangePickerStyles = styles as IDateRangePickerItemStyle;
          return DateRangePickerView(
            dateRangePickerData,
            dateRangePickerStyles,
          );
        }
        case 'multi-select': {
          const multiSelectData = data as IMultiSelectItem;
          return MultiSelectView(multiSelectData);
        }
        case 'select': {
          const selectData = data as ISelectItem;
          const selectStyle = styles as ISelectItemStyle;
          return SelectView(selectData, selectStyle);
        }
        case 'tab': {
          const tabData = data as ITabsItem;
          return TabView(tabData);
        }
        case 'text': {
          const textData = data as ITextItem;
          const textStyles = styles as ITextItemStyle;
          return TextView(textData, textStyles);
        }
        case 'text-checkbox': {
          const textCheckBoxData = data as ITextCheckBoxItem;
          const textCheckBoxStyles = styles as ITextCheckBoxStyle;
          return TextCheckBoxView(textCheckBoxData, textCheckBoxStyles);
        }
      }
    },
    [
      ButtonView,
      DatePickerView,
      DateRangePickerView,
      MultiSelectView,
      SelectView,
      TabView,
      TextCheckBoxView,
      TextView,
    ],
  );

  return (
    <StyledWrapper
      borderBottomColor={titleStyle?.borderBottomColor}
      borderBottomStyle={titleStyle?.borderBottomStyle}
      borderBottomWidth={titleStyle?.borderBottomWidth}
    >
      {renderLeft && (
        <StyledPostion float="left" marginTop={titleStyle?.leftMarginTop ?? 15}>
          {renderLeft.renderConfig.map((config, index) => {
            const paddingLeft =
              renderLeft.renderStyle &&
              renderLeft.renderStyle[index].paddingLeft;

            const paddingLeftRight =
              renderLeft.renderStyle &&
              renderLeft.renderStyle[index].paddingLeftRight;

            const paddingRight =
              renderLeft.renderStyle &&
              renderLeft.renderStyle[index].paddingRight;

            return (
              <>
                {RenderView(config)}
                <StyledCommonBothWhiteSpace
                  left={paddingLeft}
                  right={paddingRight}
                  pixel={paddingLeftRight}
                />
              </>
            );
          })}
        </StyledPostion>
      )}
      {renderRight && (
        <StyledPostion
          float="right"
          marginTop={titleStyle?.rightMarginTop ?? 15}
        >
          {renderRight.renderConfig.map((config) => {
            return RenderView(config);
          })}
        </StyledPostion>
      )}
    </StyledWrapper>
  );
}

interface IStyleWrapper extends ITitleStyle {}

interface IStyledPostion {
  float: string;
  marginTop: number;
}

/**
 * @description 요소별 style
 */

// date picker style
interface IDatePickerItemStyle {
  borderStyle?: string;
  height?: number;
  width?: number;
}

// date picker(range) style
interface IDateRangePickerItemStyle extends IDatePickerItemStyle {}

// select style
interface ISelectItemStyle {
  borderColor?: string;
  borderRadius?: number;
  fontColor?: string;
  height?: number;
  paddingLeft?: number;
  width?: number;
}

// text style
interface ITextItemStyle {
  fontColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
}

// button style
interface IButtonItemStyle extends ITextItemStyle {
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  borderStyle?: string;
  borderWidth?: number;
  height?: number;
  width?: number;
}

// text checkbox style
interface ITextCheckBoxStyle extends ITextItemStyle {}

/**
 * @description 요소별 정보
 */

// button 요소 정보
interface IButtonItem {
  text?: string;
  image?: string;
  onClick?: TOnClickVisible;
}

// muli select 요소 정보
interface IMultiSelectItem {
  labelledBy: string;
  selectedOptions: Array<IMultiSelectOption>;
  options: Array<IMultiSelectOption>;
}

// select 요소 정보
interface ISelectItem {
  disabled?: boolean;
  name: string;
  options?: Array<ISelectOption>;
  onChange?: TonChangeSelect;
  value?: number | string;
}

// tab 요소 정보
interface ITabsItem {
  onclick: (index: number) => void;
  selected: number;
  tabs: Array<ITabItem>;
}

// checkbox 요소 정보
interface ICheckBoxItem {
  isChecked: boolean;
  isReverse: boolean;
  name: string;
  onChange: TonChangeCheckBox;
}

// text 요소 정보
interface ITextItem {
  text: string;
  onClick?: () => void;
}

// checkbox + text 요소 정보
interface ITextCheckBoxItem extends ICheckBoxItem, ITextItem {}

// date picker와 date picker(range)에서 공통 요소 정보
interface IDatePickerCommonItem {
  format?: string;
  isShowTime?: boolean;
  isShowTimeOnly?: boolean;
  maxDate?: Date;
  minDate?: Date;
}

// date picker 요소 정보
interface IDatePickerItem extends IDatePickerCommonItem {
  onChange: TonChangeDatePicker;
  selectedDate?: Date;
}

// date picker(range) 요소 정보
interface IDateRangePickerItem extends IDatePickerCommonItem {
  endOnChange: TonChangeDatePicker;
  endSelectedDate?: Date;
  startOnChange: TonChangeDatePicker;
  startSelectedDate?: Date;
}

interface IRenderConfig {
  data: // 렌더되는 요소들의 정보
  | IButtonItem
    | ICheckBoxItem
    | IDatePickerItem
    | IDateRangePickerItem
    | IMultiSelectItem
    | ISelectItem
    | ITabsItem
    | ITextItem;
  styles?: // 렌더되는 요소들의 스타일
  | IButtonItemStyle
    | IDatePickerItemStyle
    | IDateRangePickerItemStyle
    | ISelectItemStyle
    | ITextCheckBoxStyle
    | ITextItemStyle;
  type: string; // 렌더되는 요소들의 타입
}

interface IRenderStyle {
  paddingLeft?: number;
  paddingLeftRight?: number; // 왼쪽, 오른쪽 공통
  paddingRight?: number;
}

interface IRenderItem {
  renderConfig: Array<IRenderConfig>;
  renderStyle?: Array<IRenderStyle>;
}

interface ITitleStyle {
  borderBottomColor?: string;
  borderBottomStyle?: string;
  borderBottomWidth?: number;
  leftMarginTop?: number; // 왼쪽 요소 margin top
  rightMarginTop?: number; // 오른쪽 요소 margin top
}

interface ITitleProps {
  renderLeft?: IRenderItem; // 화면 왼쪽에 보여질 컴포넌트의 정보들
  renderRight?: IRenderItem; // 화면 왼쪽에 보여질 컴포넌트의 정보들
  titleStyle?: ITitleStyle; // 전반적인 컴포넌트 style 정보들
}

TitleV2.defaultProps = {};

export default React.memo(TitleV2);
