import "dotenv/config";
import Express from "./services/express.service.js";
import Rutas from './routes/index.js'
const express=new Express(3002)

express.midelwarePre()
express.aniadirRutas("/api",Rutas)
express.midelwarePost()
express.servidor()