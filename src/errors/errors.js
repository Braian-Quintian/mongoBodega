// Función para manejar errores internos del servidor (Error 500)
function handleInternalServerError(err, res) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error. Please try again later.' });
}

// Función para manejar errores de datos faltantes (Error 400)
function handleMissingDataError(res) {
    res.status(400).json({ message: 'Error creating bodega. Some required data is missing. Please provide all the necessary information.' });
}

// Función para manejar errores de usuario por defecto no encontrado (Error 400)
function handleNoDefaultUserError(res) {
    res.status(400).json({ message: 'Error creating bodega. The default user for bodega creation is not found. Please make sure a default user is set.' });
}

// Función para manejar errores de bodega por defecto no encontrada (Error 400)
function handleNoDefaultWarehouseError(res) {
    res.status(400).json({ message: 'Error creating bodega. The default warehouse for bodega creation is not found. Please make sure a default warehouse is set.' });
}

// Función para manejar errores de entrada duplicada (Error 400)
function handleDuplicateEntryError(res) {
    res.status(400).json({ message: 'Error creating bodega. The bodega name already exists. Please provide a unique name for the bodega.' });
}

// Función para manejar errores por defecto (Error 500)
function handleDefaultError(res) {
    res.status(500).json({ message: 'Error creating bodega. An unexpected server error occurred. Please try again later.' });
}

// Función para manejar errores de acceso prohibido (Error 403)
function handleForbiddenError(res) {
    res.status(403).json({ message: 'Forbidden' });
}

// Función para manejar errores de cantidad insuficiente (Error 400)
function handleInsufficientQuantityError(res) {
    res.status(400).json({ message: 'Error transferring product. The quantity requested exceeds the available quantity in the source warehouse.' });
}

// Función para manejar errores de datos inválidos (Error 400)
function handleInvalidDataError(res, message) {
    const errorMessage = 'Error de datos inválidos: ' + message; // Agrega un prefijo al mensaje de error
    res.status(400).json({ message: errorMessage });
}

// Función para manejar errores de bodega no encontrada (Error 400)
function handleInvalidBodegaError(res, message) {
    res.status(400).json({ message });
}

// Función para manejar errores de bodega no existente (Error 400)
function handleNoExist(res) {
    res.status(400).json({ message: 'Error creating bodega. The user to join does not exist.' });
}

export {
    handleInternalServerError,
    handleMissingDataError,
    handleNoDefaultUserError,
    handleNoDefaultWarehouseError,
    handleDuplicateEntryError,
    handleDefaultError,
    handleForbiddenError,
    handleInsufficientQuantityError,
    handleInvalidDataError,
    handleInvalidBodegaError,
    handleNoExist
};
