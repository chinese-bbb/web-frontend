import axios from 'axios';
import { RawComplaint } from '@/models';

export class ComplaintService {
  public createComplaint(rawComplaint: RawComplaint) {
    return axios.post('/complain', rawComplaint);
  }
}

export default new ComplaintService();
