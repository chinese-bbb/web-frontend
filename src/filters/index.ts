import { DateTime, Duration } from 'luxon';
import { ComplaintState, ComplaintType, UserModel } from '@/models';

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

  const newDate = tryParseDateString(value);
  const oldDate = tryParseDateString(older);

  return Duration.fromObject(newDate.diff(oldDate).toObject())
    .as('years')
    .toFixed();
}

function tryParseDateString(dateStr: string) {
  let val = DateTime.fromISO(dateStr);

  if (!val.isValid) {
    val = DateTime.fromSQL(dateStr);
  }

  if (!val.isValid) {
    val = DateTime.fromRFC2822(dateStr);
  }

  if (!val.isValid) {
    throw new TypeError('Unable to parse date string: ' + dateStr);
  }

  return val;
}

export function complaintTypeMapping(value: ComplaintType) {
  switch (value) {
    case 'contract':
      return '合同或者账单问题';
    case 'customer_service':
      return '客服问题';
    case 'exchange_return':
      return '退换货问题';
    case 'fake_ad':
      return '虚假广告等相关问题';
    case 'infraction':
      return '商业违规行为等问题';
    case 'product_issue':
      return '产品或者服务质量问题';
    case 'shipping':
      return '物流问题';
    case 'warranty':
      return '保修问题';
    case 'other':
    default:
      return '其他';
  }
}

export function complaintStateMapping(value: ComplaintState) {
  switch (value) {
    case 'initialized':
      return '新投诉';
    case 'in_progress':
      return '沟通中';
    case 'resolved':
      return '已解决';
    default:
      return '未知';
  }
}

export function complaintStateClassMapping(value: ComplaintState) {
  switch (value) {
    case 'initialized':
      return 'danger';
    case 'in_progress':
      return 'warning';
    case 'resolved':
      return 'success';
    default:
      return 'info';
  }
}

export function calcUserName(value: UserModel, splitter = '') {
  if (!value) {
    return '';
  }

  if (value.first_name) {
    if (value.last_name) {
      return value.last_name + splitter + value.first_name;
    }

    if (value.sex) {
      return value.first_name + splitter + sexMapping(value.sex);
    }

    return value.first_name + splitter + 'XX';
  }
}

export function sexMapping(value: string) {
  return value === 'female' ? '女士' : '先生';
}
