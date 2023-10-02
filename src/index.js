import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import Swal from 'sweetalert2';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

catInfo.classList.add('is-hidden');

breedSelect.addEventListener('change', createMarkup);

updateSelect();

function updateSelect(data) {
  loader.classList.remove('is-hidden');

  fetchBreeds(data)
    .then(data => {
      loader.classList.add('is-hidden');
      breedSelect.classList.remove('is-hidden');
      breedSelect.innerHTML = '';
      let markSelect = data.map(({ name, id }) => {
        return `<option value ='${id}'>${name}</option>`;
      });
      breedSelect.insertAdjacentHTML('beforeend', markSelect);
      new SlimSelect({
        select: breedSelect,
      });
    })
    .catch(onError);
}

function createMarkup(event) {
  loader.classList.remove('is-hidden');
  catInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.add('is-hidden');
      breedSelect.classList.remove('is-hidden');
      const { url, breeds } = data[0];

      catInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" width="400"/><div class="box"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p><strong>Temperament:</strong> ${breeds[0].temperament}</p></div>`;
      catInfo.classList.remove('is-hidden');
    })
    .catch(onError);
}

function onError() {
  loader.classList.add('is-hidden');
  breedSelect.innerHTML = '';

  Swal.fire({
    icon: 'error',
    title: 'Oops!',
    text: 'Something went wrong! Try reloading the page!',
  });
}

// ======================================== ++ comments ++ =====================================================

// import { fetchBreeds, fetchCatByBreed } from './js/cat-api'; означає, що ми імпортуємо функції fetchBreeds та fetchCatByBreed з модуля cat-api, який знаходиться у папці js.

// Наступний рядок import Swal from 'sweetalert2'; означає, що ми імпортуємо бібліотеку "sweetalert2" у змінну Swal.

// Рядок import SlimSelect from 'slim-select'; імпортує бібліотеку "slim-select" у змінну SlimSelect.

// Рядок 'slim-select/dist/slimselect.css'; імпортує CSS файл для стилізації slim-select.

// Наступні рядки оголошують змінні breedSelect, catInfo, loader та error, та вибирають їх з DOM верстки за допомогою document.querySelector().

// Рядок catInfo.classList.add('is-hidden'); додає клас .is-hidden до елементу з класом cat-info, що робить його невидимим.

// Наступний рядок breedSelect.addEventListener('change', createMarkup); додає подію слухача на елементі breedSelect, який реагує на зміну значення.

// Рядок updateSelect(); викликає функцію updateSelect без передачі якого-небудь аргументу.

// Функція updateSelect приймає аргумент data. Запускається loader.classList.remove('is-hidden');, що видаляє клас '.is-hidden' з елемента loader щоб зробити його видимим.

// За допомогою функції fetchBreeds ми отримуємо дані про породи котів. Коли дані приходять, виконується ланцюжок .then де ми робимо наступні дії.

// Також видаляється клас '.is-hidden' з елемента loader, та видаляється клас '.is-hidden' з елемента breedSelect.

// Видаляється все вміст з елемента breedSelect, та формується рядок з опціями в markSelect за допомогою методу map, що об'єднує name та id у потрібному форматі. Потім рядок markSelect додається у елемент breedSelect за допомогою breedSelect.insertAdjacentHTML('beforeend', markSelect).

// Створюється новий екземпляр SlimSelect, якому передається елемент breedSelect.

// Функція createMarkup приймає event об'єкт. Запускається loader.classList.remove('is-hidden'); щоб показати заритування.

// Отримуємо breedId, який представляє значення, вибране в breedSelect.

// За допомогою функції fetchCatByBreed ми отримуємо дані про кота обраної породи. Коли дані приходять, виконується ланцюжок .then де ми робимо наступні дії.

// Також видаляється клас '.is-hidden' з елемента loader, та видаляється клас '.is-hidden' з елемента breedSelect.

// З отриманих даних ми витягуємо url та breeds. Далі форматуємо HTML рядок, який включає зображення, ім'я, опис і поведінку кота. Вся ця інформація додається у елемент catInfo, та видаляється клас '.is-hidden', щоб зробити його видимим.

// Функція onError спрацьовує, якщо виникає помилка. Вона додає клас '.is-hidden' до елемента loader, та видаляє весь вміст у елемента breedSelect. Виводиться модальне вікно з помилкою.
