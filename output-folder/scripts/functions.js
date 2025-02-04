// Función para obter o valor dun parámetro na URL
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

window.addEventListener('DOMContentLoaded', () => {
    const sidebarContainer = document.querySelector('.sidebar-container');
    const toggleButton = document.querySelector('.toggle-button');
    const mode = getUrlParameter('sidebar-mode');  // Recuperar o parámetro da URL

    // Desactivamos a transición para evitar animacións no primeiro renderizado
    sidebarContainer.style.transition = 'none';

    // Aplica inmediatamente o modo correcto antes de que a páxina se renderice
    if (mode === 'reduced') {
        sidebarContainer.classList.add('reduced-mode');
        toggleButton.innerHTML = '<img src="/images/elementos/frecha_atras_negra_reves.svg" alt="Frecha atrás" width="16" height="16">';  // Frecha á dereita
        updateSidebarLinksForMode('reduced');
    } else {
        sidebarContainer.classList.add('full-mode');
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
    const toggleButton = document.querySelector('.toggle-button');
    const langSwitcher = document.querySelector('#langSwitcher');

    // Alternar entre os modos
    sidebarContainer.classList.toggle('reduced-mode');
    sidebarContainer.classList.toggle('full-mode');

    // Se está no modo reducido, engadir o parámetro na URL
    if (sidebarContainer.classList.contains('reduced-mode')) {
        toggleButton.innerHTML = '<img src="/images/elementos/frecha_atras_negra_reves.svg" alt="Frecha atrás" width="16" height="16">'  ;  // Frecha á dereita no modo reducido
        langSwitcher.style.display = 'none';  // Ocultar o selector de idioma
        history.pushState(null, null, '?sidebar-mode=reduced');
        updateSidebarLinksForMode('reduced');
    } else {
        toggleButton.innerHTML = '<img src="/images/elementos/frecha_atras_negra.svg" alt="Frecha atrás" width="16" height="16">';  // Frecha á esquerda no modo completo
        langSwitcher.style.display = 'block';  // Mostrar o selector de idioma
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
