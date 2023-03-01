(() => {
  // Toggle navigation
  const nav = document.querySelector('.nav');
  if (nav) {
    const body = document.querySelector('body');
    const navToggle = document.querySelectorAll('.nav__toggle');

    navToggle.forEach(toggle => {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('nav--active');
        body.classList.toggle('overflow-hidden');
      });
    })
  }
})();