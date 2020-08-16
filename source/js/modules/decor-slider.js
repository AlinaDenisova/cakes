'use strict';

(function () {
  var sliderElement = document.querySelector('.decor'),
      slidesElements = Array.from(sliderElement.querySelectorAll('.decor__item')),
      sliderCounterElement = document.querySelector('.form__decor-slider-counter'),
      sliderPreviousButtonElement = document.querySelector('.slider__navigation--decor-previous'),
      sliderNextButtonElement = document.querySelector('.slider__navigation--decor-next'),
      currentSlideClass = 'decor__item--current',
      showedSlidesNumberMobile = 1,
      showedSlidesNumberTablet = 2,
      currentSlideIndex,
      isFirstSlide,
      isLastSlide,
      SWIPE_LENGTH = 50,
      TIME_SLIDE_BROWSING = 300; // В милисекундах

  var sliderCounterUpdate = function () { // Обновляет счетчик слайдов
    if (window.innerWidth < 768) {
      sliderCounterElement.textContent = (currentSlideIndex + 1) + '/' + slidesElements.length;
    } else {
      sliderCounterElement.textContent = (currentSlideIndex + 2) + '/' + slidesElements.length;
    }
  };

  var findCurrentSlide = function (element) { // Возвращает true, если слайд активный
    if (element.classList.contains(currentSlideClass)) {
      return true;
    }
    return false;
  };

  var updateCurrentSlideIndex = function () { // Определяет индекс активного слайда, проверяет не крайний ли он
    currentSlideIndex = slidesElements.findIndex(findCurrentSlide);
    isFirstSlide = currentSlideIndex === 0;
    if (window.innerWidth < 768) {
      isLastSlide = currentSlideIndex === slidesElements.length - 1;
    } else {
      isLastSlide = currentSlideIndex === slidesElements.length - 2;
    }
  };

  var showNextSlide = function (currentSlide, nextSlide) { // Показывает следующий слайд
    nextSlide.classList.add(currentSlideClass);
    setTimeout(function () {
      currentSlide.classList.remove(currentSlideClass);
    }, TIME_SLIDE_BROWSING);
  };

  var showPreviousSlide = function (currentSlide, previousSlide) { // Показывает предыдущий слайд
    previousSlide.classList.add(currentSlideClass);
      setTimeout(function () {
        currentSlide.classList.remove(currentSlideClass);
      }, TIME_SLIDE_BROWSING);
  };

  var changeSlide = function (direction) { // Меняет слвйд в зависимости от направления свайпа
    if (direction === 'left' && !isLastSlide) {
      var currentSlide = slidesElements[currentSlideIndex];
      if (window.innerWidth < 768) {
        var nextSlide = slidesElements[currentSlideIndex + showedSlidesNumberMobile];
      } else {
        var nextSlide = slidesElements[currentSlideIndex + showedSlidesNumberTablet];
      }
      showNextSlide(currentSlide, nextSlide);
    } else if (direction === 'right' && !isFirstSlide) {
      if (window.innerWidth < 768) {
        var currentSlide = slidesElements[currentSlideIndex];
        var previousSlide = slidesElements[currentSlideIndex - showedSlidesNumberMobile];
      } else {
        var currentSlide = slidesElements[currentSlideIndex + 1];
        var previousSlide = slidesElements[currentSlideIndex - 1];
      }
      showPreviousSlide(currentSlide, previousSlide);
    }
    setTimeout(function () {
      updateCurrentSlideIndex();
      window.decorSliderIndicator.update(slidesElements, currentSlideIndex);
      sliderCounterUpdate();
      navigationButtonsUpdate();
    }, TIME_SLIDE_BROWSING);
  };

  var addSwipeListener = function (element) { // Добавляет обработчик свайпа на элемент
    var startSwipeX = null;
    var endSwipeX = null;
    var swipeDirection = null;

    element.addEventListener('touchstart', function (evt) { // При косании экрана запоминает координаты
      startSwipeX = evt.changedTouches[0].screenX;
    });

    element.addEventListener('touchend', function (evt) { // По окончании свайпа запоминает координаты и если длина свайпа не меньше заданной,
      endSwipeX = evt.changedTouches[0].screenX;          // определяет направление свайпа и запускает функцию с этим аргументом
      if (Math.abs(startSwipeX - endSwipeX) >= SWIPE_LENGTH) {
        if (startSwipeX - endSwipeX < 0) {
          swipeDirection = 'right';
        } else {
          swipeDirection = 'left';
        }
        changeSlide(swipeDirection);
      }
    });
  };

  var addNavigationButtonsListeners = function () { // Обработчики кнопок навигации слайдера
    sliderPreviousButtonElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeSlide('right');
    });
    sliderNextButtonElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      changeSlide('left');
    });
  };

  var navigationButtonsUpdate = function () {
    sliderPreviousButtonElement.classList.remove('slider__navigation--disabled');
    sliderNextButtonElement.classList.remove('slider__navigation--disabled');
    if (isFirstSlide) {
      sliderPreviousButtonElement.classList.add('slider__navigation--disabled');
    } else if (isLastSlide) {
      sliderNextButtonElement.classList.add('slider__navigation--disabled');
    }
  };

  window.decorSlider = {
    add: function() {
      addSwipeListener(sliderElement);
      addNavigationButtonsListeners();
      updateCurrentSlideIndex();
      navigationButtonsUpdate();
      window.decorSliderIndicator.set(slidesElements);
      window.decorSliderIndicator.update(slidesElements, currentSlideIndex);
      sliderCounterUpdate();
    }
  };
})();
