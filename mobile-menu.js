const refs = {
  openBtn: document.querySelector('[data-menu-open]'),
  closeBtn: document.querySelector('[data-menu-close]'),
  menu: document.querySelector('[data-menu]'),
  links: document.querySelectorAll('.mobile-menu a'),
};

const toggleMenu = () => {
  const isOpen = refs.menu.classList.toggle('is-open');
  refs.openBtn.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('no-scroll', isOpen);
};

refs.openBtn.addEventListener('click', toggleMenu);
refs.closeBtn.addEventListener('click', toggleMenu);

refs.links.forEach((link) => {
  link.addEventListener('click', () => {
    refs.menu.classList.remove('is-open');
    refs.openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && refs.menu.classList.contains('is-open')) {
    toggleMenu();
  }
});
