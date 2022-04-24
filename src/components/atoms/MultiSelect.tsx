import React, { useMemo } from 'react';
import Select, {
  SelectMethods,
  SelectProps,
  SelectState,
} from 'react-dropdown-select';
import { FixedSizeList } from 'react-window';
import styled from 'styled-components';

import { Button, Text } from 'components/atoms';
import { TextCheckBox } from 'components/molecules';
import { THandleSelectedOption } from 'hooks/useMultiSelect';
import { Colors } from 'utils/color';
import constants from 'utils/constants';

const StyledMultiSelect = styled(Select)<IStyledMultiSelect>`
  border-radius: 0px;
  :hover {
    border-color: ${Colors.blue3} !important;
    transition: border-color 2s;
  }
`;

const StyledOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const StyledItems = styled.div`
  min-height: 10px;
  max-height: 200px;
`;

const StyledItem = styled.div`
  display: flex;
  margin: 10px;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px dotted transparent;

  :hover {
    border-bottom: 1px dotted ${Colors.gray14};
  }
`;

function MultiSelect({
  borderRadius,
  clearButton,
  isDisabled,
  isKeepItem,
  height,
  onChange,
  options,
  textChoice,
  value,
  width,
}: IMultiSelect) {
  const customStyle = useMemo(() => {
    return {
      height: `${height}rem`,
      minHeight: `${height}rem`,
      minWidth: `${width}rem`,
      width: `${width}rem`,
    };
  }, [height, width]);

  /**
   * @description content 부분
   */
  const contentRenderer = (state: SelectState<string | object>) => {
    return (
      <div>
        <Text fontColor={Colors.gray13} fontFamily="Malgun Gothic">
          {`${state.values.length}${textChoice} 선택`}
        </Text>
      </div>
    );
  };

  /**
   * @description 하단 부분
   */
  const dropdownRenderer = (
    props: SelectProps<string | object>,
    state: SelectState<string | object>,
    methods: SelectMethods<string | object>,
  ) => {
    return (
      <>
        <StyledOptionWrapper>
          {methods.areAllSelected() ? (
            <Button
              width={width}
              borderRadius={0}
              bgColor={Colors.red2}
              onClick={methods.clearAll}
            >
              <Text fontColor={Colors.white} fontFamily="Malgun Gothic">
                Clear all
              </Text>
            </Button>
          ) : (
            <Button
              width={width}
              borderRadius={0}
              bgColor={Colors.blue4}
              onClick={() => methods.selectAll()}
            >
              <Text fontColor={Colors.white} fontFamily="Malgun Gothic">
                Select all
              </Text>
            </Button>
          )}
        </StyledOptionWrapper>
        <StyledItems>
          <FixedSizeList
            height={200}
            itemCount={props.options.length}
            itemSize={height * 10}
            width="100%"
            itemData={props.options}
          >
            {({ index, style, data }: any) => {
              const _index = state.values.findIndex((itmes: any) => {
                return itmes.value === data[index].value;
              });

              let isChecked = true;

              if (_index === constants.DEFAULT_ID) {
                isChecked = false;
              }

              return (
                <StyledItem
                  style={style}
                  key={data[index].value}
                  onClick={() => {
                    methods.addItem(data[index]);
                  }}
                >
                  <TextCheckBox
                    checkBoxIsChecked={isChecked}
                    checkBoxOnChange={() => methods.addItem(data[index])}
                    isReverse
                    textFontColor={Colors.navy2}
                    textFontFamily="Malgun Gothic"
                    textFontSize={12}
                    textTitle={data[index].label}
                  />
                </StyledItem>
              );
            }}
          </FixedSizeList>
        </StyledItems>
      </>
    );
  };

  return (
    <StyledMultiSelect
      borderRadius={borderRadius}
      clearable={clearButton}
      contentRenderer={({ state }) => contentRenderer(state)}
      disabled={isDisabled}
      dropdownRenderer={({ props, state, methods }) =>
        dropdownRenderer(props, state, methods)
      }
      keepSelectedInList={isKeepItem}
      multi
      onChange={(value: Array<any>) => {
        if (onChange) {
          onChange(value);
        }
      }}
      options={options}
      style={customStyle}
      values={value}
    />
  );
}

interface IStyledMultiSelect {
  borderRadius: number;
}

export interface IOption {
  label: string;
  value: any;
}

interface IMultiSelect extends IStyledMultiSelect {
  clearButton: boolean;
  height: number;
  width: number;
  isDisabled?: boolean;
  isKeepItem: boolean; // 선택된 item 유지 여부
  onChange?: THandleSelectedOption;
  options: Array<IOption>; // 데이터
  textChoice: string; // 단위
  value: Array<IOption>; // 기존 선택된 값
}

MultiSelect.defaultProps = {
  borderRadius: 0,
  clearButton: true,
  height: 2.8,
  isCloseMenuOnSelect: false,
  isCheckBox: true,
  isDisabled: false,
  isKeepItem: true,
  isSelectAll: true,
  textChoice: '',
  width: 20,
};

export default MultiSelect;
