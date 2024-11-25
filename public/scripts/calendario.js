document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    if (!calendarEl) {
        console.error("Elemento #calendar no encontrado en el DOM");
        return;
    }
    if (typeof FullCalendar === 'undefined') {
        console.error('FullCalendar non está definido. Verifica a carga do script.');
        return;
    }

    const meses = [
        'Xaneiro', 'Febreiro', 'Marzo', 'Abril', 'Maio', 'Xuño',
        'Xullo', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Decembro'
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
        }
    });

    calendar.render();
});
