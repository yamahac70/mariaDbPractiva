CREATE DATABASE tareas ;
/* docker exec -it bancoMariaDb mariadb -u root -p */
CREATE TABLE IF NOT EXISTS Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Tarea (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    done BOOLEAN NOT NULL DEFAULT FALSE,
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(id) ON DELETE CASCADE
);