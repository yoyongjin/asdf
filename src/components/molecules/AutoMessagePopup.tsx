import React, { useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import { DateRangePicker, TextCheckBox, TitleV2 } from 'components/molecules';
import {
  Button,
  Input,
  Select,
  Text,
  TextArea,
  Toggle,
} from 'components/atoms';
import useAuth from 'hooks/useAuth';
import useDatePicker from 'hooks/useDatePicker';
import useInputForm from 'hooks/useInputForm';
import useOrganization from 'hooks/useOrganization';
import useToggle from 'hooks/useToggle';
import { TOnClickVisible } from 'hooks/useVisible';
import { Colors } from 'utils/color';
import constants, { USER_TYPE } from 'utils/constants';

const renderSettingTitleData = [
  { id: 0, name: 'subject', text: '', paddingTop: 14, placeholder: '제목' },
  { id: 1, name: 'content', text: '', paddingTop: 8, placeholder: '문자 내용' },
  {
    id: 2,
    name: '',
    text: '알림 문자 발송 조건',
    textSize: 14,
    paddingTop: 15,
  },
  { id: 3, name: 'branch', text: '지점' },
  { id: 4, name: 'date', text: '기간 설정' },
  { id: 5, name: 'daily', text: '', paddingTop: 10 },
  { id: 6, name: 'time', text: '시간 설정' },
  { id: 7, name: 'day', text: '요일 지정' },
];

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  width: 100%;
  height: 20px;
`;

const StyledContent = styled.div`
  width: 100%;
  height: calc(100% - 40px - 50px);
`;

const StyledFooter = styled.div`
  width: 100%;
  height: 50px;
`;

const StyledSettingItem = styled.div<IStyledSettingItem>`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-top: ${(props) => props.paddingTop}px;
`;

const StyledTextAreaWrapper = styled.div`
  border-color: ${Colors.gray14};
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  height: 161px;
  padding-top: 9px;
  text-align: center;
  width: 328px;
`;

function AutoMessagePopup({ onClickVisible }: IAutoMessagePopup) {
  const { loginInfo } = useAuth();
  const {
    datePicker: startDatePicker,
    onChangeDatePicker: onChangeStartDatePicker,
  } = useDatePicker();
  const {
    datePicker: endDatePicker,
    onChangeDatePicker: onChangeEndDatePicker,
  } = useDatePicker();
  const {
    datePicker: startTimePicker,
    onChangeDatePicker: onChangeStartTimePicker,
  } = useDatePicker();
  const {
    datePicker: endTimePicker,
    onChangeDatePicker: onChangeEndTimePicker,
  } = useDatePicker();
  const { branches, getBranches } = useOrganization();
  const {
    form,
    onChangeInput,
    onChangeSelect,
    onChangeCheckBox,
    onChangeTextArea,
  } = useInputForm({
    branch:
      loginInfo.admin_id < USER_TYPE.ADMIN
        ? loginInfo.branch_id
        : constants.DEFAULT_ID, // 지점 관리자부터 하위 관리자들은 자신의 지점만 볼 수 있다.
    content: '',
    daily: false,
    subject: '',
  });
  const { isToggle: isToggleMon, onClickToggle: onClickToggleMon } =
    useToggle();
  const { isToggle: isToggleTue, onClickToggle: onClickToggleTue } =
    useToggle();
  const { isToggle: isToggleWed, onClickToggle: onClickToggleWed } =
    useToggle();
  const { isToggle: isToggleThu, onClickToggle: onClickToggleThu } =
    useToggle();
  const { isToggle: isToggleFri, onClickToggle: onClickToggleFri } =
    useToggle();
  const { isToggle: isToggleSat, onClickToggle: onClickToggleSat } =
    useToggle();
  const { isToggle: isToggleSun, onClickToggle: onClickToggleSun } =
    useToggle();

  const branchSelectOption = useMemo(() => {
    return branches!.map((values) => {
      return {
        id: values.id,
        data: values.branch_name,
      };
    });
  }, [branches]);

  const daysData = useMemo(() => {
    return [
      { id: 1, text: '월', onClick: onClickToggleSun, isSelected: isToggleSun },
      { id: 2, text: '화', onClick: onClickToggleMon, isSelected: isToggleMon },
      { id: 3, text: '수', onClick: onClickToggleTue, isSelected: isToggleTue },
      { id: 4, text: '목', onClick: onClickToggleWed, isSelected: isToggleWed },
      { id: 5, text: '금', onClick: onClickToggleThu, isSelected: isToggleThu },
      { id: 6, text: '토', onClick: onClickToggleFri, isSelected: isToggleFri },
      { id: 0, text: '일', onClick: onClickToggleSat, isSelected: isToggleSat },
    ];
  }, [
    isToggleFri,
    isToggleMon,
    isToggleSat,
    isToggleSun,
    isToggleThu,
    isToggleTue,
    isToggleWed,
    onClickToggleFri,
    onClickToggleMon,
    onClickToggleSat,
    onClickToggleSun,
    onClickToggleThu,
    onClickToggleTue,
    onClickToggleWed,
  ]);

  const titleTextData = useMemo(() => {
    const textConfig1 = {
      type: 'text',
      data: {
        text: 'X',
        onClick: onClickVisible,
      },
      styles: {
        fontColor: Colors.black,
        fontFamily: 'MalgunGothic',
        fontSize: 14,
      },
    };

    const textConfig2 = {
      type: 'text',
      data: {
        text: '알림문자 등록/수정',
      },
      styles: {
        fontFamily: 'MalgunGothic',
        fontSize: 14,
      },
    };

    return [textConfig1, textConfig2];
  }, [onClickVisible]);

  /**
   * @description 타이틀 왼쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleRenderLeft = useCallback(
    (type: number) => {
      if (type === 1) {
      } else if (type === 2) {
        const renderData = [];

        const [textConfig1, textConfig2] = titleTextData;

        renderData.push(textConfig2);

        return {
          renderConfig: renderData,
        };
      }
    },
    [titleTextData],
  );

  /**
   * @description 타이틀 오른쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleRenderRight = useCallback(
    (type: number) => {
      if (type === 1) {
        const renderData = [];

        const [textConfig1, ...textConfig] = titleTextData;

        renderData.push(textConfig1);

        return {
          renderConfig: renderData,
        };
      } else if (type === 2) {
      }
    },
    [titleTextData],
  );

  /**
   * @description 타이틀 style 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleStyle = useCallback((type: number) => {
    if (type === 1) {
      return {
        borderBottomStyle: 'none',
        borderBottomWidth: 0,
        rightMarginTop: 0,
      };
    } else if (type === 2) {
      return {
        borderBottomColor: Colors.blue4,
        borderBottomStyle: 'solid',
        borderBottomWidth: 2,
        leftMarginTop: 0,
      };
    }
  }, []);

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  const RenderSettingView = useCallback(
    (settingData: IRenderSettingTitleData) => {
      switch (settingData.id) {
        case 0: {
          // 제목
          return (
            <Input
              borderRadius={8}
              fontSize={12}
              height={3}
              name={settingData.name}
              onChange={onChangeInput}
              paddingLeft={11}
              placeholder={settingData.placeholder}
              textAlign={1}
              value={form.subject}
              width={32.8}
            />
          );
        }
        case 1: {
          // 문자 내용
          return (
            <StyledTextAreaWrapper>
              <TextArea
                borderRadius={0}
                borderStyle="none"
                fontColor={Colors.navy2}
                fontSize={12}
                height={132}
                name={settingData.name}
                onChange={onChangeTextArea}
                paddingLeft={0}
                paddingTop={5}
                placeholder={settingData.placeholder}
                value={form.content}
                width={300}
              />
            </StyledTextAreaWrapper>
          );
        }
        case 3: {
          // 지점명
          return (
            <Select
              borderColor={Colors.gray14}
              borderRadius={8}
              defaultValue={form.branch}
              fontColor={Colors.navy2}
              fontSize={12}
              name={settingData.name}
              options={branchSelectOption}
              optionFontSize={12}
              onChange={onChangeSelect}
              width={200}
              height={25}
            />
          );
        }
        case 4: {
          // 기간 설정
          return (
            <DateRangePicker
              datePickerBorderStyle="solid"
              datePickerEndOnChange={onChangeEndDatePicker}
              datePickerEndSelectedDate={endDatePicker}
              datePickerFormat="yyyy년 MM월 dd일"
              datePickerHeight={3}
              datePickerStartSelectedDate={startDatePicker}
              datePickerStartOnChange={onChangeStartDatePicker}
              datePickerWidth={10.5}
            />
          );
        }
        case 5: {
          // 기간 상시 체크박스
          return (
            <TextCheckBox
              checkBoxIsChecked={form.daily}
              checkBoxName={settingData.name}
              checkBoxOnChange={onChangeCheckBox}
              distance={2}
              isReverse
              textFontColor={Colors.navy2}
              textFontFamily="MalgunGothic"
              textFontSize={11}
              textTitle="상시 발송(항목 체크시 기간 설정 안함)"
            />
          );
        }
        case 6: {
          // 시간 설정
          return (
            <DateRangePicker
              datePickerBorderStyle="solid"
              datePickerEndOnChange={onChangeEndTimePicker}
              datePickerEndSelectedDate={endTimePicker}
              datePickerFormat="HH:mm"
              datePickerHeight={3}
              datePickerIsShowTime
              datePickerIsShowTimeOnly
              datePickerStartOnChange={onChangeStartTimePicker}
              datePickerStartSelectedDate={startTimePicker}
              datePickerWidth={10.5}
            />
          );
        }
        case 7: {
          // 요일 지정
          return daysData.map((values) => {
            return (
              <Toggle
                isSelected={values.isSelected}
                onClick={values.onClick}
                textNotSelectedText={values.text}
                textSelectedText={values.text}
                selectedBackgroundColor={Colors.blue4}
                selectedBorderColor={Colors.blue4}
                notSelectedBackgroundColor={Colors.white}
                notSelectedBorderColor={Colors.gray14}
              />
            );
          });
        }
      }
    },
    [
      branchSelectOption,
      daysData,
      endDatePicker,
      endTimePicker,
      form.branch,
      form.content,
      form.daily,
      form.subject,
      onChangeCheckBox,
      onChangeEndDatePicker,
      onChangeEndTimePicker,
      onChangeInput,
      onChangeSelect,
      onChangeStartDatePicker,
      onChangeStartTimePicker,
      onChangeTextArea,
      startDatePicker,
      startTimePicker,
    ],
  );

  return (
    <StyledWrapper>
      <StyledTitle>
        <TitleV2
          renderRight={getTitleRenderRight(1)}
          titleStyle={getTitleStyle(1)}
        />
      </StyledTitle>
      <StyledTitle>
        <TitleV2
          renderLeft={getTitleRenderLeft(2)}
          titleStyle={getTitleStyle(2)}
        />
      </StyledTitle>
      <StyledContent>
        {renderSettingTitleData.map((values) => {
          return (
            <StyledSettingItem paddingTop={values.paddingTop || 13}>
              <Text
                fontColor={Colors.navy2}
                fontSize={values.textSize || 12}
                fontFamily="MalgunGothic"
                fontWeight={800}
              >
                {values.text}
              </Text>
              {RenderSettingView(values)}
            </StyledSettingItem>
          );
        })}
      </StyledContent>
      <StyledFooter>
        <Button
          bgColor={Colors.blue4}
          borderRadius={8}
          width={32.8}
          height={3.6}
        >
          <Text
            fontColor={Colors.white}
            fontFamily="MalgunGothic"
            fontSize={14}
            fontWeight={800}
          >
            등록/수정하기
          </Text>
        </Button>
      </StyledFooter>
    </StyledWrapper>
  );
}

interface IRenderSettingTitleData {
  id: number;
  name: string;
  text: string;
  textSize?: number;
  placeholder?: string;
}

interface IStyledSettingItem {
  paddingTop?: number;
}

interface IAutoMessagePopup {
  onClickVisible: TOnClickVisible;
}

AutoMessagePopup.defaultProps = {};

export default AutoMessagePopup;
