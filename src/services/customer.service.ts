import axios from 'axios';
import { UserModel } from '@/models';

export class CustomerService {
  public getCurrentUserInfo(skipErrorHandle = false) {
    return axios.get<UserModel>('/users/me', {
      meta: {
        skipCommonErrorHandle: skipErrorHandle,
      },
    });
  }

  public queryComplaints(customerId: string) {
    return axios.get('/complains', { params: { type: 0, id: customerId } });
  }
}

export default new CustomerService();
