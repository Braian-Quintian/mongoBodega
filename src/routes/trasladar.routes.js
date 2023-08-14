import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
// import { ValidateTraslado } from './validation/traslados.validation.js';
import { connect } from '../connection/connection.js'
const db = await connect();
import { handleInternalServerError, handleNoExist, handleInvalidDataError, handleInsufficientQuantityError, handleMissingDataError } from '../errors/errors.js';

const addTraslados = async (req, res) => {
    try {
        if (!req.body) {
            return handleMissingDataError(res);
        }

        const dataSend = plainToClass(ValidateTraslado, req.body);
        const validationErrors = await validate(dataSend);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((error) => Object.values(error.constraints)).join(', ');
            handleInvalidDataError(res, errorMessages);
            return;
        }

        const { id, cant, origen, destino, id_usuario } = dataSend;
        const connection = await getConnection();

        // Obtener la cantidad actual del producto en la bodega de origen
        const [origenInventory] = await connection.query(
            'SELECT cantidad FROM inventarios WHERE id_producto = ? AND id_bodega = ?',
            [id, origen]
        );

        if (!origenInventory || origenInventory.length === 0) {
            return handleNoExist(res);
        }

        const cantidadExistenteOrigen = origenInventory[0].cantidad;

        // Verificar si la cantidad a trasladar es mayor a la cantidad existente en la bodega de origen
        if (cant > cantidadExistenteOrigen) {
            return handleInsufficientQuantityError(res);
        }

        // Restar la cantidad trasladada de la bodega de origen
        const cantidadRestanteOrigen = cantidadExistenteOrigen - cant;
        await connection.query(
            'UPDATE inventarios SET cantidad = ? WHERE id_producto = ? AND id_bodega = ?',
            [cantidadRestanteOrigen, id, origen]
        );

        // Obtener la cantidad actual del producto en la bodega de destino
        const [destinoInventory] = await connection.query(
            'SELECT cantidad FROM inventarios WHERE id_producto = ? AND id_bodega = ?',
            [id, destino]
        );

        if (!destinoInventory || destinoInventory.length === 0) {
            return handleNoExist(res);
        }

        const cantidadExistenteDestino = destinoInventory[0].cantidad;

        // Sumar la cantidad trasladada a la bodega de destino
        const cantidadActualizadaDestino = cantidadExistenteDestino + cant;
        await connection.query(
            'UPDATE inventarios SET cantidad = ? WHERE id_producto = ? AND id_bodega = ?',
            [cantidadActualizadaDestino, id, destino]
        );

        // Insertar la información en la tabla de historiales
        const historyQuery = `
            INSERT INTO historiales (id_producto, cantidad, id_bodega_origen, id_bodega_destino, id_inventario, created_by, update_by)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        await connection.query(historyQuery, [id, cant, origen, destino, id, id_usuario, id_usuario]);

        res.json({ message: 'Producto trasladado exitosamente' });
    } catch (error) {
        return handleInternalServerError(error, res);
    }
};

export const methodsTraslados = {
    addTraslados
};
