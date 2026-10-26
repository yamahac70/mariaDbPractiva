import { Router } from "express";
import Login from "./login.route.js"
import Tareas from "./tarea.route.js"
const ruta=Router();
ruta.get("/",(req,res)=>{
    res.status(200).send("ok")
})
ruta.use("/login",Login)
ruta.use("/tareas",Tareas)

export default ruta