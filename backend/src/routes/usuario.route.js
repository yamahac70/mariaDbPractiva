import { registrar } from "../controller/Usurios.controller.js";
import { Router } from "express";
const router=Router()
router.post("/",registrar)
export default router