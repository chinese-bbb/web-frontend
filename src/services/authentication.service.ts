import axios from 'axios';

export class AuthenticationService {
  public signin(username: string, pwd: string) {
    return axios.post('/login', { phone_num: username, password: pwd });
  }

  public signout() {
    return axios.post('/logout');
  }

  public signup(phoneNum: string, password: string, sex: string) {
    return axios.post('/register', { phone_num: phoneNum, password, sex });
  }

  public sendSMS(phoneNum: string) {
    return axios.get('/sms/' + phoneNum /*, { params: { phone_num: phoneNum } }*/);
  }

  public validateSMS(phoneNum: string, captcha: string) {
    return axios.post('/sms/' + phoneNum, { /*phone_num: phoneNum,*/ v_code: captcha });
  }

  public resetPwd(phoneNum: string, password: string) {
    return axios.post('/resetpw', { phone_num: phoneNum, new_password: password });
  }

  public identifyUser(path: string) {
    return axios.post('/identify', {id_path: path});
  }
}

export default new AuthenticationService();
