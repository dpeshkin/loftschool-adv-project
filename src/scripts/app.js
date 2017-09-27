(function(){
    // NAV-TOGGLE
    function showNav (e){
        e.preventDefault();
        const btn = e.currentTarget;
        document.querySelector('.fs-nav').classList.toggle('fs-nav_active');
        btn.firstElementChild.classList.toggle('nav-toggle__button_close');
        btn.parentElement.classList.toggle('header__menu-button_close');
        document.body.style.overflow = (document.body.style.overflow === 'hidden' ? '' : 'hidden');
    }

    if(document.querySelector('.nav-toggle'))
        document.querySelector('.nav-toggle').addEventListener('click', function(e) {
            showNav(e);
        });

    //FLIPPER-ROTATE
    function flipperRotate(e) {
        e.preventDefault();
        document.querySelector('.flipper').classList.toggle('flipper_back');
        document.querySelector('.btn_auth').classList.toggle('btn_auth-hidden');
    }

    if(document.querySelector('.btn_auth'))
        document.querySelector('.btn_auth').addEventListener('click', function(e) {
            flipperRotate(e);
        });

    if(document.getElementById('btn-main'))
        document.getElementById('btn-main').addEventListener('click', function(e) {
            flipperRotate(e);
        });
}());

