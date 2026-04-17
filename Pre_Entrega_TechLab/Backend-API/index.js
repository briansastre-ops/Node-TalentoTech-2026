// Node.js v24.12.0 - fetch es nativo, no requiere imports
const [method, route, ...extraArgs] = process.argv.slice(2);
const BASE_URL = 'https://fakestoreapi.com';

/**
 * Función principal para orquestar las peticiones
 */
async function main() {
    if (!method || !route) {
        console.log("\n❌ Error: Faltan argumentos.");
        console.log("Uso: npm run start <METODO> <RUTA> [DATOS]");
        console.log("Ejemplo: npm run start GET products\n");
        return;
    }

    try {
        switch (method.toUpperCase()) {
            case 'GET':
                await handleGet(route);
                break;
            case 'POST':
                await handlePost(route, extraArgs);
                break;
            case 'DELETE':
                await handleDelete(route);
                break;
            default:
                console.log("🚫 Método no soportado. Usa GET, POST o DELETE.");
        }
    } catch (error) {
        console.error("💥 Error crítico:", error.message);
    }
}

// --- CONTROLADORES ---

async function handleGet(route) {
    const response = await fetch(`${BASE_URL}/${route}`);
    const data = await response.json();

    if (Array.isArray(data)) {
        // Mapeamos para que la tabla sea legible y no se deforme
        const tableData = data.map(({ id, title, price, category }) => ({
            ID: id,
            Producto: title.substring(0, 30) + "...", // Recortamos títulos largos
            Precio: `$${price}`,
            Categoria: category
        }));
        console.table(tableData);
    } else {
        // Si es un solo producto, lo mostramos completo pero limpio
        const { id, title, price, category, rating } = data;
        console.log("\n📦 Detalle del Producto:");
        console.log({ id, title, price, category, rating });
    }
}

async function handlePost(route, args) {
    if (args.length < 3) {
        console.log("⚠️ Uso POST: npm run start POST products <titulo> <precio> <categoria>");
        return;
    }

    const [title, price, category] = args;

    const response = await fetch(`${BASE_URL}/${route}`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            price: parseFloat(price),
            category,
            description: 'Producto creado para el desafío TechLab',
            image: 'https://i.pravatar.cc'
        }),
        headers: { 'Content-type': 'application/json' }
    });

    const data = await response.json();
    console.log("\n✅ Petición POST exitosa");
    console.log("🆔 ID asignado por la API:", data.id);
    console.log("📝 Datos:", { title, price, category });
}

async function handleDelete(route) {
    const response = await fetch(`${BASE_URL}/${route}`, { method: 'DELETE' });
    const data = await response.json();

    console.log("\n🗑️ Petición DELETE enviada a:", `${BASE_URL}/${route}`);
    console.log("🔄 Respuesta de la API:", data ? "Producto marcado para eliminación" : "Error");
}

main();