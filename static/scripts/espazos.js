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

document.addEventListener("DOMContentLoaded", () => {
  const barraBusqueda = document.getElementById("busqueda-centros");
  const tarxetasContainer = document.getElementById("tarxetas-centros");
  const tarxetas = tarxetasContainer.querySelectorAll(".tarxeta-centro");

  barraBusqueda.addEventListener("input", () => {
    const termo = barraBusqueda.value.toLowerCase();
    
    tarxetas.forEach(tarxeta => {
      const titulo = tarxeta.querySelector("h3").textContent.toLowerCase();
      const descricion = tarxeta.querySelector("p").textContent.toLowerCase();

      if (titulo.includes(termo) || descricion.includes(termo)) {
        tarxeta.style.display = "block";
      } else {
        tarxeta.style.display = "none";
      }
    });
  });
});
