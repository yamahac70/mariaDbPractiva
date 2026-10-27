import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";
import Modal from "../components/Molda";

function Tareas() {
  const [_, loading, error, ejecutarPeticion] = useAxios();
  const [tareas, setTareas] = useState([]);
const [modalAbierto, setModalAbierto] = useState(false);
  const [tareaEditar, setTareaEditar] = useState(null)
  const traerTodasTareas = async () => {
    const t = await ejecutarPeticion({ url: "/tareas", method: "GET" });
    if (t?.tarea) {
      setTareas(t.tarea);
    } else if (Array.isArray(t)) {
      setTareas(t);
    }
  };

  useEffect(() => {
    traerTodasTareas();
  }, []);

  const completarTarea = async (id) => {
    const t = await ejecutarPeticion({
      url: `/tareas/completar/${id}`,
      method: "POST", // (Si en tu backend es PUT o PATCH, cambialo acá)
    });

    if (t) {
      toast.success("Tarea completada");
      traerTodasTareas();
    } else {
      toast.error("No se pudo completar la tarea");
    }
  };

  const eliminarTarea = async (id) => {
    const t = await ejecutarPeticion({
      url: `/tareas/${id}`,
      method: "DELETE",
    });

    if (t) {
      toast.success("Tarea eliminada");
      traerTodasTareas();
    }else{
      toast.error("No se pudo eliminar la tarea")
    }
  };

// Abrir modal para CREAR
  const abrirModalCrear = () => {
    setTareaEditar(null);
    setModalAbierto(true);
  };

  // Abrir modal para EDITAR
  const abrirModalEditar = (tarea) => {
    setTareaEditar(tarea);
    setModalAbierto(true);
  };

  // Guardar (sirve tanto para Crear como para Editar)
  const guardarTarea = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    if (tareaEditar) {
      
      const res = await ejecutarPeticion({
        url: `/tareas/${tareaEditar.id}`,
        method: "PATCH",
        data,
      });
      if (res) toast.success("Tarea actualizada");
    } else {
      // MODO CREACIÓN (POST)
      const res = await ejecutarPeticion({
        url: "/tareas",
        method: "POST",
        data,
      });
      if (res) toast.success("Tarea creada");
    }

    setModalAbierto(false);
    traerTodasTareas();
  };


  return (
    <div className="p-4">
   

     <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Tareas</h1>
        <button className="btn btn-primary" onClick={abrirModalCrear}>
          + Nueva Tarea
        </button>
      </div>

      {loading && tareas.length === 0 && <p>Cargando tareas...</p>}
      {error && <div className="alert alert-error mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {tareas.map((t) => (
          <div key={t.id} className="card bg-base-100 card-xs shadow-sm w-full">
            <div className="card-body">
              <div>
                {t.done ? (
                  <div className="badge badge-success">Completada</div>
                ) : (
                  <div className="badge badge-error">Pendiente</div>
                )}
              </div>

              <h2 className="card-title mt-2">{t.titulo}</h2>
              <p>{t.descripcion || t.contenido || "Sin contenido"}</p>

              <div className="justify-end card-actions mt-4">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => completarTarea(t.id)}
                  disabled={Boolean(t.done) || loading}
                >
                  {t.done ? "Completada" : "Completar tarea"}
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => eliminarTarea(t.id)}
                  disabled={loading}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => abrirModalEditar(t)}
                  disabled={loading}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* modal de edicion y creacion */}
      <Modal
        isOpen={modalAbierto}
        onClose={() => setModalAbierto(false)}
        titulo={tareaEditar ? "Editar Tarea" : "Crear Nueva Tarea"}
      >
        {/* Todo este formulario viaja como 'children' adentro de Modal.jsx */}
        <form onSubmit={guardarTarea} key={tareaEditar ? tareaEditar.id : "nuevo"}>
          <fieldset className="fieldset space-y-3">
            <div>
              <label className="label">Título</label>
              <input
                type="text"
                name="titulo"
                className="input w-full"
                placeholder="Ej: Estudiar para el parcial"
                defaultValue={tareaEditar?.titulo || ""}
                required
              />
            </div>

            <div>
              <label className="label">Descripción</label>
              <textarea
                name="descripcion"
                className="textarea w-full"
                placeholder="Detalles de la tarea..."
                defaultValue={tareaEditar?.descripcion || ""}
              ></textarea>
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setModalAbierto(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-success" disabled={loading}>
                {loading ? "Guardando..." : tareaEditar ? "Guardar Cambios" : "Crear"}
              </button>
            </div>
          </fieldset>
        </form>
      </Modal>
    </div>
  );
}

export default Tareas;