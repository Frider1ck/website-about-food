import {CloseModal, openModal} from './modal';
import {postData} from '../services/services';
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
        postData('http://localhost:3000/requests', JSON.stringify(object))
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
    openModal('.modal', modelTimer);

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

export default form;