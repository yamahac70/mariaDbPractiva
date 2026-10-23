import { pool } from './db.js';
import { EncriptacionService } from '../services/encriptar.service.js';

const ejecutarSeed = async () => {
    try {
        console.log('1. Verificando base de datos y tablas...');
       

        console.log('2. Limpiando datos anteriores...');
        await pool.query('SET FOREIGN_KEY_CHECKS = 0');
        await pool.query('TRUNCATE TABLE Tarea');
        await pool.query('TRUNCATE TABLE Usuario');
        await pool.query('SET FOREIGN_KEY_CHECKS = 1');

        console.log('3. Encriptando contraseñas e insertando usuarios...');
        // Encriptamos las contraseñas usando nuestro servicio
        const passJuan = await EncriptacionService.hashPassword('123456');
        const passMaria = await EncriptacionService.hashPassword('abcdef');

        const [user1] = await pool.query(
            'INSERT INTO Usuario (nombre, correo, contrasenia) VALUES (?, ?, ?)',
            ['Juan Pérez', 'juan@correo.com', passJuan]
        );

        const [user2] = await pool.query(
            'INSERT INTO Usuario (nombre, correo, contrasenia) VALUES (?, ?, ?)',
            ['María Gómez', 'maria@correo.com', passMaria]
        );

        const idJuan = user1.insertId;
        const idMaria = user2.insertId;

        console.log(`   -> Usuarios creados con IDs: Juan (${idJuan}), María (${idMaria})`);

        console.log('4. Insertando tareas para cada usuario...');
        const tareas = [
            // Tareas de Juan (Usuario 1)
            ['Configurar servidor Express', 'Instalar cors y mysql2', true, idJuan],
            ['Crear modelos en MySQL', 'Definir tablas Usuario y Tarea', true, idJuan],
            ['Implementar JWT', 'Proteger las rutas con auth.middleware.js', false, idJuan],
            ['Probar endpoints en Postman', 'Verificar POST y GET de tareas', false, idJuan],

            // Tareas de María (Usuario 2)
            ['Diseñar interfaz en React', 'Crear vista de login y lista de tareas', true, idMaria],
            ['Conectar frontend con API', 'Configurar Axios con credenciales', false, idMaria],
            ['Subir proyecto a GitHub', 'Crear repositorio y hacer primer commit', false, idMaria]
        ];

        await pool.query(
            'INSERT INTO Tarea (titulo, descripcion, done, idUsuario) VALUES ?',
            [tareas]
        );

        console.log('✅ Seed completado con éxito (contraseñas hasheadas).');
    } catch (error) {
        console.error('❌ Error al ejecutar el seed:', error);
    } finally {
        await pool.end();
        process.exit(0);
    }
};

ejecutarSeed();