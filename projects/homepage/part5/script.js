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
  navCta.addEventListener('mouseenter', () => {
    mobileNav.classList.add('open');
  });

  navCta.addEventListener('mouseleave', () => {
    mobileNav.classList.remove('open');
  });

  // Close mobile nav when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
});
