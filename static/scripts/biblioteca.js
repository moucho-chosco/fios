
// Configuración
const BOOKS_PER_PAGE = 32;
let currentState = {
  category: null,
  subcategory: null,
  page: 1,
  isLoading: false,
  hasMore: true
};

// Elementos DOM
const DOM = {
  gridContainer: document.getElementById('grid-container'),
  booksGrid: document.getElementById('books-grid'),
  loadingIndicator: document.getElementById('loading-indicator'),
  categoryBtn: document.getElementById('boton-categorias'),
  categoryPanel: document.getElementById('panel-categorias'),
  subcategoryContainer: document.getElementById('subcategorias-container'),
  banner: {
    container: document.querySelector('.banner-biblioteca'),
    fondo: document.querySelector('.fondo-banner'),
    titulo: document.querySelector('.titulo-banner'),
    descricion: document.querySelector('.descricion-banner'),
    btnObra: document.getElementById('boton-obra'),
    btnItinerario: document.getElementById('boton-itinerario')
  }
};


// Funcións globais para o menú despregable
window.mostrarSubcategorias = function(categoryName) {
  const category = window.bibliotecaData.categorias.find(
    cat => cat.nome === categoryName
  );
  
  const subcategoriesContainer = document.getElementById('subcategorias-container');
  
  if (!category || !category.subcategorias || category.subcategorias.length === 0) {
    subcategoriesContainer.innerHTML = '<div class="no-subcategories">Non hay subcategorías</div>';
    return;
  }

  subcategoriesContainer.innerHTML = category.subcategorias
    .filter(sub => sub)
    .map(sub => `
      <div class="subcategoria-item" 
           onclick="seleccionarSubcategoria('${sub}')">
        ${sub}
      </div>
    `).join('');
};

window.seleccionar = function(category) {
  // Limpar seleccións
  document.querySelectorAll('.categoria-item, .subcategoria-item').forEach(item => {
      item.classList.remove('seleccionado');
  });

  const selectedItem = [...document.querySelectorAll('.categoria-item')]
    .find(item => item.textContent.trim() === category);
  if (selectedItem) selectedItem.classList.add('seleccionado');
  
  // Actualizar estado
  currentState = {
      category: category === 'Todo' ? null : category,
      subcategory: null,
      searchQuery: null,
      page: 1,
      isLoading: false,
      hasMore: true
  };
  
  // Actualizar UI
  document.getElementById('boton-categorias').textContent = 
      category === 'Todo' ? 'Todas as categorías' : category;
  document.getElementById('panel-categorias').style.display = 'none';
  
  if (category === 'Todo') {
      // Páxina principal - Un carrusel por categoría
      document.getElementById('grid-container').style.display = 'none';
      document.getElementById('carruseis-container').style.display = 'block';
      generateMainCarousels();
  } else {
      // Categoría específica - Carruseis por subcategorías
      document.getElementById('grid-container').style.display = 'none';
      document.getElementById('carruseis-container').style.display = 'block';
      generateSubcategoryCarousels();
  }
};

function generateSubcategoryCarousels() {
  const carouselContainer = document.getElementById('carruseis-container');
  carouselContainer.innerHTML = '';

  const category = window.bibliotecaData.categorias.find(c => c.nome === currentState.category);
  if (!category || !category.subcategorias) return;

  // Embaralhar subcategorías
  const shuffledSubcategories = [...category.subcategorias];
  shuffleArray(shuffledSubcategories);

  shuffledSubcategories.forEach(subcategory => {
      const books = filterBooks(currentState.category, subcategory);
      if (books.length > 0) {
          createSubcategoryCarousel(subcategory, books);
      }
  });
}

