import { Router } from "express";
import { methodsBodegas } from "../routes/bodegas.routes.js";
const router = Router();

router.get('/', methodsBodegas.getBodegas);

export {
    router
}