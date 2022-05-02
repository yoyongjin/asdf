import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { TablePagination, TitleV2 } from 'components/molecules';
import { IProperty as ITableProperty } from 'components/molecules/TableProperty';
import { Table } from 'components/organisms';
import useAuth from 'hooks/useAuth';
import useExcel from 'hooks/useExcel';
import useInputForm from 'hooks/useInputForm';
import usePage from 'hooks/usePage';
import usePhone from 'hooks/usePhone';
import { Colors } from 'utils/color';
import { tableTitlePhoneInfo } from 'utils/table/title';
import TableRow from 'utils/table/row';

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

const selectBoxPageLimitOption = [...new Array(3)].map((values, index) => {
  return {
    id: 5 * (index + 1),
    data: `${5 * (index + 1)}`,
  };
});

function PhoneView() {
  const [searchText, setSearchText] = useState<string>('');
  const { loginInfo } = useAuth();
  const { excelDownloadStatus } = useExcel();
  const { form, onChangeCheckBox, onChangeSelect } = useInputForm({
    match: false, // 할당여부
    limit: 15, // 페이징 개수
  });
  const { phones, getPhones } = usePhone();
  const {
    maxPhones,
    page,
    onChangeCurrentPage,
    onClickNextPage,
    onClickPrevPage,
  } = usePage();

  /**
   * @description 검색어 반영하기
   */
  const applySearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

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
   * @description 사용자 관리 테이블 상세 내용 정보들
   */
  const tablePropertyPhoneInfo = useMemo(() => {
    return phones.map((values) => {
      const row = TableRow.getRowPhoneInfo(values);

      let backgroundColor = '';
      if (!values.user_name) {
        backgroundColor = Colors.red1;
      }

      const userInfoItems: Array<ITableProperty> = row.map((value, index) => {
        return {
          data: {
            text: value,
          },
          styles: {
            fontFamily: 'Malgun Gothic',
            fontSize: 12,
          },
          type: 'text',
          propertyStyles: {
            backgroundColor,
            paddingLeft: 10,
          },
        };
      });

      const historyData = {
        data: {
          text: '내역',
          // onClick: onClickModifyAutoMessagePopup,
        },
        styles: {
          backgroundColor: Colors.white,
          borderColor: Colors.gray13,
          borderRadius: 12,
          borderStyle: 'solid',
          borderWidth: 1,
          fontColor: Colors.gray13,
          fontSize: 12,
          height: 2.4,
          width: 6.8,
        },
        type: 'button',
        propertyStyles: {
          backgroundColor,
        },
      };

      const modifyData = {
        data: {
          text: '수정',
          // onClick: onClickModifyAutoMessagePopup,
        },
        styles: {
          backgroundColor: Colors.white,
          borderColor: Colors.gray13,
          borderRadius: 12,
          borderStyle: 'solid',
          borderWidth: 1,
          fontColor: Colors.gray13,
          fontSize: 12,
          height: 2.4,
          width: 6.8,
        },
        type: 'button',
        propertyStyles: {
          backgroundColor,
        },
      };

      const removeData = {
        data: {
          text: '삭제',
          // onClick: handleRemoveAutoMessage,
        },
        styles: {
          backgroundColor: Colors.white,
          borderColor: Colors.gray13,
          borderRadius: 12,
          borderStyle: 'solid',
          borderWidth: 1,
          fontColor: Colors.gray13,
          fontSize: 12,
          height: 2.4,
          width: 6.8,
        },
        type: 'button',
        propertyStyles: {
          backgroundColor,
        },
      };

      userInfoItems.push(historyData, modifyData, removeData);

      return userInfoItems;
    });
  }, [phones]);

  /**
   * @description 사용자 관리 테이 내용 정보들
   */
  const tableContentPhoneInfo = useMemo(() => {
    return {
      data: tablePropertyPhoneInfo,
      originData: phones,
      styles: {
        rowHeight: 50,
      },
      type: 'phone-info',
    };
  }, [phones, tablePropertyPhoneInfo]);

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

    return [buttonConfig1];
  }, [excelDownloadStatus]);

  /**
   * @description 타이틀에 들어갈 search bar 정보들
   */
  const titleSearchBarData = useMemo(() => {
    const searchBarConfig1 = {
      type: 'search-bar',
      data: {
        buttonOnClick: applySearchText,
        name: 'search',
        placeholder: '전화번호',
      },
      styles: {
        width: 20,
      },
    };

    return [searchBarConfig1];
  }, [applySearchText]);

  /**
   * @description 타이틀에 들어갈 selectbox 정보들
   */
  const titleSelectData = useMemo(() => {
    const selectConfig1 = {
      type: 'select',
      data: {
        name: 'limit',
        onChange: onChangeSelect,
        options: selectBoxPageLimitOption,
        value: form.limit,
      },
      styles: {
        borderColor: Colors.gray7,
        borderRadius: 12.5,
        fontColor: Colors.gray4,
        width: 50,
      },
    }; // 페이지 개수

    return [selectConfig1];
  }, [form.limit, onChangeSelect]);

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

    const textConfig2 = {
      type: 'text',
      data: {
        text: '조회 개수 : ',
      },
      styles: {
        fontColor: Colors.gray1,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        minWidth: 30,
      },
    };

    return [textConfig1, textConfig2];
  }, []);

  /**
   * @description 타이틀 왼쪽 요소 가져오기
   * @param {number} type 요소 위치 순서
   */
  const getTitleRenderLeft = useCallback(
    (type: number) => {
      if (type === 1) {
      } else if (type === 2) {
        const renderData = [];

        const [textConfig1] = titleTextData;

        renderData.push(textConfig1);

        return {
          renderConfig: renderData,
        };
      }
    },
    [titleTextData],
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
        const renderData = [];
        const renderStyle = [];

        const [textConfig1, textCofngi2] = titleTextData;

        renderData.push(textCofngi2);
        renderData.push(...titleSelectData);
        renderData.push(...titleTextCheckBoxData);
        renderData.push(...titleSearchBarData);

        for (let i = 0; i < renderData.length; i++) {
          const defaultRenderStyle = {
            paddingRight: 0,
          };

          if (i === 0) {
            defaultRenderStyle.paddingRight = 10;
          }

          if (i === 1 || i === 2) {
            defaultRenderStyle.paddingRight = 18;
          }

          renderStyle.push(defaultRenderStyle);
        }

        return {
          renderConfig: renderData,
          renderStyle,
        };
      }
    },
    [
      titleButtonData,
      titleSearchBarData,
      titleSelectData,
      titleTextCheckBoxData,
      titleTextData,
    ],
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
        rightMarginTop: 10,
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

  useEffect(() => {
    getPhones(form.match, page, form.limit, searchText);
  }, [form.limit, form.match, getPhones, page, searchText]);

  /**
   * @description 현재 페이지가 최대 페이지보다 큰 경우 현재 페이지를 최대 페이지로 변경
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // 비로그인인 경우
      return;
    }

    onChangeCurrentPage(page, maxPhones, form.limit);
  }, [maxPhones, form.limit, onChangeCurrentPage, page, loginInfo.id]);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <TitleV2
            renderRight={getTitleRenderRight(1)}
            titleStyle={getTitleStyle(1)}
          />
        </StyledTitle>
        <StyledTitle>
          <TitleV2
            renderLeft={getTitleRenderLeft(2)}
            renderRight={getTitleRenderRight(2)}
            titleStyle={getTitleStyle(2)}
          />
        </StyledTitle>
        <StyledContent>
          <div>
            <Table
              borderItem={tableHeadBorderStyle}
              contents={tableContentPhoneInfo}
              headColor={Colors.white}
              headHeight={33.5}
              titles={tableTitlePhoneInfo}
            />
          </div>
        </StyledContent>
        <StyledFooter>
          <TablePagination
            count={maxPhones}
            divide={form.limit}
            curPage={page}
            onClickNextPage={onClickNextPage}
            onClickPrevPage={onClickPrevPage}
          />
        </StyledFooter>
      </StyledWrapper>
    </>
  );
}

PhoneView.defaultProps = {};

export default PhoneView;
