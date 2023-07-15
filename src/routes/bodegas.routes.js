import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidateBodega } from '../../controller/bodegas.js';
import { getConnection } from '../connection/conection.js';
import { handleInternalServerError, handleDuplicateEntryError, handleInvalidDataError, handleNoExist } from '../errors/errors.js';

const getBodegas = async (req, res) => {
    try {
        const connection = await getConnection();
        const query = 'SELECT * FROM bodegas ORDER BY nombre';
        const [rows] = await connection.query(query);
        res.json(rows);
    } catch (error) {
        handleInternalServerError(error, res);
    }
};

const addBodegas = async (req, res) => {
    try {
        const dataSend = plainToClass(ValidateBodega, req.body);
        if (!dataSend.CREADOR) {
            dataSend.CREADOR = dataSend.RESPONSABLE;
        }
        if (!dataSend.ACTUALIZADOR) {
            dataSend.ACTUALIZADOR = dataSend.RESPONSABLE;
        }

        const validationErrors = await validate(dataSend);

        if (validationErrors.length > 0) {
            const errorMessages = validationErrors.map((error) => Object.values(error.constraints)).join(', ');
            handleInvalidDataError(res, errorMessages);
            return;
        }

        const connection = await getConnection();

        const query = `INSERT INTO bodegas(nombre, id_responsable, estado, created_by, update_by) VALUES(?, ?, ?, ?, ?);`;
        const values = [dataSend.NOM, dataSend.RESPONSABLE, dataSend.STATE, dataSend.CREADOR, dataSend.ACTUALIZADOR];
        await connection.query(query, values);
        res.json({ message: 'Bodega added successfully' });
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
 
export const methodsBodegas = {
    getBodegas,
    addBodegas
};