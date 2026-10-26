import { pool } from "../db/db.js";
import { dataTareas,dataUsuarios } from '../db/db.js';
/* CREATE DATABASE tareas ;

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
); */
/* docker exec -it bancoMariaDb mariadb -u root -p */

export default class Tarea{
    static async traerTodasTareas(data={select:dataTareas}){
        const {select}=data
        //traemos las tareas de la base de datos 
        const [tareas]=await pool.query(`SELECT ${select.join(",")} FROM Tarea`)
        return tareas

    }
    static async traerTarea(id,idUsuario,data={select:dataTareas}){
        const {select}=data
        const [tarea]=await pool.query(`SELECT ${select.join(",")} FROM Tarea WHERE Tarea.id=? AND Tarea.idUsuario=? `,id,idUsuario)
        return tarea
    }
    static async traerTareasyUsuario(idUsuario,data={selectTarea:dataTareas,selectUsuario:dataUsuarios}){
        //los selects tienen que ir con el nombre de la tabla 
        const {selectTarea,selectUsuario}=data
        const customSelect=[...selectTarea.map((s)=>`Tarea.${s}`),...selectUsuario.map((s)=>`Usuario.${s}`)].join(",")
        const [tareas]=await pool.query('SELECT '+customSelect+' FROM Tarea INNER JOIN Usuario ON Tarea.idUsuario=Usuario.id WHERE Tarea.idUsuario=?',[idUsuario])
        return tareas
    }
    static async traerTareasConUsuarios(data={selectTarea:dataTareas,selectUsuario:dataUsuarios}){
        const {selectTarea,selectUsuario}=data
        const customSelect=[...selectTarea.map((s)=>`Tarea.${s}`),...selectUsuario.map((s)=>`Usuario.${s}`)].join(",")
        const [tareas]=await pool.query('SELECT '+customSelect+' FROM Tarea INNER JOIN Usuario ON Tarea.idUsuario=Usuario.id')
        return tareas
    }
    static async agregarTarea (tarea){
        const [result]=await pool.query('INSERT INTO Tarea SET ?',tarea)
        return result
    }
    static async completarTarea(id){
        const [result]=await pool.query('UPDATE Tarea SET done=1 WHERE id=?',id)
        return result
    }
    /* 
    *
    *@param id
    *@param tarea {titulo,descripcion}
    1*/
    static async actualizarTarea (id,tarea){
        const [result]=await pool.query('UPDATE Tarea SET ? WHERE id=?',[tarea,id])
        return result
    }
    
}