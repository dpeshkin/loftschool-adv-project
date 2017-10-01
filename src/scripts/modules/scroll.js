var scrollToElement = function() {
    var smoothScroll = function ( anchor ) {
        var getTargetOffsetTop = function ( anchor ) {
            var location = 0;
            if (anchor.offsetParent) {
                do {
                    location += anchor.offsetTop;
                    anchor = anchor.offsetParent;
                } while (anchor);
            }
            return location >= 0 ? location : 0;
        };
        var animateScroll = function () {
            window.scrollBy(0, increments);
            stopAnimation();
        };
        var stopAnimation = function () {
            var currentPosition = window.pageYOffset;
            if ( increments < 0 && currentPosition  <= endLocation+increments || increments > 0 && currentPosition  >= endLocation-increments || ((window.innerHeight + currentPosition) >= document.body.offsetHeight)) {
                clearInterval(runAnimation);
            }
        };
        var startLocation = window.pageYOffset;
        var endLocation = getTargetOffsetTop( anchor );
        var distance = endLocation - startLocation;
        var duration = 500;
        var increments = distance/(duration/16);

        console.log(startLocation, endLocation, distance, increments); 

        var runAnimation = setInterval(animateScroll, 16);   
          
    };
        
    var scrollToggle = document.querySelectorAll('.scroll-to');
    [].forEach.call(scrollToggle, function (toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            var href = toggle.getAttribute('href');
            if (href === '#'|| undefined) {
                var Target = document.body;
            } else {
                Target = document.querySelector(href);
            }
            smoothScroll(Target); 
        });
    });

};

module.exports = scrollToElement;


