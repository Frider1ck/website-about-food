import {getResource} from '../services/services';
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

export default cards;