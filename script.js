const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const themeColor = document.querySelector('meta[name="theme-color"]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function updateTheme(theme) {
  const isDark = theme === 'dark';
  root.dataset.theme = theme;
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  themeColor.setAttribute('content', isDark ? '#24241f' : '#f6c915');
}

updateTheme(root.dataset.theme || 'light');

themeToggle.addEventListener('click', () => {
  const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  updateTheme(nextTheme);

  try {
    localStorage.setItem('larry-portfolio-theme', nextTheme);
  } catch (error) {
    // Theme switching remains available when storage is blocked.
  }
});

function closeMenu() {
  navigation.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('.sr-only').textContent = 'Open menu';
}

menuToggle.addEventListener('click', () => {
  const shouldOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  navigation.classList.toggle('is-open', shouldOpen);
  menuToggle.setAttribute('aria-expanded', String(shouldOpen));
  menuToggle.querySelector('.sr-only').textContent = shouldOpen ? 'Close menu' : 'Open menu';
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('click', (event) => {
  if (!navigation.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !reduceMotion.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const navLinks = [...navigation.querySelectorAll('a')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!current) return;

      navLinks.forEach((link) => {
        const active = link.getAttribute('href') === `#${current.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    },
    { rootMargin: '-15% 0px -70%', threshold: [0, 0.25] }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu();
});
