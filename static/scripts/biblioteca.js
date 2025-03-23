
let currentCategory = null;
let currentPage = 1;
let isLoading = false;
let hasMoreBooks = true;
const booksPerPage = 12;

// LIBROS E BANNER

function seleccionarLibro(elemento) {
    // Eliminar a clase 'seleccionado' de todos os libros
    document.querySelectorAll('.libro').forEach(libro => {
      libro.classList.remove('seleccionado');
    });
  
    // Engadir a clase 'seleccionado' ao libro clicado
    elemento.classList.add('seleccionado');
  
    // Obter os elementos do banner
    const fondoBannerEl = document.querySelector('.banner-biblioteca .fondo-banner');
    const tituloBannerEl = document.querySelector('.banner-biblioteca .titulo-banner');
    const fondoBannerElWebp = document.querySelector('.banner-biblioteca .fondo-banner-webp');
    const tituloBannerElWebp = document.querySelector('.banner-biblioteca .titulo-banner-webp');
    const textoBannerEl  = document.querySelector('.banner-biblioteca .descricion-banner');
    const bannerBibliotecaEl = document.querySelector('.banner-biblioteca');
    const botonObraEl = document.querySelector('#boton-obra');
    const botonItinerarioEl = document.querySelector('#boton-itinerario');
  
    // Recoller os valores dos atributos data- do elemento
    const fondoUrl   = elemento.dataset.fondoBanner;   // corresponde a data-fondo-banner
    const tituloUrl  = elemento.dataset.tituloBanner;  // corresponde a data-titulo-banner
    const texto      = elemento.dataset.textoBanner;   // corresponde a data-texto-banner
    const corBanner  = elemento.dataset.corBanner;      // data-cor-banner
    const corTexto   = elemento.dataset.corTexto;      // data-cor-texto
    const marxeTexto = elemento.dataset.marxeTexto;    
    const tipo       = elemento.dataset.tipo;    
    const corFondoBoton = elemento.dataset.corFondoBoton;
    const corTextoBoton = elemento.dataset.corTextoBoton;
  
    // Actualizar o banner se os datos existen
    if (fondoUrl && tituloUrl) {

      const imgFondoWebp  = new Image();
      const imgTituloWebp = new Image();
      imgFondoWebp.src  = fondoUrl.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
      imgTituloWebp.src = tituloUrl.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
      let fondoCargado = false;
      let tituloCargado = false;
  
      function verificarCambio() {
        if (fondoCargado && tituloCargado) {
          fondoBannerElWebp.srcset  =  fondoUrl.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
          tituloBannerElWebp.srcset =  tituloUrl.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
          fondoBannerEl.src  = fondoUrl;
          tituloBannerEl.src = tituloUrl;
          if (texto) {
            textoBannerEl.textContent = texto;
          }
          if (corBanner) {
              bannerBibliotecaEl.style.backgroundColor = corBanner;
          }
          if (corTexto) {
              textoBannerEl.style.color = corTexto;
          }
          if (marxeTexto) {
              textoBannerEl.style.marginTop = marxeTexto;
          }
          if(tipo=="obra"){
            botonObraEl.style.display = "inline-block";
            botonItinerarioEl.style.display = "none";
            botonObraEl.style.backgroundColor = "black";
            botonObraEl.style.color = "white";
            if(corFondoBoton)
              botonObraEl.style.backgroundColor = corFondoBoton;
            if(corTextoBoton)
              botonObraEl.style.color = corTextoBoton;
          } else if (tipo=="itinerario") {
            botonObraEl.style.display = "none";
            botonItinerarioEl.style.display = "inline-block";
            botonItinerarioEl.style.backgroundColor = "black";
            botonItinerarioEl.style.color = "white";
            if(corFondoBoton)
              botonItinerarioEl.style.backgroundColor = corFondoBoton;
            if(corTextoBoton)
              botonItinerarioEl.style.color = corTextoBoton;
          }else{
            botonObraEl.style.display = "none";
            botonItinerarioEl.style.display = "none";
          }
        }
      }

      imgFondoWebp.onload = () => {
          fondoCargado = true;
          verificarCambio();
      };

      imgTituloWebp.onload = () => {
          tituloCargado = true;
          verificarCambio();
      };
    } 
  }

