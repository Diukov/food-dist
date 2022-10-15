function modal() {
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
}

module.exports = modal;
