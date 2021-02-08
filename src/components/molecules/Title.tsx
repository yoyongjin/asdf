import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Button, Select, Text, Input } from 'components/atoms';
import { SearchBar, PageCount } from 'components/molecules';
import { COLORS } from 'utils/color';
import { getMaxPage } from 'utils/utils';
import prevPageIcon from 'images/bt-page-pre.png';
import nextPageIcon from 'images/bt-page-next.png';
import zmsPrevPageIcon from 'images/zms/bt-page-pre.png';
import zmsNextPageIcon from 'images/zms/bt-page-next.png';

import { company, COMPANY_MAP } from 'utils/constants';

const StyledWrapper = styled.div<StyledProps>`
  /* Display */
  height: 100%;
  border-bottom: 0.05rem solid ${(props) => props.bdBottomColor};
  border-bottom: 0.05rem solid
    ${company === COMPANY_MAP.LINA ? COLORS.blue : COLORS.light_blue};
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
  position: relative;
  top: 10%;
  top: ${company === COMPANY_MAP.LINA ? 5 : 12}%;
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

const StyledVolume = styled.div`
  display: flex;
`;

const StyledValue = styled.div`
  align-self: center;
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
  bdBottomColor,
  buttonType,
  explanType,
  userListOption,
  selectType,
  pageType,
  isSearch,
  volumeType,
  children,
  fontSize,
  color,
  branch,
  team,
  search,
  adminType,
  onChange,
  onChangeSelect,
  onChangeInput,
  onClickSearch,
  setVolume,
}: TitleProps) {
  const branchList = useMemo(() => {
    if (selectType) {
      let temp1 = selectType!.data1 as Array<BranchInfo>;
      return temp1.map((value) => {
        let data = {
          id: value.id,
          data: value.branch_name,
        };
        return data;
      });
    }
  }, [selectType]);

  const teamList = useMemo(() => {
    if (selectType) {
      let temp2 = selectType!.data2 as Array<TeamInfo>;
      return temp2.map((value) => {
        let data = {
          id: value.id,
          data: value.team_name,
        };
        return data;
      });
    }
  }, [selectType]);

  return (
    <StyledWrapper bdBottomColor={bdBottomColor}>
      <StyledLeft>
        <StyleTitle>
          <Text
            fontSize={fontSize ? fontSize : 1.12}
            fontWeight={800}
            fontColor={
              company === COMPANY_MAP.LINA ? COLORS.blue : COLORS.light_blue2
            }
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
                bgColor={COLORS.dark_blue}
                image={buttonType.bgImage}
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
        {volumeType ? (
          <>
            <StyledVolume>
              <StyledValue>
                <Text fontColor={color} fontWeight={600}>
                  고객
                </Text>
              </StyledValue>
              <Input
                customStyle={`float:right;`}
                type={'range'}
                name={'left'}
                min={0}
                max={3}
                value={String(volumeType.left_vol)}
                step={0.1}
                width={7}
                onChange={(e) => onChangeInput!(e)}
              />
            </StyledVolume>
            <StyledVolume>
              <StyledValue>
                <Text fontColor={color} fontWeight={600}>
                  상담원
                </Text>
              </StyledValue>
              <Input
                customStyle={`float:right;`}
                type={'range'}
                name={'right'}
                min={0}
                max={3}
                value={String(volumeType.right_vol)}
                step={0.1}
                width={7}
                onChange={(e) => onChangeInput!(e)}
              />
            </StyledVolume>
          </>
        ) : null}
        {userListOption ? (
          <StyledSelect>
            <Select
              // defaultValue={}
              name={'userListCount'}
              options={userListOption.data}
              width={userListOption.width || 7.5}
              height={userListOption.height || 1.7}
              borderColor={userListOption.borderColor}
              borderRadius={userListOption.borderRadius}
              fontColor={userListOption.color}
              paddingLeft={userListOption.paddingLeft}
              onChange={(e) => onChangeSelect!(e)}
            />
          </StyledSelect>
        ) : null}
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
              maxPage={getMaxPage(pageType.count, 5)}
              textAlign={2}
            />
            <StyledPageSpace />
            <Button
              image={
                company === COMPANY_MAP.DBLIFE || company === COMPANY_MAP.LINA
                  ? prevPageIcon
                  : zmsPrevPageIcon
              }
              width={1.3}
              height={1.3}
              bgColor={COLORS.white}
              borderRadius={0}
              onClick={() =>
                pageType.onClickPrevPage(pageType.curPage, pageType.count)
              }
            />
            <StyledButtonSpace />
            <Button
              image={
                company === COMPANY_MAP.DBLIFE || company === COMPANY_MAP.LINA
                  ? nextPageIcon
                  : zmsNextPageIcon
              }
              width={1.3}
              height={1.3}
              bgColor={COLORS.white}
              borderRadius={0}
              onClick={() =>
                pageType.onClickNextPage(pageType.curPage, pageType.count, 5)
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

interface userListOptionType {
  color?: string;
  borderRadius?: number;
  borderColor?: string;
  data?: any[];
  width: number;
  height: number;
  paddingLeft?: number;
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
  onClickNextPage: (
    cur: number,
    total: number,
    divide: number,
    isEnd?: boolean,
  ) => void;
}

interface volumeType {
  left_vol: number;
  right_vol: number;
}

interface SelectDataType {
  id: number;
  data: string;
}

interface StyledProps {
  bdBottomColor?: string;
}

interface TitleProps extends StyledProps {
  buttonType?: buttonType;
  explanType?: explanType;
  userListOption?: userListOptionType;
  selectType?: selectType;
  pageType?: pageType;
  volumeType?: volumeType;
  isSearch?: boolean;
  children: string;
  fontSize?: number;
  color?: string;
  branch?: number;
  team?: number;
  search?: string;
  adminType?: number;
  onChangeInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelect?: (
    e: React.ChangeEvent<HTMLSelectElement>,
    data?: number,
  ) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSearch?: () => void;
  setVolume?: (type: number, gauge: number) => void;
}

Title.defaultProps = {
  bdBottomColor: COLORS.light_blue,
};

export default React.memo(Title);
