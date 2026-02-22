/**
* Template Name: Craftivo - v1.0
* Documentación: Código corregido y optimizado
*/

(function() {
  "use strict";

  /**
   * 1. CLASE SCROLLED: Añade una clase al body al bajar la página
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * 2. MENÚ MÓVIL: Control del botón de menú en celulares
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  /**
   * 3. DESPLEGABLES: Control de submenús en el menú móvil
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * 4. PRELOADER (IMPORTANTE): Quita la pantalla de carga al terminar
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * 5. BOTÓN SUBIR (SCROLL TOP)
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * 6. LIBRERÍAS DE ANIMACIÓN Y EFECTOS (AOS, Typed, Skills)
   */
  function aosInit() {
    AOS.init({ duration: 600, easing: 'ease-in-out', once: true, mirror: false });
  }
  window.addEventListener('load', aosInit);

  // Efecto de texto escribiéndose
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings, loop: true, typeSpeed: 100, backSpeed: 50, backDelay: 2000
    });
  }

  // Barras de progreso de habilidades
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item, offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => { el.style.width = el.getAttribute('aria-valuenow') + '%'; });
      }
    });
  });

  /**
   * 7. GALERÍAS Y FILTROS (GLightbox e Isotope)
   */
  const glightbox = GLightbox({ selector: '.glightbox' });

  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item', layoutMode: layout, filter: filter, sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({ filter: this.getAttribute('data-filter') });
        if (typeof aosInit === 'function') aosInit();
      }, false);
    });
  });

  /**
   * 8. SLIDERS (Swiper)
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(swiperElement.querySelector(".swiper-config").innerHTML.trim());
      new Swiper(swiperElement, config);
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * 9. SCROLLSPY: Activa el menú según la sección donde estás
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * 10. ANIMACIÓN DE ENTRADA (Intersection Observer)
   * He combinado tus dos observadores en uno solo para que el código sea más rápido.
   */
  const scrollRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, { threshold: 0.1 });

  // Aplica a cajas de imagen y elementos de servicio
  document.querySelectorAll('.image-box, .service-image-item, .service-image-showcase').forEach(el => {
    scrollRevealObserver.observe(el);
  });

  /**
   * 11. FORMULARIO DE CONTACTO (PROTEGIDO)
   */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      Swal.fire({
        title: 'Enviando...', text: 'Por favor espera.', icon: 'info',
        showConfirmButton: false, didOpen: () => { Swal.showLoading(); }
      });

      const formData = new FormData(this);
      fetch(this.action, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } })
      .then(response => {
        if (response.ok) {
          Swal.fire({ title: '¡Enviado!', text: 'Gracias por contactarme.', icon: 'success' });
          this.reset();
        } else {
          Swal.fire({ title: 'Error', text: 'No se pudo enviar el mensaje.', icon: 'error' });
        }
      })
      .catch(() => Swal.fire({ title: 'Error', text: 'Fallo de conexión.', icon: 'error' }));
    });
  }

  /**
   * 12. SLIDER ANTES Y DESPUÉS (BeerSlider)
   */
  const sliderElement = document.getElementById('comparison-slider');
  if (sliderElement) {
    // Solo intentamos crear el slider si el elemento existe en el HTML
    new BeerSlider(sliderElement, { start: 50 });
  }

})();