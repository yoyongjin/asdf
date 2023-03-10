import _ from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import styled, { css } from 'styled-components';

import { Modal } from 'components/atoms';
import { PhoneInfoPopup, TablePagination, TitleV2 } from 'components/molecules';
import { IProperty as ITableProperty } from 'components/molecules/TableProperty';
import { Table } from 'components/organisms';
import useAuth from 'hooks/useAuth';
import useExcel from 'hooks/useExcel';
import useInputForm from 'hooks/useInputForm';
import usePage from 'hooks/usePage';
import usePhone from 'hooks/usePhone';
import useVisible from 'hooks/useVisible';
import { IPhoneItem } from 'types/phone';
import { Colors } from 'utils/color';
import {
  tableTitlePhoneHistory,
  tableTitlePhoneManagement,
} from 'utils/table/title';
import TableRow from 'utils/table/row';
import useFetch from 'hooks/useFetch';
import constants from 'utils/constants';
import Toast from 'utils/toast';

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

  ${(props) => {
    if (constants.IS_IE_BROWSER) {
      return css`
        overflow-x: auto;
      `;
    }
  }}
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
  const { visible, onClickVisible } = useVisible();
  const [searchText, setSearchText] = useState<string>('');
  const [selectedPhoneInfo, setSelectedPhoneInfo] = useState<IPhoneItem | null>(
    null,
  );
  const [selectedItem, setSelectedItem] = useState<{
    id: number;
    number: string;
  } | null>();
  const { loginInfo } = useAuth();
  const { excelDownloadStatus } = useExcel();
  const { form, onChangeCheckBox, onChangeSelect } = useInputForm({
    match: false, // ????????????
    limit: 15, // ????????? ??????
  });
  const {
    phones,
    phoneHistory,
    getPhones,
    removePhoneInfo,
    getPhoneHistory,
    handleInitializePhoneHistory,
  } = usePhone();
  const {
    maxPhones,
    page,
    onChangeCurrentPage,
    onClickNextPage,
    onClickPrevPage,
  } = usePage();
  const {
    maxPhoneHist,
    page: phoneHistPage,
    onClickNextPage: onClickNextPagePhoneHist,
    onClickPrevPage: onClickPrevPagePhoneHist,
    onChangeCurrentPage: onChangeCurrentPagePhoneHist,
  } = usePage();
  const { modifyPhoneInfoStatus, removePhoneInfoStatus } = useFetch();

  /**
   * @description ?????? ?????? ??? ????????? ???????????? ?????? ??????
   */
  const handlePhoneInfoPopup = useCallback(
    (phoneInfo: IPhoneItem) => {
      setSelectedPhoneInfo(phoneInfo);
      onClickVisible();
    },
    [onClickVisible],
  );

  /**
   * @description ?????? ?????? ??? ????????? ???????????? ?????? ??????
   */
  const handleRemovePhoneInfo = useCallback(
    (id: number) => {
      if (loginInfo.admin_id < constants.ADMIN.REMOVE_PHONE_INFO_ADMIN) {
        Toast.warning('?????? ????????? ????????????.????');

        return;
      }

      removePhoneInfo(id);
    },
    [loginInfo.admin_id, removePhoneInfo],
  );

  const handleInitPhoneView = useCallback(() => {
    setSelectedItem(null);
    handleInitializePhoneHistory();
  }, [handleInitializePhoneHistory]);

  const handlePhoneHistoryView = useCallback(
    (id: number, number: string, isExcel = false) => {
      if (!isExcel) {
        setSelectedItem({
          id,
          number,
        });
      }
      getPhoneHistory(id, page, form.limit, isExcel);
    },
    [form.limit, getPhoneHistory, page],
  );

  /**
   * @description ????????? ????????????
   */
  const applySearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  /**
   * @description ????????? ?????? border style
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
   * @description ????????? ?????? ????????? ?????? ?????? ?????????
   */
  const tablePropertyPhoneInfo = useMemo(() => {
    return phones.map((values) => {
      const row = TableRow.getRowPhoneInfo(values);

      let backgroundColor = '';
      if (!values.tmr_cd) {
        // ????????? ?????????
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
          text: '??????',
          onClick: handlePhoneHistoryView,
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
          text: '??????',
          onClick: handlePhoneInfoPopup,
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
          text: '??????',
          onClick: handleRemovePhoneInfo,
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
  }, [
    handlePhoneHistoryView,
    handlePhoneInfoPopup,
    handleRemovePhoneInfo,
    phones,
  ]);

  /**
   * @description ????????? ?????? ?????? ?????? ?????????
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
   * @description ????????? ?????? ????????? ?????? ?????? ?????????
   */
  const tablePropertyPhoneHistory = useMemo(() => {
    return phoneHistory.map((values) => {
      const row = TableRow.getRowPhoneHistory(values);

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
            paddingLeft: 10,
          },
        };
      });

      return userInfoItems;
    });
  }, [phoneHistory]);

  /**
   * @description ????????? ?????? ?????? ?????? ?????????
   */
  const tableContentPhoneHistory = useMemo(() => {
    return {
      data: tablePropertyPhoneHistory,
      originData: phoneHistory,
      styles: {
        rowHeight: 50,
      },
      type: 'phone-history',
    };
  }, [phoneHistory, tablePropertyPhoneHistory]);

  /**
   * @description ???????????? ????????? ?????? ?????????
   */
  const titleButtonData = useMemo(() => {
    let onClickExcel: any;

    if (selectedItem) {
      onClickExcel = _.debounce(
        () =>
          handlePhoneHistoryView(selectedItem.id, selectedItem.number, true),
        1000,
      );
    } else {
      onClickExcel = _.debounce(
        () => getPhones(form.match, page, form.limit, searchText, true),
        1000,
      );
    }

    const buttonConfig1 = {
      type: 'button',
      data: {
        disabled: excelDownloadStatus,
        text: excelDownloadStatus ? '?????? ???..' : '???????????? ????????????',
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
  }, [
    form.limit,
    form.match,
    getPhones,
    handlePhoneHistoryView,
    page,
    excelDownloadStatus,
    searchText,
    selectedItem,
  ]);

  /**
   * @description ???????????? ????????? search bar ?????????
   */
  const titleSearchBarData = useMemo(() => {
    const searchBarConfig1 = {
      type: 'search-bar',
      data: {
        buttonOnClick: applySearchText,
        name: 'search',
        placeholder: '????????????',
      },
      styles: {
        width: 20,
      },
    };

    return [searchBarConfig1];
  }, [applySearchText]);

  /**
   * @description ???????????? ????????? selectbox ?????????
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
    }; // ????????? ??????

    return [selectConfig1];
  }, [form.limit, onChangeSelect]);

  /**
   * @description ???????????? ????????? icon ?????????
   */
  const titleIconData = useMemo(() => {
    const iconConfig1 = {
      type: 'icon',
      data: {
        icon: MdKeyboardArrowLeft,
        onClick: handleInitPhoneView,
      },
    };

    return [iconConfig1];
  }, [handleInitPhoneView]);

  /**
   * @description ???????????? ????????? text + checkbox ?????????
   */
  const titleTextCheckBoxData = useMemo(() => {
    const textCheckBoxConfig = {
      type: 'text-checkbox',
      data: {
        isChecked: form.match,
        isReverse: true,
        name: 'match',
        onChange: onChangeCheckBox,
        text: '?????????',
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
   * @description ???????????? ????????? text ?????????
   */
  const titleTextData = useMemo(() => {
    const textConfig1 = {
      type: 'text',
      data: {
        text: `????????? ??????`,
      },
    };

    const textConfig2 = {
      type: 'text',
      data: {
        text: '?????? ?????? : ',
      },
      styles: {
        fontColor: Colors.gray1,
        fontFamily: 'Malgun Gothic',
        fontSize: 12,
        minWidth: 30,
      },
    };

    const textConfig3 = {
      type: 'text',
      data: {
        text: `${selectedItem && selectedItem.number} ????????? ?????? ??????`,
      },
      styles: {
        fontColor: Colors.navy2,
        fontFamily: 'Malgun Gothic',
        fontSize: 18,
        fontWeight: 800,
      },
    };

    return [textConfig1, textConfig2, textConfig3];
  }, [selectedItem]);

  /**
   * @description ????????? ?????? ?????? ????????????
   * @param {number} type ?????? ?????? ??????
   */
  const getTitleRenderLeft = useCallback(
    (type: number) => {
      if (type === 1) {
      } else if (type === 2) {
        const renderData = [];

        const [textConfig1, textConfig2, textConfig3] = titleTextData;

        if (!selectedItem) {
          // ????????? ??????????????? ?????? ??????
          renderData.push(textConfig1);
        } else {
          renderData.push(...titleIconData);
          renderData.push(textConfig3);
        }

        return {
          renderConfig: renderData,
        };
      }
    },
    [selectedItem, titleIconData, titleTextData],
  );

  /**
   * @description ????????? ????????? ?????? ????????????
   * @param {number} type ?????? ?????? ??????
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

        if (!selectedItem) {
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
      }
    },
    [
      selectedItem,
      titleButtonData,
      titleSearchBarData,
      titleSelectData,
      titleTextCheckBoxData,
      titleTextData,
    ],
  );

  /**
   * @description ????????? style ????????????
   * @param {number} type ?????? ?????? ??????
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
    if (!loginInfo.id) {
      // ??????????????? ??????
      return;
    }

    if (!modifyPhoneInfoStatus && !removePhoneInfoStatus) {
      getPhones(form.match, page, form.limit, searchText, false);
    }
  }, [
    form.limit,
    form.match,
    getPhones,
    loginInfo.id,
    modifyPhoneInfoStatus,
    page,
    removePhoneInfoStatus,
    searchText,
  ]);

  /**
   * @description ?????? ???????????? ?????? ??????????????? ??? ?????? ?????? ???????????? ?????? ???????????? ??????
   */
  useEffect(() => {
    if (!loginInfo.id) {
      // ??????????????? ??????
      return;
    }

    if (selectedItem) {
      onChangeCurrentPagePhoneHist(phoneHistPage, maxPhoneHist, form.limit);

      return;
    }

    onChangeCurrentPage(page, maxPhones, form.limit);
  }, [
    maxPhones,
    form.limit,
    onChangeCurrentPage,
    page,
    loginInfo.id,
    selectedItem,
    onChangeCurrentPagePhoneHist,
    phoneHistPage,
    maxPhoneHist,
  ]);

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
          {selectedItem ? (
            <Table
              borderItem={tableHeadBorderStyle}
              contents={tableContentPhoneHistory}
              headColor={Colors.white}
              headHeight={33.5}
              titles={tableTitlePhoneHistory}
              type={constants.IS_IE_BROWSER ? 'table' : 'grid'}
            />
          ) : (
            <Table
              borderItem={tableHeadBorderStyle}
              contents={tableContentPhoneInfo}
              headColor={Colors.white}
              headHeight={33.5}
              titles={tableTitlePhoneManagement}
              type={constants.IS_IE_BROWSER ? 'table' : 'grid'}
            />
          )}
        </StyledContent>
        <StyledFooter>
          {selectedItem ? (
            <TablePagination
              count={maxPhoneHist}
              divide={form.limit}
              curPage={phoneHistPage}
              onClickNextPage={onClickNextPagePhoneHist}
              onClickPrevPage={onClickPrevPagePhoneHist}
            />
          ) : (
            <TablePagination
              count={maxPhones}
              divide={form.limit}
              curPage={page}
              onClickNextPage={onClickNextPage}
              onClickPrevPage={onClickPrevPage}
            />
          )}
        </StyledFooter>
      </StyledWrapper>
      <Modal
        isVisible={visible}
        Component={
          <PhoneInfoPopup
            isVisible={visible}
            loginInfo={loginInfo}
            onClickVisible={onClickVisible}
            phoneInfo={selectedPhoneInfo}
          />
        }
        paddingBottom={21}
        paddingLeft={36}
        paddingRight={36}
        paddingTop={24}
        width={300}
        height={300}
      />
    </>
  );
}

PhoneView.defaultProps = {};

export type THandlePhoneInfoPopup = (phoneInfo: IPhoneItem) => void;
export type THandleRemovePhoneInfo = (id: number) => void;
export type THandlePhoneView = (id: number, number: string) => void;

export default PhoneView;
