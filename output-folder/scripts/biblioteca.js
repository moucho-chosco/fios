function seleccionarLibro(elemento) {
    // Eliminar a clase 'seleccionado' de todos os libros
    document.querySelectorAll('.libro').forEach(libro => {
      libro.classList.remove('seleccionado');
    });
  
    // Engadir a clase 'seleccionado' ao libro clicado
    elemento.classList.add('seleccionado');
  }
  document.addEventListener("DOMContentLoaded", function () {
    const carousels = document.querySelectorAll(".carousel-container");

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

