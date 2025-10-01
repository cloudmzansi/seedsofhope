// Hide navbar on scroll down, show on scroll up
(function() {
  let lastScrollTop = 0;
  let ticking = false;
  const nav = document.querySelector('.nav');
  
  if (!nav) return;
  
  function updateNavbar() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only trigger if scrolled more than 100px to avoid flickering
    if (scrollTop > 100) {
      if (scrollTop > lastScrollTop) {
        // Scrolling down - hide navbar
        nav.classList.remove('scrolled-up');
        nav.classList.add('scrolled-down');
      } else {
        // Scrolling up - show navbar
        nav.classList.remove('scrolled-down');
        nav.classList.add('scrolled-up');
      }
    } else {
      // Near top - always show navbar
      nav.classList.remove('scrolled-down');
      nav.classList.remove('scrolled-up');
    }
    
    lastScrollTop = scrollTop;
    ticking = false;
  }
  
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', requestTick, { passive: true });
})();
