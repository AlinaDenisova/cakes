'use strict';

(function () {
  var sizeListElement = document.querySelector('.size'),
      sizeElements = Array.from(sizeListElement.querySelectorAll('.size__item-label')),
      sizeItems = Array.from(sizeListElement.querySelectorAll('.size__item')),
      sizeTotal = document.querySelector('#size'),
      sizeButton = document.querySelector('.form__item-btn--size');

  var updateSizeValue = function (evt) {
    sizeTotal.textContent = evt.target.textContent;
  };

  var onSizeElementClick = function (evt) {  // При клике на элемент, его значение записывается в итоговое поле.
    updateSizeValue(evt);
  };

  var onSizeElementPressEsc = function (evt) {  // При клике на элемент, его значение записывается в итоговое поле.
    if (evt.keyCode === 32) {
      sizeTotal.textContent = evt.currentTarget.querySelector('.size__item-label').textContent;
    }
  };

  var addSizeElementsListeners = function () {  // Вешает обработчики на все элементы
    for (var i = 0; i < sizeElements.length; i++) {
      sizeElements[i].addEventListener('click', onSizeElementClick);
      sizeItems[i].addEventListener('keydown', onSizeElementPressEsc);
    };
  };

  var removeSizeElementsListeners = function () {  // Удаляет обработчики с элементов
    for (var i = 0; i < sizeElements.length; i++) {
      sizeElements[i].removeEventListener('click', onSizeElementClick);
      sizeItems[i].removeEventListener('keydown', onSizeElementPressEsc);
    };
  };

  var findCurrentElement = function (element) {  // Возвращает true, если элемент активный
    if (element.classList.contains('size__item--current')) {
      return true;
    }
    return false;
  };

  var onSizeButtonClick = function () {  // При клике на кнопку, его значение записывается в итоговое поле.
    var currentSizeElementIndex = sizeItems.findIndex(findCurrentElement);
    sizeTotal.textContent = sizeItems[currentSizeElementIndex].querySelector('label').textContent;
  };

  window.addEventListener('resize', function () {
    // Обработчик изменения ширины экрана.
    if (screen.width >= 768) {
      window.sizeSlider.removeSlider();
      addSizeElementsListeners();
      sizeButton.removeEventListener('click', onSizeButtonClick);
    } else if (screen.width < 768) {
      window.sizeSlider.addSlider();
      removeSizeElementsListeners();
      sizeButton.addEventListener('click', onSizeButtonClick);
    }
  });

  if (screen.width >= 768) {
    window.sizeSlider.removeSlider();
    addSizeElementsListeners();
  }
  if (screen.width < 768) {
    window.sizeSlider.addSlider();
    sizeButton.addEventListener('click', onSizeButtonClick);
  }
})();
