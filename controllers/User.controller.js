const express = require('express'); // Importamos express para crear rutas.
const router = express.Router(); // Creamos una instancia de un enrutador para definir rutas.
const yup = require('yup');

const UserService = require('../services/User.service'); // Importamos el servicio 'UserService' relacionado con operaciones de usuarios.
const Console = require('../lib/Console'); // Importamos 'Console' para gestionar mensajes de la consola.
const Response = require('../lib/Response'); // Importamos 'Response' para gestionar respuestas a las solicitudes.

const console = new Console('USER-CONTROLLER'); // Creamos una instancia de 'Console' para mensajes específicos de este controlador.
const response = new Response(); // Creamos una instancia de 'Response' para gestionar respuestas.

const createUserSchema = yup.object({
  body: yup.object({
    name: yup.string().required('Name is required'),
    lastName: yup.string().required('Last Name is required'),
    email: yup.string().email().required('Email is not correct'),
    phone: yup.string().min(10).max(10).required('Phone format is not correct'),
    organization: yup.string().required('Organization is required'),
    password: yup.string().min(8).max(20).required('Password is not secure')
  })
});

// Esta es una función middleware de validación que toma un 'schema' como argumento.
const validationMiddleware = (schema) => async (req, res, next) => {
    try {
      // Validamos el cuerpo de la solicitud 'req.body' utilizando el 'schema' proporcionado.
      await schema.validate({
        body: req.body
      });
  
      // Si la validación es exitosa, continuamos con la siguiente función middleware.
      next();
      return; // Salimos de la función middleware.
  
    } catch (error) {
      // Si la validación falla y se lanza una excepción, manejamos el error.
      console.Error(error); // Registramos el error en la consola.
      response.error(res, error, 400); // Respondemos con un mensaje de error y código de estado 400.
    }
  }
  

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  const userService = await UserService.getInstance(); // Creamos una instancia de 'UserService'.
  const users = await userService.getAll();
  console.Success('GET ALL USERS');
  response.success(res, users);
});

// Obtener un usuario por su UUID
router.get('/:uuid', async (req, res) => {
  const userService = await UserService.getInstance(); // Creamos una instancia de 'UserService'.
  const { uuid } = req.params;
  const user = await userService.getOne(uuid);
  if (!user) {
    console.error(`UUID ${uuid} no encontrado`);
    response.error(res, 'USUARIO NO ENCONTRADO', 400);
    return;
  }
  console.Success(`OBTENER USUARIO POR UUID ${uuid}`);
  response.success(res, user);
  return;
});

// Definimos una ruta para manejar una solicitud POST (por ejemplo, inicio de sesión de usuario).
router.post('', async (req, res) => {
  const { email, password } = req.body; // Extraemos los campos 'email' y 'password' del cuerpo de la solicitud.

  if (!email) {
    return response.error(res, 'El email es obligatorio', 400);
  }

  if (!password) {
    return response.error(res, 'La contraseña es obligatoria', 400);
  }

  const userService = await UserService.getInstance(); // Creamos una instancia de 'UserService'.
  const isLoggedIn = userService.login(email, password);

  if (!isLoggedIn) {
    return response.error(res, 'Credenciales inválidas', 400);
  }

  console.Success('Usuario autenticado: ' + email);
  response.success(res, 'Usuario autenticado', 200);
});

// Crear un usuario
router.post('/create', validationMiddleware(createUserSchema), async (req, res) => {
  const { name, lastName, email, phone, organization, password } = req.body; // Extraemos los datos del usuario.

  const userService = await UserService.getInstance(); // Creamos una instancia de 'UserService'.
  const user = await userService.create(name, lastName, email, phone, organization, password);
  console.Success('CREAR USUARIO: ' + user.uuid);
  response.success(res, user);
});

// Aquí podrían definirse más rutas y controladores para otras operaciones de usuario.

// Exportamos el enrutador para su uso en otros lugares de la aplicación.
module.exports = router;
