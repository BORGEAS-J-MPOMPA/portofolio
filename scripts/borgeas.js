document.addEventListener("DOMContentLoaded", () => {

  // ===== Smooth Scroll =====
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ===== Auto-slide Services & Portfolio =====
  function autoSlide(containerSelector, interval = 4000) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    let index = 0;
    const items = container.children;

    setInterval(() => {
      index = (index + 1) % items.length;
      container.scrollTo({
        left: container.clientWidth * index,
        behavior: "smooth"
      });
    }, interval);
  }

  const downloadBtn = document.querySelector('.download-cv-btn');
  const cvMessage = document.getElementById('cv-message');

  downloadBtn.addEventListener('click', () => {
    cvMessage.textContent = "Merci ! Votre téléchargement du CV a commencé.";
});

  autoSlide(".services-container", 4000);
  autoSlide(".portfolio-container", 5000);

  // ===== Formulaire Contact connecté au Backend Flask =====
  const contactForm = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contact-message");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullName = contactForm.name.value.trim();
    const phone = contactForm.phone.value.trim();
    const message = contactForm.message.value.trim();

    if (!fullName || !phone || !message) {
      contactMessage.textContent = "Veuillez remplir tous les champs avant d'envoyer !";
      contactMessage.style.color = "red";
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname: fullName, phone, message })
      });

      const result = await response.json();

      // Message de succès
      contactMessage.textContent = result.message;
      contactMessage.style.color = result.status === "success" ? "#f08700" : "red";

      if (result.status === "success") {
        contactForm.reset();
      }

    } catch (error) {
      contactMessage.textContent = "Erreur du serveur. Veuillez réessayer plus tard.";
      contactMessage.style.color = "red";
      console.error(error);
    }
  });

});