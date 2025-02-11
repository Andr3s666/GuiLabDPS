import { Home } from "./components/Home"
import "./components/Formulario.css"
import { Formulario } from './components/Formulario'
import { useState } from "react"
import './App.css'

function App() {

  const [user, setUser] = useState([])

  return (
      <div className='App'>
        {
          !user.length > 0
          ? <Formulario setUser={setUser}/>
          : <Home/>
        }
       
      </div>   
  )
}

export default App
