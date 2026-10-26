import Express from "./services/express.service.js";
import Rutas from './routes/index.js'
import env from 'dotenv'
env.config()
const express=new Express(3002)

express.midelwarePre()
express.aniadirRutas("/api",Rutas)

express.servidor()