"use strict";

(function () {
  var doc = document.documentElement;
  var w = window;
  var prevScroll = w.scrollY || doc.scrollTop;
  var curScroll;
  var direction = 0;
  var prevDirection = 0;
  var header = document.querySelector('.header');

  var checkScroll = function checkScroll() {
    curScroll = w.scrollY || doc.scrollTop;

    if (curScroll > prevScroll) {
      //scrolled up
      direction = 2;
    } else if (curScroll < prevScroll) {
      //scrolled down
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  var toggleHeader = function toggleHeader(direction, curScroll) {
    if (direction === 2 && curScroll > 52) {
      //replace 52 with the height of your header in px
      header.classList.add('header--scroll');
      prevDirection = direction;
    } else if (direction === 1) {
      header.classList.remove('header--scroll');
      prevDirection = direction;
    }
  };

  window.addEventListener('scroll', checkScroll);
})();

window.addEventListener('scroll', function () {
  if (window.pageYOffset > 200) {
    document.querySelector('.header').style.backgroundColor = "#fff";
  } else if (window.pageYOffset === 0) {
    document.querySelector('.header').style.backgroundColor = "transparent";
  }
});