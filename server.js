// Importamos el módulo 'express' para crear una aplicación Express.
const express = require('express');
// Creamos una instancia de la aplicación Express.
const server = express();

// Importamos el módulo 'Console.js' que parece ser una utilidad personalizada para la consola.
const Console = require('./lib/Console.js');
// Importamos el módulo 'Routes.js' que parece contener las rutas de la aplicación.
const Router = require('./routes/Routes.js');

// Creamos una instancia de la clase 'Console' para gestionar mensajes de la consola.
const console = new Console('SERVER');

// Definimos el número de puerto en el que escuchará el servidor.
const PORT = 3000;

// Usamos middleware para analizar solicitudes entrantes como objetos JSON.
server.use(express.json());

// Llamamos a la función 'Router' pasando la instancia de la aplicación 'server' para configurar las rutas.
Router(server);

// Escuchamos las solicitudes entrantes en el puerto especificado.
server.listen(PORT, () => {
    console.Success(`El servidor se está ejecutando en el puerto ${PORT}`);
});
