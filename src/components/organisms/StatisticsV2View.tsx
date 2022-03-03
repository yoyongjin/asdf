import React, { useState, useMemo } from 'react';
import styled from 'styled-components';

import { TabTitle, Title } from 'components/molecules';
import { Table } from 'components/organisms';
import { Colors } from 'utils/color';

const StyledWrapper = styled.div`
  height: 100%;
`;

const StyledTitle = styled.div`
  height: 6rem;
  width: 100%;
`;

const StyledStatisticsArea = styled.div`
  height: calc(100% - 6rem - 20px);
  overflow: auto;
  width: 100%;
`;

const StyledTableContent = styled.div`
  padding-top: 20px;
`;

const callStatisticsByConsultantTableTitles = [
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '센터',
    width: 140,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '팀(상담조직)',
    width: 143,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '상담사 명',
    width: 81,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '상담사 ID',
    width: 109,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '일시',
    width: 119,
  },
  {
    backgroundColor: Colors.blue8,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '전체',
    width: 727,
  },
  {
    backgroundColor: Colors.yellow1,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '발신',
    width: 727,
  },
  {
    backgroundColor: Colors.red1,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '수신',
    width: 727,
  },
];

const callStatisticsByTeamTableTitles = [
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '센터',
    width: 140,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '팀(상담조직)',
    width: 143,
  },
  {
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 2,
    title: '일시',
    width: 119,
  },
  {
    backgroundColor: Colors.blue8,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '전체',
    width: 727,
  },
  {
    backgroundColor: Colors.yellow1,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '발신',
    width: 727,
  },
  {
    backgroundColor: Colors.red1,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    letterSpacing: -0.6,
    colSpan: 11,
    title: '수신',
    width: 727,
  },
];

const notificationStatisticsTableTitles = [
  {
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '일자',
    width: 10,
  },
  {
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '센터',
    width: 15,
  },
  {
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '팀',
    width: 15,
  },
  {
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: 'TMR 코드',
    width: 15,
  },
  {
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: 'TMR 명',
    width: 10,
  },
  {
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '제목',
    width: 20,
  },
  {
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '발송 조건',
    width: 20,
  },
  {
    fontFamily: 'MalgunGothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '발송 건수',
    width: 10,
  },
];

const dependencyCallStatisticsTitles = [
  [
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '시도콜',
      width: 47,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결콜',
      width: 47,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '부재콜',
      width: 47,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결률(%)',
      width: 63,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간',
      width: 57,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '평균통화시간',
      width: 79,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간',
      width: 57,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간',
      width: 81,
    },
    {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간(초)',
      width: 99,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '시도콜',
      width: 47,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결콜',
      width: 47,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '부재콜',
      width: 47,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결률(%)',
      width: 63,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간',
      width: 57,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '평균통화시간',
      width: 79,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간',
      width: 57,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간',
      width: 81,
    },
    {
      backgroundColor: Colors.yellow1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간(초)',
      width: 100,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '시도콜',
      width: 47,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결콜',
      width: 47,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '부재콜',
      width: 47,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '연결률(%)',
      width: 63,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간',
      width: 57,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '통화시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '평균통화시간',
      width: 79,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간',
      width: 57,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '링시간(초)',
      width: 75,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간',
      width: 81,
    },
    {
      backgroundColor: Colors.red1,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'MalgunGothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '순수 통화시간(초)',
      width: 100,
    },
  ],
];

const tabTitle = [
  {
    name: '상담원별 통화 통계',
  },
  {
    name: '팀별 통화 통계',
  },
  {
    name: '알림 문자 통계',
  },
];

function StatisticsV2View() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const borderItem = useMemo(() => {
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

  const tableContents = useMemo(() => {
    return {
      data: [],
      styles: {
        tableHeight: 30,
      },
      type: 'stat',
    };
  }, []);

  return (
    <>
      <StyledWrapper>
        <StyledTitle>
          <Title bottomLinePixel={0} isExcel>
            <TabTitle
              selectedItem={selectedTabIndex}
              setSelectedItem={setSelectedTabIndex}
              tabs={tabTitle}
            />
          </Title>
        </StyledTitle>
        <StyledStatisticsArea>
          <StyledTableContent>
            {selectedTabIndex === 0 ? (
              // 상담원별 통화 통계
              <Table
                borderItem={borderItem}
                contents={tableContents}
                dependencyTitles={dependencyCallStatisticsTitles}
                headColor={Colors.white}
                headHeight={52}
                titles={callStatisticsByConsultantTableTitles}
              />
            ) : selectedTabIndex === 1 ? (
              // 팀별 통화 통계
              <Table
                borderItem={borderItem}
                contents={tableContents}
                dependencyTitles={dependencyCallStatisticsTitles}
                headColor={Colors.white}
                headHeight={52}
                titles={callStatisticsByTeamTableTitles}
              />
            ) : (
              // 알림 문자 통곈
              <Table
                borderItem={borderItem}
                contents={tableContents}
                headColor={Colors.white}
                headHeight={52}
                titles={notificationStatisticsTableTitles}
              />
            )}
          </StyledTableContent>
        </StyledStatisticsArea>
      </StyledWrapper>
    </>
  );
}

StatisticsV2View.defaultProps = {};

export default StatisticsV2View;
