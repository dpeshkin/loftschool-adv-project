var parallaxContainer = document.querySelector('.parallax'),
    layers = parallaxContainer.children;

var moveLayers = function (e) {
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

var parallax = function () {
    if (parallaxContainer)
        window.addEventListener('mousemove', moveLayers);
};

module.exports = parallax;
