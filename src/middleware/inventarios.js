import { Router } from "express";
import { methodsInventarios } from "../routes/inventarios.routes.js";
import {limitPost} from '../rules/reglas.js';
const router = Router();

router.post('/', limitPost(),methodsInventarios.addInventarios);

export {
    router
}