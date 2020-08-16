'use strict';

(function () {
  var sliderElement = document.querySelector('.decor'),
      slidesElements = Array.from(document.querySelectorAll('.decor__item')),
      submitButtonElement = document.querySelector('.form__item-btn--decor'),
      totalDecorElement = document.querySelector('#decor'),
      windowWidth = window.innerWidth;

  var onSubmitButtonClick = function () {  // Записывает значение текущего слайда в итоговое окно
    var currentDecor = sliderElement.querySelector('.decor__item--current').querySelector('.decor__item-title').textContent;
    totalDecorElement.textContent = currentDecor;
    sliderElement.querySelector('.decor__item--current').querySelector('.decor__item-radio').checked = true;
  };

  var addSlideClickListener = function (evt) { // Записывает значение слайда по которому был клик в итоговое окно
    totalDecorElement.textContent = evt.currentTarget.querySelector('.decor__item-title').textContent;
    evt.currentTarget.querySelector('.decor__item-radio').checked = true;
  };

  var addAllSlidesClickListeners = function (slides) { // Добавляет обработчик клика всем слайдам
    for (var i = 0; i < slides.length; i++) {
      slides[i].addEventListener('click', addSlideClickListener);
    };
  }

  var removeAllSlidesClickListeners = function (slides) { // Удаляет обработчик клика всем слайдам
    for (var i = 0; i < slides.length; i++) {
      slides[i].removeEventListener('click', addSlideClickListener);
    };
  }

  var addOrDeleteSlidesListeners = function (slides) { // В зависимости от ширины окна добавляет
    if (windowWidth < 768) {                           // или удаляет обработчики клика по слайдам
      removeAllSlidesClickListeners(slides);
    } else {
      addAllSlidesClickListeners(slides);
    }
  };

  var updateWindowWidth = function () { // Отслеживает ширину окна
    windowWidth = window.innerWidth;
    addOrDeleteSlidesListeners(slidesElements);
  };

  window.addEventListener('resize', updateWindowWidth)
  window.decorSlider.add(); // Импортирует настройки для слайдера
  submitButtonElement.addEventListener('click', onSubmitButtonClick);  // Навешивает обработчик на кнопку
  addOrDeleteSlidesListeners(slidesElements);
})();
