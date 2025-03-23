// Función para obter o valor dun parámetro na URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

window.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer =  document.querySelector('.sidebar-container');
    const bannerBiblioteca =  document.querySelector('.banner-biblioteca');
    const filtrosBiblioteca = document.querySelector('.filtros-biblioteca-box');
    const toggleButton = document.querySelector('.toggle-button');
    const mode = getUrlParameter('sidebar-mode');  // Recuperar o parámetro da URL

    // Desactivamos a transición para evitar animacións no primeiro renderizado
    sidebarContainer.style.transition = 'none';

    // Aplica inmediatamente o modo correcto antes de que a páxina se renderice
    if (mode === 'reduced') {
        sidebarContainer.classList.add('reduced-mode');
        if(bannerBiblioteca)
            bannerBiblioteca.classList.add('reduced-mode');
        if(filtrosBiblioteca)
            filtrosBiblioteca.classList.add('reduced-mode');
        toggleButton.innerHTML = '<img src="/images/elementos/frecha_atras_negra_reves.svg" alt="Frecha atrás" width="16" height="16">';  // Frecha á dereita
        updateSidebarLinksForMode('reduced');
    } else {
        sidebarContainer.classList.add('full-mode');
        if(bannerBiblioteca)
            bannerBiblioteca.classList.add('full-mode');
        if(filtrosBiblioteca)
            filtrosBiblioteca.classList.add('full-mode');
        toggleButton.innerHTML = '<img src="/images/elementos/frecha_atras_negra.svg" alt="Frecha atrás" width="16" height="16">';  // Frecha á esquerda
        updateSidebarLinksForMode('full');
    }

    // Usamos un pequeno delay para iniciar as transicións, evitando o parpadeo
    setTimeout(() => {
        sidebarContainer.style.transition = 'width 0.3s ease';  // Activamos transición suave
    }, 70);  // Pequeno delay (50ms) para asegurar que a clase xa estea aplicada

    // Aquí tamén podemos mostrar a páxina agora que o JavaScript está preparado
    document.body.style.visibility = 'visible';  // Se estaba oculto ao principio
});

// Función para alternar entre os modos e actualizar a URL
function toggleSidebar() {
    const sidebarContainer = document.querySelector('.sidebar-container');
    const bannerBiblioteca = document.querySelector('.banner-biblioteca');
    const filtrosBiblioteca = document.querySelector('.filtros-biblioteca-box');
    const toggleButton = document.querySelector('.toggle-button');
    const langSwitcher = document.querySelector('#langSwitcher');

    // Alternar entre os modos
    sidebarContainer.classList.toggle('reduced-mode');
    sidebarContainer.classList.toggle('full-mode');
    if(bannerBiblioteca){
        bannerBiblioteca.classList.toggle('reduced-mode');
        bannerBiblioteca.classList.toggle('full-mode');
    }
    if(filtrosBiblioteca){
        filtrosBiblioteca.classList.toggle('reduced-mode');
        filtrosBiblioteca.classList.toggle('full-mode');
    }
        

    // Se está no modo reducido, engadir o parámetro na URL
    if (sidebarContainer.classList.contains('reduced-mode')) {
        toggleButton.innerHTML = '<img src="/images/elementos/frecha_atras_negra_reves.svg" alt="Frecha atrás" width="16" height="16">'  ;  // Frecha á dereita no modo reducido
        langSwitcher.style.opacity = 0;  // Ocultar o selector de idioma
        history.pushState(null, null, '?sidebar-mode=reduced');
        updateSidebarLinksForMode('reduced');
    } else {
        toggleButton.innerHTML = '<img src="/images/elementos/frecha_atras_negra.svg" alt="Frecha atrás" width="16" height="16">';  // Frecha á esquerda no modo completo
        langSwitcher.style.opacity = 1;  // Mostrar o selector de idioma
        history.pushState(null, null, '?sidebar-mode=full');
        updateSidebarLinksForMode('full');
    }
}

