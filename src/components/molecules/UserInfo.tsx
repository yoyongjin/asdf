import React, { useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { Button } from 'components/atoms';
import { Title, TextInput, TextSelect } from 'components/molecules';
import { COLORS } from 'utils/color';
import { formatPhoneNumber } from 'utils/utils';
import useInputForm from 'hooks/useInputForm';
import {
  UserInfo as UserInfoType,
  ConsultantInfoType,
} from 'modules/types/user';
import useBranch from 'hooks/useBranch';

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
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
  align-content: flex-start;
  /* align-content: space-around; */
  border-bottom: 0.05rem solid ${COLORS.green};
  padding-top: 1rem;
  padding-bottom: 1rem;
`;

const StyledFooter = styled.div`
  width: 100%;
  height: 10%;
  padding-top: 1rem;
`;

function UserInfo({
  onClickVisible,
  onClickInsertUser,
  onClickUpdateUser,
  adminList,
  data,
  isVisible,
  branchId,
  branchName,
  adminType,
}: UserInfoProps) {
  const initialized = useMemo(() => {
    return {
      branch: data! && data!.branch_id ? String(data!.branch_id) : '-1',
      team: data! && data!.team_id ? String(data!.team_id) : '-1',
      admin: data! && data!.admin_id >= 0 ? String(data!.admin_id) : '0',
      name: data! && data!.name ? data!.name : '',
      id: data! && data!.user_name ? data!.user_name : '',
      password: '',
      tel: data! && data!.number ? data!.number : '',
      zibox: data! && data!.ziboxip ? data!.ziboxip : '',
    };
  }, [data]);

  const { form, onChange, onChangeSelect, initValue } = useInputForm(
    initialized,
  );
  const {
    userBranchList,
    userTeamList,
    getUserBranchList,
    getUserTeamList,
    initUserBranchList,
  } = useBranch();

  useEffect(() => {
    if (isVisible && adminType === 2) {
      getUserBranchList();
    } else if (isVisible) {
      initUserBranchList(branchId!, branchName);
    }
  }, [
    isVisible,
    adminType,
    branchId,
    branchName,
    initUserBranchList,
    getUserBranchList,
  ]);

  useEffect(() => {
    if (isVisible && adminType === 2) {
      console.log(form.branch);
      getUserTeamList(Number(form.branch));
    } else if (isVisible) {
      getUserTeamList(branchId!);
    }
  }, [isVisible, adminType, getUserTeamList, form.branch, branchId]);

  useEffect(() => {
    initValue(initialized);
  }, [initValue, initialized]);

  let branch: Array<SelectDataType> = [];
  let team: Array<SelectDataType> = [];

  // let branch_name = '';
  // let team_name = '';

  if (userBranchList!.length > 0) {
    let temp1 = userBranchList as Array<BranchInfo>;
    branch = temp1.map((value) => {
      let data = {
        id: value.id,
        data: value.branch_name,
      };
      // if (value.id === Number(form.branch)) {
      //   branch_name = value.branch_name;
      // }
      return data;
    });
  }
  if (userTeamList!.length > 0) {
    let temp2 = userTeamList as Array<TeamInfo>;
    team = temp2.map((value) => {
      let data = {
        id: value.id,
        data: value.team_name,
      };
      // if (value.id === Number(form.team)) {
      //   team_name = value.team_name;
      // }
      return data;
    });
  }
  return (
    <StyledWrapper>
      <StyledTitle>
        <Title fontSize={18}>사용자 정보</Title>
      </StyledTitle>
      <StyledContent>
        <TextSelect
          defaultValue={Number(form.branch)}
          // defaultOption={'지점명'}
          textValue={'지점명'}
          name={'branch'}
          list={branch}
          onChange={onChangeSelect}
        ></TextSelect>
        <TextSelect
          defaultValue={Number(form.team)}
          // defaultOption={team_name || '팀명'}
          textValue={'팀명'}
          name={'team'}
          list={team}
          onChange={(e) => onChangeSelect(e, 'team', form.branch)}
        ></TextSelect>
        <TextSelect
          defaultValue={Number(form.admin)}
          textValue={'권한'}
          name={'admin'}
          list={adminList}
          onChange={onChangeSelect}
        ></TextSelect>
        <TextInput
          customStyle={`float:right;`}
          height={22.5}
          textValue={'이름'}
          onChange={onChange}
          name={'name'}
          value={form.name}
          fontSize={0.81}
        ></TextInput>
        <TextInput
          customStyle={`float:right;`}
          height={22.5}
          textValue={'아이디'}
          onChange={onChange}
          name={'id'}
          value={form.id}
          fontSize={0.81}
          disabled={form.admin === '0'}
        ></TextInput>
        <TextInput
          customStyle={`float:right;`}
          height={22.5}
          type={'password'}
          textValue={'비밀번호'}
          onChange={onChange}
          name={'password'}
          value={form.password}
          fontSize={0.81}
          disabled={form.admin === '0'}
        ></TextInput>
        <TextInput
          customStyle={`float:right;`}
          padRight={2}
          height={22.5}
          textValue={'전화번호'}
          onChange={onChange}
          name={'tel'}
          value={formatPhoneNumber(form.tel)}
          fontSize={0.81}
        ></TextInput>
        <TextInput
          customStyle={`float:right;`}
          height={22.5}
          textValue={'ZiBox IP 직접 입력하기'}
          onChange={onChange}
          name={'zibox'}
          value={form.zibox}
          fontSize={0.81}
          disabled={form.admin !== '0'}
        ></TextInput>
      </StyledContent>
      <StyledFooter>
        <Button
          width={4.3}
          height={1.6}
          bgColor={COLORS.green}
          customStyle={`
            float:right;
          `}
          onClick={(e) => {
            if (data! && data!.id) {
              if (form.admin === '1') {
                // 관리자일 경우
                if (
                  form.team === '-1' ||
                  !form.name ||
                  !form.id ||
                  !form.password ||
                  !form.tel
                ) {
                  alert('빈란 없이 입력해주세요.');
                  return;
                }
              } else if (form.admin === '0') {
                // 상담원일 경우
                if (
                  form.team === '-1' ||
                  !form.name ||
                  !form.tel ||
                  !form.zibox
                ) {
                  alert('빈란 없이 입력해주세요.');
                  return;
                }
              } else if (form.admin === '2') {
                // 슈퍼관리자일 경우
                if (
                  (form.branch === '-1',
                  form.team === '-1' ||
                    !form.name ||
                    !form.id ||
                    !form.password ||
                    !form.tel)
                ) {
                  alert('빈란 없이 입력해주세요.');
                  return;
                }
              }

              onClickUpdateUser!(
                String(data!.id),
                String(form.branch === '-1' ? String(branchId) : form.branch),
                String(form.team),
                String(form.admin),
                form.name,
                form.id,
                form.password,
                form.tel,
                form.zibox,
              );
              onClickVisible();
            } else {
              if (form.admin === '1') {
                // 관리자일 경우
                if (
                  form.team === '-1' ||
                  !form.name ||
                  !form.id ||
                  !form.password ||
                  !form.tel
                ) {
                  alert('빈란 없이 입력해주세요.');
                  return;
                }
              } else if (form.admin === '0') {
                // 상담원일 경우
                if (
                  form.team === '-1' ||
                  !form.name ||
                  !form.tel ||
                  !form.zibox
                ) {
                  alert('빈란 없이 입력해주세요.');
                  return;
                }
              } else if (form.admin === '2') {
                // 슈퍼관리자일 경우
                if (
                  (form.branch === '-1',
                  form.team === '-1' ||
                    !form.name ||
                    !form.id ||
                    !form.password ||
                    !form.tel)
                ) {
                  alert('빈란 없이 입력해주세요.');
                  return;
                }
              }

              onClickInsertUser!(
                String(form.branch === '-1' ? String(branchId) : form.branch),
                String(form.team),
                String(form.admin),
                form.name,
                form.id,
                form.password,
                form.tel,
                form.zibox,
              );
              initValue(initialized);
              onClickVisible();
            }
          }}
        >
          저장
        </Button>
        <Button
          width={4.3}
          height={1.6}
          bgColor={COLORS.dark_gray1}
          onClick={(e) => {
            onClickVisible();
            if (data && !data!.id) {
              // const init = {
              //   branch: '-1',
              //   team: '-1',
              //   admin: '0',
              //   name: '',
              //   id: '',
              //   password: '',
              //   tel: '',
              //   zibox: '',
              // };

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
          취소
        </Button>
      </StyledFooter>
    </StyledWrapper>
  );
}

interface UserInfoProps {
  onClickVisible: () => void;
  onClickInsertUser?: (
    branchId: string,
    teamId: string,
    admin: string,
    name: string,
    userId: string,
    password: string,
    tel: string,
    ip: string,
  ) => void;
  onClickUpdateUser?: (
    id: string,
    branchId: string,
    teamId: string,
    admin: string,
    name: string,
    userId: string,
    password: string,
    tel: string,
    ip: string,
  ) => void;
  branchId?: number;
  branchName?: string;
  adminType?: number;
  isVisible?: boolean;
  adminList: Array<SelectDataType>;
  data?: UserInfoType | ConsultantInfoType;
}

interface SelectDataType {
  id: number;
  data: string;
}

interface BranchInfo {
  branch_name: string;
  created_at: string;
  id: number;
}

interface TeamInfo {
  branch_id: number;
  id: number;
  team_name: string;
}

UserInfo.defaultProps = {};

export default React.memo(UserInfo);
