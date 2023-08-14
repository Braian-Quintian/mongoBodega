import { Router } from "express";
import { methodsBodegas } from "../routes/bodegas.routes.js";
import {limitGet, limitPost} from '../rules/reglas.js';
const router = Router();

router.get('/', limitGet(),methodsBodegas.getBodegas);
router.post('/', limitPost(), methodsBodegas.addBodegas);

export {
    router
}