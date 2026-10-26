import { Router } from "express";
import Login from "./login.route.js"
import Tareas from "./tarea.route.js"
import Usuario from "./usuario.route.js"
const ruta=Router();
ruta.get("/",(req,res)=>{
    res.status(200).send("ok")
})
ruta.use("/login",Login)
ruta.use("/tareas",Tareas)
ruta.use("/usuario",Usuario)

export default ruta