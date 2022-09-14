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
        showModalTriggers = document.querySelectorAll('[data-show_modal]');

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerID);
  }

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  showModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close_modal') === '') {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (modal.classList.contains('show') && event.code === 'Escape') {
      closeModal();
    }
  });

  const modalTimerID = setTimeout(openModal, 50000);

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

  const getResource = async (url) => {
    const result = await fetch(url);

    if(!result.ok) {
      throw new Error(`Cannot fetch ${url}, status: ${result.status}.`);
    }

    return await result.json();
  };

  getResource('http://localhost:3000/menu')
    .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
      });
    });

  // Forms
  
  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Thanks! All is good!',
    failure: 'Somenthing get wrong...'
  }

  forms.forEach(item => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: data
    });

    return await result.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;

      form.insertAdjacentElement('afterend', statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      
      postData('http://localhost:3000/requests', json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
      }).catch(() => {
          showThanksModal(message.success);
      }).finally(() => {
          form.reset();
      });
   });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');

    prevModalDialog.classList.add('hide');
    openModal();

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div class="modal__close" data-close_modal>
          &times;
        </div>
        <div class="modal__title">
          ${message}
        </div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal();
    }, 4000);
  }

  fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(result => console.log(result));
  
});
