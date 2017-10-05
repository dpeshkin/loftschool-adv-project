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
                setTimeout(()=>{
                    preloader.style.zIndex = '-1';
                }, 1000);
            }, 1000);  
        }
    };

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
            ()=>imageLoaded(),
            ()=>console.log('ERROR image '+src+' not loaded')
        );
    }

    return {
        init: imageLoaded,
    };
})();
module.exports = preloader.init;