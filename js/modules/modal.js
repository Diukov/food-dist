function openModal(modalSelector, modalTimerID) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  clearInterval(modalTimerID);
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);

  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function modal(modalSelector, triggerSelector, modalTimerID) {
  const modal = document.querySelector(modalSelector),
        showModalTriggers = document.querySelectorAll(triggerSelector);


  showModalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => openModal(modalSelector, modalTimerID));
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.getAttribute('data-close_modal') === '') {
      closeModal(modalSelector);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (modal.classList.contains('show') && event.code === 'Escape') {
      closeModal(modalSelector);
    }
  });


  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerID);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {openModal};
export {closeModal};