function createSubcategoryCarousel(subcategoryName, books) {
  const carouselHTML = `
      <div class="categoria-carrusel">
          <div class="cabeceira-carrusel">
              <h2 class="titulo-carousel">${subcategoryName}</h2>
              <button class="ver-mais" onclick="seleccionarSubcategoria('${subcategoryName}')">Ver todo</button>
          </div>
          <div class="carousel-container">
              <div class="carousel-track">
                  ${books.slice(0, 12).map(book => `
                      <div class="libro"
                          data-titulo=          "${book.titulo          || ''}"
                          data-portada=         "${book.portada         || ''}"
                          data-fondo-banner=    "${book.fondo_banner    || ''}"
                          data-titulo-banner=   "${book.titulo_banner   || ''}"
                          data-texto-banner=    "${book.texto_banner    || ''}"
                          data-cor-banner=      "${book.cor_banner      || ''}"
                          data-cor-texto=       "${book.cor_texto       || ''}"
                          data-marxe-texto=     "${book.marxe_texto     || ''}"
                          data-cor-fondo-boton= "${book.cor_fondo_boton || ''}"
                          data-cor-texto-boton= "${book.cor_texto_boton || ''}"
                          data-tipo=            "${book.tipo            || 'obra'}"
                          onclick="seleccionarLibro(this)">
                          <div class="libro-portada">
                              <img src="${book.portada || 'default.jpg'}" alt="${book.titulo}" loading="lazy">
                          </div>
                      </div>
                  `).join('')}
              </div>
              <button class="carousel-prev">&#10094;</button>
              <button class="carousel-next">&#10095;</button>
          </div>
      </div>
  `;
  
  document.getElementById('carruseis-container').insertAdjacentHTML('beforeend', carouselHTML);
}


window.seleccionarSubcategoria = function(subcategory) {

  // Limpar seleccións previas
  document.querySelectorAll('.categoria-item, .subcategoria-item').forEach(item => {
    item.classList.remove('seleccionado');
  });
  
  // Marcar subcategoría seleccionada
  const selectedSubItem = [...document.querySelectorAll('.subcategoria-item')]
    .find(item => item.textContent.trim() === subcategory);
  if (selectedSubItem) selectedSubItem.classList.add('seleccionado');

  currentState = {
      ...currentState,
      subcategory: subcategory,
      page: 1,
      isLoading: false,
      hasMore: true
  };
  
  // Mostrar grid para subcategorías específicas
  document.getElementById('grid-container').style.display = 'block';
  document.getElementById('carruseis-container').style.display = 'none';
  document.getElementById('boton-categorias').textContent = subcategory;
  
  loadBooks();
};

// Inicialización
document.addEventListener('DOMContentLoaded', async () => {
  await initBiblioteca();
  setupEventListeners();
  setupVerMaisButtons();
  generateMainCarousels();
  setupCarouselNavigation();
});

function setupCarouselNavigation() {
  document.querySelectorAll('.carousel-container').forEach(carousel => {
      const track = carousel.querySelector('.carousel-track');
      const prevBtn = carousel.querySelector('.carousel-prev');
      const nextBtn = carousel.querySelector('.carousel-next');
      const bookWidth = 200; // Ancho aproximado de cada libro + margen
      
      let scrollPosition = 0;
      
      nextBtn.addEventListener('click', () => {
          if (scrollPosition < track.scrollWidth - track.clientWidth) {
              scrollPosition += bookWidth * 3;
              track.style.transform = `translateX(-${scrollPosition}px)`;
          }
      });
      
      prevBtn.addEventListener('click', () => {
          if (scrollPosition > 0) {
              scrollPosition -= bookWidth * 3;
              track.style.transform = `translateX(-${scrollPosition}px)`;
          }
      });
  });
}

// Funcións principais
async function initBiblioteca() {
  try {
    // Cargar os libros desde obras.json
    const obrasResponse = await fetch('/obras.json');
    const obrasData = await obrasResponse.json();
    
    // Obter as categorías dende o HTML (xa que non hai index.json)
    const categorias = [];
    document.querySelectorAll('.categoria-item[data-subcategorias]').forEach(item => {
      categorias.push({
        nome: item.textContent.trim(),
        subcategorias: JSON.parse(item.getAttribute('data-subcategorias'))
      });
    });
    
    window.bibliotecaData = {
      libros: obrasData.libros || [],
      categorias: categorias
    };
    
  } catch (error) {
    console.error('Error cargando datos:', error);
    window.bibliotecaData = { libros: [], categorias: [] };
  }
}

