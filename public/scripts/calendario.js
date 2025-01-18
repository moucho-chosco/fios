document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) {
        console.error("Elemento #calendar non atopado no DOM");
        return;
    }
    if (typeof FullCalendar === 'undefined') {
        console.error('FullCalendar non está definido. Verifica a carga do script.');
        return;
    }

    const meses = [
        'Febreiro', 'Marzo', 'Abril', 'Maio', 'Xuño',
        'Xullo', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Decembro', 'Xaneiro'
    ];

    const diasSemana = ['Domingo', 'Luns', 'Martes', 'Mércores', 'Xoves', 'Venres', 'Sábado'];

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        firstDay: 1,
        headerToolbar: {
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek'
        },
        locale: 'gl',
        titleFormat: { year: 'numeric', month: 'long' },
        height: '100vh',
        events: window.calendarEvents || [],

        eventDidMount(info) {
            console.log("Evento renderizado:", info.event.title);
        },
        dayHeaderContent(info) {
            return diasSemana[info.date.getDay()];
        },
        datesSet(info) {
            const titleEl = document.querySelector('.fc-toolbar-title');
            if (titleEl) {
                const mesIndex = info.start.getMonth();
                const ano = info.start.getFullYear();
                titleEl.textContent = `${meses[mesIndex]} ${ano}`;
            }
        },
        eventClick: function(info) {
            // Previr comportamento predeterminado da ligazón (se hai URL)
            info.jsEvent.preventDefault();
    
            // Actualizar o contido da ventá dereita
            const infoEventoWindow = document.getElementById('info-evento');
            infoEventoWindow.innerHTML = `
                <h2>${info.event.title}</h2>
                <p>${info.event.extendedProps.description || 'Sen descrición dispoñible.'}</p>
                ${info.event.url ? `<a href="${info.event.url}" target="_blank">Máis información</a>` : ''}
            `;
        },
    });


    calendar.render();
});
