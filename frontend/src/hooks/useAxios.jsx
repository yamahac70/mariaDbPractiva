import { api } from "../services/api.service";
import {useCallback,useState} from 'react'


function useAxios() {
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(null)
    const ejecutarPeticion = useCallback(async (peticion) => {
        setLoading(true)
        setError(null)
        try {
            const respuesta=await api.request(peticion)
            setData(respuesta.data)
        } catch (error) {
            const {response} = error
            console.log(error)
            if (error.message) {
                setError(error.message)
            }
        }finally{
            setLoading(false)
        }
    },[])

    return [data,loading,error,ejecutarPeticion]

}

export default useAxios