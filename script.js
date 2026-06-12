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
        ${project.links.github ? `<a href="${project.links.github}" target="_blank">GitHub</a>` : ''}
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
  
  const links = [];
  if (social.github) links.push(`<a href="${social.github}" target="_blank">GitHub</a>`);
  if (social.linkedin) links.push(`<a href="${social.linkedin}" target="_blank">LinkedIn</a>`);
  if (social.email) links.push(`<a href="mailto:${social.email}">Email</a>`);
  if (social.twitter) links.push(`<a href="${social.twitter}" target="_blank">Twitter</a>`);
  
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
