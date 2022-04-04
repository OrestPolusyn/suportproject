"use strict";

function appHeight() {
  var doc = document.documentElement;
  doc.style.setProperty('--vh', window.innerHeight * .01 + 'px');
}

window.addEventListener('resize', appHeight);
appHeight();