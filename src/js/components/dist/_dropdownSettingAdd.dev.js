"use strict";

var moreNotifBtn = Array.from(document.querySelectorAll('.table-more .post-btn'));
var notItems = Array.from(document.querySelectorAll('.table-more'));

if (notItems.length > 0) {
  notItems.forEach(function (element) {
    var tooltip = document.querySelector('.post-dropdown-table');

    if (element && tooltip) {
      createPopper(element, tooltip, {
        placement: 'auto'
      });
    }
  });
}