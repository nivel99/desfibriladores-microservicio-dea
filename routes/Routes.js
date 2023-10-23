// Importamos el controlador 'UserController' que se encarga de gestionar las rutas relacionadas con los usuarios.
const UserController = require('../controllers/User.controller');

// Definimos una función llamada 'routes' que toma un objeto 'server' como argumento.
const routes = (server) => {
    // Configuramos las rutas relacionadas con los usuarios.
    // Cualquier solicitud que coincida con '/users' será manejada por el controlador 'UserController'.
    server.use('/users', UserController);
}

// Exportamos la función 'routes' para que pueda ser utilizada en otros lugares de la aplicación.
module.exports = routes;
