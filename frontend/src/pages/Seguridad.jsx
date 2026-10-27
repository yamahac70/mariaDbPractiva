import { Navigate, Outlet, useNavigate, Link } from "react-router-dom";
import { leerStorage, borrarStorage } from "../services/sessionStorage.service";
export default function Seguridad() {
  const navigate = useNavigate();
  const token = leerStorage("token");
  const usuario = leerStorage("usuario");
  if (!token || !usuario) {
    return <Navigate to="/login" replace />;
  }

  const cerrarSesion = () => {
    borrarStorage("token");
    borrarStorage("usuario");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <div className="navbar bg-base-100 shadow-sm px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                aria-label="Menu"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
        
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/tareas">Mis Tareas</Link>
              </li>
            </ul>
          </div>
          <Link to="/tareas" className="btn btn-ghost text-xl">
            Tareas Plus
          </Link>
        </div>

        <div className="navbar-end gap-4">
          <span className="text-sm opacity-80 hidden sm:inline">
            {usuario?.nombre || usuario?.correo}
          </span>
          <button className="btn btn-outline btn-error btn-sm" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <main className="flex-1 container mx-auto p-4">
        <Outlet context={{ usuario, token }} />
      </main>
    </div>
  );
}