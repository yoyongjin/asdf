import _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

import { ITableTitleData } from 'components/molecules/TableTitle';
import { setExcelDownloadStatus } from 'modules/actions/statistics';
import { RootState } from 'modules/reducers';
import Utils from 'utils/new_utils';
import Toast from 'utils/toast';

let excelDownloadTimeout: NodeJS.Timeout | null = null;

function useExcel() {
  const excelDownloadStatus = useSelector(
    (state: RootState) => state.statistics.excelDownloadStatus,
  );

  const dispatch = useDispatch();

  /**
   * @description 소켓으로 이벤트를 받지 못할 경우를 처리하기 위한 로직
   */
  useEffect(() => {
    if (excelDownloadStatus) {
      excelDownloadTimeout = setTimeout(() => {
        Toast.warning('다운로드에 실패했어요..😭');

        dispatch(setExcelDownloadStatus(false));

        if (excelDownloadTimeout) {
          clearTimeout(excelDownloadTimeout);
          excelDownloadTimeout = null;
        }
      }, 1000 * 120);

      return;
    }

    if (excelDownloadTimeout) {
      clearTimeout(excelDownloadTimeout);
      excelDownloadTimeout = null;
    }
  }, [dispatch, excelDownloadStatus]);

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
    excelDownloadStatus,
    handleExcelDownload,
  };
}

export default useExcel;
