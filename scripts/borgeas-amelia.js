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

// ===== Auto-slide Services & Portfolio =====
function autoSlide(containerSelector, interval = 3000) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const items = container.children;
  let index = 0;

  setInterval(() => {
    for (let i = 0; i < items.length; i++) {
      items[i].style.transform = `translateX(-${index * 100}%)`;
      items[i].style.transition = "transform 0.5s ease";
    }
    index = (index + 1) % items.length;
  }, interval);
}

autoSlide('.services-container', 4000);
autoSlide('.portfolio-container', 5000);

// ===== Formulaire Contact – API =====
const contactForm = document.querySelector('.contact-form');
const contactMessage = document.getElementById('contact-message');

contactForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const fullname = contactForm.querySelector('input[type="text"]').value.trim();
  const phone = contactForm.querySelector('input[type="tel"]').value.trim();
  const message = contactForm.querySelector('textarea').value.trim();

  if (!fullname || !phone || !message) {
    contactMessage.textContent = "Veuillez remplir tous les champs avant d'envoyer !";
    contactMessage.style.color = "red";
    return;
  }

  try {
    const response = await fetch('http://127.0.0.1:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullname, phone, message })
    });
    const result = await response.json();
    contactMessage.textContent = result.message;
    contactMessage.style.color = result.status === 'success' ? '#f08700' : 'red';
    if (result.status === 'success') contactForm.reset();
  } catch (err) {
    contactMessage.textContent = "Erreur du serveur. Veuillez réessayer plus tard.";
    contactMessage.style.color = "red";
    console.error(err);
  }
});
