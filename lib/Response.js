// Definimos la clase 'Response'.
class Response {
    // Método para enviar una respuesta de éxito con un mensaje y un código de estado personalizado.
    success(res, message, statusCode) {
        res.status(statusCode || 200).send({
            error: '', // No hay error en una respuesta exitosa.
            body: message // El mensaje que se envía en la respuesta.
        });
    }

    // Método para enviar una respuesta de error con un mensaje y un código de estado personalizado.
    error(res, message, statusCode) {
        res.status(statusCode || 500).send({
            error: message, // El mensaje de error que se envía en la respuesta.
            body: '' // No hay contenido del cuerpo en una respuesta de error.
        });
    }
}

// Exportamos la clase 'Response' para que pueda ser utilizada en otros lugares de la aplicación.
module.exports = Response;
