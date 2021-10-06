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
export default calc;