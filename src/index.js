import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  selectEl: document.querySelector('.breed-select'),
  catInfoEl: document.querySelector('.cat-info'),
  loaderEl: document.querySelector('.loader'),
  errorEl: document.querySelector('.error'),
};

function showLoader() {
  refs.loaderEl.style.display = 'block';
  refs.selectEl.style.display = 'none';
  refs.catInfoEl.style.display = 'none';
}

function hiddenLoader() {
  refs.loaderEl.style.display = 'none';
  refs.selectEl.style.display = 'block';
  refs.catInfoEl.style.display = 'block';
}

function showError(message) {
  refs.errorEl.textContent = message;
}

function clearError() {
  refs.errorEl.textContent = '';
}

clearError();
showLoader();
fetchBreeds()
  .then(data => {
    if (data) {
      data.forEach(breed => {
        const option = document.createElement('option');
        option.value = breed.id;
        option.textContent = breed.name;
        refs.selectEl.appendChild(option);
      });
    } else {
      throw new Error('Oops! Something went wrong! Try reloading the page!');
    }
    hiddenLoader();
  })
  .catch(err => {
    showError(err.message);
    hiddenLoader();
  });

export const onSelectElChange = event => {
  const selectedAnimal = event.target.value;
  clearError();
  showLoader();
  fetchCatByBreed(selectedAnimal)
    .then(data => {
      if (data) {
        const catImageUrl = data[0].url;
        const catName = data[0].breeds[0].name;
        const catDescr = data[0].breeds[0].description;

        const markUp = `<img src="${catImageUrl}" height=400 width="600"/>
         <h2 class="cats-name">${catName}</h2> <p>${catDescr}</p>`;

        refs.catInfoEl.innerHTML = markUp;
      } else {
        throw new Error('Oops! Something went wrong! Try reloading the page!');
      }
      hiddenLoader();
    })
    .catch(err => {
      showError(err.message);
      hiddenLoader();
    });
};

refs.selectEl.addEventListener('change', onSelectElChange);
