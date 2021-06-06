export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=21869034-2ecf67829261e86afc712c967`;
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();

        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(NewQuery) {
    this.searchQuery = NewQuery;
  }

  get PageQuery() {
    return this.page;
  }

  set PageQuery(NewPageQuery) {
    this.page = NewPageQuery;
  }
}
