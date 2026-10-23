import express from 'express'
import cors from 'cors'

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
    servidor(){
        this.app.listen(this.puerto,()=>{
            console.log(this.puerto)
        })
    }

}