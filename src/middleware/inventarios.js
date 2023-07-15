import { Router } from "express";
import { methodsInventarios } from "../routes/inventarios.routes.js";
const router = Router();

router.post('/', methodsInventarios.addInventarios);

export {
    router
}