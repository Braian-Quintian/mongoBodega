import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ProductosG,ProductosGT,ProductosP } from './validation/productos.js';
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
                $sort: { total_cantidad: 1 }
            }
        ]).toArray();
        let data = plainToClass(ProductosGT, result, { excludeExtraneousValues: true})
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addProductos = async (req, res) => {
    if(!req.rateLimit) return;
    try {
        const dataSend = plainToClass(ProductosP, req.body);
        const validationErrors = await validate(dataSend);

        if (!dataSend.Creador) {
            dataSend.Creador = dataSend.Creador;
        }
        if (!dataSend.Update) {
            dataSend.Update = dataSend.Creador;
        }

        if(!dataSend.Created_at){
            dataSend.Created_at = (new Date()).toISOString();
        }

        if(!dataSend.Update_at){
            dataSend.Update_at = (new Date()).toISOString();
        }

        if(!dataSend.Deleted_at){
            dataSend.Deleted_at = null;
        }

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map(error => {
                const field = error.property;
                const description = dataSend.constructor.schema.properties[field].description;
                return `${description}: ${Object.values(error.constraints).join(', ')}`;
            });
            res.status(400).json({ message: "Error de validación", errors: errorMessages });    
            return;
        }

        let productos = db.collection("Productos");
        let dataArray = [dataSend.ID_Producto, dataSend.Nombre, dataSend.Description, dataSend.Estado,dataSend.Creador, dataSend.Update,dataSend.Created_at,dataSend.Update_at,dataSend.Deleted_at];
        const document = {
            id: dataArray[0],
            Nombre: dataArray[1],
            Descripcion: dataArray[2],
            estado: dataArray[3],
            created_by: dataArray[4],
            update_by: dataArray[5],
            created_at: dataArray[6],
            updated_at: dataArray[7],
            deleted_at: dataArray[8]
        }
        const result = await productos.insertOne(document)
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const methodsProductos = {
    getProductos,
    getTotalProductos,
    addProductos
};