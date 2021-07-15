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
import { TeamInfo, BranchInfo } from 'modules/types/branch';
import { ConsultantInfo, UserData as UserDataV2, UserInfo } from 'types/user';
import { Colors } from 'utils/color';
import constants, { COMPANY_TYPE, USER_TYPE } from 'utils/constants';
import { formatPhoneNumber } from 'utils/utils';
import Utils from 'utils/new_utils';
import { OnClickAddUser } from 'hooks/useUser';

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
  adminId,
  adminList,
  branchId,
  branchName,
  isVisible,
  onClickAddUser,
  onClickUpdateUser,
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

  const {
    userBranches,
    userTeams,
    getUserBranches,
    getUserTeams,
    initUserBranchList,
  } = useOrganization();

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

  const setUserData = useCallback(() => {
    if (userData!.id) {
      // 추가
      const id = form.admin === USER_TYPE.CONSULTANT ? undefined : form.id;
      const number =
        form.admin === USER_TYPE.CONSULTANT ? undefined : form.number;
      const ip =
        form.admin === USER_TYPE.CONSULTANT ? undefined : form.zibox_ip;
      const mac =
        form.admin === USER_TYPE.CONSULTANT ? undefined : form.zibox_mac;
      const mic =
        form.admin === USER_TYPE.CONSULTANT ? undefined : form.zibox_mic;
      const spk =
        form.admin === USER_TYPE.CONSULTANT ? undefined : form.zibox_spk;

      onClickAddUser!(
        form.branch,
        form.team,
        form.admin,
        form.name,
        id,
        number,
        ip,
        mac,
        mic,
        spk,
      );
    } else {
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
    onClickAddUser,
    userData,
  ]);

  // const validateInput = useCallback(() => {
  //   if (adminId === 2) {
  //     // 슈퍼관리자일 경우
  //     if (form.branch === -1 || form.team === -1) {
  //       alert('지점명과 팀명을 선택해주세요.');
  //       return false;
  //     }

  //     if (form.admin === 0) {
  //       // 상담원으로 추가/수정 할 경우
  //       if (!form.name.trim() || !form.tel.trim()) {
  //         alert('빈란 없이 입력해주세요.');
  //         return false;
  //       }
  //       return true;
  //     } else if (form.admin === 1) {
  //       // 관리자일 경우
  //       if (!form.name.trim() || !form.id.trim()) {
  //         alert('빈란 없이 입력해주세요.');
  //         return false;
  //       }
  //       return true;
  //     }
  //     return false;
  //   } else if (adminId === 1) {
  //     // 일반 관리자
  //     if (form.team === -1) {
  //       alert('팀명을 선택해주세요.');
  //       return false;
  //     }

  //     if (form.admin === 0) {
  //       // 상담원으로 추가/수정 할 경우
  //       if (!form.name.trim() || !form.tel.trim()) {
  //         alert('빈란 없이 입력해주세요.');
  //         return false;
  //       }
  //       return true;
  //     } else if (form.admin === 1) {
  //       // 관리자일 경우
  //       if (!form.name.trim() || !form.id.trim()) {
  //         alert('빈란 없이 입력해주세요.');
  //         return false;
  //       }
  //       return true;
  //     }

  //     return false;
  //   }
  // }, [
  //   adminId,
  //   form.id,
  //   form.branch,
  //   form.admin,
  //   form.name,
  //   form.team,
  //   form.tel,
  // ]);

  useEffect(() => {
    if (isVisible) {
      if (adminId === USER_TYPE.SUPER_ADMIN) {
        getUserBranches();
      } else {
        // 일반 사용자일 경우 지점을 선택할 수 없음
        initUserBranchList(branchId!, branchName);
      }
    }
  }, [
    adminId,
    branchId,
    branchName,
    getUserBranches,
    initUserBranchList,
    isVisible,
  ]);

  useEffect(() => {
    if (isVisible) {
      if (adminId === USER_TYPE.SUPER_ADMIN) {
        getUserTeams(form.branch);
      } else {
        getUserTeams(branchId!);
      }
    }
  }, [adminId, branchId, form.branch, getUserTeams, isVisible]);

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
                    defaultValue={
                      data.id === 0
                        ? Number(form.branch)
                        : data.id === 1
                        ? Number(form.team)
                        : data.id === 2
                        ? Number(form.admin)
                        : -1
                    }
                    list={
                      data.id === 0
                        ? branches
                        : data.id === 1
                        ? teams
                        : data.id === 2
                        ? adminList
                        : []
                    }
                    name={data.name}
                    onChange={onChangeSelect}
                    selectHeight={26}
                    selectWidth={108}
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
                    customStyle="float:right;"
                    disabled={
                      data.name === 'name'
                        ? false
                        : data.name === 'id'
                        ? form.admin === USER_TYPE.CONSULTANT
                        : form.admin !== USER_TYPE.CONSULTANT
                    }
                    fontSize={13}
                    height={2.6}
                    inputWidth={
                      data.name === 'zibox_ip' || data.name === 'zibox_mac'
                        ? 18.8
                        : 10.8
                    }
                    name={data.name}
                    onChange={onChangeInput}
                    textValue={data.value}
                    value={
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
                    inputMaxLength={data.name === 'zibox_mac' ? 17 : 0}
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
                    rangeDisable={form.admin !== USER_TYPE.CONSULTANT}
                    rangeName={data.name}
                    rangeValue={
                      data.name === 'zibox_mic'
                        ? String(form.zibox_mic)
                        : data.name === 'zibox_spk'
                        ? String(form.zibox_spk)
                        : ''
                    }
                    textValue={data.value}
                    onChangeRange={(e) => {
                      console.log('LEFT');
                    }}
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
          customStyle={`
            float:right;
          `}
          height={2.6}
          onClick={(e) => {
            // if (userData! && userData!.id) {
            //   // 수정
            //   if (validateInput()) {
            //     onClickUpdateUser!(
            //       userData!.id,
            //       form!.branch === -1 ? branchId! : form!.branch,
            //       form.team,
            //       form.admin,
            //       form.name,
            //       form.id,
            //       '',
            //       form.tel,
            //       form.zibox_ip,
            //       Number(form.mic),
            //       Number(form.spk),
            //     );
            //     onClickVisible();
            //   }
            // } else {
            //   // 추가
            //   if (validateInput()) {
            //     onClickInsertUser!(
            //       form!.branch === -1 ? branchId! : form!.branch,
            //       form.team,
            //       form.admin,
            //       form.name,
            //       form.id,
            //       '',
            //       form.tel,
            //       form.zibox_ip,
            //     );
            //     // initValue(initialized);
            //     onClickVisible();
            //   }
            // }
          }}
          width={7}
        >
          <Text
            fontColor={Colors.white}
            fontFamily={'NanumBarunGothic'}
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
          onClick={(e) => {
            onClickVisible();
            if (userData && !userData!.id) {
              // initValue(initialized);
            } else {
              // initValue(initialized);
            }
          }}
          customStyle={`
            float:right;
            margin-right: 10px;
          `}
        >
          <Text
            fontColor={Colors.white}
            fontFamily={'NanumBarunGothic'}
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
  adminId?: number;
  branchId?: number;
  branchName?: string;
  isVisible?: boolean;
  adminList: Array<SelectDataType>;
  userData?: UserDataV2;
  onClickVisible: () => void;
  onClickAddUser?: OnClickAddUser;
  onClickUpdateUser?: (
    id: number,
    branchId: number,
    teamId: number,
    admin: number,
    name: string,
    userId: string,
    password: string,
    tel: string,
    ip: string,
    mic: number,
    spk: number,
  ) => void;
}

interface SelectDataType {
  id: number;
  data: string;
}

UserData.defaultProps = {};

export default UserData;
