import axios from 'axios';

export class CustomerService {
  public getCurrentUserInfo() {
    return axios.get('/users/me');
  }
}

export default new CustomerService();
