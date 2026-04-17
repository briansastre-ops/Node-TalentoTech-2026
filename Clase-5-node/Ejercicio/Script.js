// Capturamos los argumentos pasados por la terminal
const command = process.argv[2];
const param = process.argv[3]; // Representa el {data} o {id}

// Evaluamos el comando ingresado
switch (command) {
    case 'GET':
        console.log('Toma un dato');
        break;

    case 'POST':
        if (param) {
            console.log(`Recibimos ${param} satisfactoriamente`);
        } else {
            console.log('Error: Falta el {data} para procesar el POST.');
        }
        break;

    case 'PUT':
        if (param) {
            console.log(`Modificamos el item con id: ${param} satisfactoriamente`);
        } else {
            console.log('Error: Falta el {id} para procesar el PUT.');
        }
        break;

    case 'DELETE':
        if (param) {
            console.log(`El item con el id: ${param} se eliminó con éxito`);
        } else {
            console.log('Error: Falta el {id} para procesar el DELETE.');
        }
        break;

    default:
        console.log('Comando no reconocido. Comandos válidos: GET, POST {data}, PUT {id}, DELETE {id}');
        break;
}