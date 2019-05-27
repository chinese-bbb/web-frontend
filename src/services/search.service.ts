import axios from 'axios';

export class SearchService {
  public search(keyword: string) {
    return axios.post('/fuzzy_query', { keyword });
  }

  public queryMerchant(id: string) {
    return axios.post('/merchant_query', { keyword: id });
  }
}

export default new SearchService();
