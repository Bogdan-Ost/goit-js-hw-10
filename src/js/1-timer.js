import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const timeDays = document.querySelector('span[data-days]');
const timeHour = document.querySelector('span[data-hours]');
const timeMinutes = document.querySelector('span[data-minutes]');
const timeSeconds = document.querySelector('span[data-seconds]');
console.log(timeValue);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates;
  },
};

let userSelectedDate = flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function start() {
  const starTime = Date.now();

  setInterval(() => {
    const deltaTime = userSelectedDate - starTime;
  }, 1000);
}

function updateClockface({ days, hours, minutes, seconds }) {
  timeDays.innerHTML = `${days}`;
  timeHour.innerHTML = `${hours}`;
  timeMinutes.innerHTML = `${minutes}`;
  timeSeconds.innerHTML = `${seconds}`;
}
