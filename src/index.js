import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import NewsApiService from './js/fetchCountries';
import { fetchCountries } from './js/fetchCountries';
const DEBOUNCE_DELAY = 300;
// const newsApiService = new NewsApiService();

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener('input', debounce(onSearchField, DEBOUNCE_DELAY));

function onSearchField() {
  // newsApiService.query = e.target.value.trim();
  // newsApiService.fetchCountries();
  const searchingResult = searchBox.value.trim();
  cleaningData();

  if (searchingResult !== '') {
    fetchCountries(searchingResult)
      .then(countriesNames => {
        if (countriesNames.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (countriesNames.length >= 2 && countriesNames.length <= 10) {
          makeupCountryList(countriesNames);
        } else if (countriesNames.length === 1) {
          makeupCountryInfo(countriesNames);
          Notiflix.Notify.success('This is your country');
        } else {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        }
      })
      .catch(error => Notiflix.Notify.failure(`${error}`));
  }
}

function makeupCountryList(countryName) {
  const markup = countryName
    .map(({ flags, name }) => {
      return `<li>
      <img src="${flags.svg}" alt="Flag of ${name.official}" width="60" hight="40">
         <p>${name.official}</p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function makeupCountryInfo(countryData) {
  const markup = countryData
    .map(({ flags, name, capital, population, languages }) => {
      return `<li>
      <img src="${flags.svg}" alt="Flag of ${
        name.official
      }" width="120" hight="80">
         <h1 class="country-name">${name.official}</h1></p>
            <p><b>Capital</b>: ${capital}</p>
            <p><b>Population</b>: ${population}</p>
            <p><b>Languages</b>: ${Object.values(languages)} </p>
                </li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function cleaningData() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}
