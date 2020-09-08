import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { Image, Text } from 'components/atoms';
import { List } from 'components/molecules';
import { COLORS } from 'utils/color';
import { formatPhoneNumber } from 'utils/utils';
import { UserInfo } from 'modules/types/user';
import { BranchInfo, TeamInfo } from 'modules/types/branch';

const StyledWrapper = styled.td``;

const StyledProperty = styled.td`
  /* Position */
  float: right;
  padding-top: 10px;

  /* Display */
  height: calc(100% - 10px);
  width: 2rem;
`;

const StyledList = styled.div`
  /* Position */
  position: relative;

  /* Display */
  width: 10rem;
`;

const menuList = ['정보 수정', '비밀번호 초기화', '삭제'];

function TableProperty({
  info,
  optionIcon,
  optionHoverIcon,
  branchList,
  teamList,
  adminList,
  page,
  branchId,
  branchName,
  adminId,
  teamId,
  getBranchList,
  getTeamList,
  getUserInfo,
  onClickDeleteUser,
  onClickResetPassword,
  onClickUpdateUser,
}: TableContentProps) {
  const [isHover, setIsHover] = useState<boolean>(false);
  // const { visible, onClickVisible } = useVisible();

  const onMouseIn = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setIsHover(false);
  }, []);

  const infoValueList = useMemo(() => {
    return Object.values(info);
  }, [info]);

  const infoKeyList = useMemo(() => {
    return Object.keys(info);
  }, [info]);

  return (
    <>
      {infoKeyList.map((key, i) => {
        if (key === 'branch_id' || key === 'team_id' || key === 'login_at')
          return null;

        return (
          <StyledWrapper key={`styled-list-wrapper-${i}`}>
            <Text
              fontColor={COLORS.dark_gray1}
              fontSize={0.81}
              fontWeight={700}
            >
              {key === 'admin_id'
                ? infoValueList[i] === 0
                  ? '상담원'
                  : infoValueList[i] === 1
                  ? '관리자'
                  : ''
                : key === 'number'
                ? formatPhoneNumber(infoValueList[i])
                : infoValueList[i]}
            </Text>
          </StyledWrapper>
        );
      })}
      <StyledProperty onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}>
        {isHover && (
          <StyledList>
            <List
              loginAdmin={adminId!}
              adminId={info.admin_id}
              branchId={branchId!}
              menu={menuList}
              id={info.id}
              page={page!}
              teamId={teamId!}
              info={info}
              onClickGetUserInfo={getUserInfo}
              onClickDeleteUser={onClickDeleteUser}
              onClickResetPassword={onClickResetPassword!}
            ></List>
          </StyledList>
        )}
        <Image
          src={optionIcon}
          width={2}
          height={2}
          hoverImg={optionHoverIcon}
        />
      </StyledProperty>
      {/* <Modal
        isVisible={visible}
        Component={
          <UserInfo
            isVisible={visible}
            onClickVisible={onClickVisible}
            adminList={adminList}
            data={info}
            branchId={branchId}
            branchName={branchName}
            adminType={adminId}
            onClickUpdateUser={onClickUpdateUser}
          />
        }
      /> */}
    </>
  );
}
interface SelectDataType {
  id: number;
  data: string;
}

interface TableContentProps {
  info: UserInfo;
  optionIcon: string;
  optionHoverIcon: string;
  branchList: Array<BranchInfo>;
  teamList: Array<TeamInfo>;
  adminList: Array<SelectDataType>;
  page?: number;
  branchId?: number;
  branchName?: string;
  adminId?: number;
  teamId?: number;
  getUserInfo?: (info: UserInfo) => void;
  onClickUpdateUser: (
    id: number,
    branchId: number,
    teamId: number,
    admin: number,
    name: string,
    userId: string,
    password: string,
    tel: string,
    ip: string,
  ) => void;
  onClickDeleteUser: (
    id: number,
    page: number,
    branchId: number,
    teamId: number,
    adminId: number,
  ) => void;
  onClickResetPassword?: (id: number) => void;
  getBranchList: () => void;
  getTeamList: (branch_id: number) => void;
}

TableProperty.defaultProps = {};

export default TableProperty;
