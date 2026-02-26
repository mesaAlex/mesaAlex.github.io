document.addEventListener('DOMContentLoaded', () => {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

  // Toggle mobile nav when hamburger button is clicked
  mobileNavToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });

  // Close mobile nav when clicking outside of it
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-cta') && !e.target.closest('.mobile-nav')) {
      mobileNav.classList.remove('open');
    }
  });
});