// Función para actualizar os enlaces da barra lateral con base no parámetro sidebar-mode
function updateSidebarLinksForMode(mode) {
    const sidebarLinks = document.querySelectorAll('.sidebar a'); // Selecciona todos os enlaces na barra lateral
    const langSwitcher = document.querySelector('#langSwitcher');

    sidebarLinks.forEach(link => {
        let url = new URL(link.href); // Obtemos a URL do enlace

        // Se o modo é 'reduced', engadimos o parámetro de URL
        if (mode === 'reduced') {
            langSwitcher.style.display = 'none';  // Ocultar o selector de idioma
            url.searchParams.set('sidebar-mode', 'reduced'); // Cambia o parámetro a 'reduced'
        } else {
            langSwitcher.style.display = 'block';  // Mostrar o selector de idioma
            url.searchParams.delete('sidebar-mode'); // Elimina o parámetro se non é 'reduced'
        }

        // Actualiza o enlace con a nova URL
        link.href = url.toString();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const langButton = document.getElementById('langButton');
    const langIcon = document.querySelector('.lang-icon');
    
    langButton.addEventListener('click', function(e) {
        e.preventDefault(); // Evita a navegação imediata
        
        // Adiciona a classe para iniciar a animação
        langIcon.classList.add('rotating');
        
        // Define um timeout para trocar a imagem no meio da animação (600ms)
        setTimeout(function() {
            // Verifica qual imagem está atualmente e troca para a outra
            if (langIcon.src.includes("enhe.png")) {
                langIcon.src = "/images/elementos/pantalla_ancha/eneaga.png";
            } else {
                langIcon.src = "/images/elementos/pantalla_ancha/enhe.png";
            }
        }, 300); // Troca a imagem na metade da animação (1.2s / 2)
        
        // Atrasa a navegação para permitir que a animação termine
        setTimeout(function() {
            window.location.href = langButton.getAttribute('href');
        }, 1200); // Tempo total da animação
    });
});


// ------------------------------------------------------------------
// ----------------------------- SCROLL -----------------------------
// ------------------------------------------------------------------

function inicializarScroll() {
    const scrollContainer = document.getElementById("biblioteca-container"); // Contedor do contido
    const scrollThumb =     document.getElementById("scrollbar-thumb"); // Thumb da barra
    const customScrollbar = document.getElementById("custom-scrollbar"); // Barra personalizada
  
    // Calcula a proporción do thumb respecto ao contido
    const updateThumbHeight = () => {
        const containerHeight = scrollContainer.clientHeight;
        const contentHeight =   scrollContainer.scrollHeight;
        const windowHeight =    window.innerHeight;
        const thumbHeight = containerHeight/contentHeight * windowHeight;
        scrollThumb.style.height = `${thumbHeight}px`;
    };
  
    // Actualiza a posición do thumb ao desprazar
    const updateThumbPosition = () => {
        const containerHeight = scrollContainer.clientHeight;
        const scrollTop = scrollContainer.scrollTop;
        const windowHeight = window.innerHeight;
        const contentHeight =   scrollContainer.scrollHeight;
        const percentage = scrollTop / (contentHeight - containerHeight);
        const thumbHeight = containerHeight/contentHeight * windowHeight;
        const thumbPosition = percentage * (windowHeight - thumbHeight);
        scrollThumb.style.top = `${thumbPosition}px`;
    };
  
    // Desprazar o contido ao arrastrar o thumb
    scrollThumb.addEventListener("mousedown", (e) => {
        e.preventDefault();
        const startY = e.clientY;
        const startTop = parseFloat(scrollThumb.style.top) || 0;
  
        const onMouseMove = (e) => {
            const deltaY = e.clientY - startY;
            const newTop = startTop + deltaY;
            const windowHeight = window.innerHeight;
            const thumbHeight = scrollThumb.clientHeight;
            const maxTop = windowHeight - thumbHeight;
  
            if (newTop >= 0 && newTop <= maxTop) {
                scrollThumb.style.top = `${newTop}px`;
                const scrollPercent = newTop / (windowHeight- thumbHeight);
                scrollContainer.scrollTop = scrollPercent * (scrollContainer.scrollHeight-scrollContainer.clientHeight);
            }
        };
  
        const onMouseUp = () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        };
  
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
  
    // Actualiza o tamaño e posición do thumb ao cambiar o tamaño da ventana
    window.addEventListener("resize", () => {
        updateThumbHeight();
        updateThumbPosition();
    });
  
    // Inicializa o thumb
    updateThumbHeight();
    scrollContainer.addEventListener("scroll", updateThumbPosition);
  }
  
  function updateCustomScrollbar() {
    if (typeof updateThumbHeight === 'function' && typeof updateThumbPosition === 'function') {
      updateThumbHeight();
      updateThumbPosition();
    }
  }