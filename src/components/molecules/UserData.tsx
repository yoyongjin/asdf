import _ from 'lodash';
import React, { useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import { Button, Text } from 'components/atoms';
import {
  Title,
  TextInput,
  TextSelect,
  ZiboxData,
  PhoneData,
  TextRange,
  TextTextArea,
} from 'components/molecules';
import useInputForm from 'hooks/useInputForm';
import useOrganization from 'hooks/useOrganization';
import usePhone from 'hooks/usePhone';
import {
  OnClickDisconnect,
  TOnClickAddUser,
  TOnClickModifyUser,
} from 'hooks/useUser';
import { TOnClickVisible } from 'hooks/useVisible';
import { LoginData } from 'types/auth';
import { UserData as UserDataV2 } from 'types/user';
import { Colors } from 'utils/color';
import constants, {
  AUTO_MESSAGE_VERSION,
  COMPANY_TYPE,
  REG_EXR,
  USED_PHONE_STATUS,
  USER_TYPE,
  ZIBOX_TRANSPORT,
  ZIBOX_VERSION,
} from 'utils/constants';
import Utils from 'utils/new_utils';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  width: 100%;
  height: 40px;
`;

const StyledContent = styled.div`
  width: 100%;
  height: 382px;
  /* height: 80%; */
  /* max-height: 30rem; */
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const StyledUserInfo = styled.div`
  height: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  border-bottom: 1px solid
    ${constants.COMPANY === COMPANY_TYPE.DBLIFE ? Colors.green1 : Colors.blue3};
  padding-top: 10px;
  padding-bottom: 20px;
`;

const StyledStatus = styled.div`
  display: flex;
  height: 30%;
`;

const StyledZibox = styled.div`
  width: 50%;
  float: left;
  padding-top: 16px;
`;

const StyledPhone = styled.div`
  width: 50%;
  float: right;
  padding-top: 16px;
`;

const StyledFooter = styled.div`
  width: 100%;
  height: 10%;
  padding-top: 1rem;
  border-top: 0.05rem solid
    ${constants.COMPANY === COMPANY_TYPE.LINA ? Colors.blue1 : Colors.blue3};
`;

const selectData = [
  { id: 0, name: 'branch', value: '지점명(*)' },
  { id: 1, name: 'team', value: '팀명(*)' },
  { id: 2, name: 'admin', value: '권한(*)' },
  { id: 3, name: 'telecom', value: '통신사' },
  { id: 4, name: 'plan', value: '요금제' },
  { id: 5, name: 'used_phone', value: '사용여부' },
];

const inputData = [
  { id: 0, name: 'name', value: '이름(*)' },
  { id: 1, name: 'id', value: '아이디' },
  { id: 2, name: 'number', value: '전화번호' },
  { id: 3, name: 'serial_number', value: '일련번호' },
  { id: 4, name: 'zibox_ip', value: 'ZiBox IP' },
  { id: 5, name: 'zibox_mac', value: 'ZiBox MAC' },
  { id: 6, name: 'pc_ip', value: 'PC IP' },
  { id: 7, name: 'available_time', value: '업무시간' },
];

const rangeData = [
  { id: 0, name: 'zibox_mic', value: 'ZiBox MIC' },
  { id: 1, name: 'zibox_spk', value: 'ZiBox SPK' },
];

const textAreaData = [
  { id: 0, name: 'in_message', value: '업무 내 메시지' },
  { id: 1, name: 'out_message', value: '업무 외 메시지' },
];

const defaultUserPermistionSelectOption = [{ id: 0, data: '상담원' }];

const phoneUsedSelectOption = [
  { id: 0, data: '개통' },
  { id: 1, data: '일시정지' },
  { id: 2, data: '해지' },
  { id: 3, data: '폐기' },
];

function UserData({
  loginData,
  isVisible,
  onClickAddUser,
  onClickDisconnect,
  onClickModifyUser,
  onClickVisible,
  userData,
}: UserDataProps) {
  const {
    getPhoneInfo,
    getPlan,
    getTelecom,
    onEventInitializePhoneInfo,
    phoneInfo,
    plans,
    telecoms,
  } = usePhone();

  const initializedData = useMemo(() => {
    return {
      branch: userData?.branch_id ? userData!.branch_id : loginData.branch_id,
      team: userData?.team_id ? userData!.team_id : loginData.team_id,
      admin: userData?.admin_id ? userData!.admin_id : 0,
      name: userData?.name ? userData!.name : '',
      id: userData?.user_name ? userData!.user_name : '',
      number: userData?.number ? userData!.number : '',
      pc_ip: userData?.pc_ip ? userData!.pc_ip : '',
      zibox_ip: userData?.zibox_ip ? userData!.zibox_ip : '',
      zibox_mac: userData?.zibox_mac ? userData!.zibox_mac : '',
      zibox_mic: userData?.zibox_mic ? userData!.zibox_mic : 0,
      zibox_spk: userData?.zibox_spk ? userData!.zibox_spk : 0,
      available_time: userData?.available_time ? userData!.available_time : '',
      in_message: userData?.in_time ? userData!.in_time : '',
      out_message: userData?.out_time ? userData!.out_time : '',
      telecom: phoneInfo.telecom,
      plan: phoneInfo.plan,
      used_phone: phoneInfo.used,
      serial_number: phoneInfo.serial_number,
    };
  }, [
    loginData.branch_id,
    loginData.team_id,
    phoneInfo.plan,
    phoneInfo.serial_number,
    phoneInfo.telecom,
    phoneInfo.used,
    userData,
  ]);

  const {
    form,
    onChangeInput,
    onChangeSelect,
    onChangeTextArea,
    setInitializedForm,
  } = useInputForm(initializedData);

  const { userBranches, userTeams, getUserBranches, getUserTeams } =
    useOrganization();

  const branchSelectOption = useMemo(() => {
    return userBranches!.map((values) => {
      return {
        id: values.id,
        data: values.branch_name,
      };
    });
  }, [userBranches]);

  const teamSelectOption = useMemo(() => {
    return userTeams!.map((values) => {
      return {
        id: values.id,
        data: values.team_name,
      };
    });
  }, [userTeams]);

  const userPermistionSelectOption = useMemo(() => {
    const userPermission = _.cloneDeep(defaultUserPermistionSelectOption);

    if (
      loginData.admin_id === USER_TYPE.SUPER_ADMIN ||
      loginData.admin_id === USER_TYPE.ADMIN
    ) {
      userPermission.push(
        { id: 1, data: '팀관리자' },
        { id: 2, data: '지점관리자' },
        { id: 3, data: '관리자' },
      );
    } else if (loginData.admin_id === USER_TYPE.BRANCH_ADMIN) {
      userPermission.push(
        { id: 1, data: '팀관리자' },
        { id: 2, data: '지점관리자' },
      );
    } else if (loginData.admin_id === USER_TYPE.TEAM_ADMIN) {
      userPermission.push({ id: 1, data: '팀관리자' });
    }

    return userPermission;
  }, [loginData.admin_id]);

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
   * @description validate check
   */
  const isValidationValue = useCallback(
    (
      admin: number,
      branchId: number,
      teamId: number,
      name: string,
      id: string,
      pcip: string,
      ziBoxIp: string,
      ziBoxMac: string,
    ) => {
      if (admin < USER_TYPE.ADMIN && branchId === -1) {
        alert('지점을 선택해주세요.');

        return false;
      }

      if (admin < USER_TYPE.BRANCH_ADMIN && teamId === -1) {
        alert('팀을 선택해주세요.');

        return false;
      }

      if (!name || !name.trim()) {
        alert('이름은 필수 입력값입니다.');

        return false;
      }

      if (id) {
        if (id.length < 4) {
          alert('ID는 공백없이 4자리 이상입니다.');

          return false;
        }

        if (!REG_EXR.id.test(id)) {
          alert('ID는 숫자와 영어만 입력가능합니다.');

          return false;
        }
      } else {
        if (admin !== USER_TYPE.CONSULTANT) {
          alert('ID를 입력해주세요.');
          return false;
        }
      }

      if (pcip && !REG_EXR.ip.test(pcip)) {
        alert('IP주소 형식에 맞게 입력해주세요.');

        return false;
      }

      if (ziBoxIp && !REG_EXR.ip.test(ziBoxIp)) {
        alert('IP주소 형식에 맞게 입력해주세요.');

        return false;
      }

      if (ziBoxMac && !REG_EXR.mac.test(ziBoxMac)) {
        alert('MAC주소 형식에 맞게 입력해주세요.');

        return false;
      }

      return true;
    },
    [],
  );

  /**
   * @description 유저 정보 추가/업데이트
   */
  const setUserData = useCallback(() => {
    const adminId = form.admin; // 권한
    const name = form.name; // 이름
    const id = form.id; // 아이디

    let branchId = loginData.branch_id; // 지점
    let teamId = loginData.team_id; // 팀
    let number = ''; // 전화번호
    let originNumber = ''; // 변경 전 전화번호
    let pcIp = ''; // 상담원 pc IP
    let ziBoxIp = ''; // 지박스 IP
    let ziBoxMac = ''; // 지박스 MAC
    let ziBoxMic = 0; // 지박스 MIC 볼륨
    let ziBoxSpk = 0; // 지박스 SPK 볼륨
    let availableTime = ''; // 업무 이용 가능 시간
    let inMessage = ''; // 업무 내 메시지 내용
    let outMessage = ''; // 업무 외 메시지 내용
    let telecom = ''; // 통신사
    let plan = ''; // 요금제
    let usedPhone = USED_PHONE_STATUS.DEFAULT; // 폰 사용 여부
    let serialNumber = ''; // 일련번호

    if (form.admin === USER_TYPE.CONSULTANT) {
      number = form.number;
      originNumber = userData?.number || '';
      ziBoxMac = form.zibox_mac;
      pcIp = form.pc_ip;
      ziBoxIp = form.zibox_ip;
      ziBoxMic = form.zibox_mic;
      ziBoxSpk = form.zibox_spk;
      availableTime = form.available_time;
      inMessage = form.in_message;
      outMessage = form.out_message;
      telecom = form.telecom;
      plan = form.plan;
      usedPhone =
        form.used_phone === USED_PHONE_STATUS.DEFAULT
          ? USED_PHONE_STATUS.OPEN
          : form.used_phone; // 초기 정보가 없을 때 미선택 시, 무조건 개통 상태로 보내도록 예외처리
      serialNumber = form.serial_number;
    }

    if (loginData.admin_id > USER_TYPE.BRANCH_ADMIN) {
      // 로그인한 유저의 권한이 지점관리자보다 높을 경우
      if (form.admin > USER_TYPE.BRANCH_ADMIN) {
        // 선택한 유저의 권한이 지점관리자보다 높을 경우
        branchId = -1;
      } else {
        branchId = form.branch;
      }
    }

    if (loginData.admin_id > USER_TYPE.TEAM_ADMIN) {
      // 로그인한 유저의 권한이 팀관리자보다 높을 경우
      if (form.admin < USER_TYPE.BRANCH_ADMIN) {
        // 선택한 유저의 권한이 지점관리자보다 낮은 경우
        teamId = form.team;
      } else {
        teamId = -1;
      }
    }

    const isSuccess = isValidationValue(
      adminId,
      branchId,
      teamId,
      name,
      id,
      pcIp,
      ziBoxIp,
      ziBoxMac,
    );

    if (!isSuccess) {
      // validate check 실패
      return;
    }

    if (userData && userData!.id) {
      // 사용자 정보가 있을 경우 업데이트
      onClickModifyUser!(
        userData.id,
        branchId,
        teamId,
        adminId,
        name,
        id,
        number,
        originNumber,
        pcIp,
        ziBoxIp,
        ziBoxMac,
        ziBoxMic,
        ziBoxSpk,
        availableTime,
        inMessage,
        outMessage,
        telecom,
        plan,
        usedPhone,
        serialNumber,
      );

      onClickVisible();
    } else {
      // 사용자 정보가 없을 경우 추가
      onClickAddUser!(
        branchId,
        teamId,
        adminId,
        name,
        id,
        number,
        pcIp,
        ziBoxIp,
        ziBoxMac,
        ziBoxMic,
        ziBoxSpk,
      );

      onClickVisible();
    }
  }, [
    form.admin,
    form.available_time,
    form.branch,
    form.id,
    form.in_message,
    form.name,
    form.number,
    form.out_message,
    form.pc_ip,
    form.plan,
    form.serial_number,
    form.team,
    form.telecom,
    form.used_phone,
    form.zibox_ip,
    form.zibox_mac,
    form.zibox_mic,
    form.zibox_spk,
    isValidationValue,
    loginData.admin_id,
    loginData.branch_id,
    loginData.team_id,
    onClickAddUser,
    onClickModifyUser,
    onClickVisible,
    userData,
  ]);

  /**
   * @description input, textbox 활성화/비활성화
   * @param {string} name input, textbox name
   */
  const isDisabledBox = useCallback(
    (name: string) => {
      if (loginData.admin_id === USER_TYPE.CONSULTANT) {
        // 로그인한 유저의 권한이 상담원일 경우
        return true;
      }

      if (form.admin !== USER_TYPE.CONSULTANT) {
        // 등록/수정할 유저의 권한이 상담원이 아닌 경우
        if (
          name === 'number' ||
          name === 'pc_ip' ||
          name === 'zibox_ip' ||
          name === 'zibox_mac' ||
          name === 'zibox_mic' ||
          name === 'zibox_spk' ||
          name === 'available_time' ||
          name === 'in_message' ||
          name === 'out_message' ||
          name === 'telecom' ||
          name === 'plan' ||
          name === 'used_phone' ||
          name === 'serial_number'
        ) {
          return true;
        }
      }

      switch (name) {
        case 'branch': {
          // 지점
          if (loginData.admin_id < USER_TYPE.ADMIN) {
            // 로그인한 유저의 권한이 일반 관리자 권한보다 낮을 경우
            return true;
          }

          if (form.admin === USER_TYPE.ADMIN) {
            // 등록/수정할 유저의 권한 중 일반 관리자를 선택한 경우
            return true;
          }

          break;
        }
        case 'team': {
          // 팀
          if (loginData.admin_id < USER_TYPE.BRANCH_ADMIN) {
            // 로그인한 유저의 권한이 지점 관리자 권한보다 낮을 경우
            return true;
          }

          if (form.admin < USER_TYPE.BRANCH_ADMIN) {
            break;
          }

          return true;
        }
        case 'id': {
          // 아이디
          if (userData?.user_name) {
            // 아이디는 변경 불가능하기 때문에 아이디가 있으면 비활성화
            return true;
          }

          break;
        }
        case 'zibox_ip': {
          // 지박스 IP
          if (
            constants.TRANSPORT === ZIBOX_TRANSPORT.SERVER ||
            constants.TRANSPORT === ZIBOX_TRANSPORT.OCX
          ) {
            // 지박스 통신 버전이 OCX/SERVER 인 경우
            return true;
          }

          break;
        }
        case 'zibox_mac': {
          // 지박스 MAC
          if (constants.TRANSPORT !== ZIBOX_TRANSPORT.SERVER) {
            // 지박스 통신 버전이 SERVER가 아닌 경우
            return true;
          }

          break;
        }
        case 'zibox_mic': {
          // 지박스 마이크 볼륨
          if (constants.TRANSPORT === ZIBOX_TRANSPORT.MQTT) {
            // 지박스 통신 버전이 MQTT인 경우
            if (_.isEmpty(userData)) {
              // 유저 정보가 없는 경우(신규 생성 시)
              return true;
            }
          } else {
            return true;
          }

          break;
        }
        case 'telecom':
        case 'plan':
        case 'used_phone':
        case 'serial_number':
        case 'zibox_spk':
        case 'in_message':
        case 'out_message':
        case 'available_time': {
          // 통신사
          // 요금제
          // 휴대폰 사용 여부
          // 일련번호
          // 지박스 스피커 볼륨
          // 이용 가능시간 설정
          // 업무시간 내 메시지
          // 업무시간 외 메시지
          if (_.isEmpty(userData)) {
            // 유저 정보가 없는 경우(신규 생성 시)
            return true;
          }

          break;
        }
      }

      return false;
    },
    [form.admin, loginData.admin_id, userData],
  );

  /**
   * @description input, textbox 값
   * @param {string} name input, textbox name
   */
  const boxValue = useCallback(
    (name: string) => {
      switch (name) {
        case 'branch': {
          return form.branch;
        }
        case 'team': {
          return form.team;
        }
        case 'admin': {
          return form.admin;
        }
        case 'name': {
          return form.name;
        }
        case 'id': {
          return form.id;
        }
        case 'number': {
          return Utils.formatPhoneNumber(form.number);
        }
        case 'zibox_ip': {
          return form.zibox_ip;
        }
        case 'zibox_mac': {
          return Utils.formatMacAddress(form.zibox_mac);
        }
        case 'pc_ip': {
          return form.pc_ip;
        }
        case 'zibox_mic': {
          return form.zibox_mic;
        }
        case 'zibox_spk': {
          return form.zibox_spk;
        }
        case 'in_message': {
          return form.in_message;
        }
        case 'out_message': {
          return form.out_message;
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
        case 'serial_number': {
          return form.serial_number;
        }
      }
    },
    [
      form.admin,
      form.branch,
      form.id,
      form.in_message,
      form.name,
      form.number,
      form.out_message,
      form.pc_ip,
      form.plan,
      form.serial_number,
      form.team,
      form.telecom,
      form.used_phone,
      form.zibox_ip,
      form.zibox_mac,
      form.zibox_mic,
      form.zibox_spk,
    ],
  );

  useEffect(() => {
    if (isVisible) {
      getUserBranches();
    }
  }, [getUserBranches, isVisible]);

  useEffect(() => {
    if (isVisible) {
      const branchId =
        loginData.admin_id === USER_TYPE.SUPER_ADMIN ||
        loginData.admin_id === USER_TYPE.ADMIN
          ? form.branch
          : loginData.branch_id;

      getUserTeams(branchId);
    }
  }, [
    form.branch,
    getUserTeams,
    isVisible,
    loginData.admin_id,
    loginData.branch_id,
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

  /**
   * @description 팝업이 켜져있고, 유저의 전화번호가 있을 경우 전화번호의 정보 가져오기
   */
  useEffect(() => {
    if (isVisible && userData?.number) {
      getPhoneInfo(userData.number);
    }
  }, [getPhoneInfo, isVisible, userData]);

  /**
   * @description 팝업이 켜졌을 때 userData의 값이 없으면 사용자 추가로 간주
   */
  useEffect(() => {
    if (isVisible && _.isEmpty(userData)) {
      onEventInitializePhoneInfo();
    }
  }, [isVisible, onEventInitializePhoneInfo, userData]);

  return (
    <StyledWrapper>
      <StyledTitle>
        <Title>사용자 정보</Title>
      </StyledTitle>
      <StyledContent>
        <StyledUserInfo>
          {
            <>
              {selectData.map((data, index) => {
                // 지점명, 팀명, 권한
                if (data.id > 2) {
                  return null;
                }

                return (
                  <TextSelect
                    key={`text-select-${data.name}`}
                    selectDisabled={isDisabledBox(data.name)}
                    selectDefaultValue={boxValue(data.name)}
                    selectHeight={26}
                    selectName={data.name}
                    selectOnChange={onChangeSelect}
                    selectOptions={
                      data.name === 'branch'
                        ? branchSelectOption
                        : data.name === 'team'
                        ? teamSelectOption
                        : data.name === 'admin'
                        ? userPermistionSelectOption
                        : []
                    }
                    selectWidth={108}
                    textSize={13}
                    textValue={data.value}
                  />
                );
              })}
            </>
          }
          {
            <>
              {inputData.map((data, index) => {
                // 이름, 아이디, 전화번호
                if (data.id > 2) {
                  return null;
                }

                return (
                  <TextInput
                    key={`text-input-${data.name}`}
                    inputCustomStyle="float:right;"
                    inputDisabled={isDisabledBox(data.name)}
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
            </>
          }
          {
            <>
              {selectData.map((data, index) => {
                // 통신사, 요금제, 사용여부
                if (data.id < 3) {
                  return null;
                }

                return (
                  <TextSelect
                    key={`text-select-${data.name}`}
                    selectDisabled={isDisabledBox(data.name)}
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
            </>
          }
          {
            <>
              {inputData.map((data, index) => {
                if (data.id < 3 || data.id === 7) {
                  return null;
                }

                if (constants.TRANSPORT === ZIBOX_TRANSPORT.OCX) {
                  if (constants.ZIBOX_VERSION === ZIBOX_VERSION.ZIBOX2) {
                    if (data.name === 'zibox_ip' || data.name === 'zibox_mac') {
                      return null;
                    }
                  }
                } else {
                  if (data.name === 'pc_ip') {
                    return null;
                  }
                }

                return (
                  <TextInput
                    key={`text-input-${data.name}`}
                    inputCustomStyle="float:right;"
                    inputDisabled={isDisabledBox(data.name)}
                    inputHeight={2.6}
                    inputMaxLength={
                      data.name === 'zibox_ip' || data.name === 'pc_ip'
                        ? 15
                        : data.name === 'zibox_mac'
                        ? 17
                        : data.name === 'serial_number'
                        ? 30
                        : 0
                    }
                    inputName={data.name}
                    inputOnChange={onChangeInput}
                    inputSize={13}
                    inputValue={String(boxValue(data.name))}
                    inputWidth={
                      data.name === 'zibox_ip' ||
                      data.name === 'zibox_mac' ||
                      data.name === 'pc_ip' ||
                      data.name === 'serial_number'
                        ? 18.8
                        : 10.8
                    }
                    textSize={13}
                    textValue={data.value}
                  />
                );
              })}
            </>
          }
          {
            <>
              {rangeData.map((data, index) => {
                if (constants.TRANSPORT === ZIBOX_TRANSPORT.OCX) {
                  if (data.name === 'zibox_mic' || data.name === 'zibox_spk') {
                    return null;
                  }
                }
                return (
                  <TextRange
                    key={`text-range-${data.name}`}
                    isPaddingBottom
                    rangeDisable={isDisabledBox(data.name)}
                    rangeName={data.name}
                    rangeValue={String(boxValue(data.name))}
                    textValue={data.value}
                    onChangeRange={onChangeInput}
                  />
                );
              })}
            </>
          }
          {constants.AUTO_MESSAGE_VERSION === AUTO_MESSAGE_VERSION.ONE &&
            loginData.admin_id === USER_TYPE.SUPER_ADMIN && (
              <>
                <TextInput
                  key={`text-input-${inputData[7].name}`}
                  inputCustomStyle="float:right;"
                  inputDisabled={isDisabledBox(inputData[7].name)}
                  inputHeight={2.6}
                  inputMaxLength={11}
                  inputPlaceHolder="00:00-00:00"
                  inputName={inputData[7].name}
                  inputOnChange={onChangeInput}
                  inputSize={13}
                  inputValue={form.available_time}
                  inputWidth={10.8}
                  textSize={13}
                  textValue={inputData[7].value}
                />
                {textAreaData.map((data, index) => {
                  return (
                    <TextTextArea
                      key={`text-text-area-${data.name}`}
                      isRightFloat={
                        constants.TRANSPORT === ZIBOX_TRANSPORT.OCX
                          ? true
                          : data.name === 'out_message'
                      }
                      textareaCustomStyle="float:right"
                      textareaDisabled={isDisabledBox(data.name)}
                      textareaHeight={40}
                      textareaName={data.name}
                      textareaOnChange={onChangeTextArea}
                      textareaPlaceHolder="'---'는 상담원 이름으로 치환됩니다."
                      textareaSize={13}
                      textareaValue={String(boxValue(data.name))}
                      textareaWidth={200}
                      textSize={13}
                      textValue={data.value}
                    />
                  );
                })}
              </>
            )}
        </StyledUserInfo>
        {userData && userData.admin_id === USER_TYPE.CONSULTANT ? (
          <>
            <StyledStatus>
              {userData.zibox ? (
                <StyledZibox>
                  <ZiboxData data={userData.zibox!} />
                </StyledZibox>
              ) : null}
              {userData.phone ? (
                <StyledPhone>
                  <PhoneData data={userData.phone!} />
                </StyledPhone>
              ) : null}
            </StyledStatus>
          </>
        ) : null}
      </StyledContent>
      <StyledFooter>
        {/* {userData && userData.admin_id === USER_TYPE.CONSULTANT ? (
          <Button
            width={10}
            height={2.6}
            bgColor={Colors.red}
            onClick={() => {
              onClickDisconnect(userData?.number!);
            }}
            customStyle="float:left;"
          >
            <Text
              fontColor={Colors.white}
              fontFamily="NanumBarunGothic"
              fontSize={14}
              fontWeight={700}
            >
              연결 끊기
            </Text>
          </Button>
        ) : null} */}
        {loginData.admin_id === USER_TYPE.CONSULTANT ? null : (
          <Button
            bgColor={
              constants.COMPANY === COMPANY_TYPE.DBLIFE
                ? Colors.green1
                : constants.COMPANY === COMPANY_TYPE.LINA
                ? Colors.blue1
                : Colors.blue4
            }
            customStyle="float:right;"
            height={2.6}
            onClick={setUserData}
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

interface UserDataProps {
  loginData: LoginData;
  isVisible?: boolean;
  userData?: UserDataV2;
  onClickDisconnect: OnClickDisconnect;
  onClickVisible: TOnClickVisible;
  onClickAddUser?: TOnClickAddUser;
  onClickModifyUser?: TOnClickModifyUser;
}

UserData.defaultProps = {};

export default UserData;
