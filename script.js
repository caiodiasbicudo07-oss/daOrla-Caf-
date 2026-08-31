// Espaço Casa da Praia — comportamento do site
(function () {
  'use strict';

  // Header sólido ao rolar
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-solid');
    } else {
      header.classList.remove('is-solid');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu mobile
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Revelação suave ao rolar (uma única categoria de efeito, sem exagero)
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Formulário de contato -> monta mensagem e abre WhatsApp
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nome = form.nome.value.trim();
      var telefone = form.telefone.value.trim();
      var assunto = form.assunto.value;
      var mensagem = form.mensagem.value.trim();

      var texto = 'Olá! Meu nome é ' + nome + '.' +
        (assunto ? ' Assunto: ' + assunto + '.' : '') +
        (mensagem ? ' Mensagem: ' + mensagem : '') +
        ' Meu telefone: ' + telefone;

      var numeroWhatsApp = '5521977192952';
      var url = 'https://wa.me/' + numeroWhatsApp + '?text=' + encodeURIComponent(texto);

      var status = document.getElementById('form-status');
      if (status) {
        status.textContent = 'Abrindo o WhatsApp para você enviar sua mensagem…';
        status.classList.add('is-visible');
      }
      window.open(url, '_blank');
      form.reset();
    });
  }

  // Marca o link ativo no menu
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('is-active');
    }
  });
})();
