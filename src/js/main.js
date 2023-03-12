(() => {
  // Stiky header
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > header.offsetTop) {
        header.classList.add('header--sticky');
      } else {
        header.classList.remove('header--sticky');
      }
    });
  }

  // Toggle navigation
  const nav = document.querySelector('.nav');
  if (nav) {
    const body = document.querySelector('body');
    const navToggle = document.querySelector('.nav__toggle');

    navToggle.addEventListener('click', () => {
      nav.classList.toggle('nav--active');
      body.classList.toggle('overflow-hidden');
    });
  }
  
  // Partners slider
  const partnersSwiper = new Swiper('.partners__swiper', {
    slidesPerView: 1,
    loop: true,
    speed: 3000,
    spaceBetween: 24,

    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },

    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },
  });

  // Swiper
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
})();