import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { getConnection } from '../../src/connection/conection.js';
import { validateProductos } from '../../controller/productos.js';
import { handleInternalServerError, handleDuplicateEntryError, handleInvalidDataError, handleNoExist } from '../errors/errors.js';

const getProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const query = 'SELECT * FROM productos ORDER BY nombre';
        const [rows] = await connection.query(query);
        res.json(rows);
    } catch (error) {
        handleInternalServerError(error, res);
    }
}

const getTotalProductos = async (req, res) => {
    try {
        const connection = await getConnection();
        const query = `
        SELECT p.*, SUM(i.cantidad) AS Total
        FROM productos p
        JOIN inventarios i ON p.id = i.id_producto
        GROUP BY p.id
        ORDER BY Total DESC;
      `;
        const [rows] = await connection.query(query);
        res.json(rows);
    } catch (error) {
        handleInternalServerError(error, res);
    }
}

const addProductos = async (req, res) => {
    try {
        const dataSend = plainToClass(validateProductos, req.body);
        const validationErrors = await validate(dataSend);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((error) => Object.values(error.constraints)).join(', ');
            handleInvalidDataError(res, errorMessages);
            return;
        }

        const connection = await getConnection();

        const query = `INSERT INTO productos(nombre, descripcion, estado, created_by, update_by) VALUES(?, ?, ?, ?, ?);`;
        const values = [dataSend.NOM, dataSend.DESCRIPCION, dataSend.ESTADO, dataSend.CREADOR, dataSend.ACTUALIZADOR];
        const result = await connection.query(query, values);
        const productId = result.insertId;
        const defaultBodegaId = 11; // ID de la bodega por defecto

        const inventoryQuery = `INSERT INTO inventarios(id_bodega, id_producto, created_by, update_by) VALUES (?, ?, ?, ?);`;
        const inventoryValues = [defaultBodegaId, productId, dataSend.CREADOR, dataSend.ACTUALIZADOR];
        await connection.query(inventoryQuery, inventoryValues);

        res.json({ message: 'Producto added successfully' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            handleDuplicateEntryError(res);
        } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            handleNoExist(res);
        } else {
            handleInternalServerError(error, res);
        }
    }
};



export const methodsProductos = {
    getProductos,
    getTotalProductos,
    addProductos
};