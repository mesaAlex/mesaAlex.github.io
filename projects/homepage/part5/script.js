document.addEventListener('DOMContentLoaded', () => {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navCta = document.querySelector('.nav-cta');
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

  // Close mobile nav when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
});
