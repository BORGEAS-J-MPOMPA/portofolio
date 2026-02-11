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

        if (result.status === 'success') {
            // ✅ Message de succès
            contactMessage.textContent = "Votre message a été envoyé avec succès. Nous vous contacterons dès que possible dans un délai professionnel.";
            contactMessage.style.color = "#f08700";
            contactForm.reset();
        } else {
            contactMessage.textContent = result.message || "Erreur lors de l'envoi du message.";
            contactMessage.style.color = "red";
        }
    } catch (err) {
        contactMessage.textContent = "Erreur du serveur. Veuillez réessayer plus tard.";
        contactMessage.style.color = "red";
        console.error(err);
    }
});
