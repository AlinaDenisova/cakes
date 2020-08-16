'use strict';

(function () {
  var totalFill = document.querySelector('#fill'),
      totalSize = document.querySelector('#size'),
      totalDecor = document.querySelector('#decor'),
      fillValue = document.querySelector('.fill__item--current').querySelector('.fill__item-title').textContent,
      sizeValue = document.querySelector('.size__item--current').querySelector('.size__item-label').textContent,
      decorValue = document.querySelector('.decor__item--current').querySelector('.decor__item-title').textContent;

  var setDefaultValue = function () { // Записывает дефолтные значения
    totalFill.textContent = fillValue;
    totalSize.textContent = sizeValue;
    totalDecor.textContent = decorValue;
  };

  setDefaultValue();
})();