function inicializarCarruseis() {
  const carousels = document.querySelectorAll(".carousel-container");
    const botonObraEl = document.querySelector('#boton-obra');
    const botonItinerarioEl = document.querySelector('#boton-itinerario');
    botonObraEl.style.display = "none";
    botonItinerarioEl.style.display = "none";

    carousels.forEach((carousel) => {
        const track = carousel.querySelector(".carousel-track");
        const prevButton = carousel.querySelector(".carousel-prev");
        const nextButton = carousel.querySelector(".carousel-next");
        const bookWidth = 200; // Ancho do libro + gap

        let scrollPosition = 0;

        nextButton.addEventListener("click", function () {
          console.log("click");
            if (scrollPosition < track.scrollWidth - track.clientWidth) {
                scrollPosition += bookWidth * 2; // Avanza 2 libros cada vez
                track.style.transform = `translateX(-${scrollPosition}px)`;
            }
        });

        prevButton.addEventListener("click", function () {
            if (scrollPosition > 0) {
                scrollPosition -= bookWidth * 2;
                track.style.transform = `translateX(-${scrollPosition}px)`;
            }
        });
    });
}

// ------------------------------------------------------------------
// ------------------- CATEGORÍAS E SUBCATEGORÍAS -------------------
// ------------------------------------------------------------------

function inicializarBotonCategorias() {
  document.getElementById('boton-categorias').addEventListener('click', function(e) {
    e.stopPropagation(); // Impedir peche inmediato
    const panel = document.getElementById('panel-categorias');
    panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
  });

  // Pechar panel ao clicar fóra
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.selector-categorias')) {
      document.getElementById('panel-categorias').style.display = 'none';
    }
});
}

function seleccionar(valor, tipo) {
  const boton = document.getElementById('boton-categorias');
  boton.textContent = valor; // Actualizar o texto do botón
  document.getElementById('panel-categorias').style.display = 'none'; // Pechar o panel

  // Eliminar a clase 'seleccionado' de todos os elementos
  document.querySelectorAll('.categoria-item, .subcategoria-item').forEach(item => {
    item.classList.remove('seleccionado');
  });

  // Engadir a clase 'seleccionado' ao elemento clicado
  const elemento = Array.from(document.querySelectorAll('.categoria-item, .subcategoria-item'))
    .find(item => item.textContent.trim() === valor.trim());
  if (elemento) {
    elemento.classList.add('seleccionado');
  }

  // Resetear o banner ao estado inicial
  resetBannerToDefault();

  // Se é a categoría "Todo", mostrar todos os libros
  if (valor.toLowerCase() === 'todo') {
    currentCategory = null;
    currentSubcategory = null;
    toggleViewMode('carousel');
    return;
  }

  // Establecer categoría ou subcategoría actual e resetear a paxinación
  if (tipo === 'categoria') {
    currentCategory = valor;
    currentSubcategory = null;
  } else if (tipo === 'subcategoria') {
    currentSubcategory = valor;
  }

  currentPage = 1;
  hasMoreBooks = true;

  // Ocultar contedores de carrusel e mostrar o contedor de cuadrícula
  toggleViewMode('grid');

  // Cargar libros para a categoría ou subcategoría seleccionada
  loadCategoryBooks(currentCategory, currentSubcategory, currentPage);
}

function toggleViewMode(mode) {
  const carousels = document.querySelectorAll('.carousel-container, .cabeceira-carrusel');
  const gridContainer = document.getElementById('grid-container');
  
  if (mode === 'grid') {
    // Ocultar carruseles
    carousels.forEach(carousel => {
      carousel.style.display = 'none';
    });
    
    // Crear contenedor de cuadrícula si no existe
    if (!gridContainer) {
      const container = document.createElement('div');
      container.id = 'grid-container';
      container.className = 'grid-books-container';
      document.getElementById('biblioteca-container').appendChild(container);
      
      // Añadir cuadrícula de libros
      const booksGrid = document.createElement('div');
      booksGrid.id = 'books-grid';
      booksGrid.className = 'books-grid';
      container.appendChild(booksGrid);
      
      // Añadir indicador de carga
      const loadingIndicator = document.createElement('div');
      loadingIndicator.id = 'loading-indicator';
      loadingIndicator.className = 'loading-indicator';
      loadingIndicator.innerHTML = '<div class="loader"></div>';
      container.appendChild(loadingIndicator);
    } else {
      gridContainer.style.display = 'block';
    }
    
  } else {
    // Mostrar carruseles
    carousels.forEach(carousel => {
      carousel.style.display = '';
    });
    
    // Ocultar contenedor de cuadrícula
    if (gridContainer) {
      gridContainer.style.display = 'none';
    }
  }
  
  // Actualizar la scrollbar personalizada
  setTimeout(() => {
    updateCustomScrollbar();
  }, 100);
}

