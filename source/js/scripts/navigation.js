'use strict';

//управление меню навигации
// var header = document.querySelector(".page-header");
// var toggle = document.querySelector(".page-header__toggle");

// toggle.addEventListener("click", function(evt) {
//   evt.preventDefault();
//   if (header.classList.contains("page-header--closed")) {
//     header.classList.remove("page-header--closed");
//     header.classList.add("page-header--opened");
//   } else {
//     header.classList.add("page-header--closed");
//     header.classList.remove("page-header--opened");
//   }
// });

window.navigation = (function () {
  var MOBILE_WIDTH_MAX = 1219;

  var header = document.querySelector('.page-header');
  var headerToggle = document.querySelector('.page-header__toggle');

  var isHeaderOpened = function () {
    return header.classList.contains('page-header--opened');
  };

  var isMobileScreen = function () {
    return window.innerWidth <= MOBILE_WIDTH_MAX;
  };

  var showHeader = function () {
    header.classList.remove('page-header--closed');
    header.classList.add('page-header--opened');
    window.addEventListener('resize', resizeWindowHandler);
  };

  var hideHeader = function () {
    header.classList.remove('page-header--opened');
    header.classList.add('page-header--closed');
    window.removeEventListener('resize', resizeWindowHandler);
  };

  var onToggleClick = function () {
    if (isHeaderOpened()) {
      hideHeader();
    } else {
      showHeader();
    }
  };

  var resizeWindowHandler = function () {
    if (!isMobileScreen() && isHeaderOpened()) {
      hideHeader();
    }
  };

  headerToggle.addEventListener('click', onToggleClick);

  return {
    isOpened: isHeaderOpened,
    show: showHeader,
    hide: hideHeader
  };
})();
