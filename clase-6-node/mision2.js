// Misión 2: Async/Await (try/catch)

console.log("--- Misión 2: Async / Await ---");

// URL de la API de Rick and Morty
const url = "https://rickandmortyapi.com/api/character";

async function obtenerPersonajes() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Tomar solo los primeros 5 personajes de los 20 devueltos
    const primerosCinco = data.results.slice(0, 5);
    console.log("Primeros 5 personajes obtenidos con Async/Await:");
    console.log(primerosCinco);

  } catch (error) {
    console.error("Hubo un problema con la petición Fetch:", error.message);
  } finally {
      // Este bloque es opcional pero útil para saber cuándo terminó el proceso completo
      console.log("\nEjecución de Misión 2 completada.");
  }
}

// Llamar a la función
obtenerPersonajes();
