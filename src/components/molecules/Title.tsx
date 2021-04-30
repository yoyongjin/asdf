import _ from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Button, Select, Text, Input } from 'components/atoms';
import { SearchBar, PageCount } from 'components/molecules';
import { Colors, COLORS } from 'utils/color';
import { getMaxPage } from 'utils/utils';
import prevPageIcon from 'images/bt-page-pre.png';
import nextPageIcon from 'images/bt-page-next.png';
import defaultPrevPageIcon from 'images/zms/bt-page-pre.png';
import defaultNextPageIcon from 'images/zms/bt-page-next.png';

import constants, { company, COMPANY_MAP, COMPANY_TYPE } from 'utils/constants';

const StyledWrapper = styled.div`
  /* Display */
  height: 100%;
  border-bottom: 0.05rem solid ${(props) => props.theme.color.sub};
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
  /* top: 10%; */
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
  padding-left: 0.7px;
  padding-right: 0.7px;
`;

function Title({
  isSelect,
  selectData,
  selectOption,
  buttonType,
  explanType,
  pageType,
  isSearch,
  volumeType,
  children,
  color,
  branch,
  team,
  search,
  adminType,
  onChange,
  onChangeSelect,
  onChangeInput,
  onClickSearch,
  userCountOption,
}: TitleProps) {
  const branchList = useMemo(() => {
    if (selectData) {
      return selectData.data1.map((data) => {
        return {
          id: data.id,
          data: data.branch_name,
        };
      });
    }
  }, [selectData]);

  const teamList = useMemo(() => {
    if (selectData) {
      return selectData.data2!.map((data) => {
        return {
          id: data.id,
          data: data.team_name,
        };
      });
    }
  }, [selectData]);

  const userCountList = useMemo(() => {
    if (selectData) {
      return selectData.data3;
    }
  }, [selectData]);

  return (
    <StyledWrapper>
      <StyledLeft>
        <StyleTitle>
          <Text fontSize={1.12} fontWeight={800} fontFamily="NanumGothic">
            {children}
          </Text>
        </StyleTitle>
        {buttonType ? (
          buttonType!.type === 'organization' && adminType !== 2 ? null : (
            <StyledButton>
              <Button
                width={7}
                height={1.5}
                // imageWidth={118}
                // imageHeight={25}
                bgColor={COLORS.dark_blue}
                image={buttonType.bgImage}
                onClick={buttonType!.onClick}
              >
                <Text
                  fontSize={0.85}
                  fontWeight={800}
                  fontColor={COLORS.white}
                  fontFamily="NanumGothic"
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
                <Text fontWeight={600}>고객</Text>
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
                <Text fontWeight={600}>상담원</Text>
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
        {isSelect ? (
          selectData!.data1.length > 0 ? (
            <StyledSelect>
              <Select
                defaultValue={branch}
                name={'branch'}
                options={branchList}
                width={selectOption ? selectOption!.width : 7.5}
                height={selectOption ? selectOption.height : 1.7}
                borderRadius={selectOption ? selectOption!.borderRadius : 0}
                paddingLeft={selectOption ? selectOption!.paddingLeft : 0}
                fontColor={selectOption ? selectOption!.fontColor : ''}
                borderColor={selectOption ? selectOption!.borderColor : ''}
                onChange={(e) => onChangeSelect!(e)}
              />
            </StyledSelect>
          ) : null
        ) : null}
        {isSelect ? (
          selectData!.data2.length > 0 ? (
            <StyledSelect>
              <Select
                defaultValue={team}
                name={'team'}
                options={teamList}
                width={selectOption ? selectOption!.width : 7.5}
                height={selectOption ? selectOption.height : 1.7}
                borderRadius={selectOption ? selectOption!.borderRadius : 0}
                paddingLeft={selectOption ? selectOption!.paddingLeft : 0}
                fontColor={selectOption ? selectOption!.fontColor : ''}
                borderColor={selectOption ? selectOption!.borderColor : ''}
                onChange={(e) => onChangeSelect!(e, branch)}
              />
            </StyledSelect>
          ) : null
        ) : null}
        {isSelect ? (
          selectData!.data3 && selectData!.data3.length > 0 ? (
            <StyledSelect>
              <Select
                name={'userListCount'}
                options={userCountList}
                width={userCountOption ? userCountOption!.width : 7.5}
                height={userCountOption ? userCountOption.height : 1.7}
                borderRadius={
                  userCountOption ? userCountOption!.borderRadius : 0
                }
                paddingLeft={userCountOption ? userCountOption!.paddingLeft : 0}
                fontColor={userCountOption ? userCountOption!.fontColor : ''}
                borderColor={
                  userCountOption ? userCountOption!.borderColor : ''
                }
                onChange={(e) => onChangeSelect!(e)}
              />
            </StyledSelect>
          ) : null
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
                constants.COMPANY === COMPANY_TYPE.DBLIFE ||
                constants.COMPANY === COMPANY_TYPE.LINA
                  ? prevPageIcon
                  : defaultPrevPageIcon
              }
              width={1.5}
              height={1.5}
              imageWidth={24}
              imageHeight={24}
              bgColor={COLORS.white}
              borderRadius={0}
              onClick={() =>
                pageType.onClickPrevPage(pageType.curPage, pageType.count)
              }
            />
            <StyledButtonSpace />
            <Button
              image={
                constants.COMPANY === COMPANY_TYPE.DBLIFE ||
                constants.COMPANY === COMPANY_TYPE.LINA
                  ? nextPageIcon
                  : defaultNextPageIcon
              }
              width={1.5}
              height={1.5}
              imageWidth={24}
              imageHeight={24}
              bgColor={Colors.white}
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

interface selectData {
  data1: Array<BranchInfo>;
  data2: Array<TeamInfo>;
  data3?: Array<{ data: number }>;
}

interface selectOption {
  borderRadius?: number;
  height?: number;
  paddingLeft?: number;
  width?: number;
  fontColor?: string;
  borderColor?: string;
}

interface TitleProps {
  isSelect: boolean;
  selectData?: selectData;
  selectOption?: selectOption;
  userCountOption?: selectOption;
  buttonType?: buttonType;
  explanType?: explanType;
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
  isSelect: false,
};

export default React.memo(Title);
