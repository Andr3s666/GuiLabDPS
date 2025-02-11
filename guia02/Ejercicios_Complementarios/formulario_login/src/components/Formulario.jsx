//Importamos el useState que se trata sobre los estados en este caso de nuestro login y un Formulario.css
import { useState } from "react"
import "./Formulario.css"
export function Formulario({setUser}){
    //Se crea la constante que se ocupara como un string vacio que guardara el usuario.
    const [nombre, setNombre] = useState("")
    //Lo mismo pero para la contraseña.
    const [contraseña, setContraseña] = useState("")
    //Validamos los campos.
    const [error, setError] = useState(false)
    
    //Nos guarda los campos llenados.
    const handleSubmit = (e) =>{
        e.preventDefault()
        //Validamos que nos salte un error
        if(nombre == "" || contraseña == ""){
            setError(true)
            return
        }

        setError(false)

        setUser([nombre])
    }


    return(
        <section>
            <h1>Login</h1>
            <form className="formulario" onSubmit={handleSubmit}>
            <input 
                type="text"              
                value={nombre}
                //Evento que captura los datos
                onChange={e => setNombre(e.target.value)}
            />

            <input 
                type="password"
                value={contraseña}
                onChange={e => setContraseña(e.target.value)}
            />              
                <button>Iniciar Sesion</button>
            </form>
            {error && <p>Debe llenar los campos obligatoriamente</p>}
        </section>
    )
}