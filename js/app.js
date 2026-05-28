(() => {
  const STORAGE_KEY = 'englishExcellenceContacts';

  const initSwiper = () => {
    if (typeof Swiper === 'undefined') {
      return;
    }

    new Swiper('.course-swiper', {
      loop: true,
      spaceBetween: 20,
      grabCursor: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1158: {
          slidesPerView: 3,
        },
      },
    });
  };

  const initForm = () => {
    const form = document.querySelector('[data-contact-form]');

    if (!form) {
      return;
    }

    const savedItems = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const elements = Array.from(form.elements).filter((element) => element.name);
      const hasEmptyField = elements.some((element) => {
        if (element.type === 'checkbox') {
          return !element.checked;
        }

        return element.value.trim() === '';
      });

      if (hasEmptyField) {
        alert('All form fields must be filled in.');
        return;
      }

      const userData = elements.reduce((data, element) => {
        data[element.name] = element.type === 'checkbox' ? element.checked : element.value.trim();
        return data;
      }, {});

      savedItems.push(userData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedItems));
      console.log(savedItems);

      form.reset();
      form.classList.add('is-success');
      window.setTimeout(() => form.classList.remove('is-success'), 550);
    });
  };

  const initModal = () => {
    const modal = document.querySelector('[data-modal]');
    const openButtons = document.querySelectorAll('[data-modal-open]');
    const closeButton = document.querySelector('[data-modal-close]');
    const contactLink = document.querySelector('[data-modal-contact]');

    if (!modal || openButtons.length === 0 || !closeButton) {
      return;
    }

    const openModal = () => {
      modal.hidden = false;
      document.body.classList.add('no-scroll');
      closeButton.focus();
    };

    const closeModal = () => {
      modal.hidden = true;
      document.body.classList.remove('no-scroll');
    };

    openButtons.forEach((button) => button.addEventListener('click', openModal));
    closeButton.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.hidden) {
        closeModal();
      }
    });

    contactLink?.addEventListener('click', closeModal);
  };

  const initReadMore = () => {
    const textBlock = document.getElementById('course-description');
    const button = document.querySelector('[data-read-more]');

    if (!textBlock || !button) {
      return;
    }

    button.addEventListener('click', () => {
      const isExpanded = textBlock.classList.toggle('is-expanded');
      button.textContent = isExpanded ? 'Show less' : 'Read more';
    });
  };

  const applyJsStyles = () => {
    const hero = document.querySelector('.hero');
    const titleElements = document.getElementsByTagName('h2');
    const cards = document.querySelectorAll('.card');

    hero?.classList.add('js-hero-ready');
    Array.from(titleElements).forEach((title) => title.classList.add('js-title-enhanced'));
    cards.forEach((card) => card.classList.add('js-card-enhanced'));
  };

  document.addEventListener('DOMContentLoaded', () => {
    initSwiper();
    initForm();
    initModal();
    initReadMore();
    applyJsStyles();
  });
})();
