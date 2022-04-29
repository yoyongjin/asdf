import { Colors } from 'utils/color';
import constants, { ZIBOX_TRANSPORT, ZIBOX_VERSION } from 'utils/constants';

export const tableTitleDependencyAllCallStatistics = [...new Array(11)].map(
  (v, i) => {
    const property = {
      backgroundColor: Colors.blue8,
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 11,
      letterSpacing: -0.55,
      title: '',
      width: 47,
    };

    switch (i) {
      case 0: {
        property.title = '시도콜';

        break;
      }
      case 1: {
        property.title = '연결콜';

        break;
      }
      case 2: {
        property.title = '부재콜';

        break;
      }
      case 3: {
        property.title = '연결률(%)';
        property.width = 63;

        break;
      }
      case 4: {
        property.title = '통화시간';
        property.width = 57;

        break;
      }
      case 5: {
        property.title = '통화시간(초)';
        property.width = 75;

        break;
      }
      case 6: {
        property.title = '평균통화시간';
        property.width = 79;

        break;
      }
      case 7: {
        property.title = '링시간';
        property.width = 57;

        break;
      }
      case 8: {
        property.title = '링시간(초)';
        property.width = 75;

        break;
      }
      case 9: {
        property.title = '순수 통화시간';
        property.width = 81;

        break;
      }
      case 10: {
        property.title = '순수 통화시간(초)';
        property.width = 99;

        break;
      }
    }

    return property;
  },
);

export const tableTitleDependencyOutcomingCallStatistics = [
  ...new Array(11),
].map((v, i) => {
  const property = {
    backgroundColor: Colors.yellow1,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 11,
    letterSpacing: -0.55,
    title: '',
    width: 47,
  };

  switch (i) {
    case 0: {
      property.title = '시도콜';

      break;
    }
    case 1: {
      property.title = '연결콜';

      break;
    }
    case 2: {
      property.title = '부재콜';

      break;
    }
    case 3: {
      property.title = '연결률(%)';
      property.width = 63;

      break;
    }
    case 4: {
      property.title = '통화시간';
      property.width = 57;

      break;
    }
    case 5: {
      property.title = '통화시간(초)';
      property.width = 75;

      break;
    }
    case 6: {
      property.title = '평균통화시간';
      property.width = 79;

      break;
    }
    case 7: {
      property.title = '링시간';
      property.width = 57;

      break;
    }
    case 8: {
      property.title = '링시간(초)';
      property.width = 75;

      break;
    }
    case 9: {
      property.title = '순수 통화시간';
      property.width = 81;

      break;
    }
    case 10: {
      property.title = '순수 통화시간(초)';
      property.width = 99;

      break;
    }
  }

  return property;
});

export const tableTitleDependencyIncomingCallStatistics = [
  ...new Array(11),
].map((v, i) => {
  const property = {
    backgroundColor: Colors.red1,
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 11,
    letterSpacing: -0.55,
    title: '',
    width: 47,
  };

  switch (i) {
    case 0: {
      property.title = '시도콜';

      break;
    }
    case 1: {
      property.title = '연결콜';

      break;
    }
    case 2: {
      property.title = '부재콜';

      break;
    }
    case 3: {
      property.title = '연결률(%)';
      property.width = 63;

      break;
    }
    case 4: {
      property.title = '통화시간';
      property.width = 57;

      break;
    }
    case 5: {
      property.title = '통화시간(초)';
      property.width = 75;

      break;
    }
    case 6: {
      property.title = '평균통화시간';
      property.width = 79;

      break;
    }
    case 7: {
      property.title = '링시간';
      property.width = 57;

      break;
    }
    case 8: {
      property.title = '링시간(초)';
      property.width = 75;

      break;
    }
    case 9: {
      property.title = '순수 통화시간';
      property.width = 81;

      break;
    }
    case 10: {
      property.title = '순수 통화시간(초)';
      property.width = 99;

      break;
    }
  }

  return property;
});

