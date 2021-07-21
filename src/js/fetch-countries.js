import countryInfoTpl from '../template/country-info-tpl';
import countriesSearchListTpl from '../template/countries-search-tpl.hbs';
import debounce from 'lodash.debounce';
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";
import { fetchCountries } from './fetch-countries-api';
import getRefs from './refs';

const refs = getRefs();

let searchQuery = '';

refs.search.addEventListener('input', debounce(onSearchCountry, 500));

function renderSearchCountries(countries) {
    if (countries.length > 10) {
        return error({ text: "Too many matches found. Please enter a more specific query!" });
    }

    if (countries.length >= 2 && countries.length <= 10) {
        markupCountryList(countries);
        return;
    }

    markupCountryInfo(countries);
}

function markupCountryList(countries) {
    const markupCountryList = countriesSearchListTpl(countries);
        refs.country.insertAdjacentHTML('beforeend', markupCountryList); 
}

function markupCountryInfo(countries) {
    const markup = countryInfoTpl(countries);
    refs.country.insertAdjacentHTML('beforeend', markup);
}

function onSearchCountry() {
    refs.country.innerHTML = '';
    searchQuery = refs.search.value; 
    fetchCountries(searchQuery)
        .then(renderSearchCountries)
        .catch(error => console.log(error))
}

    
