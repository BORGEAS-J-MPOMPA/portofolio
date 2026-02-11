// Sélectionne tous les liens du menu
const navLinks = document.querySelectorAll('nav a');

// Boucle sur chaque lien
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault(); // Empêche le jump instantané

    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    targetSection.scrollIntoView({ behavior: 'smooth' });
  });
});


// Services - toggle détails
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    // Vérifie si le détail existe déjà
    let detail = card.querySelector('.detail');
    if (!detail) {
      detail = document.createElement('p');
      detail.classList.add('detail');
      detail.textContent = "Description détaillée du service ici.";
      card.appendChild(detail);
    } else {
      // Toggle show/hide
      detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
    }
  });
});

// Portfolio - toggle détails
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


const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Empêche l’envoi réel

  const fullName = contactForm.querySelector('input[type="text"]').value.trim();
  const phone = contactForm.querySelector('input[type="tel"]').value.trim();
  const message = contactForm.querySelector('textarea').value.trim();

  if(fullName === "" || phone === "" || message === "") {
    alert("Veuillez remplir tous les champs avant d'envoyer !");
    return;
  }

  // Affiche un message de succès
  alert("Votre message a été envoyé avec succès. Nous vous contacterons dès que possible dans un délai professionnel.");

  // Réinitialise le formulaire
  contactForm.reset();
});


function autoSlide(containerSelector, interval = 3000) {
  const container = document.querySelector(containerSelector);
  const items = container.children;
  let index = 0;

  setInterval(() => {
    for(let i=0; i<items.length; i++){
      items[i].style.transform = `translateX(-${index * 100}%)`;
      items[i].style.transition = "transform 0.5s ease";
    }
    index = (index + 1) % items.length;
  }, interval);
}

// Exemple pour services et portfolio
autoSlide('.services-container', 4000);
autoSlide('.portfolio-container', 5000);