// Menú de navegación responsive y animaciones de habilidades.
(() => {
  const nav = document.getElementById("nav");
  const menuButton = document.querySelector(".nav-responsive");
  const skillsSection = document.getElementById("skills");
  const skillBars = document.querySelectorAll(".skills .progreso[data-skill]");

  function mostrarOcultarMenu() {
    if (!nav) return;
    const abierto = nav.classList.toggle("responsive");
    if (menuButton) menuButton.setAttribute("aria-expanded", String(abierto));
  }

  function seleccionar() {
    if (!nav) return;
    nav.classList.remove("responsive");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
  }

  // Se mantienen estos nombres globales porque los usa el HTML.
  window.mostrarOcultarMenu = mostrarOcultarMenu;
  window.seleccionar = seleccionar;

  if (menuButton) {
    menuButton.setAttribute("role", "button");
    menuButton.setAttribute("tabindex", "0");
    menuButton.setAttribute("aria-label", "Abrir o cerrar el menú");
    menuButton.setAttribute("aria-controls", "nav");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        mostrarOcultarMenu();
      }
    });
  }

  // Activa las barras una sola vez cuando la sección entra en pantalla.
  function activarHabilidades() {
    if (!skillsSection) return;
    skillBars.forEach((barra) => {
      const nombreClase = barra.dataset.skill;
      if (nombreClase) barra.classList.add(nombreClase);
    });
    observer.disconnect();
  }

  let observer;
  if (skillsSection && "IntersectionObserver" in window) {
    observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) activarHabilidades();
    }, { threshold: 0.15 });
    observer.observe(skillsSection);
  } else {
    // Alternativa para navegadores sin IntersectionObserver.
    observer = { disconnect() {} };
    window.addEventListener("scroll", () => {
      if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight * 0.85) activarHabilidades();
    }, { passive: true });
    window.addEventListener("load", () => {
      if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight) activarHabilidades();
    });
  }

  // Visor de imágenes: abre la imagen original dentro de un diálogo modal.
  const galeria = document.querySelector(".portfolio .galeria");
  const visor = document.getElementById("visor-imagen");
  const visorImagen = document.getElementById("visor-imagen-imagen");
  const visorTexto = document.getElementById("visor-imagen-texto");
  const botonCerrarVisor = visor?.querySelector(".visor-imagen__cerrar");
  let elementoAnterior = null;

  function abrirVisor(proyecto) {
    if (!visor || !visorImagen || !visorTexto || !proyecto) return;
    const imagen = proyecto.querySelector("img");
    const titulo = proyecto.querySelector(".overlay h3")?.textContent.trim() || "Imagen ampliada";
    const descripcion = proyecto.querySelector(".overlay p")?.textContent.trim() || "";
    if (!imagen) return;

    elementoAnterior = proyecto;
    visorImagen.src = imagen.currentSrc || imagen.src;
    visorImagen.alt = imagen.alt || `${titulo}${descripcion ? `: ${descripcion}` : ""}`;
    visorTexto.replaceChildren();

    const tituloElemento = document.createElement("h3");
    tituloElemento.textContent = titulo;
    visorTexto.appendChild(tituloElemento);
    if (descripcion) {
      const descripcionElemento = document.createElement("p");
      descripcionElemento.textContent = descripcion;
      visorTexto.appendChild(descripcionElemento);
    }

    if (typeof visor.showModal === "function") {
      visor.showModal();
      botonCerrarVisor?.focus();
    } else {
      // Compatibilidad con navegadores antiguos sin el método showModal().
      visor.setAttribute("open", "");
    }
    document.body.classList.add("visor-abierto");
  }

  function cerrarVisor() {
    if (!visor) return;
    if (typeof visor.close === "function" && visor.open) {
      visor.close();
    } else {
      visor.removeAttribute("open");
    }
    document.body.classList.remove("visor-abierto");
    if (visorImagen) visorImagen.removeAttribute("src");
    if (elementoAnterior) elementoAnterior.focus();
  }

  if (galeria && visor) {
    galeria.addEventListener("click", (event) => {
      const proyecto = event.target.closest(".proyecto");
      if (proyecto) abrirVisor(proyecto);
    });

    galeria.addEventListener("keydown", (event) => {
      const proyecto = event.target.closest(".proyecto");
      if (!proyecto || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      abrirVisor(proyecto);
    });

    botonCerrarVisor?.addEventListener("click", cerrarVisor);

    // Clic en el fondo oscuro, fuera de la imagen y del contenido.
    visor.addEventListener("click", (event) => {
      if (event.target === visor) cerrarVisor();
    });

    visor.addEventListener("close", () => {
      document.body.classList.remove("visor-abierto");
      if (visorImagen) visorImagen.removeAttribute("src");
    });
  }

  // El formulario es solo visual por ahora: no simula un envío exitoso.
  const form = document.getElementById("formulario-contacto");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const aviso = document.getElementById("aviso-formulario");
      if (aviso) aviso.textContent = "Tus datos fueron validados en esta página, pero el formulario aún no está conectado a un servicio de envío.";
    });
  }
})();
