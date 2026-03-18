/* ================================================================
   TOP DRIVER DRANCY — JS PARTAGÉ
   ================================================================ */

/* ----------------------------------------------------------------
   Mobile nav
---------------------------------------------------------------- */
(function () {
  var btn = document.getElementById('nav-toggle-btn');
  var nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;

  var links = nav.querySelectorAll('a');

  function close() {
    nav.classList.remove('is-open');
    nav.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Ouvrir le menu');
  }

  btn.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    nav.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });

  links.forEach(function (l) { l.addEventListener('click', close); });

  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target) && !btn.contains(e.target)) close();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 768) close();
  });
}());

/* ----------------------------------------------------------------
   Header shadow on scroll
---------------------------------------------------------------- */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
}());

/* ----------------------------------------------------------------
   Active nav link (based on current page filename)
---------------------------------------------------------------- */
(function () {
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav__link, .mobile-nav__link').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('is-active');
      a.setAttribute('aria-current', 'page');
    }
  });
}());

/* ----------------------------------------------------------------
   FAQ Accordéon
---------------------------------------------------------------- */
(function () {
  document.querySelectorAll('.faq__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq__item');
      var isOpen = item.classList.contains('is-open');

      // Fermer tous
      document.querySelectorAll('.faq__item.is-open').forEach(function (el) {
        el.classList.remove('is-open');
        el.querySelector('.faq__btn').setAttribute('aria-expanded', 'false');
      });

      // Ouvrir celui-ci si fermé
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}());

/* ----------------------------------------------------------------
   Formulaire de contact
---------------------------------------------------------------- */
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var toast = document.getElementById('toast');
  var toastTitle = document.getElementById('toast-title');
  var toastMsg = document.getElementById('toast-message');
  var toastTimer;

  function showToast(title, msg, isError) {
    if (!toast) return;
    toastTitle.textContent = title;
    toastMsg.textContent = msg;
    toast.className = 'toast' + (isError ? ' toast--error' : '');
    toast.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(function () {
      toast.classList.add('is-visible');
    });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('is-visible');
      toast.setAttribute('aria-hidden', 'true');
    }, 5500);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var prenom = (form.querySelector('[name="prenom"]') || {}).value || '';
    var nom    = (form.querySelector('[name="nom"]')    || {}).value || '';
    var email  = (form.querySelector('[name="email"]')  || {}).value || '';
    var consent = form.querySelector('[name="consent"]');

    prenom = prenom.trim(); nom = nom.trim(); email = email.trim();

    if (!prenom || !nom || !email) {
      showToast('Champs requis', 'Veuillez remplir votre nom, prénom et e-mail.', true);
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('E-mail invalide', 'Veuillez saisir une adresse e-mail valide.', true);
      return;
    }
    if (consent && !consent.checked) {
      showToast('Consentement requis', 'Veuillez accepter la politique de confidentialité.', true);
      return;
    }

    /*
     * PLACEHOLDER : intégrer votre service d'envoi d'e-mail ici.
     * Exemples :
     *   Formspree  → fetch('https://formspree.io/f/VOTRE_ID', { method:'POST', ... })
     *   EmailJS    → emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', form)
     *   API maison → fetch('/api/contact', { method:'POST', body: new FormData(form) })
     */

    showToast(
      'Message envoyé !',
      'Merci ' + prenom + ', nous vous répondrons dans les plus brefs délais.'
    );
    form.reset();
  });
}());

/* ----------------------------------------------------------------
   Année dynamique footer
---------------------------------------------------------------- */
(function () {
  var el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}());
