import { config } from 'dotenv';
config();
const { CONFIG, HOST, USUARIO, PASSWORD, DATABASE } = process.env;
const conexion = JSON.parse(CONFIG);
const credentials = {
    hostname: conexion.hostname,
    port: conexion.port,
    host: HOST,
    user: USUARIO,
    password: PASSWORD,
    database: DATABASE
};
export default credentials;