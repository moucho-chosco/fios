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
    if (fondoUrl) {
      fondoBannerEl.src = fondoUrl;
      fondoBannerElWebp.srcset = fondoUrl.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
    }  
    if (tituloUrl) {
      tituloBannerEl.src =     tituloUrl;
      tituloBannerElWebp.srcset = tituloUrl.replace(/\.(jpg|jpeg|png|gif)$/i, '.webp');
    }
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
      console.log("obra");
      botonObraEl.style.display = "inline-block";
      botonItinerarioEl.style.display = "none";
      botonObraEl.style.backgroundColor = "black";
      botonObraEl.style.color = "white";
      if(corFondoBoton)
        botonObraEl.style.backgroundColor = corFondoBoton;
      if(corTextoBoton)
        botonObraEl.style.color = corTextoBoton;
    } else if (tipo=="itinerario") {
      console.log("itinerario");
      botonObraEl.style.display = "none";
      botonItinerarioEl.style.display = "inline-block";
      botonItinerarioEl.style.backgroundColor = "black";
      botonItinerarioEl.style.color = "white";
      if(corFondoBoton)
        botonItinerarioEl.style.backgroundColor = corFondoBoton;
      if(corTextoBoton)
        botonItinerarioEl.style.color = corTextoBoton;
      
    }else{
      console.log("outro");
      botonObraEl.style.display = "none";
      botonItinerarioEl.style.display = "none";
    }
  }
  

  document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel-container");
    const botonObraEl = document.querySelector('#boton-obra');
    const botonItinerarioEl = document.querySelector('#boton-itinerario');
    botonObraEl.style.display = "none";
    botonItinerarioEl.style.display = "none";

    carousels.forEach((carousel) => {
        const track = carousel.querySelector(".carousel-track");
        const prevButton = carousel.querySelector(".carousel-prev");
        const nextButton = carousel.querySelector(".carousel-next");
        const bookWidth = carousel.querySelector(".libro").offsetWidth + 15; // Ancho do libro + gap

        let scrollPosition = 0;

        nextButton.addEventListener("click", function () {
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
});


