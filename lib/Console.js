// Definimos la clase 'Console'.
class Console {
    constructor(moduleName) {
        this.moduleName = moduleName;
    }

    // Método para imprimir un mensaje de éxito en la consola.
    Success(message) {
        console.log(`[${this.moduleName}] ${new Date().toUTCString()} ${message}`);
    }

    // Método para imprimir un mensaje de advertencia en la consola.
    Warning(message) {
        console.log(`[${this.moduleName}] ${new Date().toUTCString()} ${message}`);
    }

    // Método para imprimir un mensaje de error en la consola.
    Error(message) {
        console.log(`[${this.moduleName}] ${new Date().toUTCString()} ${message}`);
    }
}

// Exportamos la clase 'Console' para que pueda ser utilizada en otros lugares de la aplicación.
module.exports = Console;