window.seleccionarLibro = function(elemento) {
  // Eliminar a clase 'seleccionado' de todos os libros
  document.querySelectorAll('.libro').forEach(libro => {
    libro.classList.remove('seleccionado');
  });

  // Engadir a clase 'seleccionado' ao libro clicado
  elemento.classList.add('seleccionado');

  // Obter os elementos do banner
  const tituloTextEl =       document.querySelector('.banner-biblioteca .titulo-text');
  const fondoBannerEl =      document.querySelector('.banner-biblioteca .fondo-banner');
  const tituloBannerEl =     document.querySelector('.banner-biblioteca .titulo-banner');
  const fondoBannerElWebp =  document.querySelector('.banner-biblioteca .fondo-banner-webp');
  const tituloBannerElWebp = document.querySelector('.banner-biblioteca .titulo-banner-webp');
  const textoBannerEl  =     document.querySelector('.banner-biblioteca .descricion-banner');
  const bannerBibliotecaEl = document.querySelector('.banner-biblioteca');
  const botonObraEl =        document.querySelector('#boton-obra');
  const botonItinerarioEl =  document.querySelector('#boton-itinerario');

  // Recoller os valores dos atributos data- do elemento
  const titulo =        elemento.dataset.titulo;
  const portadaUrl =    elemento.dataset.portada;
  const fondoUrl =      elemento.dataset.fondoBanner;   // corresponde a data-fondo-banner
  const tituloUrl =     elemento.dataset.tituloBanner;  // corresponde a data-titulo-banner
  const texto =         elemento.dataset.textoBanner;   // corresponde a data-texto-banner
  const corBanner =     elemento.dataset.corBanner;     // data-cor-banner
  const corTexto =      elemento.dataset.corTexto;      // data-cor-texto
  const marxeTexto =    elemento.dataset.marxeTexto;    
  const tipo =          elemento.dataset.tipo;    
  const corFondoBoton = elemento.dataset.corFondoBoton;
  const corTextoBoton = elemento.dataset.corTextoBoton;

  console.log(tituloTextEl);
  tituloTextEl.textContent = "";

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
        fondoBannerElWebp.style.display  =   "block";
        fondoBannerEl.style.display  =       "block";
        tituloBannerElWebp.style.display =   "block";
        tituloBannerEl.style.display =       "block";
        fondoBannerElWebp.style.height  =    "270px";
        fondoBannerEl.style.height  =        "270px";
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
      console.log('Fondo cargado');
        fondoCargado = true;
        verificarCambio();
    };

    imgTituloWebp.onload = () => {
        tituloCargado = true;
        verificarCambio();
    };
  }else if(titulo && portadaUrl){
    tituloTextEl.textContent = titulo;
    tituloTextEl.style.fontWeight = '1000';          // Fai o texto negrito
    tituloTextEl.style.fontStretch = 'condensed';    // Fai a fonte máis compacta
    tituloTextEl.style.letterSpacing = '-0.5px';     // Reduce o espazo entre letras
    tituloTextEl.style.setProperty('color', 'black', 'important');
    tituloTextEl.style.fontFamily = 
  '"Palatino Linotype", "Book Antiqua", Palatino, "Times New Roman", serif';
    if(portadaUrl){
      fondoBannerElWebp.style.display  = "block";
      fondoBannerEl.style.display  =     "block";
      fondoBannerElWebp.style.height  =  "450px";
      fondoBannerEl.style.height  =      "450px";
      fondoBannerElWebp.srcset  =  portadaUrl.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
      fondoBannerEl.src =          portadaUrl;
    }else {
      fondoBannerElWebp.style.display  =   "none";
      fondoBannerEl.style.display  =       "none";
    }
    tituloBannerElWebp.style.display =   "none";
    tituloBannerEl.style.display =       "none";
    if (texto) {
      textoBannerEl.textContent = texto;
    }
    if (corBanner) {
        bannerBibliotecaEl.style.backgroundColor = corBanner;
    }else {
        bannerBibliotecaEl.style.backgroundColor = "white";
    }
    if (corTexto) {
        tituloTextEl.style.setProperty('color', corTexto, 'important');
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
    }else{
      botonObraEl.style.display = "none";
      botonItinerarioEl.style.display = "none";
    }
  }
}

