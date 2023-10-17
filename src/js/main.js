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

  // Swiper slider
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

  // GSAP animation
  gsap.registerEffect({
    name: 'fadeIn',
    effect: (targets, config) => {
      return gsap.from(targets, {
          scrollTrigger: {
            trigger: targets,
            start: 'top 90%',
          },
          y: 70,
          ease: "sine.out",
          stagger: .3,
          duration: .8,
          scale: .5,
          opacity: 0,
        }
      );
    },
  });

  gsap.registerEffect({
    name: 'slideIn',
    defaults: {
      x: '100%',
      ease: 'none',
      duration: .8,
    },
    effect: (targets, config) => {
      return gsap.from(targets, {
          scrollTrigger: {
            trigger: targets,
            start: 'top 80%',
          },
          opacity: 0,
          x: config.x,
          ease: config.ease,
          duration: config.duration,
        }
      );
    },
  });

  gsap.from(['.intro__title', '.intro__desc', '.intro__gsap-trigger'], {
    x: -300,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    ease: "back",
  });

  gsap.effects.fadeIn('.features__item');
  gsap.effects.fadeIn('.features__preview');
  gsap.effects.fadeIn('.pricing__item');

  gsap.effects.slideIn('.organize__header', { x: '-100%', ease: "sine.out", duration: 1 });
  gsap.effects.slideIn('.organize__img');

  gsap.effects.slideIn('.newsletter__img', { x: '-100%' });
  gsap.effects.slideIn('.newsletter__header', { ease: "sine.out", duration: 1 });
  gsap.effects.slideIn('.newsletter__subscribe', { ease: "sine.out", duration: 1 });
})();