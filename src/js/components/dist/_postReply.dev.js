"use strict";

var _vars = _interopRequireDefault(require("../_vars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var postReply = _toConsumableArray(_vars["default"].postReply);

if (postReply.length > 0) {
  postReply.forEach(function (element) {
    element.addEventListener('click', function (e) {
      var commentReply = this.closest('[data-reply]').dataset.reply;
      var textForm = element.closest('.post').querySelector('.comment-input');
      textForm.value = commentReply + ' ';
      textForm.focus();
    });
  });
}