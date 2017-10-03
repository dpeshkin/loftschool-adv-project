var parallaxMouseMove = document.querySelector('.parallax-mm');
var parallaxScroll = document.querySelector('.parallax-scroll');
    
var moveLayers = function (e) {
    var layers = parallaxMouseMove.children;
    var initialX = -e.pageX;
    var initialY = -e.pageY;

    [].slice.call(layers).forEach(function (layer, index) {
        var
            divider = index / 100,
            positionX = initialX * divider,
            positionY = initialY * divider,
            bottomPosition = (window.innerHeight) * divider,
            transformString = 'translate(' + positionX + 'px,' + positionY + 'px)',
            image = layer.firstElementChild;

        layer.style.transform = transformString;
        image.style.bottom = '-' + bottomPosition + 'px';
    });

};

var scrollLayers = function() {
    var layerPhoto = parallaxScroll.querySelector('.header__content');
    var layerBg = parallaxScroll.querySelector('.header__bg');
    var scrollLenght = window.pageYOffset;

    var move = function (element, scroll, integer) {
        var position = Math.round(scroll * -integer)+'px';
        element.style.transform = 'translateY(' + position + ')';
    };
    
    if (layerPhoto)
        move(layerPhoto, scrollLenght, .5);
    if (layerBg)
        move(layerBg, scrollLenght, .2);
};

var parallax = function () {
    if (parallaxMouseMove)
        window.addEventListener('mousemove', moveLayers);
    if (parallaxScroll)
        window.addEventListener('scroll', scrollLayers);
};

module.exports = parallax;
