import express from 'express';
import { limitGet } from '../src/rules/reglas.js';
import { dynamicRouter } from './dynamicRouter.js';
import { autenticacion } from '../src/security/keys/autenticacion.js';
import { verifyToken } from '../src/security/keys/verifyToken.js';
import { handleInternalServerError } from '../src/errors/errors.js';
const app = express();
app.use(express.json());

app.get('/autorizacion/:id', autenticacion);
app.use('/:collection', limitGet() , verifyToken, dynamicRouter);

app.use((err, res) => { handleInternalServerError(err, res)});

export default app;