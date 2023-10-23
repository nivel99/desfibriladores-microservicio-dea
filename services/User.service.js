const Database = require('../lib/Database');
const uuid = require('uuid'); // Importa la biblioteca 'uuid'.
const bcrypt = require('bcrypt'); // Importa la biblioteca 'bcrypt'.

// Definimos una clase llamada 'UserService' que contiene métodos relacionados con usuarios.
class UserService {
    // Creamos una propiedad estática para almacenar una única instancia de 'UserService'.
    static _userServiceInstance = null;

    // Esta función nos permite obtener los modelos de la base de datos.
    async getModels() {
        const { UserModel, AuthModel } = await Database.getModels();
        // Creamos variables locales de estos modelos.
        this._userModel = UserModel;
        this._authModel = AuthModel;
    }

    constructor() {} // El constructor no hace nada en este caso.

    // Método estático para obtener una instancia de 'UserService'.
    static async getInstance() {
        // Si no hay una instancia existente, creamos una nueva y la almacenamos.
        if (!UserService._userServiceInstance) {
            UserService._userServiceInstance = new UserService();
            await UserService._userServiceInstance.getModels();
        }
        // Devolvemos la instancia existente o recién creada.
        return UserService._userServiceInstance;
    }

    // Obtiene todos los usuarios.
    async getAll() {
        return this._userModel.findAll();
    }

    // Obtiene un usuario por su UUID.
    async getOne(uuid) {
        return this._userModel.findOne({
            where: { uuid }
        });
    }

    // Crea un nuevo usuario con un valor UUID único y una contraseña hash.
    async create(name, lastName, email, phone, organization, password) {
        // Genera un valor UUID único.
        const userUUID = uuid.v4();
        const user = await this._userModel.create({
            email,
            name,
            lastName,
            phone,
            organization,
            uuid: userUUID
        });
        // Hashea la contraseña antes de almacenarla en la base de datos.
        const hashedPassword = await bcrypt.hash(password, 10);
        const auth = await this._authModel.create({
            password: hashedPassword
        });
        await user.setAuth(auth);
        return user;
    }
}

// Exportamos la clase 'UserService' para que pueda ser utilizada en otros lugares de la aplicación.
module.exports = UserService;
