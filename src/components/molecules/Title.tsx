import React from 'react';
import styled from 'styled-components';

import { Button, Select, Text } from 'components/atoms';
import { SearchBar, PageCount } from 'components/molecules';
import { COLORS } from 'utils/color';
import { getMaxPage } from 'utils/utils';
import prevPageIcon from 'images/bt-page-pre.png';
import nextPageIcon from 'images/bt-page-next.png';
import useInputForm from 'hooks/useInputForm';

const StyledWrapper = styled.div`
  /* Display */
  height: 100%;
  border-bottom: 0.05rem solid ${COLORS.green};
`;

const StyledLeft = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  float: left;
`;

const StyledRight = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  float: right;
`;

const StyleTitle = styled.div`
  padding-right: 0.5rem;
`;

const StyledButton = styled.div`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const StyledExplanation = styled.div`
  padding-left: 0.5rem;
`;

const StyledSelect = styled.div`
  padding-left: 0.6rem;
`;

const StyledSearch = styled.div`
  padding-left: 0.6rem;
`;

const StyledPageSpace = styled.span`
  padding-left: 1px;
  padding-right: 1px;
`;

function Title({
  buttonType,
  explanType,
  selectType,
  pageType,
  isSearch,
  children,
  fontSize,
  branch,
  team,
  search,
  onChange,
  onChangeSelect,
  onClickSearch,
}: TitleProps) {
  let branchList: Array<SelectDataType> = [];
  let teamList: Array<SelectDataType> = [];
  let branch_name = '';
  let team_name = '';

  if (selectType) {
    let temp1 = selectType.data1 as Array<BranchInfo>;
    branchList = temp1.map((value) => {
      let data = {
        id: value.id,
        data: value.branch_name,
      };
      if (Number(branch) === value.id) {
        branch_name = value.branch_name;
      }
      return data;
    });

    let temp2 = selectType.data2 as Array<TeamInfo>;
    teamList = temp2.map((value) => {
      let data = {
        id: value.id,
        data: value.team_name,
      };
      if (Number(team) === value.id) {
        team_name = value.team_name;
      }
      return data;
    });
  }

  return (
    <StyledWrapper>
      <StyledLeft>
        <StyleTitle>
          <Text
            fontSize={fontSize ? fontSize : 1.12}
            fontWeight={600}
            fontColor={COLORS.green}
          >
            {children}
          </Text>
        </StyleTitle>
        {buttonType ? (
          <StyledButton>
            <Button
              width={7.3}
              height={2}
              bgColor={COLORS.green}
              onClick={buttonType.onClick}
            >
              <Text fontSize={0.87} fontWeight={600} fontColor={COLORS.white}>
                {buttonType.title}
              </Text>
            </Button>
          </StyledButton>
        ) : null}
        {explanType ? (
          <StyledExplanation>
            <Text fontColor={COLORS.dark_gray3} fontSize={0.87}>
              {explanType.title}
            </Text>
          </StyledExplanation>
        ) : null}
      </StyledLeft>
      <StyledRight>
        {selectType && selectType.data1!.length > 0 ? (
          <StyledSelect>
            <Select
              defaultValue={Number(branch)}
              // defaultOption={'지점명'}
              name={'branch'}
              options={branchList}
              width={9.3}
              height={1.5}
              borderColor={selectType.borderColor}
              borderRadius={selectType.borderRadius}
              fontColor={selectType.color}
              onChange={(e) => onChangeSelect!(e)}
            />
          </StyledSelect>
        ) : null}
        {selectType && selectType.data2! ? (
          <StyledSelect>
            <Select
              defaultValue={Number(team)}
              // defaultOption={team_name || '팀명'}
              name={'team'}
              options={teamList}
              width={9.3}
              height={1.5}
              borderColor={selectType.borderColor}
              borderRadius={selectType.borderRadius}
              fontColor={selectType.color}
              onChange={(e) => onChangeSelect!(e, 'team', String(branch))}
            />
          </StyledSelect>
        ) : null}
        {isSearch ? (
          <StyledSearch>
            <SearchBar
              search={search!}
              onChange={onChange}
              onClickSearch={onClickSearch}
            ></SearchBar>
          </StyledSearch>
        ) : null}
        {pageType ? (
          <>
            <PageCount
              curPage={pageType.curPage}
              maxPage={getMaxPage(pageType.count, 6)}
            />
            <StyledPageSpace />
            <Button
              bgImage={prevPageIcon}
              width={1.7}
              height={1.7}
              bgColor={'inherit'}
              borderRadius={0}
            ></Button>
            <StyledPageSpace />
            <Button
              bgImage={nextPageIcon}
              width={1.7}
              height={1.7}
              bgColor={'inherit'}
              borderRadius={0}
            ></Button>
          </>
        ) : null}
      </StyledRight>
    </StyledWrapper>
  );
}

interface BranchInfo {
  branch_name: string;
  created_at: string;
  id: number;
}

export interface TeamInfo {
  branch_id: number;
  id: number;
  team_name: string;
}

interface buttonType {
  title: string;
  onClick?: () => void;
}

interface explanType {
  title: string;
}

interface selectType {
  color?: string;
  borderRadius?: number;
  borderColor?: string;
  data1: Array<BranchInfo>;
  data2?: Array<TeamInfo>;
}

interface pageType {
  curPage: number;
  count: number;
}

interface SelectDataType {
  id: number;
  data: string;
}

interface TitleProps {
  buttonType?: buttonType;
  explanType?: explanType;
  selectType?: selectType;
  pageType?: pageType;
  isSearch?: boolean;
  children: string;
  fontSize?: number;
  branch?: string;
  team?: string;
  search?: string;
  onChangeSelect?: (
    e: React.ChangeEvent<HTMLSelectElement>,
    type?: string,
    data?: string,
  ) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSearch?: () => void;
}

Title.defaultProps = {};

export default React.memo(Title);
