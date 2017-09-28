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

navToggle();
flipperRotate();

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

/***/ })
/******/ ]);