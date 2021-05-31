import './sass/main.scss';
import countryTpl from './tamplates/country.hbs';
import countryList from './tamplates/countrylist.hbs';
import API from './fetchCountries';
import debounce from 'lodash.debounce';
import { error, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const countryContainer = document.querySelector('.js-country');
const inputCountry = document.querySelector('.js-input');

inputCountry.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  let searchQuery = e.target.value;
  searchQuery = searchQuery.trim();

  if (searchQuery !== '') {
    API.fetchCountries(searchQuery)
      .then(renderCountry)
      .catch(error => console.log('error'));
  }
}

function renderCountry(country) {
  if (country.length === 1) {
    const markup = countryTpl(country);
    countryContainer.innerHTML = markup;
  } else if (country.length >= 2 && country.length <= 10) {
    const markup = countryList(country);
    countryContainer.innerHTML = markup;
  } else if (country.length > 10) {
    error({
      text: 'Слишком много совпадений. Детализируйте пожалуйста запрос',
    });
  }
}
