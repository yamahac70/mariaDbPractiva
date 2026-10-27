import { api } from "../services/api.service";
import { useCallback, useState } from "react";

function useAxios() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ejecutarPeticion = useCallback(async (peticion) => {
    setLoading(true);
    setError(null);
    try {
      const respuesta = await api.request(peticion);
      setData(respuesta.data);
      return respuesta.data; 
    } catch (error) {
      const { response } = error;
      console.log(response?.data?.error || error.message); //si existe un error en la respuesta del servidor
      if (response?.data?.error) { //si es un error de los campos o algo asi 
        setError(response.data.error);
      } else if (response?.data?.message || response?.data?.mensaje) {//si es un error del servidor
        setError(response.data.message || response.data.mensaje);
      } else {
        // Si no hay respuesta del servidor (ej. servidor caído o error de red)
        setError(error.message);
      }
      
      return null; // Retornamos null si falló
    } finally {
      setLoading(false);
    }
  }, []);

  return [data, loading, error, ejecutarPeticion];
}

export default useAxios;