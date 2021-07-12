import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { Image, Text } from 'components/atoms';
import { List } from 'components/molecules';
import { UserInfo } from 'modules/types/user';
import { Colors } from 'utils/color';
import { formatPhoneNumber } from 'utils/utils';

const StyledWrapper = styled.td``;

const StyledProperty = styled.td`
  /* Position */
  float: right;
  padding-top: 10px;

  /* Display */
  height: calc(100% - 10px);
  width: 5rem;
`;

const StyledList = styled.div`
  /* Position */
  position: relative;

  /* Display */
  width: 120px;
`;

const menuList = ['정보 수정', '비밀번호 초기화', '삭제'];

function TableProperty({
  info,
  optionIcon,
  optionHoverIcon,
  page,
  branchId,
  adminId,
  teamId,
  getUserInfo,
  onClickDeleteUser,
  onClickResetPassword,
}: TableContentProps) {
  const [isHover, setIsHover] = useState<boolean>(false);

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
        if (
          key === 'branch_id' ||
          key === 'team_id' ||
          key === 'login_at' ||
          key === 'ziboxmic' ||
          key === 'ziboxspk' ||
          key === 'id'
        )
          return null;

        return (
          <StyledWrapper key={`styled-list-wrapper-${i}`}>
            <Text
              fontColor={Colors.gray4}
              fontFamily="NanumBarunGothic"
              fontSize={13}
              fontWeight={700}
            >
              {key === 'admin_id'
                ? infoValueList[i] === 0
                  ? '상담원'
                  : infoValueList[i] === 1
                  ? '관리자'
                  : ''
                : key === 'number'
                ? formatPhoneNumber(infoValueList[i] || '')
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
          width={3.2}
          height={3.2}
          hoverImg={optionHoverIcon}
        />
      </StyledProperty>
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
  page?: number;
  branchId?: number;
  adminId?: number;
  teamId?: number;
  getUserInfo?: (info: UserInfo) => void;
  onClickDeleteUser: (
    id: number,
    page: number,
    branchId: number,
    teamId: number,
    adminId: number,
  ) => void;
  onClickResetPassword?: (id: number) => void;
}

TableProperty.defaultProps = {};

export default TableProperty;
