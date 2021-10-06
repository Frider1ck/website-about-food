/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
 //Calc

 const result = document.querySelector('.calculating__result span');
 let sex, height, weight, age, ratio;

 if(localStorage.getItem('ratio')) {
     ratio = localStorage.getItem('ratio');
 } else {
     ratio = 1.375;
     localStorage.setItem('ratio', 1.375);
 }

 if(localStorage.getItem('sex')) {
     sex = localStorage.getItem('sex');
 } else {
     sex = 'famale';
     localStorage.setItem('sex', 'famale');
 }

 function initLocalInformation(selector, activeClass) {
     const elemets = document.querySelectorAll(selector);

     elemets.forEach(elem => {
         elem.classList.remove(activeClass);

         if(elem.getAttribute('id') === localStorage.getItem('sex')) {
             elem.classList.add(activeClass);
         }

         if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
             elem.classList.add(activeClass);
         }
     });
 }

 initLocalInformation('#gender div', 'calculating__choose-item_active');
 initLocalInformation('.calculating__choose_big div', 'calculating__choose-item_active');

 function calcTotal () {
     if(!sex || !height || !weight || ! !age || !ratio) {
         result.textContent = '----';
     }

     if(sex === 'famale') {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)  ) * ratio);
     } else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)  ) * ratio);
     }  
 }


 function getStatisticInformation(parent, activeClass) {
     const elements = document.querySelectorAll(`${parent} div`);
     
     elements.forEach(elem => {
         elem.addEventListener('click', (e) => {
             if(e.target.getAttribute('data-ratio')) {
                 ratio = +e.target.getAttribute('data-ratio');
                 localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
             } else {
                 sex = e.target.getAttribute('id');
                 localStorage.setItem('sex', e.target.getAttribute('id'));
             }
 
             elements.forEach(elem => {
                 elem.classList.remove(activeClass);
             });
 
             e.target.classList.add(activeClass);
             calcTotal();
         });
     });        
 }

 getStatisticInformation('#gender', 'calculating__choose-item_active');
 getStatisticInformation('.calculating__choose_big', 'calculating__choose-item_active');

 function getDynamicInformation(selector) {
     const input = document.querySelector(selector);

     input.addEventListener('input', (e) =>{
         if(input.value.match(/\D/g)) {
             input.style.border = 'solid 1px red';
         } else {
             input.style.border = 'none';
         }

         switch(input.getAttribute('id')) {
             case 'height':
                 height =+ input.value;
                 break;
             case 'weight':
                 weight =+ input.value;
                 break;
             case 'age':
                 age =+ input.value;
                 break;    
         }
         calcTotal();
     });
 }

 getDynamicInformation('#height');
 getDynamicInformation('#weight');
 getDynamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
//Class

class ConstCard {
    constructor (src, alt, tital, descr, price, parent, ...classes) {
        this.src = src;
        this.alt = alt;
        this.tital = tital;
        this.descr = descr;
        this.price = price;
        this.parent = document.querySelector(parent);
        this.classes = classes;
    }

