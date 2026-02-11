const noticiasHoy = [
  {
    titulo: "Hospital regional cambia a calentadores solares",
    resumen: "El proyecto reducirá costos operativos y emisiones en áreas de atención crítica.",
    categoria: "salud",
    fecha: "Hoy"
  },
  {
    titulo: "Congreso aprueba incentivos para microredes comunitarias",
    resumen: "Nuevo paquete fiscal busca acelerar acceso a energía asequible en zonas marginadas.",
    categoria: "politica",
    fecha: "Hoy"
  },
  {
    titulo: "Escuelas técnicas abren laboratorio de eficiencia eléctrica",
    resumen: "Estudiantes construirán prototipos para medición de consumo en aulas.",
    categoria: "educacion",
    fecha: "Hoy"
  }
];

const noticiasPasadas = [
  {
    titulo: "2025: corredor eléctrico metropolitano",
    resumen: "Primer plan de transporte público con estaciones de recarga solar.",
    categoria: "movilidad",
    fecha: "Archivo"
  },
  {
    titulo: "2024: diagnóstico de pobreza energética",
    resumen: "Se identificaron colonias con mayor vulnerabilidad ante tarifas y cortes.",
    categoria: "social",
    fecha: "Archivo"
  },
  {
    titulo: "2023: modernización LED en edificios públicos",
    resumen: "Programa estatal de sustitución tecnológica en más de 200 instalaciones.",
    categoria: "infraestructura",
    fecha: "Archivo"
  }
];

const titulares = [
  "CFE y universidades locales anuncian capacitación para instalación solar comunitaria",
  "Municipio publica mapa de zonas prioritarias para eficiencia energética",
  "Empresas locales firman convenio para adoptar energía renovable en parques industriales"
];

const listaNoticias = document.getElementById("lista-noticias");
const buscador = document.getElementById("buscador");
const tabButtons = document.querySelectorAll(".tab-btn");
const navLinks = document.querySelectorAll(".nav-link");
const tickerText = document.getElementById("ticker-text");
const boletinForm = document.getElementById("form-boletin");
const correoInput = document.getElementById("correo");
const formMsg = document.getElementById("form-msg");

let tabActiva = "hoy";

function renderNoticias() {
  const data = tabActiva === "hoy" ? noticiasHoy : noticiasPasadas;
  const filtro = (buscador?.value || "").trim().toLowerCase();

  const visibles = data.filter((item) => {
    const combinado = `${item.titulo} ${item.resumen} ${item.categoria}`.toLowerCase();
    return combinado.includes(filtro);
  });

  if (!listaNoticias) return;

  if (visibles.length === 0) {
    listaNoticias.innerHTML = '<article class="nota-item"><h3>Sin resultados</h3><p>Prueba otro término de búsqueda.</p></article>';
    return;
  }

  listaNoticias.innerHTML = visibles
    .map(
      (item) => `
      <article class="nota-item">
        <p class="meta">${item.fecha} · ${item.categoria.toUpperCase()}</p>
        <h3>${item.titulo}</h3>
        <p>${item.resumen}</p>
      </article>
    `
    )
    .join("");
}

function activarTab(tab) {
  tabActiva = tab;
  tabButtons.forEach((btn) => {
    const activa = btn.dataset.tab === tab;
    btn.classList.toggle("active", activa);
    btn.setAttribute("aria-selected", activa ? "true" : "false");
  });
  renderNoticias();
}

function rotarTicker() {
  if (!tickerText) return;
  tickerText.textContent = titulares.join(" · ");
}

function activarNav() {
  const sections = [...document.querySelectorAll("main[id], section[id]")];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const activa = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active", activa);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0.05 }
  );

  sections.forEach((section) => observer.observe(section));
}

function configurarBoletin() {
  if (!boletinForm || !correoInput || !formMsg) return;

  boletinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const correo = correoInput.value.trim();

    if (!correo || !correo.includes("@") || !correo.includes(".")) {
      formMsg.textContent = "Correo inválido. Revisa el formato e inténtalo de nuevo.";
      formMsg.className = "form-msg error";
      return;
    }

    formMsg.textContent = "¡Gracias! Te suscribiste al boletín de Deep Search.";
    formMsg.className = "form-msg ok";
    boletinForm.reset();
  });
}

buscador?.addEventListener("input", renderNoticias);
tabButtons.forEach((btn) => btn.addEventListener("click", () => activarTab(btn.dataset.tab || "hoy")));

renderNoticias();
rotarTicker();
activarNav();
configurarBoletin();
