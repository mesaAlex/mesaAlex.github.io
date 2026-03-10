document.addEventListener('DOMContentLoaded', () => {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

  // Set active class on mobile nav based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  mobileNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Show mobile nav on hover
  let navTimeout;

  if (mobileNavToggle && mobileNav) {
    mobileNavToggle.addEventListener('mouseenter', () => {
      clearTimeout(navTimeout);
      mobileNav.classList.add('open');
    });

    mobileNavToggle.addEventListener('mouseleave', () => {
      navTimeout = setTimeout(() => {
        mobileNav.classList.remove('open');
      }, 150);
    });

    mobileNav.addEventListener('mouseenter', () => {
      clearTimeout(navTimeout);
    });

    mobileNav.addEventListener('mouseleave', () => {
      navTimeout = setTimeout(() => {
        mobileNav.classList.remove('open');
      }, 150);
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });

    mobileNavToggle.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  const slideshowRoot = document.querySelector('[data-slideshow]');
  if (slideshowRoot) {
    const slideshowImage = slideshowRoot.querySelector('.slideshow-image');
    const captionBox = slideshowRoot.querySelector('.slideshow-caption');
    const captionTitle = slideshowRoot.querySelector('.slideshow-caption-title');
    const dotsContainer = slideshowRoot.querySelector('.slide-dots');

    const slides = [
      {
        src: '../homepage/images/salmon_salad.png',
        title: 'Fresh salmon salad for high-protein lunches',
        alt: 'Salmon salad with greens and vegetables'
      },
      {
        src: '../homepage/images/chicken_salad.png',
        title: 'Chicken salad that keeps meal prep simple',
        alt: 'Chicken salad served in a bowl'
      },
      {
        src: '../homepage/images/tofu_salad.png',
        title: 'Tofu salad packed with plant-based protein',
        alt: 'Tofu salad with colorful vegetables'
      }
    ];

    let currentIndex = 0;
    let slideshowTimer;
    let isTransitioning = false;
    const fadeDuration = 550;

    const renderDots = () => {
      dotsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = `slide-dot${index === currentIndex ? ' active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(index, true);
          startTimer();
        });
        dotsContainer.appendChild(dot);
      });
    };

    const goToSlide = (index, animated = false) => {
      const nextIndex = (index + slides.length) % slides.length;

      if (!animated) {
        currentIndex = nextIndex;
        slideshowImage.src = slides[currentIndex].src;
        slideshowImage.alt = slides[currentIndex].alt;
        captionTitle.textContent = slides[currentIndex].title;
        renderDots();
        return;
      }

      if (isTransitioning || nextIndex === currentIndex) {
        return;
      }

      isTransitioning = true;
      slideshowImage.classList.add('is-fading');
      captionBox.classList.add('is-fading');

      window.setTimeout(() => {
        currentIndex = nextIndex;
        slideshowImage.src = slides[currentIndex].src;
        slideshowImage.alt = slides[currentIndex].alt;
        captionTitle.textContent = slides[currentIndex].title;
        renderDots();
        slideshowImage.classList.remove('is-fading');
        captionBox.classList.remove('is-fading');
        isTransitioning = false;
      }, fadeDuration);
    };

    const nextSlide = () => {
      goToSlide(currentIndex + 1, true);
    };

    const startTimer = () => {
      clearInterval(slideshowTimer);
      slideshowTimer = setInterval(nextSlide, 3000);
    };

    goToSlide(0, false);
    startTimer();
  }
});
