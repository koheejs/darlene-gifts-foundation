'use strict';

/**
 * =================================================================
 * TODO: Implement function here
 * =================================================================
 */

function initAOS() {
  AOS.init({
    delay: 100,
    duration: 400,
    easing: 'ease-out',
    offset: 10,
    once: true,
  });
}

/**
 * Updates the attribute name of an HTML element by removing the old attribute and adding a new attribute with the same value.
 * @param {HTMLElement} element - The HTML element whose attribute needs to be updated.
 * @param {string} from - The name of the old attribute.
 * @param {string} to - The name of the new attribute.
 */
function updateAttributeName(element, from, to) {
  const value = element.getAttribute(from);
  element.removeAttribute(from);
  element.setAttribute(to, value);
}

/**
 * Initializes an animation using the Anime.js library on a specified wrapper element.
 * @param {HTMLElement} wrapperElement - The wrapper element on which the animation will be initialized.
 */
function initAnime(wrapperElement) {
  const fading = anime.timeline({ opacity: [0, 1], duration: 4000 });
  const effectElements = wrapperElement.querySelectorAll('[data-anime]');

  for (let item in effectElements) {
    fading.add(
      { targets: effectElements[item], opacity: [0, 1] },
      item > 0 ? '-=3000' : 0
    );
  }
}

(function scrollEffect() {
  let swiper;
  let maxIndex = 0;

  const Class = { SWIPER: 'swiper', WRAPPER: 'swiper-wrapper' };

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
      on: {
        init: function (swiper) {
          document.querySelectorAll('[data-aos]').forEach((item) => {
            updateAttributeName(item, 'data-aos', 'data-anime');
            item.style.opacity = 0;
          });

          initAnime(swiper.slides[0]);
        },
        destroy: function () {
          document.querySelectorAll('[data-anime]').forEach((item) => {
            updateAttributeName(item, 'data-anime', 'data-aos');
          });
        },
        activeIndexChange: function (swiper) {
          if (swiper.activeIndex <= maxIndex) return;
          maxIndex = swiper.activeIndex;

          const activeSlide = swiper.slides[swiper.activeIndex];
          initAnime(activeSlide);
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
      initAOS();
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

/**
 * Toggles the visibility of a navigation menu and updates the button text accordingly.
 * Closes the menu when a navigation item is clicked.
 */
(function headerNavigator() {
  const classActive = 'active';
  const menuButton = document.querySelector('.menu-button');
  const navigation = document.querySelector('.site-nav');

  // Toggles the menu visibility and updates the button text.
  function toggleMenu() {
    navigation.classList.toggle(classActive);
    menuButton.textContent = navigation.classList.contains(classActive)
      ? 'CLOSE'
      : 'MENU';
  }

  menuButton.addEventListener('click', toggleMenu);

  const navigationItems = navigation.querySelectorAll('a');
  navigationItems.forEach(function (item) {
    item.addEventListener('click', toggleMenu);
  });
})();

/**
 * Adjusts the height of columns within a specific section of a webpage to be the same height as the tallest column.
 */
(function adjustSameHeight() {
  const section23 = document.getElementById('section-23');
  if (!section23) return;

  const columns = Array.from(section23.getElementsByClassName('wrapper'));

  // Adjusts the height of the columns.
  function adjustSectionHeight() {
    columns.forEach((element) => {
      element.style.height = '';
    });

    if (window.innerWidth <= 992) return;

    const maxHeight = columns.reduce((maxHeight, element) => {
      return Math.max(maxHeight, element.clientHeight);
    }, 0);

    columns.forEach((element) => {
      element.style.height = `${Math.ceil(maxHeight)}px`;
    });
  }

  window.addEventListener('resize', _.debounce(adjustSectionHeight, 50));
  window.dispatchEvent(new Event('resize'));
})();

/**
 * Adds an event listener to a video cover element.
 * When the cover is clicked, it hides the cover and reveals the video iframe.
 */
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
