import _ from 'lodash';
import { useCallback } from 'react';
import * as XLSX from 'xlsx';

import { ITableTitleData } from 'components/molecules/TableTitle';
import Utils from 'utils/new_utils';

function useExcel() {
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
