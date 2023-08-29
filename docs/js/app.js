'use strict';

/**
 * =================================================================
 * TODO: Implement function here
 * =================================================================
 */

(function headerNavigator() {
  const classActive = 'active';
  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('.site-nav');
  menuButton.addEventListener('click', function () {
    console.log('dsadsa');
    navigation.classList.toggle(classActive);
  });

  const navigationItems = navigation.querySelectorAll('a');
  navigationItems.forEach(function (item) {
    item.addEventListener('click', function () {
      navigation.classList.toggle(classActive);
    });
  });
})();

(function scrollEffect() {
  const swiper = new Swiper('main', {
    direction: 'vertical',
    mousewheel: true,
    // freeMode: true,
    breakpoints: {
      768: {
        direction: 'horizontal',
      },
    },
  });
})();
