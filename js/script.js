window.addEventListener('DOMContentLoaded', () => {
 
  // Tabs

  const tabs = document.querySelectorAll('.tabheader__item');
  const tabsContent = document.querySelectorAll('.tabcontent');
  const tabsParent = document.querySelector('.tabheader__items');
       
  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(index = 0) {
    tabsContent[index].classList.add('show', 'fade');
    tabsContent[index].classList.remove('hide');
    tabs[index].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((elem, index) => {
        if (target === elem) {
          hideTabContent();
          showTabContent(index);
        }
      });
    }
  });

  // Timer

  const deadline = '2022-08-18';

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

  setClock('.timer', deadline);

  // Modal window

  const modal = document.querySelector('.modal'),
        showModalTriggers = document.querySelectorAll('[data-show_modal]'),
        closeModalBtn = document.querySelector('[data-close_modal]');

  function openModal() {
    modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerID);
  }

  function closeModal() {
    modal.classList.toggle('show');
    document.body.style.overflow = '';
  }

  showModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });

  closeModalBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (modal.classList.contains('show') && event.code === 'Escape') {
      closeModal();
    }
  });

  const modalTimerID = setTimeout(openModal, 3000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);

  // Классы для карточек

  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 41;
      this.changeToUah();
    }

    changeToUah() {
      this.price = +this.price * this.transfer;
    }
    
    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.element = 'menu__item';
        element.classList.add(this.element);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
         <img src=${this.src} alt=${this.alt}>
         <h3 class="menu__item-subtitle">${this.title}<h3>
         <div class="menu__item-descr">${this.description}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
           <div class="menu__item-cost">Цена:</div>
           <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;
     this.parent.append(element); 
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container',
    'menu__item',
    'big'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню "Премиум"',
    'В меню "Премиум" мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    14,
    '.menu .container',
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "elite",
    'Меню "Постное"',
    'Меню "Постное" - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    25,
    '.menu .container',
    'menu__item'
  ).render();

  // Forms
  
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'Loading...',
    success: 'Thanks! All is good!',
    failure: 'Somenthing get wrong...'
  }

  forms.forEach(item => {
    postData(item);
  });

  // function with formData
/*  
  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);
      
      const request = new XMLHttpRequest();

      request.open('POST', 'server.php');
      //  request.setRequestHeader('Content-type', 'multipart/form-data');

      const formData = new FormData(form);

      request.send(formData);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          statusMessage.textContent = message.success;

          form.reset();

          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }
*/
  
  // function with JSON

  function postData(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);
      
      const request = new XMLHttpRequest();

      request.open('POST', 'server.php');
      request.setRequestHeader('Content-type', 'application/json');

      const formData = new FormData(form);
      const object = {};
      
      formData.forEach(function(value, key) {
        object[key] = value;
      });

      const json = JSON.stringify(object);

      request.send(formData);

      request.addEventListener('load', () => {
        if (request.status === 200) {
          statusMessage.textContent = message.success;

          form.reset();

          setTimeout(() => {
            statusMessage.remove();
          }, 2000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  }
});
