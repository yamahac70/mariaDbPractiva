import {createBrowserRouter} from 'react-router-dom'
import Login from './Login.jsx'
import Seguridad from './Seguridad.jsx'
import Tareas from './Tareas.jsx'
import Registro from './Registro.jsx'
//las paginas
//exportamos la funcion createBrowserRouter
export const router = createBrowserRouter([
   
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/registro',
        element: <Registro/>
    },
     {
        path: '/',
        element: <Seguridad/>,
        children:[
            {
                path: '/tareas',
                element:<Tareas/>
            }
        ]
     }
])
