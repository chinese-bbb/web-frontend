import axios from 'axios';

export class CustomerService {
  public getCurrentUserInfo() {
    return axios.get('/users/me');
  }

  public queryComplaints(customerId: string) {
    return axios.get('/complains', {params: {type: 0, id: customerId}});
  }
}

export default new CustomerService();
