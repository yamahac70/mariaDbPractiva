import React from 'react'
import useAxios from '../hooks/useAxios'
import {guardarStorage}from '../services/sessionStorage.service.js'
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [respuesta, loading, error, ejecutarPeticion] = useAxios();
    async function submit(e){
      try {
        
        
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target))
        console.log(data)
        
       const res= await ejecutarPeticion({url:"/login",data,method:"POST"})
       if (res){
          console.log(res)
         guardarStorage('token',res.token)
         guardarStorage('usuario',res.usuario)
         navigate("/tareas", { replace: true });
        }
        console.log(error)
      } catch (error) {
        console.log(error)
      }

    }  


  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Tareas Plus</h1>
      <p className="py-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio porro rerum laborum excepturi consectetur voluptatum, debitis veritatis consequuntur eaque et consequatur aliquam vero cum error reiciendis perspiciatis totam praesentium saepe.
        Perspiciatis quia nesciunt quaerat qui neque omnis culpa, assumenda accusantium dolorum placeat! Fugiat dolorem ex iusto delectus earum ullam, libero quam similique eveniet velit repellendus ducimus rem nisi, odio commodi?
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

      <div className="card-body">
        <form onSubmit={submit}>

          <fieldset className="fieldset">
            
          <label className="label">Email</label>
          <input type="email" className="input" name="correo" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" className="input" name="contrasenia" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>

          <button className="btn btn-neutral mt-4" disabled={loading}>Login</button>
          {error && <div className="alert alert-error mt-4">{JSON.stringify(error)}</div>}
        </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default Login