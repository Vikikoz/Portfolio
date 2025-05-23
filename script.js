// === Données projets ===
const projects = [
  {
    title: "Sujet 1",
    description: `Ce projet a consisté à réaliser une analyse spatiale approfondie des zones urbaines de la région parisienne à l’aide de systèmes d’information géographique (SIG). L’objectif principal était d’identifier les zones à fort potentiel de développement urbain tout en prenant en compte les contraintes environnementales et les infrastructures existantes.

Le travail a débuté par la collecte et la normalisation de données géographiques provenant de différentes sources : images satellites, bases de données cadastrales, réseaux de transport et inventaires environnementaux. Après une phase de nettoyage et de structuration des données, nous avons utilisé ArcGIS Pro pour effectuer des analyses multicritères, notamment des croisements de couches, des calculs de distances et des analyses de densité.

Une attention particulière a été portée à la visualisation des résultats : des cartes thématiques interactives ont été produites pour faciliter la compréhension des enjeux par les décideurs. Le projet a également inclus la rédaction d’un rapport détaillé, la présentation orale des résultats devant un jury universitaire, et la mise en place d’un tableau de bord web pour l’exploration dynamique des données.

Ce projet m’a permis de renforcer mes compétences en géomatique, en gestion de projet et en communication scientifique. Il a également mis en lumière l’importance de l’interdisciplinarité dans l’analyse territoriale, en intégrant des aspects techniques, environnementaux et sociaux pour une vision globale du développement urbain.`,
    image: "assets/projets/projet1.jpg",
    date: "Mai 2024",
    type: "SIG",
    client: "Université"
  },
  {
    title: "Sujet 2",
    description: "Description détaillée du projet 2...",
    image: "assets/projets/projet2.jpg",
    date: "Juin 2024",
    type: "Web",
    client: "Client B"
  },
  {
    title: "Sujet 3",
    description: "Description détaillée du projet 3...",
    image: "assets/projets/projet3.jpg",
    date: "Juillet 2024",
    type: "Mobile",
    client: "Client C"
  },
  {
    title: "Sujet 4",
    description: "Description détaillée du projet 4...",
    image: "assets/projets/projet4.jpg",
    date: "Août 2024",
    type: "Desktop",
    client: "Client D"
  }
];

// === Sélecteurs ===
const projectModal = document.getElementById("project-modal");
const projectCloseBtn = projectModal.querySelector(".modal-close");
const projectPrevBtn = projectModal.querySelector(".modal-nav.prev");
const projectNextBtn = projectModal.querySelector(".modal-nav.next");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalDescription = document.getElementById("modal-description");

const contactModal = document.getElementById('contact-modal');
const contactBtn = document.querySelector('.btn2');
const contactCloseBtn = contactModal.querySelector('.contact-close');

const coordModal = document.getElementById('coord-modal');
const coordCloseBtn = coordModal.querySelector('.coord-close');

// === Fonctions Modale Génériques ===
function openModal(modalElement) {
  // modalElement.style.display = 'flex'; // SUPPRIME cette ligne
  requestAnimationFrame(() => {
    modalElement.classList.add('show');
  });
}
function closeModal(modalElement) {
  modalElement.classList.remove('show');
  // setTimeout(() => { modalElement.style.display = 'none'; }, 300); // SUPPRIME cette ligne
}

// === Modale Projet ===
let currentIndex = 0;
function openProject(idx) {
  currentIndex = (idx + projects.length) % projects.length;
  modalTitle.textContent = projects[currentIndex].title;
  modalImage.src = projects[currentIndex].image;
  modalDescription.innerHTML = projects[currentIndex].description
    .split(/\n\s*\n/)
    .map(par => `<p>${par.trim()}</p>`)
    .join('');
  // Ajoute ces lignes pour afficher les infos complémentaires
  document.getElementById('modal-date').textContent = projects[currentIndex].date;
  document.getElementById('modal-type').textContent = projects[currentIndex].type;
  document.getElementById('modal-client').textContent = projects[currentIndex].client;
  if (!projectModal.classList.contains('show')) {
    openModal(projectModal);
  }
}
projectPrevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openProject(currentIndex - 1);
});
projectNextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  openProject(currentIndex + 1);
});
projectCloseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeModal(projectModal);
});
projectModal.addEventListener("click", (e) => {
  if (e.target === projectModal) closeModal(projectModal);
});
projectModal.querySelector('.modal-content').addEventListener('click', (e) => {
  e.stopPropagation();
});
document.querySelectorAll('.project-card').forEach((card, idx) => {
  card.addEventListener('click', function(e) {
    e.preventDefault();
    openProject(idx);
  });
  card.setAttribute('draggable', 'false');
});

// === Modale Contact ===
if (contactBtn) {
  contactBtn.addEventListener('click', () => {
    openModal(contactModal);
  });
}
contactCloseBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  closeModal(contactModal);
});
contactModal.addEventListener("click", (e) => {
  if (e.target === contactModal) {
    closeModal(contactModal);
  }
});
contactModal.querySelector('.contact-modal-content').addEventListener('click', (e) => {
  e.stopPropagation();
});

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      e.preventDefault();
      // Personnalise ici selon l'ancre
      let offset = 80; // valeur par défaut

      if (targetId === 'home') offset = 80;
      if (targetId === 'about') offset = 110;
      if (targetId === 'service') offset = 79;
      if (targetId === 'savoir') offset = 80;
      if (targetId === 'projects') offset = 120;
      if (targetId === 'contact') offset = 80;

      const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  });
});

