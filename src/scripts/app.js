(function(){
    const navToggle = document.querySelector('.nav-toggle');
    if(navToggle)
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const btn = e.currentTarget;
            const fsNav = document.querySelector('.fs-nav');
            const fsNavActive = 'fs-nav_active';
            const btnClose = 'nav-toggle__button_close';
		
            fsNav.classList.toggle(fsNavActive);
            btn.firstElementChild.classList.toggle(btnClose);
            btn.parentElement.classList.toggle('header__menu-button_close');
            document.body.style.overflow = (document.body.style.overflow === 'hidden' ? '' : 'hidden');
        });

}());