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
} from 'components/molecules';
import useOrganization from 'hooks/useOrganization';
import useInputForm from 'hooks/useInputForm';
import { UserData as UserDataV2 } from 'types/user';
import { Colors } from 'utils/color';
import constants, { COMPANY_TYPE, REG_EXR, USER_TYPE } from 'utils/constants';
import Utils from 'utils/new_utils';
import { OnClickAddUser, OnClickModifyUser } from 'hooks/useUser';
import { LoginData } from 'types/auth';
import { OnClickVisible } from 'hooks/useVisible';

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
  height: 40%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  align-content: flex-start;
  /* align-content: space-around; */
  border-bottom: 0.05rem solid
    ${constants.COMPANY === COMPANY_TYPE.DBLIFE ? Colors.green1 : Colors.blue3};
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const StyledStatus = styled.div`
  display: flex;
  height: 60%;
`;

const StyledZibox = styled.div`
  width: 50%;
  padding-top: 16px;
`;

const StyledPhone = styled.div`
  width: 50%;
  padding-top: 16px;
`;

const StyledFooter = styled.div`
  width: 100%;
  height: 10%;
  padding-top: 1rem;
  border-top: 0.05rem solid
    ${constants.COMPANY === COMPANY_TYPE.LINA ? Colors.blue1 : Colors.blue3};
`;

const defaultSelectData = [
  { id: 0, name: 'branch', value: '지점명' },
  { id: 1, name: 'team', value: '팀명' },
  { id: 2, name: 'admin', value: '권한' },
];

const defaultInputData = [
  { id: 0, name: 'name', value: '이름' },
  { id: 1, name: 'id', value: '아이디' },
  { id: 2, name: 'number', value: '전화번호' },
  { id: 3, name: 'zibox_ip', value: 'ZiBox IP' },
  { id: 4, name: 'zibox_mac', value: 'ZiBox MAC' },
];

const defaultRangeData = [
  { id: 0, name: 'zibox_mic', value: 'ZiBox MIC' },
  { id: 1, name: 'zibox_spk', value: 'ZiBox SPK' },
];

