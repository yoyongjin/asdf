import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Button } from 'components/atoms';
import { Title, TextInput, TextSelect } from 'components/molecules';
import { COLORS } from 'utils/color';
import useInputForm from 'hooks/useInputForm';
import { UserInfo as UserInfoType } from 'modules/types/user';
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
  // getBranchList,
  // getTeamList,
  // branchList,
  // teamList,
  adminList,
  data,
}: UserInfoProps) {
  const { form, onChange, onChangeSelect, initValue } = useInputForm({
    branch: data! && data!.branch_id ? String(data!.branch_id) : '',
    team: data! && data!.team_id ? String(data!.team_id) : '',
    admin: data! && data!.admin_id ? String(data!.admin_id) : '',
    name: data! && data!.name ? data!.name : '',
    id: data! && data!.user_name ? data!.user_name : '',
    password: '',
    tel: data! && data!.number ? data!.number : '',
    zibox: data! && data!.ziboxip ? data!.ziboxip : '',
  });

  const { userBranchList, userTeamList, getUserBranchList, getUserTeamList } = useBranch()

  useEffect(() => {
    getUserBranchList!();
  }, [getUserBranchList]);

  useEffect(() => {
    if (data && form.branch) {
      getUserTeamList!(Number(form.branch));
    }
  }, [getUserTeamList, form.branch, data]);

  let branch: Array<SelectDataType> = [];
  let team: Array<SelectDataType> = [];

  let branch_name = '';
  let team_name = '';

  if (userBranchList!.length > 0) {
    let temp1 = userBranchList as Array<BranchInfo>;
    branch = temp1.map((value) => {
      let data = {
        id: value.id,
        data: value.branch_name,
      };
      if (value.id === Number(form.branch)) {
        branch_name = value.branch_name;
      }
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
      if (value.id === Number(form.team)) {
        team_name = value.team_name;
      }
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
          defaultValue={'-1'}
          defaultOption={'지점명'}
          textValue={'지점명'}
          name={'branch'}
          list={branch}
          onChange={onChangeSelect}
          // selected={form.branch}
        ></TextSelect>
        <TextSelect
          defaultValue={'0'}
          defaultOption={'팀명'}
          textValue={'팀명'}
          name={'team'}
          list={team}
          onChange={(e) => onChangeSelect(e, 'team', form.branch)}
          // selected={form.team}
        ></TextSelect>
        <TextSelect
          defaultValue={'-1'}
          defaultOption={
            form.admin === '0'
              ? '상담원'
              : form.admin === '1'
              ? '관리자'
              : form.admin === '2'
              ? 'ADMIN'
              : '권한'
          }
          // selected={form.admin}
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
        ></TextInput>
        <TextInput
          customStyle={`float:right;`}
          height={22.5}
          textValue={'아이디'}
          onChange={onChange}
          name={'id'}
          value={form.id}
        ></TextInput>
        <TextInput
          customStyle={`float:right;`}
          height={22.5}
          type={'password'}
          textValue={'비밀번호'}
          onChange={onChange}
          name={'password'}
          value={form.password}
        ></TextInput>
        <TextInput
          customStyle={`float:right;`}
          padRight={2}
          height={22.5}
          textValue={'전화번호'}
          onChange={onChange}
          name={'tel'}
          value={form.tel}
        ></TextInput>
        <TextInput
          customStyle={`float:right;`}
          height={22.5}
          textValue={'Zibox IP 직접 입력하기'}
          onChange={onChange}
          name={'zibox'}
          value={form.zibox}
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
              onClickUpdateUser!(
                String(data!.id),
                String(form.branch),
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
              onClickInsertUser!(
                String(form.branch),
                String(form.team),
                String(form.admin),
                form.name,
                form.id,
                form.password,
                form.tel,
                form.zibox,
              );
              const init = {
                branch: '',
                team: '',
                admin: '',
                name: '',
                id: '',
                password: '',
                tel: '',
                zibox: '',
              };

              initValue(init);
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
              const init = {
                branch: '',
                team: '',
                admin: '',
                name: '',
                id: '',
                password: '',
                tel: '',
                zibox: '',
              };

              initValue(init);
            } else {
              const init = {
                branch: data! && data!.branch_id ? String(data!.branch_id) : '',
                team: data! && data!.team_id ? String(data!.team_id) : '',
                admin: data! && data!.admin_id ? String(data!.admin_id) : '',
                name: data! && data!.name ? data!.name : '',
                id: data! && data!.user_name ? data!.user_name : '',
                password: '',
                tel: data! && data!.number ? data!.number : '',
                zibox: data! && data!.ziboxip ? data!.ziboxip : '',
              };

              initValue(init);
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
  // getBranchList?: () => void;
  // getTeamList?: (branch_id: number) => void;
  // branchList: Array<BranchInfo>;
  // teamList: Array<TeamInfo>;
  adminList: Array<SelectDataType>;
  data?: UserInfoType;
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

export default UserInfo;
