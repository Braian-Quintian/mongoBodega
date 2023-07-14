// Función para manejar errores internos del servidor (Error 500)
function handleInternalServerError(err, res) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error. Please try again later.' });
}

export {
    handleInternalServerError
}