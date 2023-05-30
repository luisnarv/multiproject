import axios from "axios";


export async function Wordsss (count, longitud) {
    !count  ? count = 50 : count = count    
     
try {
    const response =    await axios.get(` https://clientes.api.greenborn.com.ar/public-random-word?c=${count}&l=${longitud}`)
  return response.data
} catch (error) {
    throw error (error)
}
}




