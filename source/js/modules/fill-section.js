'use strict';

(function () {
  var sliderElement = document.querySelector('.fill'),
      submitButtonElement = document.querySelector('.form__item-btn--fill'),
      totalDesignElement = document.querySelector('#fill');

  var onSubmitButtonClick = function () { // Записывает текущее значение в итоговое окно
    var currentDesign = sliderElement.querySelector('.fill__item--current').querySelector('.fill__item-title').textContent;
    sliderElement.querySelector('.fill__item--current').querySelector('.fill__item-radio').checked = true;
    totalDesignElement.textContent = currentDesign;
  };

  submitButtonElement.addEventListener('click', onSubmitButtonClick); // Навешивает обработчик

  window.fillSlider.add();
})();
