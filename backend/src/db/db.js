//conectamos la base de datos 
import mysql from 'mysql2/promise'
import { HOST_DB,USER_DB,PASSWORD_DB,PORT_DB } from '../config/config.js'

const pool=await mysql.createPool({
  host: HOST_DB,
  user: USER_DB,
  password: PASSWORD_DB,
  port: PORT_DB,
  database: 'tareas',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export { pool}
export const dataTareas=["id","titulo","descripcion","done","idUsuario"]
export const dataUsuarios=["id","nombre","correo","contrasenia"]