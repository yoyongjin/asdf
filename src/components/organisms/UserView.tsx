import React, { useEffect } from 'react';
import styled from 'styled-components';
import { RouteComponentProps } from 'react-router-dom';

import { Title, TablePagination } from 'components/molecules';
import { Table } from 'components/organisms';
import { COLORS } from 'utils/color';
import useUser from 'hooks/useUser';
import usePage from 'hooks/usePage';
import threeDotsIcon from 'images/bt-user-modi-nor@2x.png';
import hoverThreeDotsIcon from 'images/bt-user-modi-over@2x.png';

const StyledWrapper = styled.div`
  /* Display */
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.div`
  /* Display */
  width: 100%;
  height: 10%;
`;

const StyledUserListArea = styled.div`
  width: 100%;
  height: 90%;
`;

const StyledUserList = styled.div`
  padding-top: 1rem;
`;

const StyledUserPage = styled.div`
  padding-top: 2.5rem;
  padding-left: 20rem;
  padding-right: 20rem;
  text-align: center;
`;

function UserView({ location }: UserViewProps) {
  const { consultantInfo, getConsultantsInfo } = useUser();
  const { countUser, page, onClickNextPage, onClickPrevPage } = usePage();

  const buttonInfo = {
    title: '+ 사용자 등록',
  };

  const selectInfo = {
    color: COLORS.dark_gray4,
    borderRadius: 1,
    data: [
      {
        id: 1,
        option: ['전체 지점', '대박', '쪽박'],
      },
      { id: 2, option: ['팀', '1팀', '2팀', '3팀'] },
    ],
  };

  const tableTitle = [
    'No.',
    '지점명',
    '팀명',
    '권한',
    '이름',
    '아이디',
    '전화번호',
    'ZiBox IP',
    '',
  ];

  useEffect(() => {
    getConsultantsInfo(location, -1, -1, 5, page);
  }, [getConsultantsInfo, location, page]);

  console.log('Lendering UserView');
  return (
    <StyledWrapper>
      <StyledTitle>
        <Title buttonType={buttonInfo} selectType={selectInfo} isSearch>
          사용자 관리
        </Title>
      </StyledTitle>
      <StyledUserListArea>
        <StyledUserList>
          <Table
            tableTitle={tableTitle}
            consultantInfo={consultantInfo}
            threeDotsIcon={threeDotsIcon}
            hoverThreeDotsIcon={hoverThreeDotsIcon}
          ></Table>
        </StyledUserList>
        <StyledUserPage>
          <TablePagination
            curPage={page}
            count={countUser}
            onClickNextPage={onClickNextPage}
            onClickPrevPage={onClickPrevPage}
          ></TablePagination>
        </StyledUserPage>
      </StyledUserListArea>
    </StyledWrapper>
  );
}

interface UserViewProps extends RouteComponentProps {}

UserView.defaultProps = {};

export default UserView;
