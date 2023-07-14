import mysql from 'mysql2/promise';
import credentials from './credentials.js';
let pool = null;
async function createPool() {
    pool = await mysql.createPool({
        host: credentials.host,
        user: credentials.user,
        password: credentials.password,
        database: credentials.database,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
    console.log('Conexión exitosa a la base de datos');
    return pool;
}
export async function getConnection() {
    try {
        return pool && !pool._closed ? pool : await createPool();
    } catch (error) {
        console.error('Error al establecer la conexión:', error);
        throw new Error('Database Connection Error');
    }
}
export default getConnection;