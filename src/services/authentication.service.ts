import axios from 'axios';
import { SignUpMeta } from '@/models';
// @ts-ignore
import { parsePhoneNumberFromString } from '../libs/libphonenumber-custom/mobile.js';

export class AuthenticationService {
  public signin(username: string, pwd: string) {
    const result = parsePhoneNumberFromString(username, 'CN');
    return axios.post('/auth/login', { phone_num: result.number, password: pwd });
  }

  public signout() {
    return axios.post('/auth/logout');
  }

  public signup(info: SignUpMeta) {
    const result = parsePhoneNumberFromString(info.phoneNum, 'CN');

    return axios.post('/auth/register', {
      phone_num: result.number,
      password: info.password,
      sex: info.sex,
      last_name: info.lastName,
      first_name: info.firstName,
      email: info.email,
    });
  }

  public sendSMS(phoneNum: string) {
    const result = parsePhoneNumberFromString(phoneNum, 'CN');
    return axios.post('/auth/sms/request', {
      national_number: result.nationalNumber,
      country_code: result.countryCallingCode,
    });
  }

  public validateSMS(phoneNum: string, captcha: string) {
    const result = parsePhoneNumberFromString(phoneNum, 'CN');
    return axios.post('/auth/sms/validate', { phone_num: result.number, v_code: captcha });
  }

  public resetPwd(phoneNum: string, password: string) {
    const result = parsePhoneNumberFromString(phoneNum, 'CN');
    return axios.post('/auth/resetpw', { phone_num: result.number, new_password: password });
  }

  public identifyUser(path: string) {
    return axios.post('/auth/identify', { id_path: path });
  }

  public isPhoneExisted(phoneNum: string) {
    const result = parsePhoneNumberFromString(phoneNum, 'CN');
    return axios.get(`/auth/phone_exist/${result.number}`);
  }
}

export default new AuthenticationService();
