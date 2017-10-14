const scrollToElement = () => {
    let flag = true;
    const smoothScroll = (anchor) => {
        const getTargetOffsetTop = (anchor) => { // получаем координаты колнечной точки
            let location = anchor.getBoundingClientRect().top + window.pageYOffset;
            return location;
        };
        const cantScroll = () => { // проверяем текущее положение страницы и якоря, возможность скролла
            if (Math.abs(endLocation - pageYOffset) <= Math.abs(increment/2) ||
                document.body.offsetHeight - window.innerHeight - pageYOffset < increment){
                flag = true; // по окончанию скролла
                return true;
            }
        };
        const animateScroll = () => {
            if (!cantScroll()) {
                window.scrollBy(0, increment); // делаем шаг на инкремент
            }
            stopAnimation(); // останавливаем анимацию
        };
        const stopAnimation = () => {
            if (cantScroll()) {
                clearInterval(runAnimation);
            }
        };
        
        const startLocation = pageYOffset;
        const endLocation = getTargetOffsetTop(anchor);
        const distance = endLocation - startLocation;
        const direction = distance/Math.abs(distance);
        const increment = 10*direction;
        const runAnimation = setInterval(animateScroll, 9);
    };
        
    const scrollToggle = document.querySelectorAll('.scroll-to');
    scrollToggle.forEach((toggle) => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const href = toggle.getAttribute('href');
            let target;
            if (href === '#'|| undefined) {
                target = document.body;
            } else {
                target = document.querySelector(href);
            }
            if(flag){ // проверяем флаг, если false, ничего не будет
                smoothScroll(target);
                flag = false; // после запуска анимации
            }
        });
    });
};

module.exports = scrollToElement;


