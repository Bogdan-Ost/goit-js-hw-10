// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  const delay = event.target.elements.delay.value;
  const state = event.target.elements.state.value;
  const numberDelay = Number(delay);

  const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, Math.floor(numberDelay));
  });
  prom
    .then(date => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${Math.floor(numberDelay)}ms`,
        position: 'topRight',
        color: 'green',
      });
      console.log(date);
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${Math.floor(numberDelay)}ms`,
        position: 'topRight',
        color: 'red',
      });
      console.log(error);
    });
  // event.currentTarget.reset();
}
