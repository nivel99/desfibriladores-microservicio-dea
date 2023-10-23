const { Model, DataTypes } = require('sequelize');

// Definimos la clase 'Auth' que extiende el modelo 'Model' de Sequelize.
class Auth extends Model {
    // Método estático 'setup' para configurar el modelo.
    static setup(sequelize) {
        // Inicializamos el modelo 'Auth'.
        Auth.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isActiveAccount: {
                type: DataTypes.BOOLEAN,
                defaultValue: false // Valor predeterminado para 'isActiveAccount' es 'false'.
            }
        }, {
            sequelize, // La instancia de Sequelize para la configuración.
            modelName: 'auth' // El nombre del modelo en la base de datos.
        });
    }
}

// Exportamos la clase 'Auth' para que pueda ser utilizada en otros lugares de la aplicación.
module.exports = Auth;
