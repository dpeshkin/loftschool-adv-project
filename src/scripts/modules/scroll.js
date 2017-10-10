const scrollToElement = function() {
    const smoothScroll = function ( anchor ) {
        const getTargetOffsetTop = function ( anchor ) {
            let location = 0;
            if (anchor.offsetParent) {
                do {
                    location += anchor.offsetTop;
                    anchor = anchor.offsetParent;
                } while (anchor);
            }
            return location >= 0 ? location : 0;
        };
        const animateScroll = function () {
            window.scrollBy(0, increments);
            stopAnimation();
        };
        const stopAnimation = function () {
            const currentPosition = window.pageYOffset;
            if ( increments < 0 && currentPosition  <= endLocation+increments || increments > 0 && currentPosition  >= endLocation-increments || ((window.innerHeight + currentPosition) >= document.body.offsetHeight)) {
                clearInterval(runAnimation);
            }
        };
        const startLocation = window.pageYOffset;
        const endLocation = getTargetOffsetTop( anchor );
        const distance = endLocation - startLocation;
        const duration = 500;
        const increments = distance/(duration/16);

        console.log(startLocation, endLocation, distance, increments); 

        const runAnimation = setInterval(animateScroll, 16);   
          
    };
        
    const scrollToggle = document.querySelectorAll('.scroll-to');
    [].forEach.call(scrollToggle, function (toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const href = toggle.getAttribute('href');
            let Target;
            if (href === '#'|| undefined) {
                Target = document.body;
            } else {
                Target = document.querySelector(href);
            }
            smoothScroll(Target); 
        });
    });

};
// почему то не всегда попадаем в нужное место на странице
module.exports = scrollToElement;