    insert () {
        const element = document.createElement('div');
        this.classes.forEach(className => element.classList.add(className));
        element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.tital}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`;
        
        this.parent.append(element);
    }
}




// axios.get('http://localhost:3000/menu').then(data => {
//          data.forEach(({src, alt, tital, descr, price}) => {
//              new ConstCard(src, alt, tital, descr, price, '.menu .container').insert();
//          });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function form(formSelector,modelTimer) {
 //Form

 const message = {
    loading: 'Загрузка',
    seccess: 'Все заебись ,отправилось',
    failure: 'Залупа не отправилась'
};
const form = document.querySelectorAll(formSelector);
form.forEach(elem => {
    bindpostData(elem);
});



function bindpostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const statusmessage = document.createElement('div');
        statusmessage.classList.add('status');
        statusmessage.textContent = message.loading;
        form.append(statusmessage);

        
        const formData = new FormData(form);
        const object = {};
        formData.forEach(function(val, key){
            object[key] = val;
        });
        (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', JSON.stringify(object))
        .then(data => {
            console.log(data);
            submitThank(message.seccess);
            statusmessage.remove();
        }).catch(() => {
            submitThank(message.failure);
        }).finally(() => {
            form.reset();
        });
    });
}

function submitThank(message) {
    const ModalDialog = document.querySelector('.modal__dialog');
    ModalDialog.style.display = 'none';
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modelTimer);

    const ThankModal = document.createElement('div');
    ThankModal.classList.add('modal__dialog');
    ThankModal.innerHTML = `
    <div class="modal__content">
    <div data-close class="modal__close">X</div>
    <div class="modal__title">${message}</div>
    </div>
    `;

    document.querySelector('.modal').append(ThankModal);

    setTimeout(() => {
        ThankModal.remove();
        ModalDialog.style.display = 'block';
    }, 4000);
}

fetch('db.json').then(data => data.json()).then(data => console.log(data));
//npx json-server --watch db.json вот так вот вроде заработала

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "CloseModal": () => (/* binding */ CloseModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function openModal(modalSelector, modelTimer) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    clearInterval(modelTimer);
}

function CloseModal (modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'none';   
    document.body.style.overflow = '';   

}

function modal(trigerSelector, modalSelector, modelTimer) {
    //Modal

    

    const modalTriger = document.querySelectorAll(trigerSelector),
          modal = document.querySelector(modalSelector);

    modalTriger.forEach(btn => {
        btn.addEventListener('click', () => {openModal(modalSelector, modelTimer);  
        });
    });

    modal.addEventListener('click', (e) => {
        if(e.target === modal || e.target.getAttribute('data-close') == '') {
            CloseModal(modalSelector);
        }
    });

    

    document.addEventListener('keydown', (e) => {
        if(e.code === 'Escape') {
            CloseModal(modalSelector);
        }
    });


    function scroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight) {
            openModal(modalSelector);
            window.removeEventListener('scroll', scroll);
        }
    }
    window.addEventListener('scroll', scroll);

}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
//Slider
const slides = document.querySelectorAll(slide),
prev = document.querySelector(prevArrow),
next = document.querySelector(nextArrow),
total = document.querySelector(totalCounter),
current = document.querySelector(currentCounter),
slideWrapper = document.querySelector(wrapper),
slideField = document.querySelector(field),
width = window.getComputedStyle(slideWrapper).width,
slider = document.querySelector(container);
let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
total.textContent = `0${slides.length}`;
current.textContent = `0${slideIndex}`;
} else {
total.textContent = slides.length;
current.textContent = slideIndex;
}

slider.style.position = 'relative';
const dots = document.createElement('ol'),
dott = [];
dots.classList.add('carousel-in');
dots.style.cssText = `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;`;

slider.append(dots);

for(let i = 0; i < slides.length; i++) {
const dot = document.createElement('li');
dot.setAttribute('data-slide-to', i + 1);
dot.style.cssText = `
box-sizing: content-box;
flex: 0 1 auto;
width: 30px;
height: 6px;
margin-right: 3px;
margin-left: 3px;
cursor: pointer;
background-color: #fff;
background-clip: padding-box;
border-top: 10px solid transparent;
border-bottom: 10px solid transparent;
opacity: .5;
transition: opacity .6s ease;
  `;
if(i == 0) {
  dot.style.opacity = 1;
}
dots.append(dot);
dott.push(dot);
}

slideField.style.width = 100 * slides.length + '%';
slideField.style.display = 'flex';
slideField.style.transition = '0.5s all';

slideWrapper.style.overflow = 'hidden';
slides.forEach(item => {
item.style.width = width;
});

next.addEventListener('click', () => {
if(offset == +width.slice(0, width.length -2) * (slides.length - 1)){
  offset = 0;
} else {
  offset += +width.slice(0, width.length -2);
}
slideField.style.transform = `translateX(-${offset}px)`; 

if(slideIndex == slides.length) {
  slideIndex = 1;
} else {
    slideIndex++;
}

if(slides.length < 10) {
    current.textContent = `0${slideIndex}`;
} else {
  current.textContent = slideIndex;
}

dott.forEach(item => item.style.opacity = '.5');
dott[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener('click', () => {
if(offset == 0){
  offset = +width.slice(0, width.length -2) * (slides.length - 1);
} else {
  offset -= +width.slice(0, width.length -2);
}
slideField.style.transform = `translateX(-${offset}px)`; 

if(slideIndex == 1) {
  slideIndex = slides.length;
} else {
    slideIndex--;
}

if(slides.length < 10) {
  current.textContent = `0${slideIndex}`;
} else {
current.textContent = slideIndex;
}
dott.forEach(item => item.style.opacity = '.5');
dott[slideIndex - 1].style.opacity = 1;
});

dott.forEach(dot => {
  dot.addEventListener('click', (e) => {
      const slideTo =e.target.getAttribute('data-slide-to');
     
      slideIndex =slideTo;
      offset = +width.slice(0, width.length -2) * (slideTo -1 );

      slideField.style.transform = `translateX(-${offset}px)`;

      if(slides.length < 10) {
          current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }
        dott.forEach(item => item.style.opacity = '.5');
        dott[slideIndex - 1].style.opacity = 1;

  });
});
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector,tabContent, tabpar, tabActive ) {
    //Tabs
    const tab = document.querySelectorAll(tabsSelector),
          tabCont = document.querySelectorAll(tabContent),
          tabPar = document.querySelector(tabpar);
    
    function hideContent() {
        tabCont.forEach(item => {
            item.style.display = 'none';
        });

        tab.forEach(item => {
            item.classList.remove(tabActive);
        });
    }

    function showContent(i) {
        tabCont[i].style.display = 'block';
        tab[i].classList.add(tabActive);   
    }

    hideContent();
    showContent(0);

    tabPar.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains(tabsSelector.slice(1))) {
            tab.forEach((item, i) => {
                if(target == item) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {
// Timer


function getTime(time) {
    const t = Date.parse(time) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor((t / (1000 * 60 * 60) % 24)),
          minutes = Math.floor((t / 1000 / 60) % 60),
          seconds = Math.floor((t / 1000) % 60);

    return {
        't' : t,
        'days' : days,
        'hours' : hours,
        'minutes' : minutes,
        'seconds' : seconds
    };

    
}

function getZero(num) {
    if(num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setTimer(selector, time) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateTime, 1000);

    updateTime();

    function updateTime() {
        const t = getTime(time);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if(t.t <= 0) {
            clearInterval(timeInterval);
        }
    }
}

setTimer(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
};

const getResource = async (url) => {
    const res = await fetch(url);

    if(!res.ok) {
        throw new Error('Ошибка');
    }
    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
         
         
         
         
         
         
         
         

document.addEventListener('DOMContentLoaded', () => {
         
    const modelTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modelTimer), 30000);

(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
(0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.default)('[data-modal]', '.modal', modelTimer);
(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.default)('.timer', '2021-08-11');
(0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__.default)();
(0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__.default)();
(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
    container: '.offer__slider',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slide',
    totalCounter: '#total',
    currentCounter: '#current',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner'
});
(0,_modules_form__WEBPACK_IMPORTED_MODULE_6__.default)('form',modelTimer);
});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map