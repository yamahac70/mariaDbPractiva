import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxios from "../hooks/useAxios";

function Registro() {
  const [_, loading, error, ejecutarPeticion] = useAxios();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    const res = await ejecutarPeticion({
      url: "/usuario/",
      method: "POST",
      data,
    });

    if (res) {
      toast.success("Usuario registrado con éxito");
      // Redirige al login para que inicie sesión
      navigate("/login");
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
    
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Crear cuenta</h1>
          <p className="py-6">
            Registrate en Tareas Plus para empezar a organizar y gestionar tus
            actividades pendientes desde cualquier lugar.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={submit}>
              <fieldset className="fieldset">
                <label className="label">Nombre</label>
                <input
                  type="text"
                  className="input"
                  name="nombre"
                  placeholder="Tu nombre"
                  required
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  name="correo"
                  placeholder="correo@ejemplo.com"
                  required
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="contrasenia"
                  placeholder="Contraseña"
                  required
                />

                <div className="mt-2">
                  <Link to="/login" className="link link-hover">
                    ¿Ya tenés cuenta? Iniciá sesión
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-neutral mt-4"
                  disabled={loading}
                >
                  {loading ? "Registrando..." : "Registrarse"}
                </button>

                {error && (
                  <div className="alert alert-error mt-4">
                    {typeof error === "string" ? error : JSON.stringify(error)}
                  </div>
                )}
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registro;