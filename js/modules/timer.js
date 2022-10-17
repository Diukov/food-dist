function timer(id, deadline) {
  function getTimeRemaning(endtime) {
    const hoursInDay = 24,
          minutesInHour = 60,
          secondsInMinute = 60,
          msInSecond = 1000;

    const t = Date.parse(endtime) - Date.parse(new Date());
    let days, hours, minutes, seconds;

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (msInSecond * secondsInMinute * minutesInHour * hoursInDay));
      hours = Math.floor((t / (msInSecond * secondsInMinute * minutesInHour)) % hoursInDay);
      minutes = Math.floor((t / (msInSecond * secondsInMinute)) % minutesInHour);
      seconds = Math.floor((t / msInSecond) % secondsInMinute);
    }

    return {
      'total': t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  function getZero(num) {
    if (num >=0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaning(endtime);

      days.innerHTML = t.days < 10 ? `0${t.days}` : t.days;
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(id, deadline);
}

export default timer;
