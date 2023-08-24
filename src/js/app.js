'use strict';

/**
 * =================================================================
 * TODO: Implement function here
 * =================================================================
 */

// (function menuMobile() {
//   const classActive = 'active';
//   const menuButton = document.querySelector('.menu-burger');
//   const navigation = document.querySelector('.header-nav');
//   menuButton.addEventListener('click', function () {
//     navigation.classList.toggle(classActive);
//   });

//   const navigationItems = navigation.querySelectorAll('a');
//   navigationItems.forEach(function (item) {
//     item.addEventListener('click', function () {
//       navigation.classList.toggle(classActive);
//     });
//   });
// })();

(function scrollEffect() {
  const swiper = new Swiper('main', {
    direction: 'vertical',
    mousewheel: true,
    freeMode: true,
    breakpoints: {
      768: {
        direction: 'horizontal',
      },
    },
  });
})();
