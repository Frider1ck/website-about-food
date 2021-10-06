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


export default modal;
export {CloseModal};
export {openModal};