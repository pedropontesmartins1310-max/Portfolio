const body = document.body;
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const revealItems = document.querySelectorAll('.reveal');
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');
const projectButtons = document.querySelectorAll('.project-link');
const contactForm = document.querySelector('.contact-form');

function syncProjectCards() {
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card) => {
    card.classList.remove('hidden');
    card.style.display = '';
  });
}

const projectData = {
  nova: {
    title: 'Nova Commerce',
    badge: 'Web App',
    summary: 'A premium storefront experience focused on storytelling, trust, and conversion.',
    description:
      'Nova Commerce reimagined how product discovery and checkout feel by creating a premium visual rhythm, a smoother purchase journey, and a clearer path through product storytelling. The UI emphasizes trust, simplicity, and performance.',
    stack: ['React', 'Next.js', 'Shopify', 'UX Strategy'],
    gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.5))'
  },
  metric: {
    title: 'Metric Flow',
    badge: 'SaaS',
    summary: 'A dashboard system that turns complex metrics into fast, confident decisions.',
    description:
      'Metric Flow was designed to help teams quickly understand KPIs, benchmark trends, and share insights across leadership teams. It blends analytical depth with an accessible presentation layer to reduce friction in reporting.',
    stack: ['TypeScript', 'Charts', 'Dashboards', 'Analytics'],
    gradient: 'linear-gradient(135deg, rgba(34, 211, 238, 0.8), rgba(16, 185, 129, 0.56))'
  },
  vanta: {
    title: 'Vanta Studio',
    badge: 'Brand',
    summary: 'Editorial identity and launch page for a design-forward creative studio.',
    description:
      'Vanta Studio needed a visual language that felt refined and expressive without compromising clarity. This project combined a strong art direction with a modular front-end system to present the studio’s work and services with confidence.',
    stack: ['Brand Design', 'Web Design', 'Campaign', 'Strategy'],
    gradient: 'linear-gradient(135deg, rgba(244, 114, 182, 0.8), rgba(251, 191, 36, 0.62))'
  }
};

function setTheme(theme) {
  const isLight = theme === 'light';
  body.classList.toggle('light-theme', isLight);
  const icon = themeToggle.querySelector('i');
  icon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  localStorage.setItem('portfolio-theme', theme);
}

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) {
  setTheme(savedTheme);
}

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
  setTheme(nextTheme);
});

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((item) => observer.observe(item));

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      if (!id) return;

      document.querySelectorAll('.site-nav a').forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('main section[id]').forEach((section) => navObserver.observe(section));

function applyProjectFilter(button) {
  filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
  const filter = button.dataset.filter;

  projectCards.forEach((card) => {
    const categories = card.dataset.category || '';
    const matches = filter === 'all' || categories.includes(filter);
    card.classList.toggle('hidden', !matches);
  });
}

syncProjectCards();

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    applyProjectFilter(button);
  });

  if (button.classList.contains('active')) {
    applyProjectFilter(button);
  }
});

function openProject(key) {
  const project = projectData[key];
  if (!project) return;

  modalContent.innerHTML = `
    <div class="modal-hero" style="background: ${project.gradient};">
      <span class="project-badge">${project.badge}</span>
    </div>
    <h3>${project.title}</h3>
    <p class="modal-copy">${project.summary}</p>
    <div class="modal-tags">
      ${project.stack.map((item) => `<span>${item}</span>`).join('')}
    </div>
    <p class="modal-copy">${project.description}</p>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

projectButtons.forEach((button) => {
  button.addEventListener('click', () => {
    openProject(button.dataset.project);
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'true') closeModal();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) {
    closeModal();
  }
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = contactForm.querySelector('button[type="submit"]');
  const originalText = button.textContent;

  button.textContent = 'Message sent';
  button.disabled = true;

  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    contactForm.reset();
  }, 1800);
});