async function fetchData() {
  try {
    const response = await fetch('/obras.json');
    return await response.json();
  } catch (error) {
    console.error('Erro cargando datos:', error);
    return { libros: [], categorias: [] };
  }
}

function renderCategories() {
  const categories = window.bibliotecaData.categorias || [];
  const container = document.querySelector('.columna-categorias');
  
  container.innerHTML = `
    <div class="categoria-item" onclick="handleCategorySelect('Todas')">
      Todas
    </div>
    ${categories.map(cat => `
      <div class="categoria-item" 
           onmouseover="showSubcategories('${cat.nome}')"
           onclick="handleCategorySelect('${cat.nome}')"
           data-subcategories='${JSON.stringify(cat.subcategorias || [])}'>
        ${cat.nome}
      </div>
    `).join('')}
  `;
}

function showSubcategories(categoryName) {
  const category = window.bibliotecaData.categorias.find(
    cat => cat.nome === categoryName
  );
  
  const subcategoriesContainer = document.getElementById('subcategorias-container');
  
  if (!category || !category.subcategorias || category.subcategorias.length === 0) {
    subcategoriesContainer.innerHTML = '<div class="no-subcategories">Non hay subcategorías</div>';
    return;
  }

  subcategoriesContainer.innerHTML = category.subcategorias
    .filter(sub => sub) // Filtra valores null/undefined
    .map(sub => `
      <div class="subcategoria-item" 
           onclick="selectSubcategory('${sub}')">
        ${sub}
      </div>
    `)
    .join('');
}

window.selectSubcategory = function(subcategory) {
  currentState = {
    category: currentState.category,
    subcategory: subcategory,
    page: 1,
    isLoading: false,
    hasMore: true
  };
  
  DOM.categoryPanel.style.display = 'none';
  DOM.gridContainer.style.display = 'block';
  document.getElementById('carruseis-container').style.display = 'none';
  
  // Cambiado: Mostra só o nome da subcategoría
  DOM.categoryBtn.textContent = subcategory;
  
  loadBooks();
};

function handleSubcategorySelect(subcategory) {
  currentState = {
    ...currentState,
    subcategory,
    page: 1,
    hasMore: true
  };
  
  loadBooks();
}

async function loadBooks() {
  if (currentState.isLoading || !currentState.hasMore) return;
  
  currentState.isLoading = true;
  DOM.loadingIndicator.style.display = 'flex';
  
  try {
      const { category, subcategory, page } = currentState;
      const filteredBooks = filterBooks(category, subcategory);
      const paginatedBooks = paginateBooks(filteredBooks, page);
      
      if (paginatedBooks.length === 0 && page === 1) {
          // Só mostramos a mensaxe se é a primeira páxina
          renderBooks([]);
      } else if (paginatedBooks.length > 0) {
          renderBooks(paginatedBooks);
          currentState.page++;
      }
      
      currentState.hasMore = paginatedBooks.length > 0;
  } finally {
      currentState.isLoading = false;
      DOM.loadingIndicator.style.display = 'none';
  }
}

