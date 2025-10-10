// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();
  const delay = event.target.elements.delay.value;
  const state = event.target.elements.state;

  const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state.value === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
  prom
    .then(date => {
      iziToast.info({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
      iziToast.settings({
        timeout: 10000,
        position: 'topRight',
        color: 'green',
        resetOnHover: true,
        icon: 'material-icons',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
      });
      console.log(date);
    })
    .catch(error => {
      iziToast.info({
        message: `❌ Rejected promise in ${delay}ms`,
      });
      iziToast.settings({
        timeout: 10000,
        position: 'topRight',
        color: 'red',
        resetOnHover: true,
        icon: 'material-icons',
        transitionIn: 'flipInX',
        transitionOut: 'flipOutX',
      });
      console.log(error);
    });
  event.currentTarget.reset();
}
