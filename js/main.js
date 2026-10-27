/* ============================================
   MANGA CORPORATION — Main JavaScript
   ============================================ */

(function () {
  'use strict';

  /* -------------------------------------------------
     Configuration — Update these to connect real links
     ------------------------------------------------- */
  const SOCIAL_LINKS = {
    instagram: 'https://www.instagram.com/manggacorp/',
    github: 'https://github.com/Mangga-Corp/',
  };

  /* -------------------------------------------------
     Loader
     ------------------------------------------------- */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', function () {
      // Small delay so the animation is visible, but never blocks content
      setTimeout(function () {
        loader.classList.add('hidden');
      }, 600);
    });

    // Fallback: hide loader after 3 seconds even if load event hasn't fired
    setTimeout(function () {
      loader.classList.add('hidden');
    }, 3000);
  }

  /* -------------------------------------------------
     Dynamic Year
     ------------------------------------------------- */
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  /* -------------------------------------------------
     Navbar scroll effect
     ------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let scrollTicking = false;
    window.addEventListener('scroll', function () {
      if (!scrollTicking) {
        window.requestAnimationFrame(function () {
          if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });
  }

  /* -------------------------------------------------
     Mobile Menu
     ------------------------------------------------- */
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close menu');
    }
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open menu');
    }
    document.body.style.overflow = '';
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      if (mobileMenu && mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (menuClose) {
    menuClose.addEventListener('click', closeMenu);
  }

  // Close menu when a link is selected
  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      closeMenu();
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMenu();
      if (menuToggle) menuToggle.focus();
    }
  });

  /* -------------------------------------------------
     Smooth scrolling for anchor links
     ------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* -------------------------------------------------
     Scroll Reveal (IntersectionObserver)
     ------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      revealElements.forEach(function (el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show everything immediately if observer is unavailable
      revealElements.forEach(function (el) {
        el.classList.add('visible');
      });
    }
  } else {
    // If reduced motion is preferred, show everything immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* -------------------------------------------------
     Social Links — Apply centralized configuration
     ------------------------------------------------- */
  const instagramLink = document.getElementById('instagram-link');
  const githubLink = document.getElementById('github-link');

  if (instagramLink) {
    if (SOCIAL_LINKS.instagram) {
      instagramLink.href = SOCIAL_LINKS.instagram;
      instagramLink.setAttribute('aria-label', 'Instagram');
    } else {
      // Keep placeholder state clearly identifiable
      instagramLink.href = '#social-instagram-placeholder';
      instagramLink.setAttribute('aria-label', 'Instagram — link not yet configured');
      instagramLink.addEventListener('click', function (e) {
        e.preventDefault();
      });
    }
  }

  if (githubLink) {
    if (SOCIAL_LINKS.github) {
      githubLink.href = SOCIAL_LINKS.github;
      githubLink.setAttribute('aria-label', 'GitHub');
    } else {
      githubLink.href = '#social-github-placeholder';
      githubLink.setAttribute('aria-label', 'GitHub — link not yet configured');
      githubLink.addEventListener('click', function (e) {
        e.preventDefault();
      });
    }
  }
})();
