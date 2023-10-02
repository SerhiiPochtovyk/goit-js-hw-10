import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_SWwNDJ6lixvIgMTFSA1O4wT3iaw1WygGWikOVhdwUP1RCHZe5g4W3gX9Bf2NR5Jv';

export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
  const url = `${BASE_URL}`;
  return axios.get(url).then(response => {
    if (!response.ok) {
      return response.data;
    } else {
      throw new Error(
        `Oops! Something went wrong! Try reloading the page! (${response.status})`
      );
    }
  });
}

export const fetchCatByBreed = selectedAnimal => {
  const catBaseUrl = `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedAnimal}`;
  return axios.get(catBaseUrl).then(response => {
    if (!response.ok) {
      return response.data;
    } else {
      throw new Error(
        `Oops! Something went wrong! Try reloading the page! (${response.status})`
      );
    }
  });
};
