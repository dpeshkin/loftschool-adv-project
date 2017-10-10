/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const navToggle = __webpack_require__(1);
const flipperRotate = __webpack_require__(2);
const scroll = __webpack_require__(3);
const sticky = __webpack_require__(4);
const highlight = __webpack_require__(5);
const parallax = __webpack_require__(6);
const blur = __webpack_require__(7);
const preloader = __webpack_require__(8);
const formActions = __webpack_require__(9);
const slider = __webpack_require__(10);

navToggle();
flipperRotate();
scroll();
sticky();
highlight();
parallax();
blur();
preloader();
formActions();
slider();

/***/ }),
/* 1 */
/***/ (function(module, exports) {

function showNav (e){
    e.preventDefault();
    const btn = e.currentTarget;
    const fsNav = document.querySelector('.fs-nav');
    fsNav.classList.toggle('fs-nav_active');
    btn.firstElementChild.classList.toggle('nav-toggle__button_close');
    btn.parentElement.classList.toggle('header__menu-button_close');
    document.body.style.overflow = (document.body.style.overflow === 'hidden' ? '' : 'hidden');
}

function navInit() {
    if(document.querySelector('.nav-toggle'))
        document.querySelector('.nav-toggle').addEventListener('click', function(e) {
            showNav(e);
        });
}

module.exports = navInit;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

function flipperRotate(e) {
    e.preventDefault();
    document.querySelector('.flipper').classList.toggle('flipper_back');
    document.querySelector('.btn_auth').classList.toggle('btn_auth-hidden');
}

function flipperInit() {
    if(document.querySelector('.flipper-rotate')){
        let btns = document.querySelectorAll('.flipper-rotate');
        for (let i = 0; i < btns.length; i++) {
            btns[i].addEventListener('click', function(e) {
                flipperRotate(e);
            });
        }
    }
}

module.exports = flipperInit;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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




/***/ }),
/* 4 */
/***/ (function(module, exports) {


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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var highlighter = (function () {
    const articles = document.querySelectorAll('.blog__article');
    let article = {};
    let i = 0;

    const scrollSpy = function () {
        window.addEventListener('scroll', function () {
            [].forEach.call(articles, function (e) {
                article[e.id] = {
                    height: e.offsetHeight, // по идее это свойство надо закешировать, но не знаю как???
                    position: e.getBoundingClientRect().top,
                };
            });
            for (i in article) {
                if (article[i].position <= 30 && article[i].position >= -article[i].height){
                    if(document.querySelector('.nav__link_blog-active'))
                        document.querySelector('.nav__link_blog-active').classList.remove('nav__link_blog-active');
                    document.querySelector('a[href*=' + i + ']').classList.add('nav__link_blog-active'); // не подсвечивается последняя ссылка, что логично, но надо это поправить
                } 
            }
        });
    };
    return {
        scroll: scrollSpy,
    };
})();

module.exports = highlighter.scroll; // метод или функцию надо экспортировать без скобок


/***/ }),
/* 6 */
/***/ (function(module, exports) {

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


/***/ }),
/* 7 */
/***/ (function(module, exports) {

const blur = (function (){
    const block = document.querySelector('.feedback');
    const checkOffsetTop = () => {
        if (block) {
            let distance = block.offsetTop;
            block.style.backgroundPosition = 'center ' + -distance + 'px';
        }
    };
    window.onresize = () => {
        checkOffsetTop();
    };
    return {
        init: checkOffsetTop,
    };
})();
module.exports = blur.init;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

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
            }, 500);
        });
        if(imagesLoaded >= imagesCount){
            setTimeout( () => {
                preloader.style.opacity = '0';
                setTimeout( () => {
                    preloader.style.zIndex = '-1';
                }, 1000);
            }, 3000);  
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

/***/ }),
/* 9 */
/***/ (function(module, exports) {

const formActions = function(){
    const form = document.querySelector('form');
    const formFields = form.querySelectorAll('.form__input');
    const formCheckboxes = form.querySelectorAll('.form__c');
    const formAction = form.getAttribute('action');
    const formMethod = form.getAttribute('method');
    const notification = document.querySelector('.notification');
    const checkInput = (input) => {
        if (input.value.trim() === ''){
            input.classList.add('form__input_empty');
        }else{
            input.classList.remove('form__input_empty');
        }
    };
    const checkBox = (input) => {
        if (!input.checked){
            input.classList.add('form__c_empty');
        }else{
            input.classList.remove('form__c_empty');
        }
    };

    [].forEach.call(formFields, function(element){
        element.addEventListener('blur', function(){
            checkInput(element);
        });
    });

    [].forEach.call(formCheckboxes, function(element){
        element.addEventListener('click', function(){
            checkBox(element);
        });
    });

    if(notification){
        const closeNotification = notification.querySelector('.btn');
        closeNotification.addEventListener('click', (e) => {
            e.preventDefault();
            notification.classList.remove('notification_visible');
            form.reset();
        });
    }

    form.addEventListener('submit', (e) =>{
        e.preventDefault();
        [].forEach.call(formFields, checkInput);
        [].forEach.call(formCheckboxes, checkBox);
        if (!document.querySelector('.form__input_empty') && !document.querySelector('.form__c_empty')){
            const formData = new FormData(form);
            const xhr = new XMLHttpRequest();
            xhr.open(formMethod, formAction);
            xhr.send(formData);
            if(notification) notification.classList.add('notification_visible');
        }
    });
};

const formActionsInit = () => {
    if(document.querySelector('form'))
        formActions();
};

module.exports = formActionsInit;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

const slider = ()=>{
    const slider = document.querySelector('.slider');
    const controls = document.querySelectorAll('.controls');
    const projectList = slider.querySelectorAll('.project__item');
    const sliderLength = projectList.length;
    const imageList = slider.querySelectorAll('.image__item');
    const controlPrev = slider.querySelector('.controls__prev');
    const controlNext = slider.querySelector('.controls__next');
    let currentIndex = 0;
    const last = sliderLength - 1;
    
    const removeActive = (array) => {
        [].forEach.call(array, (item)=>{
            item.classList.remove('active');
        });
    };

    const makeActive = (array, index) => {
        array[index].classList.add('active');
    };

    const defineDirection = (index) => {
        let next = index + 1;
        let prev = index - 1;
        if (next > last) next = 0;
        if (prev === -1) prev = last;
        return{
            next: next,
            prev: prev,
        };
    };

    const moveItems = (index) => {
        let direction = defineDirection(index);
        removeActive(projectList);
        removeActive(imageList);
        makeActive(projectList, index);
        makeActive(imageList, index);
        controlPrev.querySelector('.controls__bg-list').style.transform = 'translateY('+-100*(direction.prev)+'%)';
        controlNext.querySelector('.controls__bg-list').style.transform = 'translateY('+-100*(direction.next)+'%)';
    };
    
    

    [].forEach.call(controls, (item) => {
        window.onload = () => {
            moveItems(currentIndex);
        };
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const button = e.currentTarget;
            let currentActive;
            projectList.forEach((item, index) => {
                if(item.classList.contains('active')) {currentActive = index;}
            });
            let direction = defineDirection(currentActive);
            if(button.classList.contains('controls__prev')){
                moveItems(direction.prev);
            } else {
                moveItems(direction.next);
            }
        });   
    });

};

const sliderInit = () => {
    if(document.querySelector('.slider'))
        slider();
};
module.exports = sliderInit;

/***/ })
/******/ ]);