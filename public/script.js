// sticky header state
  const hdr = document.getElementById('hdr');
  const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > 12);
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});

  // year

  // demo -> mailto compose
  document.getElementById('demoBtn').addEventListener('click', () => {
    const n = document.getElementById('name').value.trim();
    const e = document.getElementById('email').value.trim();
    const c = document.getElementById('company').value.trim();
    const body = `Name: ${n}%0D%0AEmail: ${e}%0D%0ACompany: ${c}%0D%0A%0D%0AI'd like to book a demo.`;
    window.location.href = `mailto:contact@elimatic.se?subject=Demo request${c ? ' — ' + encodeURIComponent(c) : ''}&body=${body}`;
  });

  // scroll reveal
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.14, rootMargin:'0px 0px -8% 0px'});
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  }
