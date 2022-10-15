function forms() {
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
}

module.exports = forms;
