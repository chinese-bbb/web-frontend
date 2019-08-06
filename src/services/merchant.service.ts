import axios from 'axios';
import { MerchantResponse } from '@/models';

export class MerchantService {
  public getCurrentUserInfo() {
    return axios.get('/users/me');
  }

  public queryMerchant(merchantId: string | number) {
    return axios.get<MerchantResponse>('/merchants/' + merchantId);
  }
}

export default new MerchantService();
