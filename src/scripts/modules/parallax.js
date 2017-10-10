const parallaxMouseMove = document.querySelector('.parallax-mm');
const parallaxScroll = document.querySelector('.parallax-scroll');
    
const moveLayers = function (e) {
    const layers = parallaxMouseMove.children;
    const initialX = -e.pageX;
    const initialY = -e.pageY;

    [].slice.call(layers).forEach(function (layer, index) {
        const
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

const scrollLayers = function() {
    const layerPhoto = parallaxScroll.querySelector('.header__content');
    const layerBg = parallaxScroll.querySelector('.header__bg');
    const scrollLenght = window.pageYOffset;

    const move = function (element, scroll, integer) {
        var position = Math.round(scroll * -integer)+'px';
        element.style.transform = 'translateY(' + position + ')';
    };
    
    if (layerPhoto)
        move(layerPhoto, scrollLenght, .5);
    if (layerBg)
        move(layerBg, scrollLenght, .2);
};

const parallax = function () {
    if (parallaxMouseMove)
        window.addEventListener('mousemove', moveLayers);
    if (parallaxScroll)
        window.addEventListener('scroll', scrollLayers);
};

module.exports = parallax;
