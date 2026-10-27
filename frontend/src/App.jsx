
import  { Toaster } from 'react-hot-toast';
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './pages/router.jsx'

function App() {
  

  return (
  <>
  <Toaster/>
  <RouterProvider router={router} />
  </>
  )
}

export default App