export const tableTitleCallStatisticsByConsultant = [...new Array(8)].map(
  (v, i) => {
    const property = {
      backgroundColor: 'inherit',
      borderColor: Colors.gray14,
      borderStyle: 'solid',
      borderWidth: 1,
      colSpan: 1,
      fontFamily: 'Malgun Gothic',
      fontSize: 12,
      letterSpacing: -0.6,
      rowSpan: 1,
      title: '',
      width: 727,
    };

    switch (i) {
      case 0: {
        property.rowSpan = 2;
        property.title = '센터';
        property.width = 140;

        break;
      }
      case 1: {
        property.rowSpan = 2;
        property.title = '팀(상담조직)';
        property.width = 143;

        break;
      }
      case 2: {
        property.rowSpan = 2;
        property.title = '상담사 명';
        property.width = 81;

        break;
      }
      case 3: {
        property.rowSpan = 2;
        property.title = '상담사 ID';
        property.width = 109;

        break;
      }
      case 4: {
        property.rowSpan = 2;
        property.title = '일시';
        property.width = 119;

        break;
      }
      case 5: {
        property.backgroundColor = Colors.blue8;
        property.colSpan = 11;
        property.title = '전체';

        break;
      }
      case 6: {
        property.backgroundColor = Colors.yellow1;
        property.colSpan = 11;
        property.title = '발신';

        break;
      }
      case 7: {
        property.backgroundColor = Colors.red1;
        property.colSpan = 11;
        property.title = '수신';

        break;
      }
    }

    return property;
  },
);

export const tableTitleDependencyCallStatistics = [
  [
    ...tableTitleDependencyAllCallStatistics,
    ...tableTitleDependencyOutcomingCallStatistics,
    ...tableTitleDependencyIncomingCallStatistics,
  ],
];

export const tableTitleCallStatisticsByTeam = [...new Array(6)].map((v, i) => {
  const property = {
    backgroundColor: 'inherit',
    borderColor: Colors.gray14,
    borderStyle: 'solid',
    borderWidth: 1,
    colSpan: 1,
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    letterSpacing: -0.6,
    rowSpan: 1,
    title: '',
    width: 727,
  };

  switch (i) {
    case 0: {
      property.rowSpan = 2;
      property.title = '센터';
      property.width = 140;

      break;
    }
    case 1: {
      property.rowSpan = 2;
      property.title = '팀(상담조직)';
      property.width = 143;

      break;
    }
    case 2: {
      property.rowSpan = 2;
      property.title = '일시';
      property.width = 119;

      break;
    }
    case 3: {
      property.backgroundColor = Colors.blue8;
      property.colSpan = 11;
      property.title = '전체';

      break;
    }
    case 4: {
      property.backgroundColor = Colors.yellow1;
      property.colSpan = 11;
      property.title = '발신';

      break;
    }
    case 5: {
      property.backgroundColor = Colors.red1;
      property.colSpan = 11;
      property.title = '수신';

      break;
    }
  }

  return property;
});

export const tableTitleMessageStatistics = [...new Array(13)].map((v, i) => {
  const property = {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    textAlign: 'center',
    title: '',
    width: 5,
  };

  switch (i) {
    case 0: {
      property.title = '일자';
      property.width = 10;

      break;
    }
    case 1: {
      property.title = '센터';
      property.width = 15;

      break;
    }
    case 2: {
      property.title = '팀';
      property.width = 15;

      break;
    }
    case 3: {
      property.title = 'TMR 코드';
      property.width = 15;

      break;
    }
    case 4: {
      property.title = 'TMR 명';

      break;
    }
    case 5: {
      property.title = '일 최대발송수량';

      break;
    }
    case 6: {
      property.title = '일 총사용량';

      break;
    }
    case 7: {
      property.title = '일 자동문자';

      break;
    }
    case 8: {
      property.title = '일 MMS';

      break;
    }
    case 9: {
      property.title = '당월 최대발송수량';

      break;
    }
    case 10: {
      property.title = '당월 총사용량';

      break;
    }
    case 11: {
      property.title = '당월 자동문자';
      break;
    }
    case 12: {
      property.title = '당월 MMS';

      break;
    }
  }

  return property;
});

