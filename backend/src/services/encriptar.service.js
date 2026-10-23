import bcrypt from 'bcrypt';
import {SALT_ROUNDS} from '../config/config.js'


export class EncriptacionService {
    
    // Recibe la contraseña en texto plano y devuelve el hash
    static async hashPassword(contrasenia) {
        return await bcrypt.hash(contrasenia, SALT_ROUNDS);
    }

    // Compara la contraseña en texto plano con el hash guardado en la BD
    static async comparePassword(contrasenia, hashGuardado) {
        return await bcrypt.compare(contrasenia, hashGuardado);
    }
}