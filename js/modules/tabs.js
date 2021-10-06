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

export default tabs;