export const tableTitleAutoMessageStatistics = [...new Array(8)].map((v, i) => {
  const property = {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '',
    width: 5,
  };

  switch (i) {
    case 0: {
      property.title = '일자';

      break;
    }
    case 1: {
      property.title = '센터';
      property.width = 10;

      break;
    }
    case 2: {
      property.title = '팀';
      property.width = 10;

      break;
    }
    case 3: {
      property.title = 'TMR 코드';
      property.width = 10;

      break;
    }
    case 4: {
      property.title = 'TMR 명';
      property.width = 5;

      break;
    }
    case 5: {
      property.title = '제목';
      property.width = 20;

      break;
    }
    case 6: {
      property.title = '발송 조건';
      property.width = 25;

      break;
    }
    case 7: {
      property.title = '발송 건수';

      break;
    }
  }

  return property;
});

export const tableTitleUserInfo = [...new Array(10)].map((v, i) => {
  const property = {
    fontColor: Colors.white,
    fontSize: 13,
    isNotShow: false,
    isWidthPercent: true,
    title: '',
    width: 0,
  };

  const addWidth = constants.ZIBOX_VERSION === ZIBOX_VERSION.ZIBOX ? 0 : 5;

  switch (i) {
    case 0: {
      property.title = '센터명';
      property.width = 10 + addWidth;

      break;
    }
    case 1: {
      property.title = '팀명';
      property.width = 10 + addWidth;

      break;
    }
    case 2: {
      property.title = '권한';
      property.width = 7 + addWidth;

      break;
    }
    case 3: {
      property.title = '이름';
      property.width = 5 + addWidth;

      break;
    }
    case 4: {
      property.title = '아이디.';
      property.width = 10 + addWidth;

      break;
    }
    case 5: {
      property.title = '전화번호.';
      property.width = 15 + addWidth;

      break;
    }
    case 6: {
      property.title = 'PC IP';
      property.width = 15 + addWidth;

      break;
    }
    case 7: {
      property.isNotShow = constants.ZIBOX_VERSION === ZIBOX_VERSION.ZIBOX2;
      property.title = 'ZiBox IP';
      property.width = 15;

      break;
    }
    case 8: {
      property.isNotShow = constants.ZIBOX_VERSION === ZIBOX_VERSION.ZIBOX2;
      property.title = 'ZiBox MAC.';
      property.width = 15;

      break;
    }
    case 9: {
      property.title = '';
      property.width = 5 + addWidth;

      break;
    }
  }

  return property;
});

export const tableTitlePhoneInfo = [...new Array(10)].map((v, i) => {
  const property = {
    fontFamily: 'Malgun Gothic',
    fontSize: 12,
    isWidthPercent: true,
    letterSpacing: -0.6,
    paddingLeft: 10,
    textAlign: 'left',
    title: '',
    width: 5,
  };

  switch (i) {
    case 0: {
      property.title = '법인폰 번호';
      property.width = 10;

      break;
    }
    case 1: {
      property.title = '통신사';

      break;
    }
    case 2: {
      property.title = '요금제';
      property.width = 10;

      break;
    }
    case 3: {
      property.title = '개통상태';

      break;
    }
    case 4: {
      property.title = '센터명';
      property.width = 10;

      break;
    }
    case 5: {
      property.title = '팀명';
      property.width = 10;

      break;
    }
    case 6: {
      property.title = 'TMR 명';
      property.width = 5;

      break;
    }
    case 7: {
      property.title = 'TMR 코드';
      property.width = 10;

      break;
    }
    case 8: {
      property.title = '최근 변경일시';
      property.width = 10;

      break;
    }
    case 9: {
      property.title = '';
      property.isWidthPercent = false;
      property.width = 80;

      break;
    }
  }

  return property;
});
