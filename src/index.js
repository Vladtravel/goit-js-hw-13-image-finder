import './sass/main.scss';
import imageTpl from './tamplates/image.hbs';
import NewApiService from './apiService';

const refs = {
  form: document.querySelector('.search-form'),
  imageContainer: document.querySelector('.js-image'),
  btnLoad: document.querySelector('.btn-load'),
  page: document.querySelector('.page-number'),
};

const ApiService = new NewApiService();

refs.form.addEventListener('submit', onSearch);
refs.btnLoad.addEventListener('click', onBtnLoad);
refs.form.addEventListener('input', onInputChange);

function onSearch(e) {
  e.preventDefault();

  ApiService.query = e.currentTarget.elements.query.value;
  ApiService.resetPage();
  refs.page.textContent = ApiService.PageQuery;

  if (ApiService.query.trim() !== '') {
    ApiService.fetchImages().then(imageMarkup);

    refs.imageContainer.innerHTML = '';
  }
}

function onBtnLoad(e) {
  ApiService.fetchImages().then(imageMarkup);

  refs.page.textContent = ApiService.PageQuery;
  console.dir(refs.imageContainer);

  const element = refs.imageContainer.lastElementChild.lastElementChild;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function imageMarkup(data) {
  refs.imageContainer.insertAdjacentHTML('beforeend', imageTpl(data.hits));
  if (data.total > 12) {
    refs.btnLoad.classList.replace('btn-load', 'btn-load-visible');
  }
}

function clearImageContainer() {
  refs.imageContainer.innerHTML = '';
}

function onInputChange(e) {
  if (e.currentTarget.elements.query.value === '') {
    refs.btnLoad.classList.replace('btn-load-visible', 'btn-load');
    ApiService.resetPage();
    refs.page.textContent = ApiService.PageQuery;
  }
}
