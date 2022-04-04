"use strict";

var _vars = _interopRequireDefault(require("../_vars"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

if (_vars["default"].navSearchClear) {
  _vars["default"].navSearchClear.addEventListener('input', function (e) {
    if (e.target.value.length > 0) {
      _vars["default"].searchClear.classList.add('clear');
    } else {
      _vars["default"].searchClear.classList.remove('clear');
    }
  });

  _vars["default"].searchClear.addEventListener('click', function (e) {
    _vars["default"].searchClear.classList.remove('clear');
  });
}