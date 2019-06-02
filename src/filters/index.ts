import { DateTime, Duration } from 'luxon';

export function DateFilter(value: Date | string | never, format = 'yyyy-MM-dd', empty = '未知') {
  if (!value) {
    return empty;
  }

  if (value instanceof Date) {
    return DateTime.fromJSDate(value).toFormat(format);
  }

  if (typeof value === 'string') {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  }
}

export function yearDuration(value: string, older: string, empty = '未知') {
  if (!value || !older) {
    return empty;
  }

  const newDate = new Date(value);
  const oldDate = new Date(older);

  return Duration.fromMillis(newDate.getTime() - oldDate.getTime())
    .as('years')
    .toFixed();
}
