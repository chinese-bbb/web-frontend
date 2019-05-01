import axios from 'axios';

export class AuthenticationService {
  public login(username: string, pwd: string) {
    return axios.post('', {username, pwd});
  }
}

export default new AuthenticationService();
