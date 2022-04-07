"use strict";

var _burger = require("./functions/burger");

var _graphModal = _interopRequireDefault(require("graph-modal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Реализация модального окна
var modal = new _graphModal["default"](); // Подключение плавной прокрутки к якорям
// import SmoothScroll from 'smooth-scroll';
// const scroll = new SmoothScroll('a[href*="#"]');
// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//   console.log(e.target);
//   console.log(e.detail);
//   console.log(e.detail.dir);
// });