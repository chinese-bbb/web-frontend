import axios from 'axios';

export class MerchantService {
  public getCurrentUserInfo() {
    return axios.get('/users/me');
  }

  public queryComplaints(merchantId: string) {
    return axios.get('/complains', { params: { type: 1, id: merchantId } });
  }
}

export default new MerchantService();
