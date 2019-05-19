import axios from 'axios';

export class AuthenticationService {
  public signin(username: string, pwd: string) {
    return axios.post('/login', { phone_num: username, password: pwd });
  }

  public signup(phoneNum: string, password: string, captcha: string) {
    return axios.post('/register', { phoneNum, password, captcha });
  }

  public sendSMS(phoneNum: string) {
    return axios.post('/sms', { phoneNum });
  }

  public resetPwd(phoneNum: string, password: string) {
    return axios.post('/resetpwd', { phone_num: phoneNum, password });
  }
}

export default new AuthenticationService();