async function loadCategories() {
  try {
    const response = await fetch('/data/categorias.json');
    if (!response.ok) throw new Error('Error al cargar categorías');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

function filterBooks(category, subcategory) {
  return bibliotecaData.libros.filter(book => {
    const matchesCategory = !category || 
      (book.categorias && book.categorias.includes(category));
    
    const matchesSubcategory = !subcategory ||
      (book.subcategorias && book.subcategorias.includes(subcategory));
    
    return matchesCategory && matchesSubcategory;
  });
}

function paginateBooks(books, page) {
  const start = (page - 1) * BOOKS_PER_PAGE;
  const end = start + BOOKS_PER_PAGE;
  return books.slice(start, end);
}

function renderBooks(books) {
  const booksGrid = DOM.booksGrid;
  booksGrid.innerHTML = ''; // Limpamos sempre o contido anterior
  
  if (books.length === 0) {
      // Mostrar mensaxe cando non hai libros
      const message = document.createElement('div');
      message.className = 'no-books-message';
      message.textContent = 'Non hai libros dispoñibles para esta categoría';
      booksGrid.appendChild(message);
  } else {
      // Mostrar libros se os hai
      books.forEach(book => {
          booksGrid.appendChild(createBookElement(book));
      });
  }
}

// Modifica createBookElement para verificar se existe o .webp
function createBookElement(book) {
  const bookEl = document.createElement('div');
  bookEl.className = 'libro grid-book';
  
  // Verificación simplificada de imaxe
  const imgSrc = book.portada || '/images/default-book-cover.jpg';
  
  bookEl.innerHTML = `
    <div class="libro-portada">
      <img src="${imgSrc}" alt="${book.titulo}" loading="lazy">
    </div>
    <h4>${book.titulo}</h4>
    <p>${book.autores?.join(', ') || 'Anónimo'}</p>
  `;
  
  bookEl.addEventListener('click', () => {
    // Actualiza os datos do banner
    updateBanner(book);
    // Engade a clase seleccionado
    document.querySelectorAll('.libro').forEach(l => l.classList.remove('seleccionado'));
    bookEl.classList.add('seleccionado');
  });
  
  return bookEl;
}

function setupVerMaisButtons() {
  document.querySelectorAll('.ver-mais').forEach(button => {
    button.addEventListener('click', function() {
      const categoria = this.closest('.categoria-carrusel').dataset.categoria;
      seleccionar(categoria);
    });
  });
}

function updateBanner(book) {
  // Actualizar banner cos datos do libro
  const { banner } = DOM;
  
  if (book.portada) {
    banner.fondo.src = book.portada;
    banner.fondo.srcset = book.portada.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  
  banner.descricion.textContent = book.descricion || '';
  
  if (book.tipo === 'obra') {
    banner.btnObra.style.display = 'inline-block';
    banner.btnItinerario.style.display = 'none';
  } else if (book.tipo === 'itinerario') {
    banner.btnObra.style.display = 'none';
    banner.btnItinerario.style.display = 'inline-block';
  }
}

function setupEventListeners() {
  // Categorías
  DOM.categoryBtn.addEventListener('click', () => {
    DOM.categoryPanel.style.display = DOM.categoryPanel.style.display === 'flex' ? 'none' : 'flex';
  });
  
  // Scroll infinito
  window.addEventListener('scroll', () => {
    if (isNearBottom() && !currentState.isLoading && currentState.hasMore) {
      loadBooks();
    }
  });
  
  // Busca
  document.getElementById('search-input').addEventListener('input', (e) => {
    searchBooks(e.target.value);
  });
}

function isNearBottom() {
  return (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500;
}

function searchBooks(query) {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    loadBooks();
    return;
  }
  
  const results = bibliotecaData.libros.filter(book => 
    book.titulo.toLowerCase().includes(normalizedQuery) ||
    book.autores?.some(a => a.toLowerCase().includes(normalizedQuery))
  );
  
  DOM.booksGrid.innerHTML = '';
  renderBooks(results.slice(0, BOOKS_PER_PAGE));
}

// CARRUSEIS

// Función para xerar carruseis aleatorios
function generateMainCarousels() {
  const carouselContainer = document.getElementById('carruseis-container');
  carouselContainer.innerHTML = '';

  // Embaralhar orde das categorías
  const shuffledCategories = [...window.bibliotecaData.categorias];
  shuffleArray(shuffledCategories);

  shuffledCategories.forEach(category => {
      // Obter todos os libros desta categoría (de todas as subcategorías)
      const categoryBooks = window.bibliotecaData.libros.filter(book => 
          book.categorias && book.categorias.includes(category.nome)
      );

      if (categoryBooks.length > 0) {
          // Embaralhar os libros
          shuffleArray(categoryBooks);
          
          // Crear un único carrusel por categoría
          createMainCategoryCarousel(category.nome, categoryBooks);
      }
  });
}

function createMainCategoryCarousel(categoryName, books) {
  const carouselHTML = `
      <div class="categoria-carrusel">
          <div class="cabeceira-carrusel">
              <h2 class="titulo-carousel">${categoryName}</h2>
              <button class="ver-mais" onclick="seleccionar('${categoryName}')">Ver todo</button>
          </div>
          <div class="carousel-container">
              <div class="carousel-track">
                  ${books.slice(0, 12).map(book => `
                      <div class="libro"
                          data-titulo=          "${book.titulo          || ''}"
                          data-portada=         "${book.portada         || ''}"
                          data-fondo-banner=    "${book.fondo_banner    || ''}"
                          data-titulo-banner=   "${book.titulo_banner   || ''}"
                          data-texto-banner=    "${book.texto_banner    || ''}"
                          data-cor-banner=      "${book.cor_banner      || ''}"
                          data-cor-texto=       "${book.cor_texto       || ''}"
                          data-marxe-texto=     "${book.marxe_texto     || ''}"
                          data-cor-fondo-boton= "${book.cor_fondo_boton || ''}"
                          data-cor-texto-boton= "${book.cor_texto_boton || ''}"
                          data-tipo=            "${book.tipo            || 'obra'}"
                          onclick="seleccionarLibro(this)">
                          <div class="libro-portada">
                              <img src="${book.portada || 'default.jpg'}" alt="${book.titulo}" loading="lazy">
                          </div>
                      </div>
                  `).join('')}
              </div>
              <button class="carousel-prev">&#10094;</button>
              <button class="carousel-next">&#10095;</button>
          </div>
      </div>
  `;
  
  document.getElementById('carruseis-container').insertAdjacentHTML('beforeend', carouselHTML);
}

// Función para crear un carrusel individual
function createCarousel(title, books) {
  const carouselHTML = `
      <div class="categoria-carrusel">
          <div class="cabeceira-carrusel">
              <h2 class="titulo-carousel">${title}</h2>
              <button class="ver-mais" onclick="seleccionarSubcategoria('${title}')">Ver todo</button>
          </div>
          <div class="carousel-container">
              <div class="carousel-track">
                  ${books.map(book => `
                      <div class="libro"
                          data-titulo=          "${book.titulo          || ''}"
                          data-portada=         "${book.portada         || ''}"
                          data-fondo-banner=    "${book.fondo_banner    || ''}"
                          data-titulo-banner=   "${book.titulo_banner   || ''}"
                          data-texto-banner=    "${book.texto_banner    || ''}"
                          data-cor-banner=      "${book.cor_banner      || ''}"
                          data-cor-texto=       "${book.cor_texto       || ''}"
                          data-marxe-texto=     "${book.marxe_texto     || ''}"
                          data-cor-fondo-boton= "${book.cor_fondo_boton || ''}"
                          data-cor-texto-boton= "${book.cor_texto_boton || ''}"
                          data-tipo=            "${book.tipo            || 'obra'}"
                          onclick="seleccionarLibro(this)">
                          <div class="libro-portada">
                              <img src="${book.portada || 'default.jpg'}" alt="${book.titulo}" loading="lazy">
                          </div>
                      </div>
                  `).join('')}
              </div>
              <button class="carousel-prev">&#10094;</button>
              <button class="carousel-next">&#10095;</button>
          </div>
      </div>
  `;
  
  document.getElementById('carruseis-container').insertAdjacentHTML('beforeend', carouselHTML);
  setupCarouselNavigation();
}

// Función para embaralhar arrays
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}