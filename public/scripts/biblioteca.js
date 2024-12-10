function seleccionarLibro(elemento) {
    // Eliminar a clase 'seleccionado' de todos os libros
    document.querySelectorAll('.libro').forEach(libro => {
      libro.classList.remove('seleccionado');
    });
  
    // Engadir a clase 'seleccionado' ao libro clicado
    elemento.classList.add('seleccionado');
  }
  