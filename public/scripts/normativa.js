// language-switcher.js

document.addEventListener('DOMContentLoaded', function () {
    const switcher = document.getElementById('language-switcher');

    if (!switcher) {
        console.error('Elemento #language-switcher não encontrado.');
        return;
    }

    // Obter os dados do elemento
    const currentLang = switcher.getAttribute('data-current-lang');
    const translatedUrls = JSON.parse(switcher.getAttribute('data-translated-urls'));

    // Obter a lista de idiomas disponíveis (exemplo estático)
    // Alternativamente, você pode passar esta lista via data attribute ou outro método
    const availableLanguages = [
        { lang: 'en', name: 'English' },
        { lang: 'es', name: 'Español' },
        { lang: 'fr', name: 'Français' },
        // Adicione mais idiomas conforme necessário
    ];

    // Limpar o conteúdo existente
    switcher.innerHTML = '';

    availableLanguages.forEach(language => {
        if (language.lang !== currentLang) {
            const link = document.createElement('a');
            link.id = 'notactive-langSwitch';
            link.href = translatedUrls[language.lang] || '#'; // Define a URL traduzida ou '#' se não disponível
            link.textContent = language.name;
            switcher.appendChild(link);
        } else {
            const span = document.createElement('span');
            span.id = 'active-langSwitch';
            span.textContent = language.name;
            switcher.appendChild(span);
        }

        // Adicionar um separador, exceto após o último item
        if (language.lang !== availableLanguages[availableLanguages.length - 1].lang) {
            const separator = document.createElement('span');
            separator.textContent = ' | ';
            switcher.appendChild(separator);
        }
    });
});
