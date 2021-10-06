         import tabs  from './modules/tabs';
         import modal  from './modules/modal';
         import timer  from './modules/timer';
         import cards  from './modules/cards';
         import calc  from './modules/calc';
         import slider  from'./modules/slider';
         import {openModal} from './modules/modal';
         import form from './modules/form';

document.addEventListener('DOMContentLoaded', () => {
         
    const modelTimer = setTimeout(() => openModal('.modal', modelTimer), 30000);

tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
modal('[data-modal]', '.modal', modelTimer);
timer('.timer', '2021-08-11');
cards();
calc();
slider({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
});
form('form',modelTimer);
});