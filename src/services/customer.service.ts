import axios from 'axios';

export class CustomerService {
  public getCurrentUserInfo() {
    return axios.get('/user_me');
  }

  public queryComplaints(customerId: string) {
    return axios.get('/complains', { params: { type: 0, id: customerId } });
  }
}

export default new CustomerService();
