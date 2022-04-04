"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var trade = document.querySelectorAll('.trade');
var switcherTrade = document.querySelector('.switcher-label');

if (_toConsumableArray(trade).length > 0) {
  switcherTrade.addEventListener('click', function () {
    trade.forEach(function (element) {
      if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
        setTimeout(function () {
          element.classList.remove('visually-hidden');
        }, 20);
      } else {
        element.classList.add('visually-hidden');
        element.addEventListener('transitionend', function (e) {
          element.classList.add('hidden');
        }, {
          capture: false,
          once: true,
          passive: false
        });
      }
    });
  }, false);
}