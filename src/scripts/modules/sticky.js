const sticky = (() => {
    const element = document.querySelector('.blog__nav');
    const elementOffsetTop = element.getBoundingClientRect().top + pageYOffset;
    
    const scrollSpy = () => {
        window.addEventListener('scroll', () => {
            let windowPosition = window.scrollY;
            if (elementOffsetTop < windowPosition) {
                element.classList.add('sticky');
            } else {
                element.classList.remove('sticky');
            } 
        }); 
    };
    const stickyInit = () => {
        if (element) {
            scrollSpy();
        }
    };
    return {
        init: stickyInit,
    };
})();


module.exports = sticky.init;
