import { jwtDescifrar } from '../services/jwt.service.js';

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'error',
                message: 'Token no proporcionado o formato inválido'
            });
        }

        const token = authHeader.split(' ')[1];
        const data = jwtDescifrar(token);

        if (!data) {
            return res.status(401).json({
                status: 'error',
                message: 'Token inválido o expirado'
            });
        }

        req.data = data.data;
        next();
    } catch (error) {
        
        return res.status(401).json({
            status: 'error',
            message: 'No autorizado'
        });
    }
};