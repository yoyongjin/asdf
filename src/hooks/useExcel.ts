import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx-js-style';

import { ITableTitleData } from 'components/molecules/TableTitle';
import {
  setInitializeAllAutoMessageStatistics,
  setInitializeAllCallStatisticsByConsultant,
  setInitializeAllMessageStatistics,
} from 'modules/actions/statistics';
import { RootState } from 'modules/reducers';
import { DynamicJSON } from 'types/common';
import StatisticsFormat from 'utils/format/statistics';
import Utils from 'utils/new_utils';
import {
  tableTitleAutoMessageStatistics,
  tableTitleCallStatisticsByConsultant,
  tableTitleDependencyAllCallStatistics,
  tableTitleMessageStatistics,
} from 'utils/table/title';
import { Colors } from 'utils/color';

function useExcel() {
  const allMessageStatisticsData = useSelector(
    (state: RootState) => state.statistics.allMessageStatistics,
  );
  const allAutoMessageStatisticsData = useSelector(
    (state: RootState) => state.statistics.allAutoMessageStatistics,
  );
  const allCallStatisticsByConsultantData = useSelector(
    (state: RootState) => state.statistics.allCallStatisticsByConsultant,
  );

  const dispatch = useDispatch();

  const setInitAllCallStatisticsByConsultant = useCallback(() => {
    dispatch(setInitializeAllCallStatisticsByConsultant());
  }, [dispatch]);

  const setInitAllMessageStatistics = useCallback(() => {
    dispatch(setInitializeAllMessageStatistics());
  }, [dispatch]);

  const setInitAllAutoMessageStatistics = useCallback(() => {
    dispatch(setInitializeAllAutoMessageStatistics());
  }, [dispatch]);

  /**
   * @description 상담원별 통화 통계 엑셀
   */
  useEffect(() => {
    if (allCallStatisticsByConsultantData.length < 1) {
      return;
    }

    const infoTitleName = tableTitleCallStatisticsByConsultant
      .slice(0, 5)
      .map((property) => {
        return property.title;
      });

    const commonTitleName = tableTitleDependencyAllCallStatistics.map(
      (property) => {
        return property.title;
      },
    );

    const titleName = [...infoTitleName, ...commonTitleName];

    const infoTitleWidth = tableTitleCallStatisticsByConsultant
      .slice(0, 5)
      .map((property) => {
        return {
          width: property.width / 4,
        };
      });

    const commonTitleWidth = tableTitleDependencyAllCallStatistics.map(
      (property) => {
        return {
          width: property.width / 4,
        };
      },
    );

    const titleWidth = [...infoTitleWidth, ...commonTitleWidth];

    const allContent: Array<DynamicJSON> = [];
    const outcomingContent: Array<DynamicJSON> = [];
    const incomingContent: Array<DynamicJSON> = [];

    allCallStatisticsByConsultantData.forEach((values) => {
      const all = StatisticsFormat.getExcelAllCallStatisticsByConsultantItem(
        titleName,
        values,
      );

      const outcoming =
        StatisticsFormat.getExcelOutcomingCallStatisticsByConsultantItem(
          titleName,
          values,
        );

      const incoming =
        StatisticsFormat.getExcelIncomingCallStatisticsByConsultantItem(
          titleName,
          values,
        );

      allContent.push(all);
      outcomingContent.push(outcoming);
      incomingContent.push(incoming);
    });

    // 시트별 데이터 만들기
    const allWS = XLSX.utils.json_to_sheet(allContent);
    const outcomingWS = XLSX.utils.json_to_sheet(outcomingContent);
    const incomingWS = XLSX.utils.json_to_sheet(incomingContent);

    // 소계 / 합계 위치 찾기위한 변수
    const subTotals: Array<number> = [];
    const totals: Array<number> = [];

    Object.keys(allWS).forEach((key) => {
      // 스타일 적용을 위한 반복문
      const rowNumber = Number(Utils.replace(key, /[^0-9]/gi, ''));
      const columnAlphabet = Utils.replace(key, /[^A-Z]/gi, '');

      if (rowNumber === 1) {
        // 헤더일 경우 스타일 적용
        const headerStyle = {
          font: {
            bold: true,
          },
        };
        allWS[key].s = headerStyle;
        outcomingWS[key].s = headerStyle;
        incomingWS[key].s = headerStyle;

        return;
      }

      if (columnAlphabet === 'A') {
        if (allWS[key].v === '소계') {
          // 소계의 row를 찾기 위해
          subTotals.push(rowNumber);
        } else if (allWS[key].v === '합계') {
          // 합계의 row를 찾기 위해
          totals.push(rowNumber);
        }
      }

      if (subTotals.includes(rowNumber)) {
        // 소계 row일 경우
        const subTotalStyle = {
          fill: {
            fgColor: {
              rgb: Utils.replace(Colors.gray15, '#', ''),
            },
          },
        };

        allWS[key].s = subTotalStyle;
        outcomingWS[key].s = subTotalStyle;
        incomingWS[key].s = subTotalStyle;
      }

      if (totals.includes(rowNumber)) {
        // 합계 row일 경우
        const totalStyle = {
          fill: {
            fgColor: {
              rgb: Utils.replace(Colors.blue9, '#', ''),
            },
          },
        };

        allWS[key].s = totalStyle;
        outcomingWS[key].s = totalStyle;
        incomingWS[key].s = totalStyle;
      }
    });

    allWS['!cols'] = titleWidth;
    outcomingWS['!cols'] = titleWidth;
    incomingWS['!cols'] = titleWidth;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, allWS, '전체');
    XLSX.utils.book_append_sheet(wb, outcomingWS, '발신');
    XLSX.utils.book_append_sheet(wb, incomingWS, '수신');

    const fileName = `call_statistics_by_consultant.xlsx`;
    XLSX.writeFile(wb, fileName);

    // 초기화
    setInitAllCallStatisticsByConsultant();
  }, [allCallStatisticsByConsultantData, setInitAllCallStatisticsByConsultant]);

  /**
   * @description 문자 통계 엑셀
   */
  useEffect(() => {
    if (allMessageStatisticsData.length < 1) {
      return;
    }

    const titleName = tableTitleMessageStatistics.map((property) => {
      return property.title;
    });

    const titleWidth = tableTitleMessageStatistics.map((property) => {
      return {
        width: property.width * 2.5,
      };
    });

    const content = allMessageStatisticsData.map((values) => {
      const item = StatisticsFormat.getExcelMessageStatisticsItem(
        titleName,
        values,
      );

      return item;
    });

    const ws = XLSX.utils.json_to_sheet(content);
    ws['!cols'] = titleWidth;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);

    const fullData = Utils.getFullDate(new Date().getTime(), true, '', '', '_');
    const fileName = `${fullData}_문자통계.xlsx`;
    XLSX.writeFile(wb, fileName);

    setInitAllMessageStatistics();
  }, [allMessageStatisticsData, setInitAllMessageStatistics]);

  /**
   * @description 자동 문자 통계 엑셀
   */
  useEffect(() => {
    if (allAutoMessageStatisticsData.length < 1) {
      return;
    }

    const titleName = tableTitleAutoMessageStatistics.map((property) => {
      return property.title;
    });

    const titleWidth = tableTitleAutoMessageStatistics.map((property) => {
      return {
        width: property.width * 2,
      };
    });

    const content = allAutoMessageStatisticsData.map((values) => {
      const item = StatisticsFormat.getExcelAutoMessageStatisticsItem(
        titleName,
        values,
      );

      return item;
    });

    const ws = XLSX.utils.json_to_sheet(content);
    ws['!cols'] = titleWidth;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws);

    const fullData = Utils.getFullDate(new Date().getTime(), true, '', '', '_');
    const fileName = `${fullData}_자동문자통계.xlsx`;
    XLSX.writeFile(wb, fileName);

    setInitAllAutoMessageStatistics();
  }, [allAutoMessageStatisticsData, setInitAllAutoMessageStatistics]);

  const handleExcelDownload = useCallback(
    (titles: Array<ITableTitleData>, contents: Array<any>) => {
      const titleName: Array<string> = [];
      const titleWidth: Array<{ width: number }> = [];

      const title: any = {};

      titles.map((values) => {
        title[values.title] = 0;
        titleName.push(values.title);
        titleWidth.push({ width: values.width });
      });

      const data: any = [];

      contents.map((content) => {
        const tmp = _.cloneDeep(title);
        tmp['No.'] = content.id;
        tmp['팀명'] = content.team_name;
        tmp['법인폰 번호'] = Utils.formatPhoneNumber(content.number);
        tmp['OB 총 건수'] = content.outbound_count;
        tmp['연결 성공'] = content.success_count;
        tmp['연결률'] = `${
          content.success_ratio ? content.success_ratio + '%' : '0%'
        }`;
        tmp['콜백 건수'] = content.inbound_count;
        tmp['총 통화시간'] = Utils.getHourMinSecBySecond(content.all_call_time);

        data.push(tmp);
      });

      const ws = XLSX.utils.json_to_sheet(data, {
        header: titleName,
      });

      ws['!cols'] = titleWidth;

      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, '통계');
      XLSX.writeFile(
        wb,
        `${Utils.getYYYYMMDD(
          new Date().getTime(),
          '',
        )}${Utils.getHourMinSecByTimestamp(
          new Date().getTime(),
          '',
        )}_ZMS_Statistics.xlsx`,
      );
    },
    [],
  );

  return {
    handleExcelDownload,
  };
}

export default useExcel;
