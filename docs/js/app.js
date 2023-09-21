'use strict';

/**
 * =================================================================
 * TODO: Implement function here
 * =================================================================
 */

(function headerNavigator() {
  let isActive = false;
  const classActive = 'active';
  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('.site-nav');

  function toggleMenu() {
    navigation.classList.toggle(classActive);
    isActive = !isActive;
    menuButton.textContent = isActive ? 'CLOSE' : 'MENU';
  }

  menuButton.addEventListener('click', function () {
    toggleMenu();
  });

  const navigationItems = navigation.querySelectorAll('a');
  navigationItems.forEach(function (item) {
    item.addEventListener('click', function () {
      toggleMenu();
    });
  });
})();

(function scrollEffect() {
  let swiper;
  const Class = {
    SWIPER: 'swiper',
    WRAPPER: 'swiper-wrapper',
  };

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

  function destroySwiper() {
    if (swiper) swiper.destroy();
    swiper = null;
    mainElement.classList.remove('swiper');
    wrapper.classList.remove('swiper-wrapper');
  }

  function initMenuWithSwipper() {
    const navigation = document.querySelector('header .nav-items');
    const navigationItems = navigation.querySelectorAll('a');
    navigationItems.forEach(function (item) {
      item.addEventListener('click', function (event) {
        const target = parseInt(this.dataset.target);
        if (swiper) {
          swiper && swiper.slideTo(target);
          event.preventDefault();
        }
      });
    });
  }

  function swipperHandler() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (windowWidth < 768 || windowHeight < 400) {
      destroySwiper();
      mainElement.classList.remove(Class.SWIPER);
      wrapper.classList.remove(Class.WRAPPER);
    } else {
      mainElement.classList.add(Class.SWIPER);
      wrapper.classList.add(Class.WRAPPER);
      initSwiper();
    }
  }

  window.addEventListener('resize', _.debounce(swipperHandler, 50));
  window.dispatchEvent(new Event('resize'));

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

(function video() {
  const section8 = document.getElementById('section-8');
  if (!section8) return;

  const videoCover = section8.querySelector('.cover');
  const iframe = section8.querySelector('.youtube-video');

  videoCover.addEventListener('click', () => {
    videoCover.classList.add('hidden');
    iframe.classList.remove('hidden');
  });
})();
