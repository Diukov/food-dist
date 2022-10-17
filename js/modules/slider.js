function slider({container, prevBtn, nextBtn, current, total, slide, wrapper, field}) {
  const slider = document.querySelector(container);
  const sliderPrevBtn = document.querySelector(prevBtn);
  const sliderNextBtn = document.querySelector(nextBtn);
  const counterCurrent = document.querySelector(current);
  const counterTotal = document.querySelector(total);
  const slides = document.querySelectorAll(slide);
  const slidesWrapper = document.querySelector(wrapper);
  const slidesField = document.querySelector(field);
  const slideWidth = window.getComputedStyle(slidesWrapper).width;

  let slideIndex= 1;
  let offset = 0;

  function showSlideIndex(counter, value) {
    if (slides.length < 10) {
      counter.textContent = `0${value}`;
    } else {
      counter.textContent = value;
    }
  }

  function changeDotsOpacity(dots, index) {
    dots.forEach(dot => dot.style.opacity = 0.5);
    dots[index - 1].style.opacity = 1;
  }

  showSlideIndex(counterTotal, slides.length);
  showSlideIndex(counterCurrent, slideIndex);

  slidesField.style.width = 100 * slides.length + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = slideWidth;
  });

  slider.style.position = 'relative';

  const dots = document.createElement('ol');
  const dotsArr = [];

  dots.classList.add('carousel-indicators');
  dots.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 10px;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
  
  slider.append(dots);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-left: 3px;
      margin-right: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      opacity: 0.5;
      transition: opacity 0.6s ease;
    `;

    if (i === 0) {
      dot.style.opacity = 1;
    }

    dotsArr.push(dot);
    dots.append(dot);
  }

  function removeUnits(str) {
    return +str.replace(/\D/g, '');
  }
  
  sliderNextBtn.addEventListener('click', () => {
    if (offset == removeUnits(slideWidth) * (slides.length - 1)) {
      offset = 0; 
    } else {
      offset += removeUnits(slideWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex < slides.length) {
      showSlideIndex(counterCurrent, ++slideIndex);
    } else {
      slideIndex = 1;
      showSlideIndex(counterCurrent, slideIndex);
    }

    changeDotsOpacity(dotsArr, slideIndex);
  });

  sliderPrevBtn.addEventListener('click', () => {
    if (offset == 0) {
      offset = removeUnits(slideWidth) * (slides.length - 1);
    } else {
      offset -= removeUnits(slideWidth);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;
    
    if (slideIndex > 1) {
      showSlideIndex(counterCurrent, --slideIndex);
    } else {
      slideIndex = slides.length;
      showSlideIndex(counterCurrent, slideIndex);
    }

    changeDotsOpacity(dotsArr, slideIndex);
  });
  
  dotsArr.forEach(dot => {
    dot.addEventListener('click', (event) => {
      const slideTo = event.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = removeUnits(slideWidth) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      showSlideIndex(counterCurrent, slideIndex);

      changeDotsOpacity(dotsArr, slideIndex);
    });
  });
}

export default slider;
