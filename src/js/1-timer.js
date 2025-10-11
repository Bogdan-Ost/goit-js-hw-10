import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timeDays = document.querySelector('span[data-days]');
const timeHour = document.querySelector('span[data-hours]');
const timeMinutes = document.querySelector('span[data-minutes]');
const timeSeconds = document.querySelector('span[data-seconds]');

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate <= new Date()) {
      iziToast.warning({
        message: 'Please choose a date in the future',
      });
    } else {
      startBtn.disabled = false;
    }
  },
};
iziToast.settings({
  timeout: 10000,
  position: 'topRight',
  color: 'red',
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
});

startBtn.disabled = true;

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

startBtn.addEventListener('click', start);

function start() {
  startBtn.disabled = true;
  input.disabled = true;

  const interval = setInterval(() => {
    const starTime = Date.now();
    const deltaTime = userSelectedDate - starTime;
    const time = convertMs(deltaTime);
    updateClockface(time);
    if (deltaTime <= 0) {
      input.disabled = false;
      clearInterval(interval);
      timeDays.textContent = `00`;
      timeHour.textContent = `00`;
      timeMinutes.textContent = `00`;
      timeSeconds.textContent = `00`;
    }
  }, 1000);
}

function updateClockface({ days, hours, minutes, seconds }) {
  timeDays.innerHTML = `${days}`;
  timeHour.innerHTML = `${hours}`;
  timeMinutes.innerHTML = `${minutes}`;
  timeSeconds.innerHTML = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
