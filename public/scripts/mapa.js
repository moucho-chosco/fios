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

// Engadir capa base de MapTiler
const mtLayer = new L.MaptilerLayer({
  apiKey: "dc5wAmsD5MUwi9LdDQ1I",
  style: "streets-v2"
}).addTo(map);

// Cambiar o mapa ao seleccionar unha localidade
localidadeFilter.addEventListener('change', () => {
  const selected = localidadeFilter.value;
  const localidade = localidades[selected] || defaultLocation;

  // Adaptar coordenadas e zoom
  map.setView([localidade.lat, localidade.lon], localidade.zoom);
});
