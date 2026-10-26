import { Usuarios } from "../models/usuarios.js";
import {EncriptacionService} from '../services/encriptar.service.js'
import {jwtCrear} from '../services/jwt.service.js'

export async function login(req,res){
    try {
        console.log(req.body)
        const {correo,contrasenia}=req.body
        if (!correo || !contrasenia) {
            throw new Error('Faltan campos')
        }
        const usuario=await Usuarios.traerUsuarioCorreo(correo)
        if (!usuario) {
            throw new Error('error contraseña o correo incorrectos')
        }
        const contraseniaCorrecta=await EncriptacionService.comparePassword(contrasenia,usuario[0].contrasenia)
        if (!contraseniaCorrecta) {
            throw new Error('error contraseña o correo incorrectos')
        }
        const token=jwtCrear({id:usuario[0].id,correo:usuario[0].correo})
        res.json({usuario:"ok",token})
        
    } catch (error) {
        console.log(error)
            res.status(500).json({error:error.message})
    }
}