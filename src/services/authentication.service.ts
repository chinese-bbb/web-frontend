import axios from 'axios';

export class AuthenticationService {
  public signin(username: string, pwd: string) {
    return axios.post('', { username, pwd });
  }

  public signup(phoneNum: string, password: string, captcha: string) {
    return axios.post('', { phoneNum, password, captcha });
  }

  public sendSMS(phoneNum: string) {
    return axios.post('', { phoneNum });
  }
}

export default new AuthenticationService();
