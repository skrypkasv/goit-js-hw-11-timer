import './styles.css';

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.days = document.querySelector(`${selector} [data-value="days"]`);
    this.hours = document.querySelector(`${selector} [data-value="hours"]`);
    this.minutes = document.querySelector(`${selector} [data-value="mins"]`);
    this.seconds = document.querySelector(`${selector} [data-value="secs"]`);
    this.start();
    this.initiate(0);
  }

  start() {
    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      this.initiate(deltaTime);
    }, 1000);
  }

  initiate(time) {
    const countedTime = this.getTimeComponents(time);
    this.updateClockface(countedTime);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateClockface({ days, hours, mins, secs }) {
    this.days.textContent = `${days}`;
    this.hours.textContent = `${hours}`;
    this.minutes.textContent = `${mins}`;
    this.seconds.textContent = `${secs}`;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Mar 8, 2025'),
});