async function loadCategoryBooks(category, subcategory, page) {
  if (isLoading || !hasMoreBooks) return;

  isLoading = true;

  // Mostrar indicador de carga
  const loadingIndicator = document.getElementById('loading-indicator');
  if (loadingIndicator) loadingIndicator.style.display = 'flex';

  try {
    // Se é a primeira páxina, limpar libros anteriores
    const booksGrid = document.getElementById('books-grid');
    if (page === 1) {
      booksGrid.innerHTML = '';
    }

    // Obter datos de libros para a categoría ou subcategoría seleccionada
    const books = await fetchBooksByCategoryAndSubcategory(category, subcategory, page, booksPerPage);

    // Se non hai máis libros, marcar como completo
    if (books.length === 0) {
      hasMoreBooks = false;
      if (loadingIndicator) loadingIndicator.style.display = 'none';
      return;
    }

    // Engadir libros á cuadrícula
    books.forEach(book => {
      booksGrid.appendChild(createBookElement(book));
    });

    // Actualizar páxina actual
    currentPage++;
  } catch (error) {
    console.error('Erro ao cargar libros:', error);
  } finally {
    isLoading = false;
    if (loadingIndicator) loadingIndicator.style.display = 'none';
  }

  // Actualizar a scrollbar personalizada
  setTimeout(() => {
    updateCustomScrollbar();
  }, 100);
}

async function fetchBooksByCategoryAndSubcategory(category, subcategory, page, limit) {
  return new Promise(resolve => {
    setTimeout(() => {
      // Encontrar todos os libros de todos os carruseles que coincidan coa categoría e subcategoría
      const allBooksNodes = document.querySelectorAll('.carousel-container');
      let matchingBooks = [];

      allBooksNodes.forEach(carouselContainer => {
        // Obter o título de categoría para este carrusel
        const carouselCategory = carouselContainer.previousElementSibling?.querySelector('.titulo-carousel')?.textContent.trim();

        // Se a categoría deste carrusel coincide coa categoría seleccionada
        if (carouselCategory === category) {
          // Obter todos os libros neste carrusel
          const carouselBooks = Array.from(carouselContainer.querySelectorAll('.libro'));

          // Filtrar por subcategoría se está definida
          if (subcategory) {
            matchingBooks = matchingBooks.concat(carouselBooks.filter(book => {
              const bookSubcategory = book.dataset.subcategoria; // Asumindo que os libros teñen un atributo data-subcategoria
              return bookSubcategory === subcategory;
            }));
          } else {
            matchingBooks = matchingBooks.concat(carouselBooks);
          }
        }
      });

      // Aplicar paginación
      const startIdx = (page - 1) * limit;
      const endIdx = startIdx + limit;
      const paginatedBooks = matchingBooks.slice(startIdx, endIdx);

      resolve(paginatedBooks);
    }, 200); // Tempo de carga simulado reducido
  });
}

function createBookElement(bookElement) {
  // Clonar el elemento del libro
  const clone = bookElement.cloneNode(true);
  clone.classList.add('grid-book');
  
  // Conservar el controlador de clics y atributos de datos
  clone.addEventListener('click', () => {
    seleccionarLibro(clone);
  });
  
  return clone;
}

