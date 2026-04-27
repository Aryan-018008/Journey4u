//  Navbar scrolling
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

//  hamburger
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// testimonial sliding
let currentTesti = 0;
const testiCards = document.querySelectorAll('.testi-card');
const testiDots  = document.querySelectorAll('.dot');

function goToTestimonial(index) {
  if (!testiCards.length) return;
  testiCards[currentTesti].classList.remove('active');
  testiDots[currentTesti].classList.remove('active');
  currentTesti = index;
  testiCards[currentTesti].classList.add('active');
  testiDots[currentTesti].classList.add('active');
}

// Auto-advance testimonials
if (testiCards.length > 0) {
  setInterval(() => {
    const next = (currentTesti + 1) % testiCards.length;
    goToTestimonial(next);
  }, 5000);
}

//destination
const filterBtns  = document.querySelectorAll('.filter-btn');
const destItems   = document.querySelectorAll('.dest-card-full');
const noResults   = document.getElementById('noResults');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    destItems.forEach(card => {
      const cats = card.dataset.cat || '';
      if (filter === 'all' || cats.includes(filter)) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });
});

// contact validation
function submitForm() {
  let valid = true;

  // Helpers
  function getVal(id)   { const el = document.getElementById(id); return el ? el.value.trim() : ''; }
  function showErr(id, msg) {
    const err = document.getElementById(id);
    const inp = document.getElementById(id.replace('Err', ''));
    if (err) err.textContent = msg;
    if (inp && msg) inp.classList.add('error');
    if (inp && !msg) inp.classList.remove('error');
  }
  function clearErr(id) { showErr(id, ''); }

  // Clear previous errors
  ['fname','lname','email','phone','message'].forEach(f => clearErr(f + 'Err'));

  // Validate
  if (!getVal('fname')) { showErr('fnameErr', 'First name is required.'); valid = false; }
  if (!getVal('lname')) { showErr('lnameErr', 'Last name is required.');  valid = false; }

  const email = getVal('email');
  if (!email) {
    showErr('emailErr', 'Email is required.'); valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showErr('emailErr', 'Please enter a valid email address.'); valid = false;
  }

  const phone = getVal('phone');
  if (!phone) {
    showErr('phoneErr', 'Phone number is required.'); valid = false;
  } else if (!/^[\d\s\+\-\(\)]{7,15}$/.test(phone)) {
    showErr('phoneErr', 'Please enter a valid phone number.'); valid = false;
  }

  if (!getVal('message')) { showErr('messageErr', 'Please write a message.'); valid = false; }

  if (valid) {
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
    window.scrollTo({ top: document.getElementById('formSuccess').offsetTop - 100, behavior: 'smooth' });
  }
}

// scroll Animation
const revealEls = document.querySelectorAll(
  '.dest-card, .dest-card-full, .package-card, .feature, .team-card, .stat'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
