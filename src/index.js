import './sass/main.scss';
import imageTpl from './tamplates/image.hbs';
import NewApiService from './apiService';
import { success, error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

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
    ApiService.fetchImages()
      .then(imageMarkup)
      .then(er =>
        success({
          text: 'Успешно!',
        }),
      )
      .catch(er =>
        error({
          text: 'Неверные параметры поиска!',
        }),
      );

    refs.imageContainer.innerHTML = '';
  }
}

function onBtnLoad() {
  ApiService.fetchImages().then(imageMarkup);

  refs.page.textContent = ApiService.PageQuery;
}

function imageMarkup(data) {
  refs.imageContainer.insertAdjacentHTML('beforeend', imageTpl(data.hits));

  if (data.total > 12) {
    refs.btnLoad.classList.replace('btn-load', 'btn-load-visible');
  }

  const element = refs.imageContainer.lastElementChild.firstElementChild;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

// function clearImageContainer() {
//   refs.imageContainer.innerHTML = '';
// }

function onInputChange(e) {
  if (e.currentTarget.elements.query.value === '') {
    refs.btnLoad.classList.replace('btn-load-visible', 'btn-load');
    ApiService.resetPage();
    refs.page.textContent = ApiService.PageQuery;
  }
}
