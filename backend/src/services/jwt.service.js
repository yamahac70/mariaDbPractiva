import jwt from 'jsonwebtoken';
import { PALABRA_SECRETA } from '../config/config.js';

export function jwtCrear(data) {
  // 'data' puede ser { id: usuario.id, correo: usuario.correo }
  // 'expiresIn' agrega y valida automáticamente la expiración
  return jwt.sign({ data }, PALABRA_SECRETA, {
    expiresIn: '2h',
    issuer: 'api-tareas',
    audience: 'usuarios'
  });
}

export function jwtDescifrar(token) {
  // Verifica la firma y que el token no haya expirado; si falla, lanza un Error automáticamente
  return jwt.verify(token, PALABRA_SECRETA);
}