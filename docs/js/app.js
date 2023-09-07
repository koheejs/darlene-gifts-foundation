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
  let swiper;
  const mainElement = document.querySelector('main');
  const wrapper = mainElement.firstElementChild;

  function initSwiper() {
    mainElement.classList.add('swiper');
    wrapper.classList.add('swiper-wrapper');

    swiper = new Swiper('main', {
      freeMode: true,
      mousewheel: true,
      direction: 'vertical',
      breakpoints: {
        768: {
          direction: 'horizontal',
        },
      },
    });
  }

  // TODO: destroy swipper in mobile mode
  function destroySwiper() {
    if (swiper) swiper.destroy();
    mainElement.classList.remove('swiper');
    wrapper.classList.remove('swiper-wrapper');
  }

  function initMenuWithSwipper() {
    const navigation = document.querySelector('header .nav-items');
    const navigationItems = navigation.querySelectorAll('a');
    navigationItems.forEach(function (item) {
      item.addEventListener('click', function (event) {
        const target = parseInt(this.dataset.target);
        swiper && swiper.slideTo(target);
        event.preventDefault();
      });
    });
  }

  initSwiper();
  initMenuWithSwipper();
})();

(function () {
  const section23 = document.getElementById('section-23');
  if (!section23) return;

  const columns = section23.getElementsByClassName('wrapper');
  const arrayColumns = Array.from(columns);

  function adjustSectionHeight() {
    arrayColumns.forEach((element) => {
      element.removeAttribute('style');
    });

    if (window.innerWidth <= 992) return;

    let maxHeight = arrayColumns[0].clientHeight;

    arrayColumns.forEach((element) => {
      maxHeight = Math.max(maxHeight, element.clientHeight);
    });

    arrayColumns.forEach((element) => {
      element.style.height = `${Math.ceil(maxHeight)}px`;
    });
  }

  window.addEventListener('resize', _.debounce(adjustSectionHeight, 50));
  window.dispatchEvent(new Event('resize'));
})();