function revealSkillsOnScroll() {
  document.querySelectorAll('.skill-category').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60 && rect.bottom > 0) {
      el.classList.add('visible');
    } else {
      el.classList.remove('visible');
    }
  });
}
window.addEventListener('scroll', revealSkillsOnScroll);
window.addEventListener('DOMContentLoaded', () => {
  revealSkillsOnScroll(); // déjà présent
  // Animation boutons CV et Me contacter
  const heroButton = document.querySelector('.hero .button');
  if (heroButton) {
    const btns = heroButton.querySelectorAll('.btn, .btn2');
    if (btns[0]) {
      setTimeout(() => {
        btns[0].classList.add('visible');
      }, 300); // CV apparaît en premier
    }
    if (btns[1]) {
      setTimeout(() => {
        btns[1].classList.add('visible');
      }, 600); // Me contacter apparaît après
    }
  }
});

// Ajoute la classe 'pair-open' si les deux modales sont ouvertes
function syncModals() {
  const contact = document.getElementById('contact-modal');
  const coord = document.getElementById('coord-modal');
  const bothOpen = contact.classList.contains('open') && coord.classList.contains('open');
  if (bothOpen) {
    contact.classList.add('pair-open');
    coord.classList.add('pair-open');
  } else {
    contact.classList.remove('pair-open');
    coord.classList.remove('pair-open');
  }
}

// Fade-out des .skill-category avant qu'ils atteignent le haut de l'écran
// Sélectionne le parent qui contient tous les skills
const skillsParent = document.querySelector('.skills-section'); // ou '.skills-list' selon ton HTML
const skillCategories = document.querySelectorAll('.skill-category');

function updateSkillsVisibility() {
  const header = document.querySelector('header');
  const headerRect = header ? header.getBoundingClientRect() : { bottom: 0 };
  const headerBottom = headerRect.bottom;
  const windowHeight = window.innerHeight;

  skillCategories.forEach(cat => {
    const rect = cat.getBoundingClientRect();
    const btns = cat.querySelectorAll('.btn, .btn2');
    cat.classList.remove('fade-out-down');
    cat.classList.remove('fade-out');
    // Disparition vers le haut (header)
    if (rect.top < headerBottom) {
      cat.classList.remove('visible');
      cat.classList.add('fade-out');
      btns.forEach(btn => btn.classList.add('fade-out'));
    }
    // Disparition vers le bas (bas de l'écran)
    else if (rect.bottom > windowHeight) {
      cat.classList.remove('visible');
      cat.classList.add('fade-out-down');
      btns.forEach(btn => btn.classList.add('fade-out-down'));
    }
    // Apparition
    else {
      cat.classList.add('visible');
      cat.classList.remove('fade-out');
      cat.classList.remove('fade-out-down');
      btns.forEach(btn => {
        btn.classList.remove('fade-out');
        btn.classList.remove('fade-out-down');
      });
    }
  });
}

window.addEventListener('scroll', updateSkillsVisibility);
window.addEventListener('resize', updateSkillsVisibility);
window.addEventListener('DOMContentLoaded', updateSkillsVisibility);

// Gestion du fade-in/fade-out pour le bloc .button dans le hero
const heroButtonBlock = document.querySelector('.hero .button');
function updateButtonVisibility() {
  const header = document.querySelector('header');
  const headerRect = header.getBoundingClientRect();
  const headerBottom = headerRect.bottom;
  if (!heroButtonBlock) return;
  const rect = heroButtonBlock.getBoundingClientRect();
  // Apparition si le bloc est bien sous le header et dans la fenêtre
  if (rect.top >= headerBottom && rect.bottom <= window.innerHeight) {
    heroButtonBlock.classList.add('visible');
    heroButtonBlock.classList.remove('fade-out');
  } else {
    heroButtonBlock.classList.remove('visible');
    heroButtonBlock.classList.add('fade-out');
  }
}
window.addEventListener('scroll', updateButtonVisibility);
window.addEventListener('resize', updateButtonVisibility);
window.addEventListener('DOMContentLoaded', updateButtonVisibility);

// === Styles ===
const style = document.createElement('style');
style.textContent = `
  .skill-category {
    transition: opacity 1s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1);
  }
`;
document.head.append(style);

const savoirItems = document.querySelectorAll('.savoir-item');

function updateSavoirVisibilityV2() {
  const header = document.querySelector('header');
  const headerRect = header ? header.getBoundingClientRect() : { bottom: 0 };
  const headerBottom = headerRect.bottom;
  const windowHeight = window.innerHeight;

  savoirItems.forEach(item => {
    const rect = item.getBoundingClientRect();
    item.classList.remove('fade-out-down');
    item.classList.remove('fade-out');
    // Disparition vers le haut (header)
    if (rect.top < headerBottom) {
      item.classList.remove('visible');
      item.classList.add('fade-out');
    }
    // Disparition vers le bas (bas de l'écran)
    else if (rect.bottom > windowHeight) {
      item.classList.remove('visible');
      item.classList.add('fade-out-down');
    }
    // Apparition
    else {
      item.classList.add('visible');
      item.classList.remove('fade-out');
      item.classList.remove('fade-out-down');
    }
  });
}

window.addEventListener('scroll', updateSavoirVisibilityV2);
window.addEventListener('resize', updateSavoirVisibilityV2);
window.addEventListener('DOMContentLoaded', updateSavoirVisibilityV2);

// Quand le haut du bouton touche le bas du header
if (rect.top < headerBottom) {
  btn.classList.remove('visible');
  btn.classList.add('fade-out'); // Cette classe fait disparaître vers le haut
}

// Script pour le menu burger
const burger = document.querySelector('.burger');
const navbar = document.querySelector('header .navbar');
burger.addEventListener('click', function() {
  burger.classList.toggle('active');
  navbar.classList.toggle('open');
  burger.setAttribute('aria-expanded', burger.classList.contains('active'));
});
navbar.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    navbar.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});




