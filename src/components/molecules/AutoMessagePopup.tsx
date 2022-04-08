import _ from 'lodash';
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
import useDatePicker from 'hooks/useDatePicker';
import useInputForm from 'hooks/useInputForm';
import { TAddAutoMessage, TModifyAutoMessage } from 'hooks/useMessage';
import useOrganization from 'hooks/useOrganization';
import useToggle from 'hooks/useToggle';
import { TOnClickVisible } from 'hooks/useVisible';
import { IAutoMessageItem } from 'types/message';
import { Colors } from 'utils/color';
import constants from 'utils/constants';
import Utils from 'utils/new_utils';

const renderSettingTitleData = [
  { id: 0, name: 'subject', text: '', paddingTop: 14, placeholder: '제목' },
  { id: 1, name: 'content', text: '', paddingTop: 8, placeholder: '문자 내용' },
  {
    id: 2,
    name: '',
    text: '자동 문자 발송 조건',
    textSize: 14,
    paddingTop: 15,
  },
  { id: 3, name: 'branch', text: '지점' },
  { id: 4, name: 'date', text: '기간 설정' },
  { id: 5, name: 'daily_date', text: '', paddingTop: 10 },
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

function AutoMessagePopup({
  addAutoMessage,
  isVisible,
  modifyAutoMessage,
  onClickVisible,
  selectedAutoMessageData,
}: IAutoMessagePopup) {
  const initializedData = useMemo(() => {
    return {
      branch: selectedAutoMessageData?.branch_id || constants.DEFAULT_ID,
      content: selectedAutoMessageData?.content || '',
      daily_date:
        !_.isEmpty(selectedAutoMessageData) &&
        !selectedAutoMessageData?.start_date &&
        !selectedAutoMessageData?.end_date,
      daily_time:
        !_.isEmpty(selectedAutoMessageData) &&
        !selectedAutoMessageData?.start_time &&
        !selectedAutoMessageData?.end_time,
      subject: selectedAutoMessageData?.title || '',
    };
  }, [selectedAutoMessageData]);

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
    setInitializedForm,
  } = useInputForm(initializedData);
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
      { id: 1, text: '월', onClick: onClickToggleMon, isSelected: isToggleMon },
      { id: 2, text: '화', onClick: onClickToggleTue, isSelected: isToggleTue },
      { id: 3, text: '수', onClick: onClickToggleWed, isSelected: isToggleWed },
      { id: 4, text: '목', onClick: onClickToggleThu, isSelected: isToggleThu },
      { id: 5, text: '금', onClick: onClickToggleFri, isSelected: isToggleFri },
      { id: 6, text: '토', onClick: onClickToggleSat, isSelected: isToggleSat },
      { id: 0, text: '일', onClick: onClickToggleSun, isSelected: isToggleSun },
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
        fontFamily: 'Malgun Gothic',
        fontSize: 14,
      },
    };

    const textConfig2 = {
      type: 'text',
      data: {
        text: '자동문자 등록/수정',
      },
      styles: {
        fontFamily: 'Malgun Gothic',
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

  const daysToString = useMemo(() => {
    let days = '';
    days += isToggleSun ? '0' : '';
    days += isToggleMon ? '1' : '';
    days += isToggleTue ? '2' : '';
    days += isToggleWed ? '3' : '';
    days += isToggleThu ? '4' : '';
    days += isToggleFri ? '5' : '';
    days += isToggleSat ? '6' : '';

    return days;
  }, [
    isToggleFri,
    isToggleMon,
    isToggleSat,
    isToggleSun,
    isToggleThu,
    isToggleTue,
    isToggleWed,
  ]);

  const isValidate = useCallback(
    (title: string, content: string, days: string, branchId: number) => {
      if (!title) {
        alert('제목을 입력해주세요.');
        return false;
      }

      if (!content) {
        alert('문자 내용을 입력해주세요.');
        return false;
      }

      if (branchId === constants.DEFAULT_ID) {
        alert('지점을 선택해주세요.');
        return false;
      }

      if (!days) {
        alert('요일을 선택해주세요.');
        return false;
      }

      return true;
    },
    [],
  );

  const onClickEvent = useCallback(() => {
    const branchId = form.branch; // 선택한 지점
    const title = form.subject; // 제목
    const content = form.content; // 내용
    const days = daysToString;
    const startTime = Utils.getHourMinByTimestamp(
      new Date(startTimePicker).getTime(),
      ':',
    );
    const endTime = Utils.getHourMinByTimestamp(
      new Date(endTimePicker).getTime(),
      ':',
    );

    let startDate = '';
    let endDate = '';

    if (!form.daily_date) {
      // 상시 체크를 안한 경우
      startDate = Utils.getYYYYMMDD(new Date(startDatePicker).getTime(), '-');
      endDate = Utils.getYYYYMMDD(new Date(endDatePicker).getTime(), '-');
    }

    const isSuccess = isValidate(title, content, days, branchId);

    if (!isSuccess) {
      return;
    }

    if (selectedAutoMessageData) {
      modifyAutoMessage(
        selectedAutoMessageData.id,
        branchId,
        title,
        content,
        startDate,
        endDate,
        startTime,
        endTime,
        days,
      );
    } else {
      addAutoMessage(
        branchId,
        title,
        content,
        startDate,
        endDate,
        startTime,
        endTime,
        days,
      );
    }

    onClickVisible();
  }, [
    addAutoMessage,
    daysToString,
    endDatePicker,
    endTimePicker,
    form.branch,
    form.content,
    form.daily_date,
    form.subject,
    isValidate,
    modifyAutoMessage,
    onClickVisible,
    selectedAutoMessageData,
    startDatePicker,
    startTimePicker,
  ]);

  useEffect(() => {
    getBranches();
  }, [getBranches]);

  // 초기화
  useEffect(() => {
    if (isVisible) {
      setInitializedForm(initializedData);
    }
  }, [initializedData, isVisible, setInitializedForm]);

  // 초기화
  useEffect(() => {
    if (!isVisible && !selectedAutoMessageData) {
      onClickToggleSun(false);
      onClickToggleMon(false);
      onClickToggleTue(false);
      onClickToggleWed(false);
      onClickToggleThu(false);
      onClickToggleFri(false);
      onClickToggleSat(false);
    }
  }, [
    isVisible,
    onClickToggleFri,
    onClickToggleMon,
    onClickToggleSat,
    onClickToggleSun,
    onClickToggleThu,
    onClickToggleTue,
    onClickToggleWed,
    selectedAutoMessageData,
  ]);

  // 요일 설정
  useEffect(() => {
    const isSun = selectedAutoMessageData?.days?.includes('0');
    const isMon = selectedAutoMessageData?.days?.includes('1');
    const isTue = selectedAutoMessageData?.days?.includes('2');
    const isWed = selectedAutoMessageData?.days?.includes('3');
    const isThu = selectedAutoMessageData?.days?.includes('4');
    const isFri = selectedAutoMessageData?.days?.includes('5');
    const isSat = selectedAutoMessageData?.days?.includes('6');

    if (isSun) {
      onClickToggleSun();
    }
    if (isMon) {
      onClickToggleMon();
    }
    if (isTue) {
      onClickToggleTue();
    }
    if (isWed) {
      onClickToggleWed();
    }
    if (isThu) {
      onClickToggleThu();
    }
    if (isFri) {
      onClickToggleFri();
    }
    if (isSat) {
      onClickToggleSat();
    }
  }, [
    onClickToggleFri,
    onClickToggleMon,
    onClickToggleSat,
    onClickToggleSun,
    onClickToggleThu,
    onClickToggleTue,
    onClickToggleWed,
    selectedAutoMessageData,
  ]);

  // 기간/시간 설정
  useEffect(() => {
    if (selectedAutoMessageData) {
      const { start_date, end_date, start_time, end_time } =
        selectedAutoMessageData;

      if (start_date && end_date) {
        const startYMD = Utils.replace(start_date, '-', '/');
        const endYMD = Utils.replace(end_date, '-', '/');

        const startDate = new Date(startYMD);
        const endDate = new Date(endYMD);

        onChangeEndDatePicker(endDate);
        onChangeStartDatePicker(startDate);
      }

      if (start_time && end_time) {
        const currentYMD = Utils.getYYYYMMDD(new Date().getTime(), '/');
        const startTime = new Date(`${currentYMD} ${start_time}`);
        const endTime = new Date(`${currentYMD} ${end_time}`);

        onChangeEndTimePicker(startTime);
        onChangeStartTimePicker(endTime);
      }
    }
  }, [
    onChangeEndDatePicker,
    onChangeEndTimePicker,
    onChangeStartDatePicker,
    onChangeStartTimePicker,
    selectedAutoMessageData,
  ]);

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
              disabled={
                selectedAutoMessageData?.branch_id === constants.DEFAULT_ID
              }
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
              datePickerDisabled={form.daily_date}
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
              checkBoxIsChecked={form.daily_date}
              checkBoxName={settingData.name}
              checkBoxOnChange={onChangeCheckBox}
              distance={2}
              isReverse
              textFontColor={Colors.navy2}
              textFontFamily="Malgun Gothic"
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
              datePickerDisabled={form.daily_time}
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
      form.daily_date,
      form.daily_time,
      form.subject,
      onChangeCheckBox,
      onChangeEndDatePicker,
      onChangeEndTimePicker,
      onChangeInput,
      onChangeSelect,
      onChangeStartDatePicker,
      onChangeStartTimePicker,
      onChangeTextArea,
      selectedAutoMessageData,
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
                fontFamily="Malgun Gothic"
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
          onClick={onClickEvent}
        >
          <Text
            fontColor={Colors.white}
            fontFamily="Malgun Gothic"
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
  addAutoMessage: TAddAutoMessage;
  isVisible: boolean;
  modifyAutoMessage: TModifyAutoMessage;
  onClickVisible: TOnClickVisible;
  selectedAutoMessageData?: IAutoMessageItem | null;
}

AutoMessagePopup.defaultProps = {};

export default AutoMessagePopup;
