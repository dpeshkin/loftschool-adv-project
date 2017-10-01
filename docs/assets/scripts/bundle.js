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

navToggle();
flipperRotate();
scroll();
sticky();

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
        var btns = document.querySelectorAll('.flipper-rotate');
        for (var i = 0; i < btns.length; i++) {
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




/***/ }),
/* 4 */
/***/ (function(module, exports) {


var Sticky = (function () {

    const activeClass = 'sticky';

    var Sticky = {
        element: null,
        addEvents: function () {
            window.addEventListener('scroll', this.onScroll.bind(this));
        },
        getOffsetTop: function () {
            var element = this.element;
            var position = 0;
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
            this.addEvents();
            this.onScroll();
        },
        aboveScroll: function () {
            return this.getOffsetTop() < window.scrollY;
        },
        onScroll: function () {
            if (this.aboveScroll()) {
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


    //  Init Sticky
var sticky = function() {
    var element = document.querySelector('.blog__nav');
    if (element)
        Sticky.init(element);
};

module.exports = sticky;

/***/ })
/******/ ]);