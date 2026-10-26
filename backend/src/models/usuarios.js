import { pool } from "../db/db.js";

export class Usuarios {
    static async agregarUsuario (usuario){
        const [result]=await pool.query('INSERT INTO Usuario SET ?',usuario)
        return result
    }
    static async traerUsuarioCorreo(correo){
        const [result]=await pool.query('SELECT * FROM Usuario WHERE correo=?',correo)
        return result
    }
    static async traerUsuarioId(id){
        const [result]=await pool.query('SELECT * FROM Usuario WHERE id=?',id)
        return result
    }
    static async traerUsuariosyTareas(){
        const [result]=await pool.query('SELECT * FROM Tarea INNER JOIN Usuario ON Tarea.idUsuario=Usuario.id ')
        return result
    }
}