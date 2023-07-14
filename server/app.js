import express from 'express';
import { router as bodegasRouter } from '../src/middleware/bodegas.js'
import { handleInternalServerError } from '../src/errors/errors.js';
const app = express();
app.use(express.json());

app.use('/bodegas', bodegasRouter);


app.use((err, res) => {
    handleInternalServerError(err, res);
});
export default app;