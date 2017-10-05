const preloader = (function () {
    const images = document.images;
    const imagesCount = images.length;
    let imagesLoaded = 0;
    const preloader = document.querySelector('.preloader');
    const loadPercent = preloader.querySelector('.loaded');
    const imageLoaded = () => {
        loadPercent.innerHTML = Math.round((100 / imagesCount) * imagesLoaded) + '%';
        imagesLoaded++;
        if(imagesLoaded >= imagesCount){
            setTimeout(()=>{
                preloader.style.opacity = '0';
            }, 2000);
        }
    };
    for( let i =0; i < imagesCount; i++ ){
        let imageClone = new Image();
        imageClone.onload = imageLoaded;
        imageClone.onerror = imageLoaded;
        imageClone.src = images[i].src;
    }
    

    return {
        init: imageLoaded,
    };
})();
module.exports = preloader.init;