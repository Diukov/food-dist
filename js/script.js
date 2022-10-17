import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calculator from './modules/calculator';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
  const modalTimerID = setTimeout(() => openModal('.modal', modalTimerID), 50000);

  tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  modal('.modal', '[data-show_modal]', modalTimerID);
  timer('.timer', '2022-10-21');
  cards();
  calculator();
  forms('form', modalTimerID);
  slider({
    container: '.offer__slider',
    prevBtn: '.offer__slider-prev',
    nextBtn: '.offer__slider-next',
    current: '#current',
    total: '#total',
    slide: '.offer__slide',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
  });
});
