import React from 'react';
import { GoSync } from 'react-icons/go';
import styled, { css } from 'styled-components';

import { Button, Select, Text } from 'components/atoms';
import {
  SearchBar,
  PageCount,
  TextRange,
  TextCalendar,
} from 'components/molecules';
import { SetSpecificValue } from 'hooks/useInputForm';
import { Colors } from 'utils/color';
import constants, { COMPANY_TYPE } from 'utils/constants';
import Utils from 'utils/new_utils';

import DB_prevPageIcon from 'images/bt-page-pre.png';
import DB_nextPageIcon from 'images/bt-page-next.png';
import prevPageIcon from 'images/zms/bt-page-pre.png';
import nextPageIcon from 'images/zms/bt-page-next.png';
import excelIcon from 'images/bt-add-e-1-nor.png';
import useExcel from 'hooks/useExcel';
import { TableTitleData } from 'components/organisms/StatisticsView';
import _ from 'lodash';

const StyledWrapper = styled.div<StyledWrapperProps>`
  /* Display */
  height: 100%;
  border-bottom: ${(props) => props.pixel}px solid
    ${(props) => props.color || props.theme.color.sub};
`;

const StyledBorderPostion = styled.span<StyledBorderPostionProps>`
  display: flex;
  align-items: flex-end;
  float: ${(props) => props.float};
  padding-bottom: ${(props) => props.pixel}px;

  ${(props) => {
    return css`
      height: calc(100% - ${props.pixel + 'px'});
    `;
  }}
`;

const StyleTitle = styled.div`
  padding-right: 9.5px;
`;

const StyledButton = styled.div`
  padding-left: 9.5px;
  padding-right: 7px;
  position: relative;
  top: 3px;
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

const StyledPageSpace = styled.span`
  padding-left: 10px;
  padding-right: 10px;
`;

const StyledButtonSpace = styled.span`
  padding-left: 0.7px;
  padding-right: 0.7px;
`;

const StyledWaveSpace = styled.span`
  padding-bottom: 6px;
`;

const StyledWhiteSpace = styled.span`
  padding-right: 18px;
`;

const StyledExcelButton = styled.div`
  padding-left: 10px;
`;

const StyledSyncButton = styled(GoSync)`
  cursor: pointer;
  color: ${Colors.gray4};

  :hover {
    color: ${Colors.red};
  }
