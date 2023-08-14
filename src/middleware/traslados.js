import { Router } from "express";
import { methodsTraslados } from "../routes/trasladar.routes.js";
import {limitPost} from '../rules/reglas.js';
const router = Router();

router.post('/',limitPost(), methodsTraslados.addTraslados);

export {
    router
}