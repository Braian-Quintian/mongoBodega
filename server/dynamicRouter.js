import { router as Bodegas } from '../src/middleware/bodegas.js'
import { router as Productos } from '../src/middleware/productos.js'
import { router as Inventarios } from '../src/middleware/inventarios.js'
import {router as Traslados} from '../src/middleware/traslados.js'

export async function dynamicRouter(req, res, next) {
    const { collection } = req.params;

    switch (collection) {
        case 'bodegas':
            return Bodegas(req, res, next);
        case 'productos':
            return Productos(req, res, next);
        case 'inventarios':
            return Inventarios(req, res, next);
        case 'traslados':
            return Traslados(req, res, next);
        default:
            return res.status(404).send({ error: 'Ruta no encontrada' });
    }
}