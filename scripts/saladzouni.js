// Smooth scroll
document.querySelectorAll('nav a').forEach(link=>{
  link.onclick=e=>{
    e.preventDefault();
    document.getElementById(link.getAttribute('href').slice(1))
      .scrollIntoView({behavior:'smooth'});
  };
});

// Slider automatique gauche → droite
function autoSlide(container){
  let index=0;
  const items=container.children;
  setInterval(()=>{
    index=(index+1)%items.length;
    container.style.transform=`translateX(-${index*320}px)`;
  },3000);
}

autoSlide(document.querySelector('.services-container'));
autoSlide(document.querySelector('.portfolio-container'));

// Formulaire → Flask
document.getElementById("contactForm").onsubmit=async e=>{
  e.preventDefault();
  const form=e.target;
  const data={
    name:form.name.value,
    phone:form.phone.value,
    message:form.message.value
  };

  const res=await fetch("https://TON_BACKEND_URL/contact",{
    method:"POST",
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
  });

  const msg=await res.json();
  document.getElementById("contact-message").textContent=msg.message;
  form.reset();
};