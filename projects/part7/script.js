const RECIPES_JSON_URL = 'https://mesaalex.github.io/json/recipes.json';

async function fetchRecipes() {
  const response = await fetch(RECIPES_JSON_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch recipes: ${response.status}`);
  }

  return response.json();
}

function renderRecipes(recipes) {
  const recipesContainer = document.getElementById('recipes-container');
  const recipesStatus = document.getElementById('recipes-status');

  if (!recipesContainer) {
    return;
  }

  recipesContainer.innerHTML = recipes
    .map(recipe => {
      const tagsMarkup = recipe.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join('');

      return `
        <article class="recipe-card">
          <div class="recipe-image-wrapper">
            <img src="../../${recipe.img_name}" alt="${recipe.title}" />
            <button class="favorite-btn" aria-label="Add ${recipe.title} to favorites">♥</button>
          </div>
          <h3>${recipe.title}</h3>
          <p class="recipe-card-description">${recipe.description}</p>
          <div class="recipe-tags">
            ${tagsMarkup}
          </div>
          <div class="recipe-meta">
            <span>Prep: ${recipe.prep_minutes} min</span>
            <span>Cook: ${recipe.cook_minutes} min</span>
          </div>
          <a href="view-recipe.html?id=${recipe._id}" class="btn-view-recipe">View Recipe</a>
        </article>
      `;
    })
    .join('');

  if (recipesStatus) {
    recipesStatus.textContent = `${recipes.length} recipes loaded from JSON.`;
  }
}

async function loadRecipes() {
  const recipesContainer = document.getElementById('recipes-container');
  const recipesStatus = document.getElementById('recipes-status');

  if (!recipesContainer) {
    return null;
  }

  try {
    const recipes = await fetchRecipes();
    renderRecipes(recipes);
    return recipes;
  } catch (error) {
    console.error(error);

    recipesContainer.innerHTML = '';

    if (recipesStatus) {
      recipesStatus.textContent = 'Unable to load recipes right now.';
    }

    return null;
  }
}

function getRecipeSlides(recipes) {
  const featuredRecipes = recipes.filter(recipe => recipe.featured);
  const slideshowRecipes = featuredRecipes.length >= 3 ? featuredRecipes : recipes.slice(0, 3);

  return slideshowRecipes.map(recipe => ({
    src: `../../${recipe.img_name}`,
    title: recipe.description,
    alt: recipe.title
  }));
}

function initializeSlideshow(slideshowRoot, slides) {
  if (!slideshowRoot || !slides.length) {
    return;
  }

  const slideshowImage = slideshowRoot.querySelector('.slideshow-image');
  const captionBox = slideshowRoot.querySelector('.slideshow-caption');
  const captionTitle = slideshowRoot.querySelector('.slideshow-caption-title');
  const dotsContainer = slideshowRoot.querySelector('.slide-dots');
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

function setupContactForm() {
  const contactForm = document.getElementById('contact-form');
  const statusMessage = document.getElementById('contact-form-status');

  if (!contactForm || !statusMessage) {
    return;
  }

  contactForm.addEventListener('submit', async event => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    const endpoint = contactForm.dataset.formEndpoint || contactForm.action;
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.textContent || 'Send Message';
    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    statusMessage.textContent = 'Sending your message...';
    statusMessage.className = 'contact-form-status';

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || `Form submission failed: ${response.status}`);
      }

      contactForm.reset();
      statusMessage.textContent = result.message || 'Thanks. Your message was sent successfully.';
      statusMessage.className = 'contact-form-status success';
    } catch (error) {
      console.error(error);
      statusMessage.textContent = error.message || 'Sorry, the message could not be sent. Please try again.';
      statusMessage.className = 'contact-form-status error';
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  });
}

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
  const slideshowSource = slideshowRoot?.dataset.slidesSource;

  if (slideshowRoot && slideshowSource === 'recipes') {
    loadRecipes().then(recipes => {
      if (recipes) {
        initializeSlideshow(slideshowRoot, getRecipeSlides(recipes));
      }
    });
  } else {
    loadRecipes();
  }

  setupContactForm();
});
