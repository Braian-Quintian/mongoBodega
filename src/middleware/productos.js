import { Router } from "express";
import { methodsProductos } from "../routes/productos.routes.js";
const router = Router();

router.get('/', methodsProductos.getProductos);
router.get('/total', methodsProductos.getTotalProductos);
router.post('/', methodsProductos.addProductos);

export {
    router
}