function inicializarScrollInfinito() {
  const verMaisButtons = document.querySelectorAll('.ver-mais');
  verMaisButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Obtener el título de la categoría relacionada con este botón
      const categoriaTitle = this.parentElement.querySelector('.titulo-carousel').textContent.trim();
      
      // Usar la misma función seleccionar que usamos para las categorías
      seleccionar(categoriaTitle, 'categoria');
    });
  });

  // Añadir evento de escucha para scroll
  window.addEventListener('scroll', function() {
    if (currentCategory && document.getElementById('grid-container') && 
        document.getElementById('grid-container').style.display !== 'none') {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      
      // Si se desplaza hasta el fondo (con un umbral de 200px) y no está cargando actualmente
      if (scrollTop + clientHeight >= scrollHeight - 200 && !isLoading && hasMoreBooks) {
        loadCategoryBooks(currentCategory, currentPage);
      }
    }
  });
}

async function mostrarSubcategorias(categoria) {
  const container = document.getElementById('subcategorias-container');
  container.innerHTML = '';

  try {
    const subcategorias = await obterSubcategorias(categoria);
    
    // Asegurarse de que subcategorias sexa un array
    const subcategoriasArray = Array.isArray(subcategorias) ? subcategorias : [];
    
    container.innerHTML = subcategoriasArray.length > 0 
      ? subcategoriasArray.map(sub => `
          <div class="subcategoria-item" onclick="seleccionar('${sub}', 'subcategoria')">
            ${sub}
          </div>
        `).join('')
      : '';

  } catch (error) {
    console.error("Erro ao cargar subcategorias:", error);
    container.innerHTML = 'Erro ao cargar subcategorias';
  }
}

async function obterSubcategorias(categoria) {
  // Busca o elemento da categoría que ten as subcategorías almacenadas
  const item = document.querySelector(`[data-subcategorias][onmouseover*="${categoria}"]`);
  
  if (item) {
    // Obtén as subcategorías do atributo `data-subcategorias`
    const subcategorias = JSON.parse(item.getAttribute('data-subcategorias'));
    return subcategorias;
  } else {
    return []; // Se non hai subcategorías, devolve un array baleiro
  }
}


// ------------------------------------------------------------------
// ----------------------------- BANNER -----------------------------
// ------------------------------------------------------------------


function resetBannerToDefault() {
  // Obtener elementos del banner
  const fondoBannerEl = document.querySelector('.banner-biblioteca .fondo-banner');
  const tituloBannerEl = document.querySelector('.banner-biblioteca .titulo-banner');
  const fondoBannerElWebp = document.querySelector('.banner-biblioteca .fondo-banner-webp');
  const tituloBannerElWebp = document.querySelector('.banner-biblioteca .titulo-banner-webp');
  const textoBannerEl = document.querySelector('.banner-biblioteca .descricion-banner');
  const bannerBibliotecaEl = document.querySelector('.banner-biblioteca');
  const botonObraEl = document.querySelector('#boton-obra');
  const botonItinerarioEl = document.querySelector('#boton-itinerario');

  // Resetear a valores iniciales
  if (fondoBannerEl) fondoBannerEl.src = "/biblioteca/banners/fondos/inicial.png";
  if (tituloBannerEl) tituloBannerEl.src = "/biblioteca/banners/titulos/inicial.png";
  if (fondoBannerElWebp) fondoBannerElWebp.srcset = "/biblioteca/banners/fondos/inicial.webp";
  if (tituloBannerElWebp) tituloBannerElWebp.srcset = "/biblioteca/banners/titulos/inicial.webp";
  
  // Resetear texto del banner
  if (textoBannerEl) {
    textoBannerEl.textContent = "Algunha vez sentiches que queres aprender pero non sabes nin por onde comezar? "+
                "Pois benvide á biblioteca de fios! Aqui atoparás libros e outros recursos de grande valor"+
                "formativo organizados por temáticas, formatos... Ademais, os itinerarios son rutas de lectura elaboradas para"+
                "dar un contexto máis intuitivo e coerente a cuestións específicas de interese.";
    textoBannerEl.style.color = ""; // Resetear color
    textoBannerEl.style.marginTop = ""; // Resetear margen
  }
  
  // Resetear el color del banner
  if (bannerBibliotecaEl) bannerBibliotecaEl.style.backgroundColor = "";
  
  // Ocultar botones
  if (botonObraEl) botonObraEl.style.display = "none";
  if (botonItinerarioEl) botonItinerarioEl.style.display = "none";
}


// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
  inicializarCarruseis();
  inicializarBotonCategorias();
  inicializarScroll();
  inicializarScrollInfinito();
}); 