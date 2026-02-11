// ===== Smooth Scroll =====
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== Toggle détails Services =====
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    let detail = card.querySelector('.detail');
    if (!detail) {
      detail = document.createElement('p');
      detail.classList.add('detail');
      detail.textContent = "Description détaillée du service ici.";
      card.appendChild(detail);
    } else {
      detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
    }
  });
});

// ===== Toggle détails Portfolio =====
const portfolioItems = document.querySelectorAll('.portfolio-item');
portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    let detail = item.querySelector('.detail');
    if (!detail) {
      detail = document.createElement('p');
      detail.classList.add('detail');
      detail.textContent = "Description du projet ici.";
      item.appendChild(detail);
    } else {
      detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
    }
  });
});

// ===== Logo Glow Animation =====
const logoLink = document.getElementById('logo_link');

logoLink.addEventListener('mouseenter', () => {
  logoLink.classList.add('glow');
});

logoLink.addEventListener('mouseleave', () => {
  logoLink.classList.remove('glow');
});

// CSS pour glow (à ajouter dans ton CSS principal)
/*
#logo_link.glow::before {
  border-color: #f08700;
  box-shadow: 0 0 12px #f08700;
}
*/

// ===== Formulaire Contact =====
const contactForm = document.querySelector('.contact-form');
const contactMessage = document.getElementById('contact-message');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Empêche l’envoi réel

  const fullName = contactForm.querySelector('input[type="text"]').value.trim();
  const phone = contactForm.querySelector('input[type="tel"]').value.trim();
  const message = contactForm.querySelector('textarea').value.trim();

  if(fullName === "" || phone === "" || message === "") {
    contactMessage.textContent = "Veuillez remplir tous les champs avant d'envoyer !";
    contactMessage.style.color = "red";
    return;
  }

  // Message de succès
  contactMessage.textContent = "Votre message a été envoyé avec succès. Nous vous contacterons dès que possible dans un délai professionnel.";
  contactMessage.style.color = "#f08700";

  // Réinitialise le formulaire
  contactForm.reset();
});

// ===== Auto-slide Services et Portfolio =====
function autoSlide(containerSelector, interval = 3000) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const items = container.children;
  let index = 0;

  setInterval(() => {
    for(let i = 0; i < items.length; i++) {
      items[i].style.transform = `translateX(-${index * 100}%)`;
      items[i].style.transition = "transform 0.5s ease";
    }
    index = (index + 1) % items.length;
  }, interval);
}

// Appels pour services et portfolio
autoSlide('.services-container', 4000);
autoSlide('.portfolio-container', 5000);

// ===== Optional: hover scale effect pour toutes les images =====
const interactiveCards = document.querySelectorAll('.service-card, .portfolio-item');

interactiveCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'scale(1.05)';
    card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.4)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'scale(1)';
    card.style.boxShadow = 'none';
  });

  card.addEventListener('mousedown', () => {
    card.style.transform = 'scale(0.95)';
  });

  card.addEventListener('mouseup', () => {
    card.style.transform = 'scale(1.05)';
  });
});
