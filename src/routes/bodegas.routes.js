import { getConnection } from '../connection/conection.js';
import { handleInternalServerError } from '../errors/errors.js';

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

export const methodsBodegas = {
    getBodegas
}