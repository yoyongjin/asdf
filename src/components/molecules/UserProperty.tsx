import _ from 'lodash';
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { Image, Text } from 'components/atoms';
import { List } from 'components/molecules';
import { UserData } from 'types/user';
import { Colors } from 'utils/color';
import constants, {
  USER_TYPE,
  ZIBOX_TRANSPORT,
  ZIBOX_VERSION,
} from 'utils/constants';
import Utils from 'utils/new_utils';

import optionIcon from 'images/bt-user-modi-nor.png';
import optionHoverIcon from 'images/bt-user-modi-over.png';
import { OnClickRemoveUser, OnClickResetPassword } from 'hooks/useUser';
import { SetSeletedConsultantData } from 'components/organisms/UserView';
import { ITableContentOption } from 'components/molecules/TableContent';

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

const menuList = [
  {
    id: 0,
    name: '정보 수정',
  },
  {
    id: 1,
    name: '비밀번호 초기화',
  },
  {
    id: 2,
    name: '삭제',
  },
];

function UserProperty({
  options,
  onClickRemoveUser,
  onClickResetPassword,
  onClickUserDataPopup,
  userData,
}: TableContentProps) {
  const [isHover, setIsHover] = useState<boolean>(false);

  const onMouseIn = useCallback(() => {
    setIsHover(true);
  }, []);

  const onMouseOut = useCallback(() => {
    setIsHover(false);
  }, []);

  return (
    <>
      {Object.keys(userData).map((values, i) => {
        if (
          values === 'id' ||
          values === 'branch_id' ||
          values === 'team_id' ||
          values === 'zibox_id' ||
          values === 'zibox_mic' ||
          values === 'zibox_spk' ||
          values === 'zibox_ip_type' ||
          values === 'zibox_fw_version' ||
          values === 'call_available_id' ||
          values === 'available_time' ||
          values === 'in_time' ||
          values === 'out_time' ||
          values === 'login_at'
        ) {
          return null;
        }

        if (constants.TRANSPORT === ZIBOX_TRANSPORT.OCX) {
          if (constants.ZIBOX_VERSION === ZIBOX_VERSION.ZIBOX2) {
            if (values === 'zibox_ip' || values === 'zibox_mac') return null;
          }
        } else {
          if (values === 'pc_ip') return null;
        }

        return (
          <StyledWrapper key={`styled-list-wrapper-${i}`}>
            <Text
              fontColor={Colors.gray4}
              fontFamily="NanumBarunGothic"
              fontSize={13}
              fontWeight={700}
            >
              {values === 'admin_id'
                ? userData[values] === USER_TYPE.CONSULTANT
                  ? '상담원'
                  : userData[values] === USER_TYPE.TEAM_ADMIN
                  ? '팀관리자'
                  : userData[values] === USER_TYPE.BRANCH_ADMIN
                  ? '지점관리자'
                  : userData[values] === USER_TYPE.ADMIN
                  ? '관리자'
                  : userData[values] === USER_TYPE.SUPER_ADMIN
                  ? '슈퍼관리자'
                  : ''
                : values === 'number' && userData[values]
                ? Utils.formatPhoneNumber(userData[values]!)
                : (userData as any)[values] || ''}
            </Text>
          </StyledWrapper>
        );
      })}
      <StyledProperty onMouseEnter={onMouseIn} onMouseLeave={onMouseOut}>
        {isHover && (
          <StyledList>
            <List
              currentBranchId={options.currentBranchId!}
              currentPage={options.currentPage!}
              currentSearchText={options.currentSearchText!}
              currentTeamId={options.currentTeamId!}
              currentLimit={options.currentLimit!}
              menus={menuList}
              onClickUserDataPopup={onClickUserDataPopup}
              onClickRemoveUser={onClickRemoveUser}
              onClickResetPassword={onClickResetPassword}
              userData={userData}
            ></List>
          </StyledList>
        )}
        <Image
          src={optionIcon}
          width={40}
          height={40}
          hoverImg={optionHoverIcon}
        />
      </StyledProperty>
    </>
  );
}

interface TableContentProps {
  userData: UserData;
  onClickUserDataPopup: SetSeletedConsultantData;
  onClickRemoveUser: OnClickRemoveUser;
  onClickResetPassword: OnClickResetPassword;
  options: ITableContentOption;
}

UserProperty.defaultProps = {};

export default UserProperty;
