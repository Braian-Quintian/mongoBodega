import { Router } from "express";
import { methodsTraslados } from "../routes/trasladar.routes.js";
const router = Router();

router.post('/', methodsTraslados.addTraslados);

export {
    router
}