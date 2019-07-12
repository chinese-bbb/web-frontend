export enum SignInType {
  Customer = 'c',
  Merchant = 'm',
}

// reference: https://cloud.tencent.com/info/5a3a9432e5d6931c2e66baeab681ab90.html
// China phone patten + hk phone pattern
export const phonePattern = /^(13[0-9]|14[5-9]|15[0-35-9]|16[5,6]|17[0-8]|18[0-9]|19[189])\d{8}$|^([5-9])\d{7}$/;
export const captchaPattern = /^\d{4,6}$/;
export const passwordPattern = /^[\x21-\x7e]+$/;
export const smsPattern = /^\d+$/;
