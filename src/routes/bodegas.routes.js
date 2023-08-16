import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { BodegasP, BodegasG } from './validation/bodegas.js';
import { connect } from '../connection/connection.js'
const db = await connect();

const getBodegas = async (req, res) => {
    if(!req.rateLimit) return;
    try {
        let bodegas = db.collection("Bodega");
        let result = await bodegas.find().toArray();
        let data = plainToClass(BodegasG, result, {excludeExtraneousValues: true});
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addBodegas = async (req, res) => {
    if (!req.rateLimit) return;
    try {
        const dataSend = plainToClass(BodegasP, req.body); 
        const validationErrors = await validate(dataSend);
        if (!dataSend.Creador) {
            dataSend.Creador = dataSend.Responsable;
        }
        if (!dataSend.Update) {
            dataSend.Update = dataSend.Responsable;
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

        let bodegas = db.collection("Bodega");
        let dataArray = [dataSend.ID_Bodega, dataSend.Nombre, dataSend.Responsable, dataSend.Estado,dataSend.Creador, dataSend.Update,dataSend.Created_at,dataSend.Update_at,dataSend.Deleted_at]
        const document = {
            id: dataArray[0],
            Nombre: dataArray[1],
            id_responsable: dataArray[2],
            estado: dataArray[3],
            created_by: dataArray[4],
            update_by: dataArray[5],
            created_at: dataArray[6],
            update_at: dataArray[7],
            deleted_at: dataArray[8]
        };
        const result = await bodegas.insertOne(document);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
 
export const methodsBodegas = {
    getBodegas,
    addBodegas
};