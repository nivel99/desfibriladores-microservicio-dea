const { Sequelize } = require("sequelize");

// Importamos los modelos 'UserModel' y 'AuthModel' que se utilizarán en la base de datos.
const UserModel = require('../models/User.model');
const AuthModel = require('../models/Auth.model');

// Definimos la clase 'Database'.
class Database {
    // Propiedad estática para almacenar una única instancia de la base de datos.
    static _instance = null;

    // Método estático para obtener los modelos y configurar la base de datos.
    static async getModels() {
        if (!Database._instance) {
            // Creamos una instancia de Sequelize y configuramos la conexión a la base de datos.
            Database._instance = new Sequelize({
                dialect: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'eternidad2680',
                database: 'test'
            });

            // Configuramos los modelos 'UserModel' y 'AuthModel'.
            UserModel.setup(Database._instance);
            AuthModel.setup(Database._instance);

            // Definimos las relaciones entre los modelos.
            UserModel.hasOne(AuthModel);

            // Sincronizamos la base de datos con los modelos.
            await Database._instance.sync();
        }

        // Devolvemos los modelos para su uso en otras partes de la aplicación.
        return {
            UserModel,
            AuthModel
        }
    }
}

// Exportamos la clase 'Database' para que pueda ser utilizada en otros lugares de la aplicación.
module.exports = Database;
