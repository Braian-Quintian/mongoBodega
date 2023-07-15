import express from 'express';
import { router as bodegasRouter } from '../src/middleware/bodegas.js'
import { router as productosRouter } from '../src/middleware/productos.js'
import { router as inventariosRouter } from '../src/middleware/inventarios.js'
import { handleInternalServerError } from '../src/errors/errors.js';
const app = express();
app.use(express.json());

app.use('/bodegas', bodegasRouter);
app.use('/productos', productosRouter);
app.use('/inventarios', inventariosRouter);

app.use((err, res) => {
    handleInternalServerError(err, res);
});
export default app;