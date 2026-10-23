import {jwtDescifrar} from '../services/jwt.service.js'

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = jwtDescifrar(token);
        req.data = data.data;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send('No autorizado');
    }
}