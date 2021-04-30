import React, { useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';

import { Button, Text } from 'components/atoms';
import {
  Title,
  TextInput,
  TextSelect,
  ZiboxData,
  PhoneData,
} from 'components/molecules';
import { Colors, COLORS } from 'utils/color';
import { formatPhoneNumber } from 'utils/utils';
import useInputForm from 'hooks/useInputForm';
import { ConsultantInfo, UserInfo } from 'types/user';
import { TeamInfo, BranchInfo } from 'modules/types/branch';
import useBranch from 'hooks/useBranch';

import { company, COMPANY_MAP } from 'utils/constants';

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
    ${company === COMPANY_MAP.DBLIFE ? COLORS.green : COLORS.light_blue};
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
    ${company === COMPANY_MAP.LINA ? COLORS.blue : COLORS.light_blue};
`;

function UserData({
  onClickVisible,
  onClickInsertUser,
  onClickUpdateUser,
  onClickDisconnect,
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
      zibox: data && data!.ziboxip ? data!.ziboxip : '',
      mic: data && data!.ziboxmic ? data!.ziboxmic : 0,
      spk: data && data!.ziboxspk ? data!.ziboxspk : 0,
    };
  }, [data]);

  const { form, onChangeInput, onChangeSelect, initValue } = useInputForm(
    initialized,
  );

  const {
    userBranchList,
    userTeamList,
    getUserBranchList,
    getUserTeamList,
    initUserBranchList,
  } = useBranch();

  const branch = useMemo(() => {
    let branch: Array<SelectDataType> = [];
    if (userBranchList!.length > 0) {
      let temp = userBranchList as Array<BranchInfo>;
      branch = temp.map((value) => {
        let data = {
          id: value.id,
          data: value.branch_name,
        };

        return data;
      });
    }
    return branch;
  }, [userBranchList]);

  const team = useMemo(() => {
    let team: Array<SelectDataType> = [];

    if (userTeamList!.length > 0) {
      let temp2 = userTeamList as Array<TeamInfo>;
      team = temp2.map((value) => {
        let data = {
          id: value.id,
          data: value.team_name,
        };

        return data;
      });
    }

    return team;
  }, [userTeamList]);

  useEffect(() => {
    if (isVisible && adminId === 2) {
      getUserBranchList();
    } else if (isVisible) {
      initUserBranchList(branchId!, branchName);
    }
  }, [
    adminId,
    branchId,
    branchName,
    isVisible,
    getUserBranchList,
    initUserBranchList,
  ]);

  useEffect(() => {
    if (isVisible && adminId === 2) {
      getUserTeamList(form.branch);
    } else if (isVisible) {
      getUserTeamList(branchId!);
    }
  }, [isVisible, adminId, getUserTeamList, form.branch, branchId]);

  useEffect(() => {
    console.log(initialized);
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
        <Title fontSize={1.13}>사용자 정보</Title>
      </StyledTitle>
      <StyledContent>
        <StyledUserInfo>
          <TextSelect
            defaultValue={form.branch}
            // defaultOption={'지점명'}
            textValue={'지점명'}
            name={'branch'}
            list={branch}
            onChange={(e) => onChangeSelect(e)}
          />
          <TextSelect
            defaultValue={form.team}
            // defaultOption={team_name || '팀명'}
            textValue={'팀명'}
            name={'team'}
            list={team}
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
          />
          <TextInput
            customStyle={`float:right;`}
            height={1.63}
            textValue={'이름'}
            onChange={onChangeInput}
            name={'name'}
            value={form.name}
            fontSize={0.81}
          />
          <TextInput
            customStyle={`float:right;`}
            height={1.63}
            textValue={'아이디'}
            onChange={onChangeInput}
            name={'id'}
            value={form.id}
            fontSize={0.81}
            disabled={form.admin === 0}
          />
          <TextInput
            customStyle={`float:right;`}
            height={1.63}
            type={'password'}
            textValue={'비밀번호'}
            onChange={onChangeInput}
            name={'password'}
            value={form.password}
            fontSize={0.81}
            disabled={form.admin === 0}
          />
          <TextInput
            customStyle={`float:right;`}
            padRight={2}
            height={1.63}
            textValue={'전화번호'}
            onChange={onChangeInput}
            name={'tel'}
            value={formatPhoneNumber(form.tel)}
            fontSize={0.81}
            disabled={form.admin !== 0}
          />
          <TextInput
            customStyle={`float:right;`}
            height={1.63}
            textValue={'ZiBox IP 직접 입력하기'}
            onChange={onChangeInput}
            name={'zibox'}
            value={form.zibox}
            fontSize={0.81}
            disabled={form.admin !== 0}
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

            <Button
              width={8}
              height={1.63}
              bgColor={COLORS.red}
              onClick={() => onClickDisconnect!(data.number)}
            >
              <Text
                fontColor={COLORS.white}
                fontFamily={'NanumBarunGothic'}
                fontSize={0.88}
                fontWeight={700}
              >
                연결 끊기
              </Text>
            </Button>
          </>
        ) : null}
      </StyledContent>
      <StyledFooter>
        <Button
          width={4.3}
          height={1.63}
          bgColor={
            company === COMPANY_MAP.DBLIFE
              ? COLORS.green
              : company === COMPANY_MAP.LINA
              ? COLORS.blue
              : COLORS.light_blue2
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
                  form.zibox,
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
                  form.zibox,
                );
                initValue(initialized);
                onClickVisible();
              }
            }
          }}
        >
          <Text
            fontColor={COLORS.white}
            fontFamily={'NanumBarunGothic'}
            fontSize={0.88}
            fontWeight={700}
          >
            저장
          </Text>
        </Button>
        <Button
          width={4.3}
          height={1.6}
          bgColor={COLORS.dark_gray1}
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
            fontColor={COLORS.white}
            fontFamily={'NanumBarunGothic'}
            fontSize={0.88}
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
  onClickDisconnect?: (number: string) => void;
}

interface SelectDataType {
  id: number;
  data: string;
}

UserData.defaultProps = {};

export default UserData;