document.getElementById('yr').textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="#"]').forEach(a=>{
 a.addEventListener('click',e=>{
  const id=a.getAttribute('href').slice(1);
  const el=document.getElementById(id);
  if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});} });});
const form=document.getElementById('contactForm');const msg=document.getElementById('formMsg');
form.addEventListener('submit',e=>{e.preventDefault();msg.textContent='Thanks! We will reach out shortly to book your demo.';form.reset();});
