const blur = (function (){
    const block = document.querySelector('.feedback');
    const checkOffsetTop = () => {
        let distance = block.offsetTop;
        block.style.backgroundPosition = 'center ' + -distance + 'px';
    };
    window.onresize = () => {
        checkOffsetTop();
    };
    return {
        init: checkOffsetTop,
    };
})();
module.exports = blur.init;
