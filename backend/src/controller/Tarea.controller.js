import Tarea from '../models/tareas.js'
export async function crearTare(req,res) {
    try {
            //recuperamos el usuario que viene en el tokent 
            if (!req.data.id) {
                throw new Error('No autorizado');
            }
            console.log(req.body)
            const {titulo,descripcion}=req.body
            if (!titulo || !descripcion) {
                throw new Error('Faltan campos')
            }
            
            const tarea=await Tarea.agregarTarea({titulo,descripcion,idUsuario:req.data.id})

            res.status(201).json({tarea})
    } catch (error) {
        res.status(500).json({error:error.message})
    }   
}
export async function getTarea(req,res) {
    try {
        if (!req.data.id) {
            throw new Error('No autorizado');
        }
        if (!req.params.id) {
            throw new Error('Faltan campos')
        }
        const tareas=await Tarea.traerTarea(req.params.id,req.data.id,{select:["id","titulo","descripcion","done"]})
        res.json({tareas})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export async function getTareas(req,res) {
    try {
        if (!req.data.id) {
            throw new Error('No autorizado');
        }
        const id=req.data.id
        if (!id) {
            throw new Error('Faltan campos')
        }
        const tarea=await Tarea.traerTareasyUsuario(id,{selectTarea:["id","titulo","descripcion","done"],selectUsuario:["nombre","correo"]})
        res.json({tarea})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export async function completarTarea(req,res){
    try {
         if (!req.data.id) {
            throw new Error('No autorizado');
        }
        if (!req.params.id) {
            throw new Error('Faltan campos')
        }
        const [tarea]=await Tarea.traerTarea(req.params.id,req.data.id,{select:["id"]})
        if (!tarea) {
            throw new Error('Tarea no encontrada o no pertenece al usuario')
        }

        await Tarea.completarTarea(tarea.id)
        res.json({tarea})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export async function editarTarea(req,res){
    try {
        if (!req.data.id) {
            throw new Error('No autorizado');
        }
        if (!req.params.id) {
            throw new Error('Faltan campos')
        }
        const {titulo,descripcion,completada}=req.body
        if (!titulo || !descripcion) {
            throw new Error('Faltan campos')
        }
        const [tarea]=await Tarea.traerTarea(req.params.id,req.data.id,{select:["id"]})
        if (!tarea) {
            throw new Error('Tarea no encontrada o no pertenece al usuario')
        }
        console.log(titulo,descripcion)
        await Tarea.actualizarTarea(tarea.id,{titulo,descripcion})
        res.json({tarea})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export async function borrarTarea(req,res){
    try {
        if (!req.data.id) {
            throw new Error('No autorizado');
        }
        if (!req.params.id) {
            throw new Error('Faltan campos')
        }
        const tarea=await Tarea.traerTarea(req.params.id,req.data.id,{select:["id"]})
        if (!tarea) {
            throw new Error('Tarea no encontrada o no pertenece al usuario')
        }
        await Tarea.borrarTarea(tarea.id)
        res.json({tarea})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}