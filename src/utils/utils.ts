export const getYYYYMMDD = (timestamp: number, delim = '.'): string => {
  let date = new Date(timestamp);
  let year = date.getFullYear() + '';
  let month = date.getMonth() + 1 + '';
  let _date = date.getDate() + '';

  let fullDate = `${year}${delim}${pad(month)}${delim}${pad(_date)}`;

  return fullDate;
};

export const getHourMinSec = (timestamp: number, delim = ':'): string => {
  let date = new Date(timestamp);
  let hour = date.getHours() + '';
  let min = date.getMinutes() + '';
  let sec = date.getSeconds() + '';

  let fullTime = `${pad(hour)}${delim}${pad(min)}${delim}${pad(sec)}`;

  return fullTime;
};

export const getTimeToSecond = (second: number, delim = ':'): string => {
  let min: number | string = Math.floor(second / 60);
  let hour = Math.floor(min / 60) + '';
  let sec = (second % 60) + '';
  min = (min % 60) + '';

  let fullTime = `${pad(hour)}${delim}${pad(min)}${delim}${pad(sec)}`;
  return fullTime;
};

export const pad = (data: string, standard = 2): string => {
  if (data.length < standard) {
    return '0' + data;
  }

  return data;
};

export const getDiffTime = (timestamp: number) => {
  const current: number = new Date().getTime();
  const diff = current - Number(timestamp + '000');

  return diff;
};

export const getMaxPage = (count: number, divide = 5) => {
  let maxPage = Math.floor(count / divide);

  return maxPage;
};
