import React from 'react'

function Tareas() {
  return (
    <div>

      <h1 className='text-4xl '>Tareas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5">
       
    <div className="card w-96 bg-base-100 card-xs shadow-sm">
  <div className="card-body">
    <h2 className="card-title">NombreTarea</h2>
    <p>contenido</p>
    <div className="justify-end card-actions">
      <button className="btn btn-primary">Completar tarea</button>
      <button className="btn btn-warning">Eliminar</button>
    </div>
  </div>
</div>
      </div>

    </div>
  )
}

export default Tareas