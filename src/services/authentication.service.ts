import axios from 'axios';
import { SignUpMeta } from '@/models';

export class AuthenticationService {
  public signin(username: string, pwd: string) {
    return axios.post('/auth/login', { phone_num: username, password: pwd });
  }

  public signout() {
    return axios.post('/auth/logout');
  }

  public signup(info: SignUpMeta) {
    return axios.post('/auth/register', {
      phone_num: info.phoneNum,
      password: info.password,
      sex: info.sex,
      last_name: info.lastName,
      first_name: info.firstName,
    });
  }

  public sendSMS(phoneNum: string) {
    return axios.get('/auth/sms/' + phoneNum /*, { params: { phone_num: phoneNum } }*/);
  }

  public validateSMS(phoneNum: string, captcha: string) {
    return axios.post('/auth/sms/' + phoneNum, { /*phone_num: phoneNum,*/ v_code: captcha });
  }

  public resetPwd(phoneNum: string, password: string) {
    return axios.post('/auth/resetpw', { phone_num: phoneNum, new_password: password });
  }

  public identifyUser(path: string) {
    return axios.post('/auth/identify', { id_path: path });
  }

  public isPhoneExisted(phone: string) {
    return axios.get(`/auth/phone_exist/${phone}`);
  }
}

export default new AuthenticationService();
