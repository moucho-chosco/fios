// Referencia aos elementos
const localidadeFilter = document.getElementById('localidade-filter');

// Cargar os datos das localidades
const localidades = {
  {{ range .Site.GetPage "espazos/localidades" }}
  "{{ .File.BaseFileName }}": {
    title: "{{ .Title }}",
    lat: {{ .Params.location.lat }},
    lon: {{ .Params.location.lon }},
    zoom: {{ .Params.zoom }}
  },
  {{ end }}
};

// Por defecto: vista de Galiza
const defaultLocation = localidades["galiza"];

// Inicializar o mapa na vista predeterminada
const map = L.map('map').setView([defaultLocation.lat, defaultLocation.lon], defaultLocation.zoom);

