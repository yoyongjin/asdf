import _ from 'lodash';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { TitleV2 } from 'components/molecules';
import { Table } from 'components/organisms';
import useExcel from 'hooks/useExcel';
import useInputForm from 'hooks/useInputForm';
import { Colors } from 'utils/color';
import { tableTitlePhoneInfo } from 'utils/table/title';

const StyledWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledTitle = styled.div`
  height: 4.275rem;
  width: 100%;
`;

const StyledContent = styled.div`
  height: calc(100% - 8.5rem - 100px);
  overflow-x: auto;
`;

const StyledFooter = styled.div`
  align-items: center;
  display: flex;
  height: 100px;
  justify-content: center;
`;

function PhoneView() {
  const { excelDownloadStatus } = useExcel();
  const { form, onChangeCheckBox } = useInputForm({
    match: false, // 할당여부
    limit: 15, // 페이징 개수
  });

  /**
   * @description 테이블 헤더 border style
   */
  const tableHeadBorderStyle = useMemo(() => {
    return {
      borderTop: {
        color: Colors.blue4,
        style: 'solid',
        width: 2,
      },
      borderBottom: {
        color: Colors.navy2,
        style: 'solid',
        width: 1.5,
      },
    };
  }, []);

  /**
   * @description 타이틀에 들어갈 버튼 정보들
   */
  const titleButtonData = useMemo(() => {
    let onClickExcel: any;

    const buttonConfig1 = {
      type: 'button',
      data: {
        disabled: excelDownloadStatus,
        text: excelDownloadStatus ? '처리 중..' : '엑셀파일 다운로드',
        onClick: onClickExcel,
      },
      styles: {
        backgroundColor: Colors.white,
        borderColor: Colors.gray14,
        borderRadius: 8,
        borderStyle: 'solid',
        borderWidth: 1,
        fontColor: Colors.gray13,
        fontSize: 12,
        fontWeight: 800,
        height: 2.8,
        width: 12.4,
      },
    };

    let onClick: any = null;

    const buttonConfig2 = {
      type: 'button',
      data: {
        text: '조회',
        onClick: onClick,
      },
      styles: {
        backgroundColor: Colors.blue4,
        borderRadius: 8,
        fontColor: Colors.white,
        fontSize: 12,
        fontWeight: 800,
        height: 2.8,
        width: 6.4,
      },
    };

    return [buttonConfig1, buttonConfig2];
  }, [excelDownloadStatus]);

  /**
   * @description 타이틀에 들어갈 input 정보들
   */
  const titleInputData = useMemo(() => {
    const inputConfig1 = {
      type: 'input',
      data: {
        isNumber: true,
        placeholder: '법인폰 번호',
        value: '',
      },
      styles: {
        borderRadius: 8,
        height: 2.8,
        width: 15,
        textAlign: 1,
      },
    };

    return [inputConfig1];
  }, []);

  /**
   * @description 타이틀에 들어갈 text + checkbox 정보들
   */
  const titleTextCheckBoxData = useMemo(() => {
    const textCheckBoxConfig = {
      type: 'text-checkbox',
      data: {
        isChecked: form.match,
        isReverse: true,
        name: 'match',
        onChange: onChangeCheckBox,
        text: '미할당',
      },
      styles: {
        fontColor: Colors.navy2,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        fontWeight: 800,
      },
    };

    return [textCheckBoxConfig];
  }, [form.match, onChangeCheckBox]);

  /**
   * @description 타이틀에 들어갈 text 정보들
   */
  const titleTextData = useMemo(() => {
    const textConfig1 = {
      type: 'text',
      data: {
        text: `법인폰 관리`,
      },
    };

    return [textConfig1];
  }, []);

  /**
   * @description 타이틀 왼쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleRenderLeft = useCallback(
    (type: number) => {
      if (type === 1) {
        const renderData = [];

        renderData.push(...titleTextData);

        return {
          renderConfig: renderData,
        };
      } else if (type === 2) {
        const renderData = [];
        const renderStyle = [];

        const [buttonConfig1, buttonConfig2] = titleButtonData;

        renderData.push(...titleInputData);
        renderData.push(...titleTextCheckBoxData);
        renderData.push(buttonConfig2);

        for (let i = 0; i < renderData.length; i++) {
          const defaultRenderStyle = {
            paddingRight: 0,
          };

          if (i === 0) {
            defaultRenderStyle.paddingRight = 20;
          }

          if (i === 1) {
            defaultRenderStyle.paddingRight = 10;
          }

          renderStyle.push(defaultRenderStyle);
        }

        return {
          renderConfig: renderData,
          renderStyle,
        };
      }
    },
    [titleTextCheckBoxData, titleButtonData, titleInputData, titleTextData],
  );

  /**
   * @description 타이틀 오른쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleRenderRight = useCallback(
    (type: number) => {
      if (type === 1) {
        const renderData = [];

        const [buttonConfig1] = titleButtonData;

        renderData.push(buttonConfig1);

        return {
          renderConfig: renderData,
        };
      } else if (type === 2) {
      }
    },
    [titleButtonData],
  );

  /**
   * @description 타이틀 style 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleStyle = useCallback((type: number) => {
    if (type === 1) {
      return {
        borderBottomStyle: 'none',
        borderBottomWidth: 0,
        leftMarginTop: 15,
      };
    } else if (type === 2) {
      return {
        borderBottomStyle: 'none',
        borderBottomWidth: 0,
        leftMarginTop: 7,
        rightMarginTop: 7,
      };
    }
  }, []);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <TitleV2
            renderLeft={getTitleRenderLeft(1)}
            renderRight={getTitleRenderRight(1)}
            titleStyle={getTitleStyle(1)}
          />
        </StyledTitle>
        <StyledTitle>
          <TitleV2
            renderLeft={getTitleRenderLeft(2)}
            titleStyle={getTitleStyle(2)}
          />
        </StyledTitle>
        <StyledContent>
          <div>
            <Table
              borderItem={tableHeadBorderStyle}
              contents={{
                data: [],
                type: 'none',
              }}
              headColor={Colors.white}
              headHeight={33.5}
              titles={tableTitlePhoneInfo}
            />
          </div>
        </StyledContent>
        <StyledFooter></StyledFooter>
      </StyledWrapper>
    </>
  );
}

PhoneView.defaultProps = {};

export default PhoneView;
