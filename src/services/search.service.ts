import axios from 'axios';

export class SearchService {
  public search(keyword: string, page = 0) {
    return axios.get('/merchants/merchant_search', { params: { keyword, pageIndex: page } });
  }

  public queryMerchant(id: string) {
    return axios.get('/merchants/merchant_query', { params: { keyword: id } });
  }
}

export default new SearchService();
