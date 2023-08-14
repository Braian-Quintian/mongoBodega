import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
// import {ValidateInventarios} from './validation/inventarios.validation.js';
import { connect } from '../connection/connection.js'
const db = await connect();
import { handleInternalServerError, handleDuplicateEntryError, handleInvalidDataError } from '../errors/errors.js';

const addInventarios = async (req, res) => {
    try {
        const dataSend = plainToClass(ValidateInventarios, req.body);
        const validationErrors = await validate(dataSend);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((error) => Object.values(error.constraints)).join(', ');
            handleInvalidDataError(res, errorMessages);
            return;
        }

        const { id_producto, id_bodega, cantidad } = dataSend;

        const connection = await getConnection();

        // Verificar si la combinación de id_producto e id_bodega ya existe en la tabla de inventarios
        const [existingInventory] = await connection.query(
            'SELECT * FROM inventarios WHERE id_producto = ? AND id_bodega = ?',
            [id_producto, id_bodega]
        );

        if (existingInventory && existingInventory.length > 0) {
            // Si la combinación ya existe, realizar una actualización sumando la cantidad existente con la cantidad nueva
            const existingCantidad = existingInventory[0].cantidad;
            const updatedCantidad = existingCantidad + cantidad;

            await connection.query(
                'UPDATE inventarios SET cantidad = ? WHERE id_producto = ? AND id_bodega = ?',
                [updatedCantidad, id_producto, id_bodega]
            );

            res.json({ message: 'Inventario actualizado exitosamente' });
        } else {
            // Si es una combinación totalmente nueva, realizar una inserción con los datos ingresados
            await connection.query(
                'INSERT INTO inventarios (id_producto, id_bodega, cantidad) VALUES (?, ?, ?)',
                [id_producto, id_bodega, cantidad]
            );

            res.json({ message: 'Inventario creado exitosamente' });
        }
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return handleDuplicateEntryError(res);
        } else {
            return handleInternalServerError(error, res);
        }
    }
};

export const methodsInventarios = {
    addInventarios,
};