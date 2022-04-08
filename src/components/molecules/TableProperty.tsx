import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';

import { Button, Input, Text } from 'components/atoms';
import { TextSlideToggle } from 'components/molecules';
import useInputForm, { TonChangeInput } from 'hooks/useInputForm';
import { Colors } from 'utils/color';
import {
  TModifySmsCount,
  TRemoveAutoMessage,
  TSetUsedAutoMessage,
} from 'hooks/useMessage';
import { TOnClickToggle } from 'hooks/useToggle';
import { DynamicJSON } from 'types/common';
import { IAutoMessageItem, IMaxMessageItem } from 'types/message';
import constants, { ANSWER_VALUE } from 'utils/constants';
import Utils from 'utils/new_utils';
import { TOnClickModifyAutoMessagePopup } from 'components/organisms/SMSView';

const StyledWrapper = styled.td<IStyledWrapper>`
  text-align: ${(props) => props.textAlign};
  padding-left: ${(props) => props.paddingLeft}px;
  padding-right: ${(props) => props.paddingRight}px;
`;

// text 요소가 여러 줄 일 경우
const StyledTextWrapper = styled.div`
  padding-bottom: 4px;
`;

/**
 * @description 테이블 한 row에 해당하는 컴포넌트
 */
function TableProperty({
  contents,
  contentType,
  originItem,
}: ITablePropertyProps) {
  const { form, onChangeInput } = useInputForm<DynamicJSON>({});
  const inputRef = useRef<HTMLInputElement[]>([]) as React.MutableRefObject<
    HTMLInputElement[]
  >;

  const ButtonView = useCallback(
    (key: number, data: IButtonItem, styles?: IButtonItemStyle) => {
      const onClickButton = () => {
        if (data.onClick) {
          if (contentType === 'sms-count') {
            const _originItem = originItem as IMaxMessageItem;

            const [empty, value1, value2] = inputRef.current.map(
              (inputDom, index) => {
                return Number(inputDom.value);
              },
            );

            (data.onClick as TModifySmsCount)(
              _originItem.branch_id,
              value1,
              value2,
            );
          } else if (contentType === 'auto-message') {
            const _originItem = originItem as IAutoMessageItem;

            if (key === 4) {
              // 5번째 요소(삭제)
              (data.onClick as TRemoveAutoMessage)(_originItem.id);
            } else if (key === 5) {
              // 6번째 요소(수정)
              (data.onClick as TOnClickModifyAutoMessagePopup)(_originItem);
            }
          }
        }
      };

      if (data.text) {
        return (
          <Button
            bgColor={styles?.backgroundColor}
            borderColor={styles?.borderColor}
            borderRadius={styles?.borderRadius}
            borderStyle={styles?.borderStyle}
            borderWidth={styles?.borderWidth}
            height={styles?.height}
            onClick={onClickButton}
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
          onClick={onClickButton}
          width={styles?.width}
        />
      );
    },
    [contentType, inputRef, originItem],
  );

  const InputView = (
    key: number,
    data: IInputItem,
    styles?: IInputItemStyle,
  ) => {
    const name = `${contentType}-input-${key}`;
    const value = form[name] ?? data.value;

    return (
      <Input
        innerRef={(ref) => (inputRef.current[key] = ref)}
        borderRadius={styles?.borderRadius}
        fontFamily={styles?.fontFamily}
        fontSize={styles?.fontSize}
        height={styles?.height}
        name={name}
        onChange={onChangeInput}
        textAlign={styles?.textAlign}
        value={data.isNumber ? Utils.formatNumber(String(value)) : value}
        width={styles?.width}
        disabled={data.disabled}
      />
    );
  };

  const TextView = useCallback((data: ITextItem, styles?: ITextItemStyle) => {
    return data.count ? (
      [...Array(data.count)].map((values, index) => {
        const realTexts = data.text.split(constants.PARSING_KEY);

        return (
          <StyledTextWrapper>
            <Text
              fontColor={styles?.fontColor || Colors.gray4}
              fontFamily={styles?.fontFamily || 'NanumGothic'}
              fontSize={styles?.fontSize || 12}
              fontWeight={styles?.fontWeight}
            >
              {realTexts[index]}
            </Text>
          </StyledTextWrapper>
        );
      })
    ) : (
      <Text
        fontColor={styles?.fontColor || Colors.gray4}
        fontFamily={styles?.fontFamily || 'NanumGothic'}
        fontSize={styles?.fontSize || 12}
        fontWeight={styles?.fontWeight}
      >
        {data.text}
      </Text>
    );
  }, []);

  const TextSlideToggleView = useCallback(
    (
      key: number,
      data: ITextSlideToggleItem,
      styles?: ITextSlideToggleStyle,
    ) => {
      const name = `${contentType}-slide-toggle-${key}`;

      const onClickButton = () => {
        if (data.onClick) {
          if (contentType === 'auto-message') {
            const _originItem = originItem as IAutoMessageItem;
            const yn =
              _originItem.use_yn.toLocaleUpperCase() === ANSWER_VALUE.YES
                ? ANSWER_VALUE.NO
                : ANSWER_VALUE.YES; // 현재 값의 정반대 값을 넣어줌

            data.onClick(_originItem.id, yn);
          }
        }
      };

      return (
        <TextSlideToggle
          isReverse={data.isReverse}
          slideToggleBallColor={styles?.ballColor}
          slideToggleBorderColor={styles?.borderColor}
          slideToggleId={name}
          slideToggleIsChecked={data.isChecked}
          slideToggleOnChange={data.onChange}
          slideToggleOnClick={onClickButton}
          textFontColor={styles?.fontColor}
          textFontFamily={styles?.fontFamily}
          textFontSize={styles?.fontSize}
          textFontWeight={styles?.fontWeight}
          textTitle={data.text}
        />
      );
    },
    [contentType, originItem],
  );

  const RenderView = (config: IProperty, tablePropertyKey: number) => {
    const { data, type, styles } = config;

    switch (type) {
      case 'button': {
        const buttonData = data as IButtonItem;
        const buttonStyles = styles as IButtonItemStyle;
        return ButtonView(tablePropertyKey, buttonData, buttonStyles);
      }
      case 'text': {
        const textData = data as ITextItem;
        const textStyles = styles as ITextItemStyle;
        return TextView(textData, textStyles);
      }
      case 'input': {
        const inputData = data as IInputItem;
        const inputStyles = styles as IInputItemStyle;
        return InputView(tablePropertyKey, inputData, inputStyles);
      }
      case 'text-slide-toggle': {
        const textSlideToggleData = data as ITextSlideToggleItem;
        const textSlideToggleStyles = styles as ITextSlideToggleStyle;
        return TextSlideToggleView(
          tablePropertyKey,
          textSlideToggleData,
          textSlideToggleStyles,
        );
      }
    }
  };

  return (
    <>
      {contents.map((values, index) => {
        return (
          <StyledWrapper
            key={`styled-table-property-wrapper-${index}`}
            paddingLeft={values.propertyStyles?.paddingLeft || 0}
            paddingRight={values.propertyStyles?.paddingRight || 0}
            textAlign={values.propertyStyles?.textAlign || 'left'}
          >
            {RenderView(values, index)}
          </StyledWrapper>
        );
      })}
    </>
  );
}

interface IStyledWrapper extends ITdStyle {}

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

// input style
interface IInputItemStyle extends ITextItemStyle {
  borderRadius: number;
  height: number;
  textAlign: number;
  width: number;
}

interface ISlideToggleStyle {
  ballColor?: string;
  borderColor?: string;
}

interface ITextSlideToggleStyle extends ISlideToggleStyle, ITextItemStyle {}

// button 요소 정보
interface IButtonItem {
  image?: string;
  onClick?:
    | TModifySmsCount
    | TRemoveAutoMessage
    | TOnClickModifyAutoMessagePopup;
  text?: string;
}

// input 요소 정보
interface IInputItem {
  disabled?: boolean;
  isNumber?: boolean;
  name?: string;
  onChange?: TonChangeInput;
  value?: string;
  ref: React.MutableRefObject<HTMLInputElement[]>;
}

// slice toggle 요소 정보
interface ISlideToggleItem {
  height?: number;
  id?: string;
  isChecked: boolean;
  width?: number;
  onChange?: TOnClickToggle;
  onClick?: TSetUsedAutoMessage;
}

// text 요소 정보
interface ITextItem {
  count?: number; // 렌더 횟수
  text: string;
}

// slide toggle + text 요소 정보
interface ITextSlideToggleItem extends ISlideToggleItem, ITextItem {
  isReverse: boolean;
}

interface ITdStyle {
  paddingLeft?: number;
  paddingRight?: number;
  textAlign?: string;
}

export interface IProperty {
  type: string;
  data: IButtonItem | IInputItem | ITextItem | ITextSlideToggleItem;
  styles?: // 사용하는 컴포넌트의 style
  IButtonItemStyle | IInputItemStyle | ITextItemStyle | ITextSlideToggleStyle;
  propertyStyles?: ITdStyle; // 해당 요소의 style
}

interface ITablePropertyProps {
  contents: Array<IProperty>;
  contentType: string; // 컴포넌트 재사용 시 데이터 구분하기 위해
  originItem: IMaxMessageItem | IAutoMessageItem; // 원본 데이터
}

TableProperty.defaultProps = {};

export default TableProperty;
