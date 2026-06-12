// Load and display data from data.json
let portfolioData = {};

// Fetch the data
async function loadData() {
  try {
    const response = await fetch('data.json');
    portfolioData = await response.json();
    renderPortfolio();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

// Render personal info
function renderPersonalInfo() {
  const { name, bio, image } = portfolioData.personal;

  document.getElementById('personalName').textContent = name;
  document.getElementById('personalBio').textContent = bio;
  document.getElementById('footerName').textContent = name;

  const avatarEl = document.getElementById('personalAvatar');
  if (!avatarEl) return;

  // If an image path is provided in data.json, use it as background-image.
  if (image) {
    avatarEl.style.backgroundImage = `url(${image})`;
    avatarEl.textContent = '';
    avatarEl.classList.remove('avatar--small');
  } else {
    // Fallback: show initials
    const initials = (name || '')
      .split(' ')
      .map(n => n[0])
      .filter(Boolean)
      .slice(0,2)
      .join('')
      .toUpperCase();
    avatarEl.style.backgroundImage = 'none';
    avatarEl.textContent = initials;
    avatarEl.classList.add('avatar--small');
  }
}

// Render projects
function renderProjects() {
  const { projects } = portfolioData;
  const container = document.getElementById('projectsContainer');
  
  container.innerHTML = projects.map(project => `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p class="project-category">${project.category}</p>
      <p>${project.description}</p>
      <div class="project-tech">
        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
      </div>
      <div class="project-links">
        ${project.links.demo ? `<a href="${project.links.demo}" target="_blank">Demo</a>` : ''}
        ${project.links.github ? `<a href="${project.links.github}" target="_blank" class="project-icon-link" aria-label="Project GitHub" title="GitHub"><svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img"><path fill="currentColor" d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.78-.25.78-.55 0-.27-.01-.98-.01-1.92-3.2.7-3.88-1.45-3.88-1.45-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.69 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.18.92-.26 1.9-.39 2.87-.39.98 0 1.96.13 2.88.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.24 2.75.12 3.04.73.8 1.17 1.82 1.17 3.08 0 4.42-2.69 5.39-5.25 5.67.41.35.78 1.04.78 2.1 0 1.52-.01 2.75-.01 3.12 0 .3.2.66.79.55C20.71 21.38 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5z"/></svg></a>` : ''}
        ${project.links.npm ? `<a href="${project.links.npm}" target="_blank">NPM</a>` : ''}
      </div>
    </div>
  `).join('');
}

// Render experience
function renderExperience() {
  const { experience } = portfolioData;
  const container = document.getElementById('experienceContainer');
  
  container.innerHTML = experience.map(exp => {
    const descriptionContent = Array.isArray(exp.description)
      ? `<ul class="experience-description-list">${exp.description.map(item => `<li>${item}</li>`).join('')}</ul>`
      : `<p class="experience-description">${exp.description}</p>`;

    return `
      <div class="experience-item">
        <h3>${exp.position}</h3>
        <p class="experience-company">${exp.company}</p>
        <p class="experience-period">${exp.period}</p>
        ${descriptionContent}
        <div class="experience-tech">
          ${exp.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// Render skills
function renderSkills() {
  const { skills } = portfolioData;
  const container = document.getElementById('skillsGrid');
  
  const skillCategories = [
    { name: 'Languages', items: skills.languages },
    { name: 'Frontend', items: skills.frontend },
    { name: 'Backend', items: skills.backend },
    { name: 'Tools', items: skills.tools }
  ];
  
  container.innerHTML = skillCategories.map(category => `
    <div class="skill-category">
      <h3>${category.name}</h3>
      <div class="skill-list">
        ${category.items.map(item => `<span class="skill-item">${item}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// Render contact links
function renderContacts() {
  const { social } = portfolioData;
  const container = document.getElementById('contactLinks');
  
  const githubSvg = `<img src="icons/github.svg" alt="GitHub" aria-hidden="true">`;
  const linkedinSvg = `<img src="icons/linkedin.svg" alt="LinkedIn" aria-hidden="true">`;
  const emailSvg = `<img src="icons/email.svg" alt="Email" aria-hidden="true">`;

  const links = [];
  if (social.github) links.push(`<a href="${social.github}" target="_blank" class="social-link" aria-label="GitHub" title="GitHub">${githubSvg}</a>`);
  if (social.linkedin) links.push(`<a href="${social.linkedin}" target="_blank" class="social-link" aria-label="LinkedIn" title="LinkedIn">${linkedinSvg}</a>`);
  if (social.email) links.push(`<a href="mailto:${social.email}" class="social-link" aria-label="Email" title="Email">${emailSvg}</a>`);
  if (social.twitter) links.push(`<a href="${social.twitter}" target="_blank" class="social-link" aria-label="Twitter" title="Twitter">${social.twitter}</a>`);

  container.innerHTML = links.join('');
}

// Main render function
function renderPortfolio() {
  renderPersonalInfo();
  renderProjects();
  renderExperience();
  renderSkills();
  renderContacts();
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadData);

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const element = document.querySelector(href);
      const offsetTop = element.offsetTop - 60;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
