import React, { useState } from 'react';
import styled from 'styled-components';

import { Image, List, Text, Modal } from 'components/atoms';
import { UserInfo } from 'components/molecules';
import { COLORS } from 'utils/color';
import useVisible from 'hooks/useVisible';
import { UserInfo as UserInfoType} from 'modules/types/user';

const StyledWrapper = styled.td`
  /* Display */
  border-bottom: 1px solid ${COLORS.dark_gray4};
`;

const StyledProperty = styled.div`
  /* Position */
  float: right;

  /* Display */
  width: 2rem;
`;

const StyledList = styled.div`
  /* Position */
  position: relative;

  /* Display */
  width: 10rem;
`;

function TableProperty({
  info,
  threeDotsIcon,
  hoverThreeDotsIcon,
  branchList,
  teamList,
  adminList,
  onClickUpdateUser,
  getBranchList,
  getTeamList,
  onClickDeleteUser,
  onClickResetPassword,
  page,
  branchId,
  teamId,
}: TableContentProps) {
  const menuList = ['정보 수정', '비밀번호 초기화', '삭제'];
  const { visible, onClickVisible } = useVisible();
  const [isHover, setIsHover] = useState<boolean>(false);
  const onMouseIn = () => {
    setIsHover(true);
  };

  const onMouseOut = () => {
    setIsHover(false);
  };
  return (
    <>
      <StyledWrapper>
        <Text>{info.id}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.branch_name!}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.team_name!}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.admin_id === 0 ? '상담원' : info.admin_id === 1 ? '관리자' : info.admin_id === 2 ? 'ADMIN' : ''}</Text>
        {/* <Text>{info.admin_id}</Text> */}
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.name}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.user_name}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.number}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <Text>{info.ziboxip}</Text>
      </StyledWrapper>
      <StyledWrapper>
        <StyledProperty onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}>
          {isHover && (
            <StyledList>
              <List
                menu={menuList}
                onClickVisible={onClickVisible}
                onClickDeleteUser={onClickDeleteUser}
                onClickResetPassword={onClickResetPassword!}
                id={info.id}
                page={page!}
                branchId={branchId!}
                teamId={teamId!}
              ></List>
            </StyledList>
          )}
          <Image
            src={threeDotsIcon}
            width={2}
            height={2}
            hoverImage={hoverThreeDotsIcon}
          />
        </StyledProperty>
      </StyledWrapper>
      <Modal
        isVisible={visible}
        Component={
          <UserInfo
            isVisible={visible}
            onClickVisible={onClickVisible}
            // branchList={branchList}
            // teamList={teamList}
            adminList={adminList}
            data={info}
            onClickUpdateUser={onClickUpdateUser}
            // getBranchList={getBranchList}
            // getTeamList={getTeamList}
          />
        }
      />
    </>
  );
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

interface TableContentProps {
  info: UserInfoType;
  threeDotsIcon: string;
  hoverThreeDotsIcon: string;
  branchList: Array<BranchInfo>;
  teamList: Array<TeamInfo>;
  adminList: Array<SelectDataType>;
  page?: number;
  branchId?: number;
  teamId?: number;
  onClickUpdateUser: (
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
  onClickDeleteUser: (
    id: string,
    page: number,
    branchId: number,
    teamId: number,
  ) => void;
  onClickResetPassword?: (id: number) => void;
  getBranchList: () => void;
  getTeamList: (branch_id: number) => void;
}

TableProperty.defaultProps = {};

export default TableProperty;
