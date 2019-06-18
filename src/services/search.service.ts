import axios from 'axios';

export class SearchService {
  public search(keyword: string) {
    return axios.get('/fuzzy_query', { params: { keyword } });
  }

  public queryMerchant(id: string) {
    return axios.get('/merchant_query', { params: { keyword: id } });
  }
}

export default new SearchService();
