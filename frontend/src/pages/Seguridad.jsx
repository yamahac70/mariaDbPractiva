import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { leerStorage, borrarStorage } from "../services/sessionStorage.service"; 

export default function Segurar() {
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
    <>

  <div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
        <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      
    </div>
    <a class="btn btn-ghost text-xl">Tareas</a>
  </div>
 
  <div class="navbar-end">
    <button class="btn btn-outline btn-success" onClick={cerrarSesion}>Cerrar sesión</button>
  </div>
</div>
<main>
                <Outlet />
                
            </main>
</> 
  );
}