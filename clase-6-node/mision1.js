// Misión 1: Promesas (.then, .catch, .finally)

console.log("--- Misión 1: Promesas ---");

// URL de la API de Rick and Morty
const url = "https://rickandmortyapi.com/api/character";

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Tomar solo los primeros 5 personajes de los 20 devueltos
    const primerosCinco = data.results.slice(0, 5);
    console.log("Primeros 5 personajes obtenidos con Promesas:");
    console.log(primerosCinco);
  })
  .catch((error) => {
    console.error("Hubo un problema con la petición Fetch:", error.message);
  })
  .finally(() => {
    console.log("\nEjecución de Misión 1 completada.");
  });
