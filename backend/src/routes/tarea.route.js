import {Router} from 'express'
import {crearTare,editarTarea,getTarea,getTareas,completarTarea} from '../controller/Tarea.controller.js'
import {authMiddleware} from '../middleware/auth.middleware.js'
const router=Router()
router.get('/',authMiddleware,getTareas)
router.get('/:id',authMiddleware,getTarea)
router.post('/',authMiddleware,crearTare)
router.patch('/:id',authMiddleware,editarTarea)
router.post('/completar/:id',authMiddleware,completarTarea) 
export default router