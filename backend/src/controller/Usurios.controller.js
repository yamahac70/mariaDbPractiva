
import { Usuarios } from "../models/usuarios.js";
import { EncriptacionService } from "../services/encriptar.service.js";
import { jwtCrear } from "../services/jwt.service.js";

export async function registrar(req, res){
    try {
        const { correo, contrasenia } = req.body;
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
        };
        const resultado = await Usuarios.agregarUsuario(nuevoUsuario);
        //vamos a loguear al usuario que acabamos de registrar
        //creamos el tojken
        const token = jwtCrear({ id: resultado.insertId, correo });
        //https://developer.mozilla.org/es/docs/Web/HTTP/Reference/Status/201
        res.status(201).json({
            usuario: "ok",
            mensaje: "Usuario registrado con éxito",
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
}