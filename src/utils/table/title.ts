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
