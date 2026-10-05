const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const themeColor = document.querySelector('meta[name="theme-color"]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const navigation = document.querySelector('[data-nav]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const typingText = document.querySelector('[data-typing-text]');
const entryLoader = document.querySelector('[data-entry-loader]');
const profileToggle = document.querySelector('[data-profile-toggle]');
const profilePhoto = document.querySelector('[data-profile-photo]');

function updateTheme(theme) {
  const isDark = theme === 'dark';
  root.dataset.theme = theme;
  themeToggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
  themeColor.setAttribute('content', isDark ? '#24241f' : '#f6c915');
}

updateTheme(root.dataset.theme || 'light');

if (entryLoader) {
  if (reduceMotion.matches) {
    root.classList.remove('is-loading');
    entryLoader.remove();
  } else {
    window.setTimeout(() => entryLoader.classList.add('is-opening'), 720);
    window.setTimeout(() => {
      root.classList.remove('is-loading');
      entryLoader.classList.add('is-leaving');
    }, 1420);
    window.setTimeout(() => entryLoader.remove(), 1880);
  }
} else {
  root.classList.remove('is-loading');
}

if (profileToggle && profilePhoto) {
  function enableProfilePhoto() {
    profileToggle.disabled = false;
    profileToggle.classList.add('has-profile-photo');
    profileToggle.setAttribute('aria-label', 'Show Kuan-Ting Chen profile photo');
  }

  if (profilePhoto.complete && profilePhoto.naturalWidth > 0) enableProfilePhoto();
  else profilePhoto.addEventListener('load', enableProfilePhoto, { once: true });

  profileToggle.addEventListener('click', () => {
    if (!profileToggle.classList.contains('has-profile-photo')) return;

    const isFlipped = profileToggle.classList.toggle('is-flipped');
    profileToggle.setAttribute('aria-pressed', String(isFlipped));
    profileToggle.setAttribute(
      'aria-label',
      isFlipped ? 'Show Pikachu avatar' : 'Show Kuan-Ting Chen profile photo'
    );
  });
}

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

const typingPhrases = [
  'AI/ML Enthusiast',
  'Data Competition',
  'Sport Analytics',
  'LLM Researcher'
];

if (typingText) {
  if (reduceMotion.matches) {
    typingText.textContent = typingPhrases.join(' · ');
  } else {
    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function updateTypingText() {
      const phrase = typingPhrases[phraseIndex];
      characterIndex += deleting ? -1 : 1;
      typingText.textContent = phrase.slice(0, characterIndex);

      let delay = deleting ? 38 : 72;

      if (!deleting && characterIndex === phrase.length) {
        deleting = true;
        delay = 1400;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        delay = 260;
      }

      window.setTimeout(updateTypingText, delay);
    }

    typingText.textContent = '';
    window.setTimeout(updateTypingText, 350);
  }
}

const finePointer = window.matchMedia('(pointer: fine)');

if (finePointer.matches && !reduceMotion.matches) {
  let lastSparkTime = 0;
  let lastSparkX = -100;
  let lastSparkY = -100;

  document.addEventListener('pointermove', (event) => {
    const now = performance.now();
    const distance = Math.hypot(event.clientX - lastSparkX, event.clientY - lastSparkY);

    if (now - lastSparkTime < 60 || distance < 10) return;

    const spark = document.createElement('span');
    spark.className = `cursor-spark${Math.random() < 0.24 ? ' is-confetti' : ''}`;
    spark.style.left = `${event.clientX}px`;
    spark.style.top = `${event.clientY}px`;
    spark.style.setProperty('--spark-x', `${Math.round(Math.random() * 24 - 12)}px`);
    spark.style.setProperty('--spark-y', `${Math.round(Math.random() * 16 + 12)}px`);
    spark.style.setProperty('--spark-rotation', `${Math.round(Math.random() * 80 - 40)}deg`);
    document.body.append(spark);
    spark.addEventListener('animationend', () => spark.remove(), { once: true });

    lastSparkTime = now;
    lastSparkX = event.clientX;
    lastSparkY = event.clientY;
  }, { passive: true });
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();

window.addEventListener('resize', () => {
  if (window.innerWidth > 840) closeMenu();
});