`;

function Title({
  bottomLineColor,
  bottomLinePixel,
  buttonData,
  calendarData,
  children,
  excelData,
  explanData,
  leftBottomPixel,
  isButton,
  isCalendar,
  isExcel,
  isExplan,
  isExplanRight,
  isPage,
  isSelect,
  isSearch,
  isSync,
  isVolume,
  pageData,
  rightBottomPixel,
  searchData,
  selectData,
  syncData,
  titleFontColor,
  titleFontSize,
  titleFontWeight,
  titleFontFamily,
  volumeData,
}: TitleProps) {
  const { handleExcelDownload } = useExcel();
  return (
    <StyledWrapper color={bottomLineColor!} pixel={bottomLinePixel}>
      <StyledBorderPostion pixel={leftBottomPixel} float="left">
        {children ? (
          <StyleTitle>
            {typeof children === 'string' ? (
              <Text
                fontColor={titleFontColor}
                fontFamily={titleFontFamily}
                fontSize={titleFontSize}
                fontWeight={titleFontWeight}
              >
                {children}
              </Text>
            ) : (
              children
            )}
          </StyleTitle>
        ) : null}
        {isButton ? (
          <>
            {[...Array(buttonData!.count)].map((values, index) => {
              const info = buttonData!.info[index];
              const hidden = buttonData!.hidden;

              if (hidden) {
                return null;
              }

              return (
                <StyledButton key={`Title-StyledButton-${index}`}>
                  <Button
                    bgColor={Colors.navy1}
                    height={2.5}
                    image={info.image}
                    width={11.8}
                    onClick={info.click}
                  />
                </StyledButton>
              );
            })}
          </>
        ) : null}
        {isExplan ? (
          <StyledExplanation>
            <Text fontColor={Colors.gray6} fontFamily="NanumBarunGothic">
              {explanData!.title}
            </Text>
          </StyledExplanation>
        ) : null}
      </StyledBorderPostion>
      <StyledBorderPostion pixel={rightBottomPixel} float="right">
        {isExplanRight ? (
          <StyledExplanation>
            <Text fontColor={Colors.gray6} fontFamily="NanumBarunGothic">
              {explanData!.title}
            </Text>
          </StyledExplanation>
        ) : null}
        {isCalendar ? (
          <>
            <TextCalendar
              datePickerOnChange={calendarData?.info[0].change!}
              inputName={calendarData?.info[0].name!}
              inputValue={calendarData?.info[0].value!}
            />
            <StyledWaveSpace>
              <Text fontFamily="Dotum" fontSize={14}>
                ~
              </Text>
            </StyledWaveSpace>
            <TextCalendar
              datePickerOnChange={calendarData?.info[1].change!}
              inputName={calendarData?.info[1].name!}
              inputValue={calendarData?.info[1].value!}
            />
            <StyledWhiteSpace />
          </>
        ) : null}
        {isVolume ? (
          <>
            {[...Array(volumeData!.count)].map((values, index) => {
              const info = volumeData!.info[index];
              const data = volumeData!.data[index];
              const style = volumeData!.style![index];

              return (
                <StyledVolume key={`Title-StyledVolume-${index}`}>
                  <TextRange
                    rangeMax={info.max}
                    rangeMin={info.min}
                    rangeName={info.name}
                    rangeStep={info.step}
                    rangeValue={String(data)}
                    textColor={style.textColor!}
                    textFamily={style.textFamily!}
                    textSize={style.textSize!}
                    textWeight={style.textWeight!}
                    textValue={info.text}
                    onChangeRange={info.change}
                  />
                </StyledVolume>
              );
            })}
          </>
        ) : null}
        {isSelect ? (
          <>
            {[...Array(selectData!.count)].map((values, index) => {
              const info = selectData!.info[index];
              const data = selectData!.data[index];
              const style = selectData!.style![index];

              return (
                <StyledSelect key={`Title-StyledSelect-${index}`}>
                  <Select
                    borderColor={style.borderColor}
                    borderRadius={style.borderRadius}
                    defaultValue={info.id}
                    fontColor={style.fontColor}
                    height={style.height}
                    name={info.name}
                    options={data}
                    paddingLeft={style.paddingLeft}
                    width={style.width}
                    onChange={info.click}
                  />
                </StyledSelect>
              );
            })}
          </>
        ) : null}
        {isSync ? (
          <div title="통계 동기화하기">
            <StyledSyncButton size={30} onClick={syncData?.click[0]} />
          </div>
        ) : null}
        {isSearch ? (
          <>
            {[...Array(searchData!.count)].map((values, index) => {
              const info = searchData!.info[index];
              const data = searchData!.data[index];
              const option = searchData!.option;

              return (
                <StyledSearch key={`Title-StyledSearch-${index}`}>
                  <SearchBar
                    inputPlaceHolder={option?.placeHolder}
                    search={data}
                    onChange={info.change}
                    onClickSearch={info.click}
                  />
                </StyledSearch>
              );
            })}
          </>
        ) : null}
        {isPage ? (
          <>
            <PageCount
              curPage={pageData!.cur}
              maxPage={Utils.getMaxPage(pageData!.max, 5)}
              textAlign={2}
            />
            <StyledPageSpace />
            <Button
              image={
                constants.COMPANY === COMPANY_TYPE.DBLIFE ||
                constants.COMPANY === COMPANY_TYPE.LINA
                  ? DB_prevPageIcon
                  : prevPageIcon
              }
              width={2.4}
              height={2.4}
              imageWidth={24}
              imageHeight={24}
              bgColor={Colors.white}
              borderRadius={0}
              onClick={() => pageData?.click_prev(pageData.cur, pageData.max)}
            />
            <StyledButtonSpace />
            <Button
              image={
                constants.COMPANY === COMPANY_TYPE.DBLIFE ||
                constants.COMPANY === COMPANY_TYPE.LINA
                  ? DB_nextPageIcon
                  : nextPageIcon
              }
              width={2.4}
              height={2.4}
              imageWidth={24}
              imageHeight={24}
              bgColor={Colors.white}
              borderRadius={0}
              onClick={() =>
                pageData?.click_next(pageData.cur, pageData.max, 5)
              }
            />
          </>
        ) : null}
        {isExcel ? (
          <StyledExcelButton>
            <Button
              bgColor={Colors.white}
              borderRadius={8}
              borderWidth={1}
              customStyle={`border-color: ${Colors.gray14};border-style: solid;`}
              height={2.8}
              width={12.4}
              onClick={_.debounce(() => {
                handleExcelDownload(excelData?.titles!, excelData?.contents!);
              }, 1000)}
            >
              <Text fontColor={Colors.gray13} fontSize={12} fontWeight={800}>
                엑셀파일 다운로드
              </Text>
            </Button>
          </StyledExcelButton>
        ) : null}
      </StyledBorderPostion>
    </StyledWrapper>
  );
}

interface StyledWrapperProps {
  color: string;
  pixel: number;
}

interface StyledBorderPostionProps {
  pixel: number;
  float: string;
}

interface SyncData {
  count: number;
  click: Array<any>;
}

interface ExcelData {
  titles: Array<TableTitleData>;
  contents: Array<any>;
}

interface CalendarData {
  info: Array<{
    value: string;
    name: string;
    change: SetSpecificValue;
  }>;
}

interface PageData {
  max: number;
  cur: number;
  click_prev: (cur: number, total: number, isStart?: boolean) => void;
  click_next: (
    cur: number,
    total: number,
    divide: number,
    isEnd?: boolean,
  ) => void;
}

interface SearchInfoOption {
  click: () => void;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SearchOption {
  placeHolder: string;
}

interface SearchData {
  count: number;
  data: Array<string>;
  info: Array<SearchInfoOption>;
  option?: SearchOption;
}

interface VolumeOption {
  max: number;
  min: number;
  name: string;
  step: number;
  text: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface VolumnCustomStyle {
  textColor?: string;
  textFamily?: string;
  textSize?: number;
  textWeight?: number;
}

interface VolumeData {
  count: number;
  info: Array<VolumeOption>;
  data: Array<number>;
  style?: Array<VolumnCustomStyle>;
}

interface ExplanData {
  title: string;
}

interface ButtonOption {
  image: string;
  click: () => void;
}

interface ButtonData {
  count: number;
  info: Array<ButtonOption>;
  hidden: boolean;
}

interface SelectOption {
  id: number;
  name: string;
  click: (e: React.ChangeEvent<HTMLSelectElement>, data?: number) => void;
}

interface SelectCustomStyle {
  width?: number;
  height?: number;
  borderRadius?: number;
  paddingLeft?: number;
  fontColor?: string;
  borderColor?: string;
}

interface SelectData {
  count: number;
  data: Array<any>;
  style?: Array<SelectCustomStyle>;
  info: Array<SelectOption>;
}

interface TitleProps {
  buttonData?: ButtonData;
  calendarData?: CalendarData;
  children?: string | React.ReactChild;
  excelData?: ExcelData;
  explanData?: ExplanData;
  isButton: boolean;
  isCalendar: boolean;
  isExcel: boolean;
  isExplan: boolean;
  isExplanRight: boolean;
  isPage: boolean;
  isSearch: boolean;
  isSelect: boolean;
  isSync: boolean;
  isVolume: boolean;
  pageData?: PageData;
  searchData?: SearchData;
  selectData?: SelectData;
  syncData?: SyncData;
  volumeData?: VolumeData;
  titleFontColor: string;
  titleFontFamily: string;
  titleFontSize: number;
  titleFontWeight: number;
  bottomLineColor?: string;
  bottomLinePixel: number;
  leftBottomPixel: number;
  rightBottomPixel: number;
}

Title.defaultProps = {
  isButton: false,
  isCalendar: false,
  isExcel: false,
  isExplan: false,
  isExplanRight: false,
  isPage: false,
  isSearch: false,
  isSelect: false,
  isSync: false,
  isVolume: false,
  leftBottomPixel: 13,
  rightBottomPixel: 4,
  titleFontColor: Colors.blue4,
  titleFontFamily: 'NanumGothic',
  titleFontSize: 18,
  titleFontWeight: 800,
  bottomLinePixel: 1,
};

export default React.memo(Title);
