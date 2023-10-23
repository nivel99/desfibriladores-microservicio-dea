const { Model, DataTypes } = require('sequelize');

// Definimos la clase 'User' que extiende el modelo 'Model' de Sequelize.
class User extends Model {
    // Método estático 'setup' para configurar el modelo.
    static setup(sequelize) {
        // Inicializamos el modelo 'User'.
        User.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            uuid: {
                type: DataTypes.UUID,
                unique: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                validate: { isEmail: true }, // Validación para asegurarse de que 'email' sea una dirección de correo electrónico válida.
                allowNull: false,
                unique: true
            },
            name: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            phone: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            organization: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        }, {
            sequelize, // La instancia de Sequelize para la configuración.
            modelName: 'user' // El nombre del modelo en la base de datos.
        });
    }
}

// Exportamos la clase 'User' para que pueda ser utilizada en otros lugares de la aplicación.
module.exports = User;
