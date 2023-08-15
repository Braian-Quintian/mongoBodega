import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ProductosG } from './validation/productos.js';
import { connect } from '../connection/connection.js'
const db = await connect();

const getProductos = async (req,res) => {
    if(!req.rateLimit) return;
    try {
        let productos = db.collection("Productos");
        let result = await productos.find().toArray();
        let data = plainToClass(ProductosG, result, { excludeExtraneousValues: true})
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getTotalProductos = async (req,res) => {
    if(!req.rateLimit) return;
    try {
        let productos = db.collection("Productos");
        let result = await productos.aggregate([
            {
                $lookup: {
                from: "Inventarios",
                localField: "id",
                foreignField: "id_producto",
                as: "Inventarios",
                },
            },
            {
                $unwind: "$Inventarios",
            },
            {
                $group: {
                _id: "$id",
                Nombre: { $first: "$Nombre" },
                total_cantidad: { $sum: "$Inventarios.cantidad" },
                },
            },
            {
                $sort: { total_cantidad: 1 } // Orden de menor a mayor por el campo "total_cantidad"
            }
        ]).toArray();
        const transformedResult = result.map(item => ({
            _id: item._id,
            'id-producto': item.id,
            'nombre-producto': item.Nombre,
            'total-cantidad': item.total_cantidad
        }));
        res.json(transformedResult);
    } catch (error) {
        handleInternalServerError(error, res);
    }
};

const addProductos = async (req, res) => {
    try {
        const dataSend = plainToClass(ValidateProductos, req.body);
        const validationErrors = await validate(dataSend);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((error) => Object.values(error.constraints)).join(', ');
            handleInvalidDataError(res, errorMessages);
            return;
        }

        const connection = await getConnection();

        const query = `INSERT INTO productos(nombre, descripcion, estado, created_by, update_by) VALUES(?, ?, ?, ?, ?);`;
        const values = [dataSend.NOM,dataSend.DESCRIPCION,dataSend.ESTADO,dataSend.CREADOR,dataSend.ACTUALIZADOR];
        const result = await connection.query(query, values);
        const productId = result[0].insertId;
        const defaultBodegaId = 11; // ID de la bodega por defecto
        const defaultCantidad = 1;
        const inventoryQuery = `INSERT INTO inventarios(id_bodega, id_producto, cantidad, created_by, update_by) VALUES (?, ?, ?, ?, ?);`;
        const inventoryValues = [
            defaultBodegaId,
            productId,
            defaultCantidad,
            dataSend.CREADOR,
            dataSend.ACTUALIZADOR
        ];
        await connection.query(inventoryQuery, inventoryValues);

        res.json({ message: 'Producto added successfully' });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return handleDuplicateEntryError(res);
        } else if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return handleNoExist(res);
        } else {
            return handleInternalServerError(error, res);
        }
    }
};
export const methodsProductos = {
    getProductos,
    getTotalProductos,
    addProductos
};
