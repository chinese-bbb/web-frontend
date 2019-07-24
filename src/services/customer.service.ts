import axios from 'axios';
import { UserModel } from '@/models';

export class CustomerService {
  public getCurrentUserInfo() {
    return axios.get<UserModel>('/users/me');
  }

  public queryComplaints(customerId: string) {
    return axios.get('/complains', { params: { type: 0, id: customerId } });
  }
}

export default new CustomerService();
