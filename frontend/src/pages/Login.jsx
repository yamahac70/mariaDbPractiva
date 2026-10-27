import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { guardarStorage } from "../services/sessionStorage.service.js";

function Login() {
  const navigate = useNavigate();
  const [_, loading, error, ejecutarPeticion] = useAxios();

  async function submit(e) {
    try {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(e.target));
      console.log(data);

      const res = await ejecutarPeticion({
        url: "/login",
        data,
        method: "POST",
      });

      if (res) {
        console.log(res);
        guardarStorage("token", res.token);
        guardarStorage("usuario", res.usuario);
        navigate("/tareas", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Tareas Plus</h1>
          <p className="py-6">
            Iniciá sesión para administrar tus tareas pendientes, crear nuevas
            actividades.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={submit}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  name="correo"
                  placeholder="Email"
                  required
                />

                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="contrasenia"
                  placeholder="Password"
                  required
                />

                <div className="mt-2">
                  <Link to="/registro" className="link link-hover">
                    ¿No tenés cuenta? Registrate acá
                  </Link>
                </div>

                <button
                  type="submit"
                  className="btn btn-neutral mt-4"
                  disabled={loading}
                >
                  {loading ? "Ingresando..." : "Login"}
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

export default Login;