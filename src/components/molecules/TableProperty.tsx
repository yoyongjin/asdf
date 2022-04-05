import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';

import { Button, Input, Text } from 'components/atoms';
import useInputForm, { TonChangeInput } from 'hooks/useInputForm';
import { Colors } from 'utils/color';
import { TModifySmsCount } from 'hooks/useMessage';
import { DynamicJSON } from 'types/common';
import { IMaxMessageItem } from 'types/message';

const StyledWrapper = styled.td<IStyledWrapper>`
  text-align: ${(props) => props.textAlign};
  padding-left: ${(props) => props.paddingLeft}px;
  padding-right: ${(props) => props.paddingRight}px;
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
    (data: IButtonItem, styles?: IButtonItemStyle) => {
      const onClickButton = () => {
        if (data.onClick) {
          if (contentType === 'sms-count') {
            const _originItem = originItem as IMaxMessageItem;

            const [empty, value1, value2] = inputRef.current.map(
              (inputDom, index) => {
                return Number(inputDom.value);
              },
            );

            data.onClick(_originItem.branch_id, value1, value2);
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
    const name = `${key}`;
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
        value={value}
        width={styles?.width}
      />
    );
  };

  const TextView = useCallback((data: ITextItem, styles?: ITextItemStyle) => {
    return (
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

  const RenderView = (config: IProperty, tablePropertyKey: number) => {
    const { data, type, styles } = config;

    switch (type) {
      case 'button': {
        const buttonData = data as IButtonItem;
        const buttonStyles = styles as IButtonItemStyle;
        return ButtonView(buttonData, buttonStyles);
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

// button 요소 정보
interface IButtonItem {
  image?: string;
  onClick?: TModifySmsCount;
  text?: string;
}

// input 요소 정보
interface IInputItem {
  name?: string;
  onChange?: TonChangeInput;
  value?: string;
  ref: React.MutableRefObject<HTMLInputElement[]>;
}

// text 요소 정보
interface ITextItem {
  text: string;
}

interface ITdStyle {
  paddingLeft?: number;
  paddingRight?: number;
  textAlign?: string;
}

export interface IProperty {
  type: string;
  data: IButtonItem | IInputItem | ITextItem;
  styles?: IButtonItemStyle | IInputItemStyle | ITextItemStyle; // 사용하는 컴포넌트의 style
  propertyStyles?: ITdStyle; // 해당 요소의 style
}

interface ITablePropertyProps {
  contents: Array<IProperty>;
  contentType: string; // 컴포넌트 재사용 시 데이터 구분하기 위해
  originItem: IMaxMessageItem; // 원본 데이터
}

TableProperty.defaultProps = {};

export default TableProperty;
