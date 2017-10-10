
const Sticky = (function () {

    const activeClass = 'sticky';

    const Sticky = {
        element: null,
        elementOffsetTop: 0, 
        addEvents: function () {
            window.addEventListener('scroll', this.onScroll.bind(this));
        },
        getOffsetTop: function () {
            let element = this.element;
            let position = 0;
            if (element.offsetParent) {
                do {
                    position += element.offsetTop;
                    element = element.offsetParent;
                } while (element);
            }
            return position;  
        },
        init: function (element) {
            this.element = element;
            this.elementOffsetTop = this.getOffsetTop();
            this.addEvents();
            this.onScroll();
        },

        onScroll: function () {
            if(window.scrollY > this.elementOffsetTop - 20){
                this.setFixed();
            } else {
                this.setStatic();
            }
        },
        setFixed: function () {
            this.element.classList.add(activeClass);
        },
        setStatic: function () {
            this.element.classList.remove(activeClass);
        },
    };
    return Sticky;
})();

const sticky = function() {
    const element = document.querySelector('.blog__nav');
    if (element)
        Sticky.init(element);
};

module.exports = sticky;
