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

/*
localidadeFilter.addEventListener('change', () => {
  const value = localidadeFilter.value.split(',');
  const [key, lat, lon, zoom] = value;

  // Forzar actualización do mapa
  if (localidadeFilter.getAttribute("data-current") !== localidadeFilter.value) {
    if (key === "galiza") {
      map.setView([42.7751, -8.0339], 8.4);  // Volver á vista de Galiza
    } else if (localidades[key]) {
      const location = localidades[key];
      map.setView([location.lat, location.lon], location.zoom); // Actualizar coordenadas e zoom
    }

    // Actualizar o valor da localidade actual
    localidadeFilter.setAttribute("data-current", localidadeFilter.value);
  }
});*/



