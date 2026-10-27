import {createBrowserRouter} from 'react-router-dom'
import Login from './Login.jsx'
//las paginas
//exportamos la funcion createBrowserRouter
export const router = createBrowserRouter([
    {
        path: '/',
        element: <h1>Home</h1>
    },
    {
        path: '/login',
        element: <Login/>
    }
])
