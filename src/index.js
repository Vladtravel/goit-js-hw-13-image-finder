import './sass/main.scss';
import imageTpl from './tamplates/image.hbs';
import API from './apiService';

const imageContainer = document.querySelector('.js-image');
const input = document.querySelector('.js-input');
const form = document.querySelector('.search-form');
const page = document.querySelector('.page-number');

let pageNumber = 1;

form.addEventListener('submit', onSearch);
input.addEventListener('input', onInputChange);

function onSearch(e) {
  e.preventDefault();

  let searchQuery = input.value;
  searchQuery = searchQuery.trim();

  if (searchQuery !== '') {
    API.fetchImages(searchQuery, pageNumber)
      .then(renderImage)
      .catch(error => console.log('error'));
  }
}

function renderImage(image) {
  if (image.total > 12) {
    const btnLoad = document.querySelector('.btn-load');
    btnLoad.classList.replace('btn-load', 'btn-load-visible');
    btnLoad.addEventListener('click', onBtnLoad);
    console.log(image.total);
  }

  imageContainer.insertAdjacentHTML('beforeend', imageTpl(image.hits));
}

function onBtnLoad(e) {
  page.textContent = pageNumber;
  let sum = Number(page.textContent);
  sum += 1;
  page.textContent = sum;
  pageNumber = sum;
  let searchQuery = input.value;
  searchQuery = searchQuery.trim();

  if (searchQuery !== '') {
    API.fetchImages(searchQuery, pageNumber)
      .then(renderMoreImage)
      .catch(error => console.log('error'));
  }
}

function renderMoreImage(image) {
  imageContainer.insertAdjacentHTML('beforeend', imageTpl(image.hits));

  const element = imageContainer.lastChild.firstElementChild;
  element.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}

function onInputChange(image) {
  let searchQuery = input.value;
  searchQuery = searchQuery.trim();

  if (searchQuery === '') {
    page.textContent = 1;
    imageContainer.innerHTML = '';
    const btnLoad = document.querySelector('.btn-load-visible');
    btnLoad.classList.replace('btn-load-visible', 'btn-load');
  } else if (image.total <= 12 || searchQuery !== '') {
    const btnLoad = document.querySelector('.btn-load-visible');
    btnLoad.classList.replace('btn-load-visible', 'btn-load');
  }

  pageNumber = 1;
}
