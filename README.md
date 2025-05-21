# Benvida ao Proxecto Web Fios!

Este é o espazo onde gardamos todo o necesario para construír o sitio web de Fios (que podes visitar en [https://fios.netlify.app](https://fios.netlify.app)).

## Que é este proxecto?

O proxecto "Fios" é, en esencia, o sitio web que acabas de ver. O seu obxectivo principal é servir como un espazo dixital para **[POR FAVOR, ACTUALIZA ESTA SECCIÓN: describe aquí brevemente a finalidade do sitio, por exemplo: "compartir información, recursos e novas sobre a cultura e lingua galega, e ser un punto de encontro para a comunidade activa arredor da lingua e cultura galegas."]**

## Que son todas estas tecnoloxías? (Non te asustes, é máis doado do que parece!)

Se é a primeira vez que ves termos como HTML, HUGO ou Git, non te preocupes! Aquí tes unha explicación sinxela:

*   **HTML (HyperText Markup Language):** É a linguaxe fundamental coa que se constrúen as páxinas web. Imaxina que é como o esqueleto dunha páxina: define onde van os títulos, os parágrafos, as imaxes, as ligazóns, etc. Non necesitas ser un/unha experto/a en HTML para axudar!

*   **HUGO:** É unha ferramenta que nos axuda a construír sitios web de forma moito máis rápida e organizada. En vez de ter que escribir centos de páxinas HTML unha por unha, con HUGO podemos escribir o contido principal en arquivos máis doados de manexar (chamados arquivos **Markdown**, que son como arquivos de texto con superpoderes sinxelos para dar formato), e HUGO encárgase de "maxicamente" xerar todas as páxinas HTML por nós. Pensa nel como un "xerador automático de sitios web".

*   **Git e GitHub (ou GitLab, ou a plataforma que estea a usar este repositorio):**
    *   **Git:** É un sistema que funciona como unha "máquina do tempo" para todos os arquivos do noso proxecto. Garda un historial de cada cambio que se fai: quen o fixo, cando e que se cambiou exactamente. Se algo non funciona como se esperaba ou se comete un erro, Git permítenos volver facilmente a unha versión anterior que funcionaba ben.
    *   **GitHub/GitLab:** Son plataformas na internet onde aloxamos o noso proxecto (o que se coñece como "**repositorio**": o conxunto de todos os arquivos e o seu historial). Estas plataformas permiten que moitas persoas poidan traballar xuntas no mesmo proxecto de forma ordenada e colaborativa. Podes ver os arquivos, propoñer cambios, comentar o traballo doutras persoas, etc.

## Como podo colaborar? (A túa axuda é benvida!)

Hai moitas formas de colaborar, mesmo se non tes experiencia programando!

### Para pequenas correccións (por exemplo, un erro ortográfico)

Moitas veces, para arranxar un erro pequeno nun texto (unha falta de ortografía, unha frase que non se entende ben...), podes facelo directamente desde a páxina web da plataforma onde está aloxado o proxecto (por exemplo, GitHub ou GitLab).

1.  **Atopa o arquivo:** Os textos da web adoitan estar na carpeta `content/`. Navega por esa carpeta ata atopar o arquivo que queres modificar. Os nomes dos arquivos adoitan dar unha pista do seu contido.
2.  **Edita o arquivo:** Moitas plataformas teñen un botón tipo "Editar" (pode ser un símbolo de lapis ✎ ou a palabra "Edit") que che permite cambiar o contido do arquivo directamente no navegador.
3.  **Garda e propón o cambio:**
    *   Unha vez feito o cambio, terás que "gardalo". En termos de Git, isto chámase facer un "**commit**". É como dicir: "gardei estes cambios específicos e esta é a razón pola que os fixen" (normalmente pides unha pequena descrición do cambio, por exemplo: "Corrixido erro ortográfico no título da páxina X").
    *   Despois de gardar (facer o "commit"), normalmente tes que propoñer que ese cambio se inclúa no proxecto principal. Isto chámase abrir unha "**Pull Request**" (PR) ou "**Merge Request**" (MR). É como dicir: "Ola equipo! Fixen estes cambios, ¿poderiades revisalos e, se todo está ben, incorporalos ao sitio web oficial?".

### Para cambios máis grandes ou para probar o sitio no teu ordenador

Se queres facer cambios máis grandes (engadir unha nova sección, cambiar o deseño) ou simplemente queres ver como queda o sitio web no teu propio ordenador antes de propoñer nada, necesitarás configurar o proxecto localmente. Non te preocupes, imos paso a paso!

## Configurar o proxecto no teu ordenador (Instalación Local)

Isto permíteche ter unha copia do sitio web funcionando no teu computador. Así podes facer probas, ver como quedan os teus cambios en tempo real e asegurarte de que todo funciona antes de compartilo.

1.  **Instalar Hugo:**
    *   Como mencionamos antes, Hugo é o "xerador" do noso sitio web.
    *   Para instalalo, o mellor é seguir as instrucións da súa páxina oficial, xa que varían un pouco dependendo do teu sistema operativo (Windows, macOS, Linux): [Instalar Hugo (ligazón á web oficial de Hugo)](https://gohugo.io/getting-started/installing/).

2.  **Clonar o repositorio:**
    *   **Que é un "repositorio"?** É o conxunto de todos os arquivos e cartafoles que compoñen o proxecto Fios, xunto con todo o seu historial de cambios (grazas a Git!). Está aloxado en plataformas como GitHub ou GitLab.
    *   **Que é "clonar"?** Significa facer unha copia completa do repositorio de Fios (que está na internet) no teu propio ordenador.
    *   Para clonar, necesitarás usar un "**terminal**" ou "**liña de comandos**". Esta é unha ventá onde escribes ordes directamente ao teu ordenador. Non te asustes, só son un par de comandos!
        *   Abre o teu terminal (en Windows pode ser PowerShell ou CMD, en macOS ou Linux adoita chamarse Terminal).
        *   Escribe o seguinte comando, substituíndo `<URL-do-repositorio>` pola dirección web real do proxecto Fios (podes atopala na páxina principal do repositorio en GitHub/GitLab, normalmente hai un botón verde que di "<> Code" ou un botón que di "Clone" e que che proporciona esta URL):
            ```bash
            git clone <URL-do-repositorio>
            ```
        *   Despois de que remate a descarga, entra na carpeta que se acaba de crear. Se o repositorio se chama `fios-website`, por exemplo, escribirías:
            ```bash
            cd fios-website
            ```
            (`cd` significa "change directory" ou "cambiar de directorio", é o comando para moverte entre carpetas).

3.  **Executar o servidor de Hugo (para ver o sitio en local):**
    *   Unha vez dentro da carpeta do proxecto no teu terminal (asegúrate de que estás na carpeta correcta, por exemplo `fios-website`), escribe:
        ```bash
        hugo server
        ```
    *   **Que fai este comando?** Pon en marcha un pequeno servidor web no teu ordenador. Isto significa que podes abrir o teu navegador de internet (Firefox, Chrome, etc.) e visitar `http://localhost:1313/` (Hugo normalmente indica o enderezo exacto no terminal cando arranca). Aí verás unha versión local do sitio web de Fios!
    *   O mellor é que se fas algún cambio nos arquivos de contido ou deseño, o sitio web no teu navegador actualizarase automaticamente. Maxia! Para deter o servidor, normalmente premes `Ctrl+C` no terminal (a tecla Control e a tecla C á vez).

4.  **Construír o sitio web (para xerar a versión final):**
    *   Cando Hugo está a funcionar co `hugo server`, está en modo "desenvolvemento", ideal para ver os cambios ao instante. Se queres xerar os arquivos HTML finais que se subirían a internet (a versión "de produción"), necesitas "construír" o sitio.
    *   Para iso, primeiro detén o servidor local (normalmente con `Ctrl+C` no terminal se estaba activo) e logo escribe:
        ```bash
        hugo
        ```
    *   **Que fai este comando?** Hugo colle todos os teus contidos, plantillas e configuracións e xera a versión estática final do sitio web. Estes arquivos gárdanse normalmente nun cartafol chamado `public/` (ou no cartafol que estea especificado na configuración de Hugo, no arquivo `config.toml`). Estes son os arquivos que realmente se subirían a un servidor para que todo o mundo poida ver a web.

## Estrutura do Proxecto (Onde están as cousas?)

Aquí tes unha descrición sinxela dos cartafoles máis importantes que atoparás no proxecto:

*   **`config.toml`** (ou `hugo.toml` nalgúns proxectos Hugo máis novos): Este é o arquivo principal de configuración de Hugo. Aquí defínense cousas importantes como o título do sitio, os idiomas dispoñibles, os menús de navegación e outras opcións xerais.
*   **`content/`**: Aquí é onde viven os contidos do sitio! Os artigos dun blog, as páxinas de información, as descricións... todo iso está aquí, normalmente en arquivos de texto chamados Markdown (con extensión `.md`).
    *   **Importante sobre os idiomas:**
        *   Os textos en galego (normativa ILG, a que se usa por defecto) adoitan rematar simplemente en `.md`. Por exemplo, `unha-paxina.md`.
        *   Os textos en galego (normativa AGAL) adoitan ter un nome de arquivo que remata en `.agal.md`. Por exemplo, `unha-paxina.agal.md`.
    *   Se queres cambiar ou engadir textos ao sitio, é moi probable que teñas que editar arquivos dentro desta carpeta `content/`.
*   **`layouts/`**: Este cartafol contén as "plantillas" HTML que Hugo usa para construír as páxinas. Dinnlle a Hugo como ten que organizar o contido, onde vai a cabeceira, o pé de páxina, etc. Normalmente non necesitarás tocar moito aquí a non ser que queiras cambiar o deseño do sitio de forma significativa.
*   **`static/`**: Aquí gárdanse todos os arquivos "estáticos". Isto inclúe cousas como imaxes, arquivos CSS (que dan estilo e cores ao sitio), e arquivos JavaScript (que poden engadir interactividade). Cando navegas por esta carpeta, verás subcarpetas que organizan estes arquivos (por exemplo, `images/` para imaxes xerais, `css/` para os estilos). Os arquivos aquí colócanse tal cal na raíz do sitio web xerado.
*   **`public/`**: Este cartafol normalmente NON está no repositorio (ou non debería estar se está ben configurado no arquivo `.gitignore`, que lle di a Git que arquivos ignorar). É o cartafol que Hugo xera cando executas o comando `hugo` (o de "construír o sitio"). Contén o sitio web completo, listo para ser subido a un servidor. **Nunca edites directamente os arquivos dentro de `public/`**, xa que se sobrescribirán a próxima vez que constrúas o sitio.

## Seccións do Sitio Web

O sitio web organízase nas seguintes seccións principais (tal como se definen no arquivo `config.toml`):

*   Principal
*   Biblioteca
*   Organización / Organizaçom
*   Espazos / Espaços
*   Podcast
*   Recursos

*(Nota: Algunhas seccións como Calendario/Calendário e Convocatorias/Convocatórias poderían estar desactivadas ou non ser visibles actualmente no menú principal do sitio web, xa que están comentadas —marcadas para non seren lidas polo programa— na configuración do menú en `config.toml`).*

## Contribucións

A túa axuda, por pequena que sexa, é moi valiosa!

*   Podes corrixir erros ortográficos ou gramaticais que atopes.
*   Podes propoñer melloras nos textos para que sexan máis claros.
*   Podes axudar a manter a información actualizada.
*   Se tes coñecementos técnicos, quizais poidas axudar con tarefas máis avanzadas.

Se atopas algún problema no sitio web, ou tes algunha idea ou suxestión, unha boa forma de comunicalo é abrindo unha "**Issue**" (incidencia, problema ou suxestión) na plataforma onde estea aloxado o proxecto (GitHub, GitLab, etc.). Así queda rexistrado e o equipo pode discutilo e organizarse para resolvelo.

## Licenza

[PENDENTE: Polo de agora, non se especifica unha licenza concreta neste arquivo. Sería una boa práctica definir unha para aclarar como outras persoas poden usar e contribuír ao contido e código do proxecto. Se es parte do equipo de Fios, considera discutir e engadir unha licenza (por exemplo, unha Creative Commons para o contido e unha licenza de software libre como MIT ou GPL para o código).]

---

Espero que esta guía che sexa de utilidade! Anímate a explorar e colaborar!
