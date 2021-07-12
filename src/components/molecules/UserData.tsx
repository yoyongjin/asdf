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
import { ConsultantInfo, UserInfo } from 'types/user';
import { Colors } from 'utils/color';
import constants, { COMPANY_TYPE, USER_TYPE } from 'utils/constants';
import { formatPhoneNumber } from 'utils/utils';

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

function UserData({
  onClickVisible,
  onClickInsertUser,
  onClickUpdateUser,
  adminList,
  data,
  isVisible,
  branchId,
  branchName,
  adminId,
}: UserDataProps) {
  const initialized = useMemo(() => {
    return {
      branch: data && data!.branch_id ? data!.branch_id : -1,
      team: data && data!.team_id ? data!.team_id : -1,
      admin: data && data!.admin_id >= 0 ? data!.admin_id : 0,
      name: data && data!.name ? data!.name : '',
      id: data && data!.user_name ? data!.user_name : '',
      password: '',
      tel: data && data!.number ? data!.number : '',
      zibox_ip: data && data!.ziboxip ? data!.ziboxip : '',
      zibox_mac: data && data!.ziboxip ? data!.ziboxip : '',
      mic: data && data!.ziboxmic ? data!.ziboxmic : 0,
      spk: data && data!.ziboxspk ? data!.ziboxspk : 0,
    };
  }, [data]);

  const { form, onChangeInput, onChangeSelect, initValue } =
    useInputForm(initialized);

  const {
    userBranches,
    userTeams,
    getUserBranches,
    getUserTeams,
    initUserBranchList,
  } = useOrganization();

  const branch = useMemo(() => {
    let branch: Array<SelectDataType> = [];
    if (userBranches!.length > 0) {
      let temp = userBranches as Array<BranchInfo>;
      branch = temp.map((value) => {
        let data = {
          id: value.id,
          data: value.branch_name,
        };

        return data;
      });
    }
    return branch;
  }, [userBranches]);

  const team = useMemo(() => {
    let team: Array<SelectDataType> = [];

    if (userTeams!.length > 0) {
      let temp2 = userTeams as Array<TeamInfo>;
      team = temp2.map((value) => {
        let data = {
          id: value.id,
          data: value.team_name,
        };

        return data;
      });
    }

    return team;
  }, [userTeams]);

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
    initValue(initialized);
  }, [initialized, initValue]);

  const validateInput = useCallback(() => {
    if (adminId === 2) {
      // 슈퍼관리자일 경우
      if (form.branch === -1 || form.team === -1) {
        alert('지점명과 팀명을 선택해주세요.');
        return false;
      }

      if (form.admin === 0) {
        // 상담원으로 추가/수정 할 경우
        if (!form.name.trim() || !form.tel.trim()) {
          alert('빈란 없이 입력해주세요.');
          return false;
        }
        return true;
      } else if (form.admin === 1) {
        // 관리자일 경우
        if (!form.name.trim() || !form.id.trim()) {
          alert('빈란 없이 입력해주세요.');
          return false;
        }
        return true;
      }
      return false;
    } else if (adminId === 1) {
      // 일반 관리자
      if (form.team === -1) {
        alert('팀명을 선택해주세요.');
        return false;
      }

      if (form.admin === 0) {
        // 상담원으로 추가/수정 할 경우
        if (!form.name.trim() || !form.tel.trim()) {
          alert('빈란 없이 입력해주세요.');
          return false;
        }
        return true;
      } else if (form.admin === 1) {
        // 관리자일 경우
        if (!form.name.trim() || !form.id.trim()) {
          alert('빈란 없이 입력해주세요.');
          return false;
        }
        return true;
      }

      return false;
    }
  }, [
    adminId,
    form.id,
    form.branch,
    form.admin,
    form.name,
    form.team,
    form.tel,
  ]);

  return (
    <StyledWrapper>
      <StyledTitle>
        <Title>사용자 정보</Title>
      </StyledTitle>
      <StyledContent>
        <StyledUserInfo>
          <TextSelect
            defaultValue={form.branch}
            textValue={'지점명'}
            name={'branch'}
            list={branch}
            selectWidth={108}
            selectHeight={26}
            onChange={(e) => onChangeSelect(e)}
          />
          <TextSelect
            defaultValue={form.team}
            textValue={'팀명'}
            name={'team'}
            list={team}
            selectWidth={108}
            selectHeight={26}
            onChange={(e) =>
              onChangeSelect(e, adminId === 1 ? branchId : form.branch)
            }
          />
          <TextSelect
            defaultValue={form.admin}
            textValue={'권한'}
            name={'admin'}
            list={adminList}
            onChange={onChangeSelect}
            selectWidth={108}
            selectHeight={26}
          />
          <TextInput
            customStyle={`float:right;`}
            inputWidth={10.8}
            height={2.6}
            textValue={'이름'}
            onChange={onChangeInput}
            name={'name'}
            value={form.name}
            fontSize={13}
          />
          <TextInput
            customStyle={`float:right;`}
            inputWidth={10.8}
            height={2.6}
            textValue={'아이디'}
            onChange={onChangeInput}
            name={'id'}
            value={form.id}
            fontSize={13}
            disabled={form.admin === 0}
          />
          <TextInput
            customStyle={`float:right;`}
            padRight={2}
            inputWidth={10.8}
            height={2.6}
            textValue={'전화번호'}
            onChange={onChangeInput}
            name={'tel'}
            value={formatPhoneNumber(form.tel)}
            fontSize={13}
            disabled={form.admin !== 0}
          />
          <TextInput
            customStyle={`float:right;`}
            inputWidth={10.8}
            height={2.6}
            textValue={'ZiBox IP'}
            onChange={onChangeInput}
            name={'ziboxip'}
            value={form.zibox_ip}
            fontSize={13}
            disabled={form.admin !== 0}
          />
          <TextInput
            customStyle={`float:right;`}
            inputWidth={10.8}
            height={2.6}
            textValue={'ZiBox MAC'}
            onChange={onChangeInput}
            name={'ziboxmac'}
            value={form.zibox_mac}
            fontSize={13}
            disabled={form.admin === 0}
          />
          <TextRange
            rangeName="test"
            rangeValue="1"
            textValue="ZiBox Mic"
            onChangeRange={(e) => {
              console.log('ESSS');
            }}
          />
          <TextRange
            rangeName="test"
            rangeValue="1"
            textValue="ZiBox Spk"
            onChangeRange={(e) => {
              console.log('ESSS');
            }}
          />
        </StyledUserInfo>
        {data && data.admin_id === 0 ? (
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
        ) : null}
      </StyledContent>
      <StyledFooter>
        <Button
          width={7}
          height={2.6}
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
          onClick={(e) => {
            if (data! && data!.id) {
              // 수정
              if (validateInput()) {
                onClickUpdateUser!(
                  data!.id,
                  form!.branch === -1 ? branchId! : form!.branch,
                  form.team,
                  form.admin,
                  form.name,
                  form.id,
                  form.password,
                  form.tel,
                  form.zibox_ip,
                  Number(form.mic),
                  Number(form.spk),
                );
                onClickVisible();
              }
            } else {
              // 추가
              if (validateInput()) {
                onClickInsertUser!(
                  form!.branch === -1 ? branchId! : form!.branch,
                  form.team,
                  form.admin,
                  form.name,
                  form.id,
                  form.password,
                  form.tel,
                  form.zibox_ip,
                );
                initValue(initialized);
                onClickVisible();
              }
            }
          }}
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
            if (data && !data!.id) {
              initValue(initialized);
            } else {
              initValue(initialized);
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
  data?: UserInfo | ConsultantInfo;
  onClickVisible: () => void;
  onClickInsertUser?: (
    branchId: number,
    teamId: number,
    admin: number,
    name: string,
    userId: string,
    password: string,
    tel: string,
    ip: string,
  ) => void;
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
