import { Route, Routes } from "react-router-dom"
import Memotest from "./Components/Memotest"
import Palabrasporminuto from "./Components/Palabrasporminuto"
import Pokemon from "./Components/Pokemon"



function App() {

  return (
    <>
      <Routes>
        <Route element={<Memotest />} path="/memotest" />
        <Route element={<Palabrasporminuto />} path="/palabrasporminuto" />
        <Route element={<Pokemon />} path="/pokemon" />
      </Routes>

    </>

  )

}

export default App
