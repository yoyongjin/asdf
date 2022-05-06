import React, { useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import { Button, Text } from 'components/atoms';
import { TextInput, TitleV2 } from 'components/molecules';
import useInputForm from 'hooks/useInputForm';
import { TOnClickVisible } from 'hooks/useVisible';
import { Colors } from 'utils/color';
import TextSelect from './TextSelect';
import usePhone from 'hooks/usePhone';
import { LoginData } from 'types/auth';
import { IPhoneItem } from 'types/phone';
import Utils from 'utils/new_utils';
import constants, { USER_TYPE } from 'utils/constants';
import Toast from 'utils/toast';

const selectData = [
  { id: 1, name: 'telecom', value: '통신사' },
  { id: 2, name: 'plan', value: '요금제' },
  { id: 3, name: 'used_phone', value: '사용여부' },
];

const inputData = [
  { id: 1, name: 'number', value: '전화번호' },
  // { id: 2, name: 'serial_number', value: '일련번호' },
];

const phoneUsedSelectOption = [
  { id: 0, data: '개통' },
  { id: 1, data: '일시정지' },
  { id: 2, data: '해지' },
  { id: 3, data: '폐기' },
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
  height: calc(100% - 20px - 60px);
  margin-top: 20px;
`;

const StyledFooter = styled.div`
  padding-top: 10px;
  border-top: 1px solid ${Colors.blue3};
  width: 100%;
  height: 50px;
`;

function PhoneInfoPopup({
  isVisible,
  loginInfo,
  onClickVisible,
  phoneInfo,
}: IPhoneInfoPopup) {
  const { getPlan, getTelecom, plans, telecoms, modifyPhoneInfo } = usePhone();

  const initializedData = useMemo(() => {
    return {
      number: phoneInfo?.number ?? '',
      telecom: phoneInfo?.telecom ?? '',
      plan: phoneInfo?.plan ?? '',
      used_phone: phoneInfo?.used ?? 0,
    };
  }, [phoneInfo]);

  const { form, onChangeInput, onChangeSelect, setInitializedForm } =
    useInputForm(initializedData);

  /**
   * @description input, textbox 값
   * @param {string} name input, textbox name
   */
  const boxValue = useCallback(
    (name: string) => {
      switch (name) {
        case 'number': {
          return Utils.formatPhoneNumber(form.number);
        }
        case 'telecom': {
          return form.telecom;
        }
        case 'plan': {
          return form.plan;
        }
        case 'used_phone': {
          return form.used_phone;
        }
      }
    },
    [form.number, form.plan, form.telecom, form.used_phone],
  );

  /**
   * @description 통신사 select option
   */
  const telecomSelectOption = useMemo(() => {
    return telecoms.map((values) => {
      return {
        id: values.id,
        data: values.telecom,
      };
    });
  }, [telecoms]);

  /**
   * @description 요금제 select option
   */
  const planSelectOption = useMemo(() => {
    return plans.map((values) => {
      return {
        id: values.id,
        data: values.plan,
      };
    });
  }, [plans]);

  /**
   * @description 타이틀에 들어갈 text 정보
   */
  const titleTextData = useMemo(() => {
    const textConfig1 = {
      type: 'text',
      data: {
        text: '법인폰 정보',
      },
      styles: {
        fontSize: 13,
      },
    };

    return [textConfig1];
  }, []);

  /**
   * @description 타이틀 왼쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleRenderLeft = useCallback(
    (type: number) => {
      if (type === 1) {
        const renderData = [];

        renderData.push(...titleTextData);

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
        borderBottonColor: 'red',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        leftMarginTop: 0,
      };
    } else if (type === 2) {
    }
  }, []);

  /**
   * @description validate check
   */
  const isValidationValue = useCallback(
    (number: string, telecom: string, plan: string) => {
      if (!number || !number.trim()) {
        Toast.warning('전화번호는 필수 입력값이에요.🙄');

        return false;
      }

      if (!telecom || !telecom.trim()) {
        Toast.warning('통신사를 선택해주세요.🙄');

        return false;
      }

      if (!plan || !plan.trim()) {
        Toast.warning('요금제를 선택해주세요.🙄');

        return false;
      }

      return true;
    },
    [],
  );

  const setPhoneInfo = useCallback(() => {
    const id = phoneInfo?.id ?? constants.DEFAULT_ID;

    if (id === constants.DEFAULT_ID) {
      return;
    }

    const isSuccess = isValidationValue(form.number, form.telecom, form.plan);

    if (!isSuccess) {
      return;
    }

    if (phoneInfo && phoneInfo.id) {
      // 사용자 정보가 있을 경우 업데이트
      if (loginInfo.admin_id < constants.ADMIN.MODIFY_PHONE_INFO_ADMIN) {
        // 로그인 유저의 권한이 정의된 휴대폰 수정 권한보다 작을 경우
        Toast.warning('수정할 수 없는 권한입니다🙄');

        return false;
      }

      modifyPhoneInfo(
        id,
        form.number,
        form.telecom,
        form.plan,
        form.used_phone,
      );
    }
  }, [
    form.number,
    form.plan,
    form.telecom,
    form.used_phone,
    isValidationValue,
    loginInfo.admin_id,
    modifyPhoneInfo,
    phoneInfo,
  ]);

  useEffect(() => {
    if (isVisible) {
      setInitializedForm(initializedData);
    }
  }, [initializedData, isVisible, setInitializedForm]);

  /**
   * @description 팝업이 켜질 때 통신사 정보 가져오기
   */
  useEffect(() => {
    if (isVisible) {
      getTelecom();
    }
  }, [getTelecom, isVisible]);

  /**
   * @description 팝업이 켜져있고, 통신사 정보가 선택되었을 경우 해당 통신사의 요금제 정보 가져오기
   */
  useEffect(() => {
    if (isVisible && form.telecom) {
      const index = telecoms.findIndex(
        (values) => values.telecom === form.telecom,
      );

      if (index < 1) {
        return;
      }

      const telecomName = telecoms[index].telecom;

      getPlan(telecomName);
    }
  }, [
    form.telecom,
    getPlan,
    getTelecom,
    isVisible,
    telecomSelectOption,
    telecoms,
  ]);

  return (
    <StyledWrapper>
      <StyledTitle>
        <TitleV2
          renderLeft={getTitleRenderLeft(1)}
          titleStyle={getTitleStyle(1)}
        />
      </StyledTitle>
      <StyledContent>
        {inputData.map((data, index) => {
          return (
            <TextInput
              key={`text-input-${data.name}`}
              inputCustomStyle="float:right;"
              inputHeight={2.6}
              inputMaxLength={data.name === 'number' ? 13 : 0}
              inputName={data.name}
              inputOnChange={onChangeInput}
              inputSize={13}
              inputValue={String(boxValue(data.name))}
              inputWidth={10.8}
              textSize={13}
              textValue={data.value}
            />
          );
        })}
        {selectData.map((data, index) => {
          return (
            <TextSelect
              key={`text-select-${data.name}`}
              selectDefaultValue={boxValue(data.name)}
              selectHeight={26}
              selectIsUsedId={data.name === 'used_phone'}
              selectName={data.name}
              selectOnChange={onChangeSelect}
              selectOptions={
                data.name === 'telecom'
                  ? telecomSelectOption
                  : data.name === 'plan'
                  ? planSelectOption
                  : data.name === 'used_phone'
                  ? phoneUsedSelectOption
                  : []
              }
              selectWidth={108}
              textSize={13}
              textValue={data.value}
            />
          );
        })}
      </StyledContent>
      <StyledFooter>
        {loginInfo.admin_id > USER_TYPE.CONSULTANT && (
          <Button
            bgColor={Colors.blue4}
            customStyle="float:right;"
            height={2.6}
            onClick={setPhoneInfo}
            width={7}
          >
            <Text
              fontColor={Colors.white}
              fontFamily="NanumBarunGothic"
              fontSize={14}
              fontWeight={700}
            >
              저장
            </Text>
          </Button>
        )}
        <Button
          width={7}
          height={2.6}
          bgColor={Colors.gray4}
          onClick={onClickVisible}
          customStyle={`
            float:right;
            margin-right: 10px;
          `}
        >
          <Text
            fontColor={Colors.white}
            fontFamily="NanumBarunGothic"
            fontSize={14}
            fontWeight={700}
          >
            취소
          </Text>
        </Button>
      </StyledFooter>
    </StyledWrapper>
  );
}

interface IPhoneInfoPopup {
  isVisible: boolean;
  loginInfo: LoginData;
  onClickVisible: TOnClickVisible;
  phoneInfo: IPhoneItem | null;
}

PhoneInfoPopup.defaultProps = {};

export default PhoneInfoPopup;
