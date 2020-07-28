export const getYYYYMMDD = (timestamp: number, delim = '.'): string => {
  let date = new Date(timestamp);
  let year = date.getFullYear() + '';
  let month = date.getMonth() + 1 + '';
  let _date = date.getDate() + '';

  let fullDate = year + delim + pad(month) + delim + pad(_date);

  return fullDate;
};

export const getHourMinSec = (timestamp: number, delim = ':'): string => {
  let date = new Date(timestamp);
  let hour = date.getHours() + '';
  let min = date.getMinutes() + '';
  let sec = date.getSeconds() + '';

  let fullTime = pad(hour) + delim + pad(min) + delim + pad(sec);

  return fullTime;
};

const pad = (data: string, standard = 2): string => {
  if (data.length < standard) {
    return '0' + data;
  }

  return data;
};
