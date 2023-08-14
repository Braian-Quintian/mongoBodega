import { Router } from "express";
import { methodsProductos } from "../routes/productos.routes.js";
import {limitGet, limitPost} from '../rules/reglas.js';
const router = Router();

router.get('/', limitGet(),methodsProductos.getProductos);
router.get('/total', limitGet(),methodsProductos.getTotalProductos);
// router.post('/',limitPost() ,methodsProductos.addProductos);

export {
    router
}