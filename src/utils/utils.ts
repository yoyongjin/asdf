import { AsYouType } from 'libphonenumber-js';
import { UserInfo } from  'modules/types/user';

const krPhone = new AsYouType('KR');

export const formatPhoneNumber = (str = '', delim = '-') => {
  const clean = str.replace(/[^\d]+/gi, '').substr(0, 13);
  let r = krPhone.input(clean);
  if (delim !== '-') r = r.replace(/-/g, delim);
  krPhone.reset();

  return r;
};

export const getYYYYMMDD = (timestamp: number, delim = '.'): string => {
  let date = new Date(timestamp);
  let year = date.getFullYear() + '';
  let month = date.getMonth() + 1 + '';
  let _date = date.getDate() + '';

  let fullDate = `${year}${delim}${pad(month)}${delim}${pad(_date)}`;

  return fullDate;
};

export const getHourMinSecV1 = (timestamp: number, delim = ':'): string => {
  let hours = Math.floor(timestamp / 3600);
  let minutes = Math.floor((timestamp - hours * 3600) / 60);
  let seconds = timestamp - hours * 3600 - minutes * 60;

  let fullTime = `${pad(hours.toString())}${delim}${pad(
    minutes.toString(),
  )}${delim}${pad(seconds.toString())}`;

  return fullTime;
};

export const getHourMinSecV2 = (timestamp: number, delim = ':'): string => {
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
  const diff = Math.floor((current - timestamp) / 1000);

  return diff;
};

export const getTime = (timestamp: number) => {
  return Math.floor(timestamp / 1000);
};

export const getMaxPage = (count: number, divide: number) => {
  let maxPage = count / divide;
  if (maxPage === 0) {
    maxPage += 1;
  }
  if (!Number.isInteger(maxPage)) {
    maxPage = Math.floor(maxPage) + 1;
  }

  return maxPage;
};

export const getSortList = (originList:Array<UserInfo>, property: String) => {
  let collator = new Intl.Collator('kr', { sensitivity: 'variant' });
  return originList.sort((r1: any, r2: any) => collator.compare(r2[property.toString()],r1[property.toString()])).reverse();
}