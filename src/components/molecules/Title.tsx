import React from 'react';
import styled, { css } from 'styled-components';

import { Button, Select, Text } from 'components/atoms';
import { SearchBar, PageCount, TextRange } from 'components/molecules';
import { Colors } from 'utils/color';
import constants, { COMPANY_TYPE } from 'utils/constants';
import Utils from 'utils/new_utils';

import DB_prevPageIcon from 'images/bt-page-pre.png';
import DB_nextPageIcon from 'images/bt-page-next.png';
import prevPageIcon from 'images/zms/bt-page-pre.png';
import nextPageIcon from 'images/zms/bt-page-next.png';

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

function Title({
  buttonData,
  children,
  explanData,
  isButton,
  isExplan,
  isPage,
  isSelect,
  isSearch,
  isVolume,
  searchData,
  selectData,
  volumeData,
  pageData,
  titleFontColor,
  titleFontSize,
  titleFontWeight,
  titleFontFamily,
  bottomLineColor,
  bottomLinePixel,
  leftBottomPixel,
  rightBottomPixel,
}: TitleProps) {
  return (
    <StyledWrapper color={bottomLineColor!} pixel={bottomLinePixel}>
      <StyledBorderPostion pixel={leftBottomPixel} float="left">
        <StyleTitle>
          <Text
            fontColor={titleFontColor}
            fontFamily={titleFontFamily}
            fontSize={titleFontSize}
            fontWeight={titleFontWeight}
          >
            {children}
          </Text>
        </StyleTitle>
        {isButton ? (
          <>
            {[...Array(buttonData!.count)].map((values, index) => {
              const info = buttonData!.info[index];
              const hidden = buttonData!.hidden;

              if (hidden) {
                return null;
              }

              return (
                <>
                  <StyledButton>
                    <Button
                      bgColor={Colors.navy1}
                      height={2.5}
                      image={info.image}
                      width={11.8}
                      onClick={info.click}
                    />
                  </StyledButton>
                </>
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
        {isVolume ? (
          <>
            {[...Array(volumeData!.count)].map((values, index) => {
              const info = volumeData!.info[index];
              const data = volumeData!.data[index];
              const style = volumeData!.style![index];

              return (
                <>
                  <StyledVolume>
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
                </>
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
                <StyledSelect>
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
        {isSearch ? (
          <>
            {[...Array(searchData!.count)].map((values, index) => {
              const info = searchData!.info[index];
              const data = searchData!.data[index];

              return (
                <StyledSearch>
                  <SearchBar
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

interface SearchOption {
  click: () => void;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface SearchData {
  count: number;
  data: Array<string>;
  info: Array<SearchOption>;
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
  children: string;
  explanData?: ExplanData;
  isButton: boolean;
  isExplan: boolean;
  isPage: boolean;
  isSearch: boolean;
  isSelect: boolean;
  isVolume: boolean;
  pageData?: PageData;
  searchData?: SearchData;
  selectData?: SelectData;
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
  isExplan: false,
  isPage: false,
  isSearch: false,
  isSelect: false,
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