function UserData({
  adminList,
  loginData,
  isVisible,
  onClickAddUser,
  onClickModifyUser,
  onClickVisible,
  userData,
}: UserDataProps) {
  const initializedData = useMemo(() => {
    return {
      branch: userData?.branch_id ? userData!.branch_id : -1,
      team: userData?.team_id ? userData!.team_id : -1,
      admin: userData?.admin_id ? userData!.admin_id : 0,
      name: userData?.name ? userData!.name : '',
      id: userData?.user_name ? userData!.user_name : '',
      number: userData?.number ? userData!.number : '',
      zibox_ip: userData?.zibox_ip ? userData!.zibox_ip : '',
      zibox_mac: userData?.zibox_mac ? userData!.zibox_mac : '',
      zibox_mic: userData?.zibox_mic ? userData!.zibox_mic : 0,
      zibox_spk: userData?.zibox_spk ? userData!.zibox_spk : 0,
    };
  }, [userData]);

  const { form, onChangeInput, onChangeSelect, setInitializedForm } =
    useInputForm(initializedData);

  const { userBranches, userTeams, getUserBranches, getUserTeams } =
    useOrganization();

  const branches = useMemo(() => {
    return userBranches!.map((values) => {
      return {
        id: values.id,
        data: values.branch_name,
      };
    });
  }, [userBranches]);

  const teams = useMemo(() => {
    return userTeams!.map((values) => {
      return {
        id: values.id,
        data: values.team_name,
      };
    });
  }, [userTeams]);

  const validateForm = useCallback(
    (
      branchId: number,
      teamId: number,
      adminId: number,
      name: string,
      id?: string,
      number?: string,
      ip?: string,
      mac?: string,
    ) => {
      if (branchId === -1) {
        alert('지점을 선택해주세요.');

        return false;
      }

      if (teamId === -1) {
        alert('팀을 선택해주세요.');

        return false;
      }

      if (!name || !name.trim()) {
        alert('이름은 필수 입력값입니다.');

        return false;
      }

      if (id && !REG_EXR.id.test(id)) {
        alert('관리자 ID는 숫자와 영어만 입력가능합니다.');

        return false;
      }

      if (ip && !REG_EXR.ip.test(ip)) {
        alert('IP주소 형식에 맞게 입력해주세요.');

        return false;
      }

      if (mac && !REG_EXR.mac.test(mac)) {
        alert('MAC주소 형식에 맞게 입력해주세요.');

        return false;
      }

      return true;
    },
    [],
  );

  const setUserData = useCallback(() => {
    const branchId =
      loginData.admin_id === USER_TYPE.SUPER_ADMIN
        ? form.branch
        : loginData.branch_id;

    const teamId = form.team;
    const adminId = form.admin;
    const name = form.name;
    const id = form.admin === USER_TYPE.CONSULTANT ? undefined : form.id;
    const number =
      form.admin === USER_TYPE.CONSULTANT ? form.number : undefined;
    const ip = form.admin === USER_TYPE.CONSULTANT ? form.zibox_ip : undefined;
    const mac =
      form.admin === USER_TYPE.CONSULTANT ? form.zibox_mac : undefined;
    const mic =
      form.admin === USER_TYPE.CONSULTANT ? form.zibox_mic : undefined;
    const spk =
      form.admin === USER_TYPE.CONSULTANT ? form.zibox_spk : undefined;

    const isSuccess = validateForm(
      branchId,
      teamId,
      adminId,
      name,
      id,
      number,
      ip,
      mac,
    );

    if (!isSuccess) {
      // validate check 실패
      return;
    }

    if (userData && userData!.id) {
      onClickModifyUser!(
        userData.id,
        branchId,
        teamId,
        adminId,
        name,
        id,
        number,
        ip,
        mac,
        mic,
        spk,
      );
    } else {
      // 추가
      onClickAddUser!(
        branchId,
        teamId,
        adminId,
        name,
        id,
        number,
        ip,
        mac,
        mic,
        spk,
      );
    }
  }, [
    form.admin,
    form.branch,
    form.id,
    form.name,
    form.number,
    form.team,
    form.zibox_ip,
    form.zibox_mac,
    form.zibox_mic,
    form.zibox_spk,
    loginData.admin_id,
    loginData.branch_id,
    onClickAddUser,
    onClickModifyUser,
    userData,
    validateForm,
  ]);

  useEffect(() => {
    if (isVisible) {
      getUserBranches();
    }
  }, [
    getUserBranches,
    isVisible,
    loginData.admin_id,
    loginData.branch_id,
    loginData.branch_name,
  ]);

  useEffect(() => {
    if (isVisible) {
      if (loginData.admin_id === USER_TYPE.SUPER_ADMIN) {
        getUserTeams(form.branch);
      } else {
        getUserTeams(loginData.branch_id!);
      }
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

  return (
    <StyledWrapper>
      <StyledTitle>
        <Title>사용자 정보</Title>
      </StyledTitle>
      <StyledContent>
        <StyledUserInfo>
          {
            <>
              {defaultSelectData.map((data, index) => {
                return (
                  <TextSelect
                    selectDisabled={
                      data.name === 'branch' &&
                      loginData.admin_id !== USER_TYPE.SUPER_ADMIN
                        ? true
                        : false
                    }
                    selectDefaultValue={
                      data.name === 'branch'
                        ? Number(form.branch)
                        : data.name === 'team'
                        ? Number(form.team)
                        : data.name === 'admin'
                        ? Number(form.admin)
                        : -1
                    }
                    selectHeight={26}
                    selectName={data.name}
                    selectOnChange={onChangeSelect}
                    selectOptions={
                      data.name === 'branch'
                        ? branches
                        : data.name === 'team'
                        ? teams
                        : data.name === 'admin'
                        ? adminList
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
              {defaultInputData.map((data, index) => {
                return (
                  <TextInput
                    inputCustomStyle="float:right;"
                    inputDisabled={
                      data.name === 'name'
                        ? false
                        : data.name === 'zibox_ip'
                        ? true
                        : data.name === 'id'
                        ? form.admin === USER_TYPE.CONSULTANT
                        : form.admin !== USER_TYPE.CONSULTANT
                    }
                    inputHeight={2.6}
                    inputMaxLength={
                      data.name === 'number'
                        ? 13
                        : data.name === 'zibox_ip'
                        ? 15
                        : data.name === 'zibox_mac'
                        ? 17
                        : 0
                    }
                    inputName={data.name}
                    inputOnChange={onChangeInput}
                    inputSize={13}
                    inputValue={
                      data.name === 'name'
                        ? form.name
                        : data.name === 'id'
                        ? form.id
                        : data.name === 'number'
                        ? Utils.formatPhoneNumber(form.number)
                        : data.name === 'zibox_ip'
                        ? form.zibox_ip
                        : data.name === 'zibox_mac'
                        ? Utils.formatMacAddress(form.zibox_mac)
                        : ''
                    }
                    inputWidth={
                      data.name === 'zibox_ip' || data.name === 'zibox_mac'
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
              {defaultRangeData.map((data, index) => {
                return (
                  <TextRange
                    rangeDisable={
                      data.name === 'zibox_mic'
                        ? true
                        : form.admin !== USER_TYPE.CONSULTANT
                    }
                    rangeName={data.name}
                    rangeValue={
                      data.name === 'zibox_mic'
                        ? String(form.zibox_mic)
                        : data.name === 'zibox_spk'
                        ? String(form.zibox_spk)
                        : ''
                    }
                    textValue={data.value}
                    onChangeRange={onChangeInput}
                  />
                );
              })}
            </>
          }
        </StyledUserInfo>
        {/* {data && data.admin_id === 0 ? (
          <>
            <StyledStatus>
              {data.zibox ? (
                <StyledZibox>
                  <ZiboxData data={data.zibox!} />
                </StyledZibox>
              ) : null}

              {data.phone ? (
                <StyledPhone>
                  <PhoneData data={data.phone!} />
                </StyledPhone>
              ) : null}
            </StyledStatus>
          </>
        ) : null} */}
      </StyledContent>
      <StyledFooter>
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
  adminList: Array<SelectDataType>;
  loginData: LoginData;
  isVisible?: boolean;
  userData?: UserDataV2;
  onClickVisible: OnClickVisible;
  onClickAddUser?: OnClickAddUser;
  onClickModifyUser?: OnClickModifyUser;
}

interface SelectDataType {
  id: number;
  data: string;
}

UserData.defaultProps = {};

export default UserData;
