import axios from 'axios';

export class SearchService {
  public search(keyword: string) {
    return axios.post('/fuzzy_query', { keyword });
  }
}

export default new SearchService();
