const preloader = (function () {
    const images = document.images;
    const imagesCount = images.length;
    let imagesLoaded = 0;
    const preloader = document.querySelector('.preloader');
    const preloaderText = preloader.querySelector('.loaded');
    const preloaderCircle = preloader.querySelectorAll('.circle__preloader');
    const preloaderIncrement = () => {
        imagesLoaded++;
        let percent = Math.round((100 / imagesCount) * imagesLoaded);
        preloaderText.innerHTML = percent + '%';
        preloaderCircle.forEach((element) => {
            let dasharrayLenght = element.getAttribute('r')*2*Math.PI;
            setTimeout( () => {
                element.style.strokeDasharray = percent/100*dasharrayLenght + ', ' + dasharrayLenght;
            }, 1000);
        });
        if(imagesLoaded >= imagesCount){
            setTimeout( () => {
                preloader.style.opacity = '0';
                setTimeout( () => {
                    preloader.style.zIndex = '-1';
                }, 1000);
            }, 1000);  
        }
    };
    const imageLoaded = () =>{
        for( let i =0; i < imagesCount; i++ ){
            let src = images[i].src;
            var loadImage = function(url){
                return new Promise((resolve, reject) => {
                    let img = new Image();
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = url;
                });
            };
            const imgPromise = loadImage(src);
            imgPromise.then(
                () => preloaderIncrement(),
                () => console.log('ERROR image '+src+' not loaded')
            );
        }
    };
    

    return {
        init: imageLoaded,
    };
})();
module.exports = preloader.init;