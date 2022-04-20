import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

import { ITableTitleData } from 'components/molecules/TableTitle';
import {
  setInitializeAllAutoMessageStatistics,
  setInitializeAllMessageStatistics,
} from 'modules/actions/statistics';
import { RootState } from 'modules/reducers';
import StatisticsFormat from 'utils/format/statistics';
import Utils from 'utils/new_utils';
import {
  tableTitleAutoMessageStatistics,
  tableTitleMessageStatistics,
} from 'utils/table/title';

function useExcel() {
  const allMessageStatisticsData = useSelector(
    (state: RootState) => state.statistics.allMessageStatistics,
  );
  const allAutoMessageStatisticsData = useSelector(
    (state: RootState) => state.statistics.allAutoMessageStatistics,
  );

  const dispatch = useDispatch();

  const setInitAllMessageStatistics = useCallback(() => {
    dispatch(setInitializeAllMessageStatistics());
  }, [dispatch]);

  const setInitAllAutoMessageStatistics = useCallback(() => {
    dispatch(setInitializeAllAutoMessageStatistics());
  }, [dispatch]);

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
