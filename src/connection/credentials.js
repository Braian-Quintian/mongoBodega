import { config } from 'dotenv';
config();

const { CONFIG, ATLAS_USER, ATLAS_PASS, ATLAS_DB,ATLAS_CLUSTER, JWT_PRIVATE_KEY} = process.env;
const conexion = JSON.parse(CONFIG);
const credentials = {
    hostname: conexion.hostname,
    port   : conexion.port,
    userDB   : ATLAS_USER,
    passDB   : ATLAS_PASS,
    dbDB     : ATLAS_DB,
    cluster  : ATLAS_CLUSTER,
    token: JWT_PRIVATE_KEY
}

export default credentials;