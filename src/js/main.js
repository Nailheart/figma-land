(() => {
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
})();