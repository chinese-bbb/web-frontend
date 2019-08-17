import axios from 'axios';
import { MerchantResponse } from '@/models';

export class SearchService {
  public search(keyword: string, page = 0) {
    return axios.get('/merchants/merchant_search', { params: { keyword, pageIndex: page } });
  }

  public queryMerchantByQccId(id: string | number) {
    return axios.get<MerchantResponse>('/merchants/merchant_query', { params: { keyword: id } });
  }
}

export default new SearchService();
