import express from 'express'
import cors from 'cors'
import { errorHandler } from '../middleware/errores.middleware.js'

export default class Express {
    app
    puerto
    opcionesCors
    constructor(puerto=3000,cors={origin:"*"}){
            this.opcionesCors=cors
            this.puerto=puerto
            this.app=express()

    }
    midelwarePre(){
        this.app.use(cors(this.opcionesCors))
        this.app.use(express.json({limit:'50mb'}))
        this.app.use(express.urlencoded({extends:true})) 
    }
    aniadirRutas(path,ruta){
        this.app.use(path,ruta)
    }
    midelwarePost(){
        this.app.use((req, res, next) => {
            res.status(404).json({
                status: 'error',
                message: 'Ruta no encontrada'
            })
        })
        this.app.use(errorHandler)
    }
    servidor(){
        this.app.listen(this.puerto,()=>{
            console.log(this.puerto)
        })
    }

}