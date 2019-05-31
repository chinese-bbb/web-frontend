import axios from 'axios';
import { RawComplaint } from '@/models';

export class CustomerService {
  public getCurrentUserInfo() {
    return axios.get('/users/me');
  }

  public createComplaint(rawComplaint: RawComplaint) {
    return axios.post('/complain', rawComplaint);
  }
}

export default new CustomerService();
