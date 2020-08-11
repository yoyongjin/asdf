import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Button } from 'components/atoms';
import { Title, TextInput, TextSelect } from 'components/molecules';
import { COLORS } from 'utils/color';
import useInputForm from 'hooks/useInputForm';

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
  branchList,
  teamList,
  adminList,
  data,
}: UserInfoProps) {
  const { form, onChange, onChangeSelect } = useInputForm({
    branch: data! && data!.branch_id ? data!.branch_id : '',
    team: data! && data!.team_id ? data!.team_id : '',
    admin: data! && data!.admin_id ? data!.admin_id : '0',
    name: data! && data!.name ? data!.name : '',
    id: data! && data!.user_name ? data!.user_name : '',
    password: '',
    tel: data! && data!.number ? data!.number : '',
    zibox: data! && data!.ziboxip ? data!.ziboxip : '',
  });

  let branch: Array<SelectDataType> = [];
  let team: Array<SelectDataType> = [];

  let branch_name = '';
  let team_name = '';
  let admin_name = '';

  if (branchList.length > 0) {
    let temp1 = branchList as Array<BranchInfo>;
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
  if (teamList.length > 0) {
    let temp2 = teamList as Array<TeamInfo>;
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
          defaultValue={form.branch || '0'}
          defaultOption={form.branch ? branch_name : '지점명'}
          textValue={'지점명'}
          name={'branch'}
          list={branch}
          onChange={onChangeSelect}
        ></TextSelect>
        <TextSelect
          defaultValue={form.team || '0'}
          defaultOption={form.team ? team_name : '팀명'}
          textValue={'팀명'}
          name={'team'}
          list={team}
          onChange={onChangeSelect}
        ></TextSelect>
        <TextSelect
          defaultValue={form.admin || '-1'}
          defaultOption={form.admin === '0' ? '상담원' : form.admin === '1' ? '관리자' : form.admin === '2' ? 'ADMIN' : '권한'}
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
              alert('test');
              onClickUpdateUser!(
                String(data!.id),
                form.branch,
                form.team,
                form.admin,
                form.name,
                form.id,
                form.password,
                form.tel,
                form.zibox,
              );
            } else {
              onClickInsertUser!(
                form.branch,
                form.team,
                form.admin,
                form.name,
                form.id,
                form.password,
                form.tel,
                form.zibox,
              );
            }
          }}
        >
          저장
        </Button>
        <Button
          width={4.3}
          height={1.6}
          bgColor={COLORS.dark_gray1}
          onClick={onClickVisible}
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
  branchList: Array<BranchInfo>;
  teamList: Array<TeamInfo>;
  adminList: Array<SelectDataType>;
  data?: consultInfoType;
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

interface consultInfoType {
  id: number;
  branch_id: string;
  branch_name: string | null;
  team_id: string;
  team_name: string | null;
  admin_id: string;
  name: string;
  user_name: string;
  number: string;
  ziboxip: string;
  login_at: number;
  call_time?: number;
  call_type?: string;
  diff?: number;
}
UserInfo.defaultProps = {};

export default UserInfo;
