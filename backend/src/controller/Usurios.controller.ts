import { Request, Response } from 'express';
import { Usuarios } from "../models/usuarios.js";
import { EncriptacionService } from "../services/encriptar.service.js";

export async function registrar(req: Request, res: Response): Promise<void> {
    try {
        const { correo, contrasenia, ...otrosDatos } = req.body;

        
        if (!correo || !contrasenia) {
            throw new Error('Faltan campos obligatorios (correo o contraseña)');
        }

       
        const usuarioExistente = await Usuarios.traerUsuarioCorreo(correo);
        if (usuarioExistente && usuarioExistente.length > 0) {
            throw new Error('El correo ya se encuentra registrado');
        }

        
        const contraseniaHasheada = await EncriptacionService.hashPassword(contrasenia);

        
        const nuevoUsuario = {
            correo,
            contrasenia: contraseniaHasheada,
            ...otrosDatos
        };

        const resultado = await Usuarios.agregarUsuario(nuevoUsuario);

        
        res.status(201).json({
            mensaje: "Usuario registrado con éxito",
            resultado
        });

    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}