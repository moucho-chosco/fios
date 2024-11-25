// Abrir o modal e cargar os datos da tarxeta
function abrirModal(params) {
    const modal = document.getElementById('obra-modal');
    document.getElementById('modal-titulo').innerText = params.titulo || 'Sen título';
    document.getElementById('modal-autore').innerText = `Autoras: ${params.autore || 'Descoñecidas'}`;
    document.getElementById('modal-serie').innerText = `${params.serie || 'Sen serie'}: #${params.numero || '0'}`;
    document.getElementById('modal-descricion').innerText = params.descricion || 'Sen descrición';
    document.getElementById('modal-portada').src = params.portada || '';
    document.getElementById('modal-portada').style.display = params.portada ? 'block' : 'none';
    document.getElementById('modal-link').href = params.link_externo || '#';
    modal.style.display = 'flex';
}

// Pechar o modal
function pecharModal(event) {
    const modal = document.getElementById('obra-modal');
    if (event.target === modal || event.target.classList.contains('close-button')) {
        modal.style.display = 'none';
    }
}
