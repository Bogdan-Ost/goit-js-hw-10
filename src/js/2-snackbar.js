const form = document.querySelector('.form');

form.addEventListener('submit', createPromise);

function createPromise(event) {
  console.log(event.target);
}
