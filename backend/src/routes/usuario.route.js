import { registrar } from "../controller/Usurios.controller.js";

const router=Router()
router.post("/",registrar)
export default router