import React from 'react';
import styled from 'styled-components';

import { Button, Select, Text } from 'components/atoms';
import { SearchBar, PageCount } from 'components/molecules';
import { COLORS } from 'utils/color';
import { getMaxPage } from 'utils/utils';
import prevPageIcon from 'images/bt-page-pre.png';
import nextPageIcon from 'images/bt-page-next.png';

const StyledWrapper = styled.div`
  /* Display */
  height: 100%;
  border-bottom: 0.05rem solid ${COLORS.green};
`;

const StyledLeft = styled.span`
  height: calc(100% - 13px);
  display: flex;
  align-items: flex-end;
  float: left;
  padding-bottom: 13px;
`;

const StyledRight = styled.div`
  height: calc(100% - 4px);
  display: flex;
  align-items: flex-end;
  float: right;
  padding-bottom: 4px;
`;

const StyleTitle = styled.div`
  padding-right: 9.5px;
`;

const StyledButton = styled.div`
  padding-left: 9.5px;
  padding-right: 7px;
`;

const StyledExplanation = styled.div`
  padding-left: 7px;
`;

const StyledSelect = styled.div`
  padding-left: 5px;
  padding-right: 5px;
`;

const StyledSearch = styled.div`
  padding-left: 5px;
`;

const StyledPageSpace = styled.span`
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledButtonSpace = styled.span`
  padding-left: 0.5px;
  padding-right: 0.5px;
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
  adminType,
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
            fontWeight={800}
            fontColor={COLORS.green}
            fontFamily={'NanumGothic'}
          >
            {children}
          </Text>
        </StyleTitle>
        {buttonType ? (
          buttonType!.type === 'organization' && adminType !== 2 ? null : (
            <StyledButton>
              <Button
                width={7.3}
                height={1.5}
                bgColor={COLORS.green}
                onClick={buttonType!.onClick}
              >
                <Text
                  fontSize={0.85}
                  fontWeight={800}
                  fontColor={COLORS.white}
                  fontFamily={'NanumGothic'}
                >
                  {buttonType!.title}
                </Text>
              </Button>
            </StyledButton>
          )
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
              defaultValue={branch}
              // defaultOption={'지점명'}
              name={'branch'}
              options={branchList}
              width={selectType.width || 7.5}
              height={selectType.height || 1.7}
              borderColor={selectType.borderColor}
              borderRadius={selectType.borderRadius}
              fontColor={selectType.color}
              paddingLeft={selectType.paddingLeft}
              onChange={(e) => onChangeSelect!(e)}
            />
          </StyledSelect>
        ) : null}
        {selectType && selectType.data2! ? (
          <StyledSelect>
            <Select
              defaultValue={team}
              // defaultOption={team_name || '팀명'}
              name={'team'}
              options={teamList}
              width={selectType.width || 7.5}
              height={selectType.height || 1.7}
              borderColor={selectType.borderColor}
              borderRadius={selectType.borderRadius}
              fontColor={selectType.color}
              paddingLeft={selectType.paddingLeft}
              onChange={(e) => onChangeSelect!(e, branch)}
            />
          </StyledSelect>
        ) : null}
        {isSearch ? (
          <StyledSearch>
            <SearchBar
              search={search!}
              onChange={onChange}
              onClickSearch={onClickSearch}
            />
          </StyledSearch>
        ) : null}
        {pageType ? (
          <>
            <PageCount
              curPage={pageType.curPage}
              maxPage={getMaxPage(pageType.count)}
              textAlign={2}
            />
            <StyledPageSpace />
            <Button
              bgImg={prevPageIcon}
              width={1.3}
              height={1.3}
              bgColor={'inherit'}
              borderRadius={0}
              onClick={() =>
                pageType.onClickPrevPage(pageType.curPage, pageType.count)
              }
            />
            <StyledButtonSpace />
            <Button
              bgImg={nextPageIcon}
              width={1.3}
              height={1.3}
              bgColor={'inherit'}
              borderRadius={0}
              onClick={() =>
                pageType.onClickNextPage(pageType.curPage, pageType.count)
              }
            />
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
  bgImage?: string;
  bgHoverImage?: string;
  type: string;
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
  width: number;
  height: number;
  paddingLeft?: number;
}

interface pageType {
  curPage: number;
  count: number;
  onClickPrevPage: (cur: number, total: number, isStart?: boolean) => void;
  onClickNextPage: (cur: number, total: number, isEnd?: boolean) => void;
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
  branch?: number;
  team?: number;
  search?: string;
  adminType?: number;
  onChangeSelect?: (
    e: React.ChangeEvent<HTMLSelectElement>,
    data?: number,
  ) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSearch?: () => void;
}

Title.defaultProps = {};

export default React.memo(Title);
