function calculator() {
  const caloriesResult = document.querySelector('.calculating__result span');

  let gender,
      height,
      weight, 
      age, 
      ratio;

  if (localStorage.getItem('gender')) {
    gender = localStorage.getItem('gender');
  } else {
    gender = 'female';
    localStorage.setItem('gender', gender);
  }

  if (localStorage.getItem('ratio')) {
    ratio = localStorage.getItem('ratio');
  } else {
    ratio = 1.375;
    localStorage.setItem('ratio', ratio);
  }

  function calcTotalCalories() {
    if (!gender || !height || !weight || !age || !ratio) {
      caloriesResult.textContent = '____';
      return;
    }

    if (gender === 'female') {
      caloriesResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      caloriesResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }
  
  calcTotalCalories();

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(element => {
      element.classList.remove(activeClass);

      if (element.getAttribute('id') === localStorage.getItem('gender')) {
        element.classList.add(activeClass);
      }

      if (element.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
        element.classList.add(activeClass);
      }
    });
  }

  initLocalSettings('#gender div', 'calculating__choose-item_active');
  initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
  
  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(elem => {
      elem.addEventListener('click', (event) => {
        if (event.target.getAttribute('data-ratio')) {
          ratio = +event.target.getAttribute('data-ratio');
          localStorage.setItem('ratio', +event.target.getAttribute('data-ratio'));
        } else {
          gender = event.target.getAttribute('id');
          localStorage.setItem('gender', event.target.getAttribute('id'));
        }
      
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });

        event.target.classList.add(activeClass);

        calcTotalCalories();
        console.log(ratio, gender, elem.classList);
      });
    });
  }
  
  getStaticInformation('#gender div', 'calculating__choose-item_active');
  getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input', () => {
      if (input.value.match(/\D/g)) {
        input.style.border = '2px solid red';
      } else {
        input.style.border = 'none';
      }
      
      switch(input.getAttribute('id')) {
        case 'height': 
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      } 

      calcTotalCalories();
    });
  }
  
  getDynamicInformation('#age');
  getDynamicInformation('#height');
  getDynamicInformation('#weight'); 
}

export default calculator;
