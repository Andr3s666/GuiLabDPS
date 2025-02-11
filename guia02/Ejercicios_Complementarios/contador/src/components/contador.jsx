import { useState } from "react";

//Constantes que manejan la logica de Incrementar y Decrementar e Iniciar en valor 0
const Contador = () => {  
  const [contador, setContador] = useState(0)

  const Incrementar = () => {
    setContador(contador + 1)
  }
  const Decrementar = () => {
    setContador(contador - 1)
  }

  return (
    <div>
      <h1>Contador</h1>
      <h2>{contador}</h2>
      <button onClick={Incrementar}>Incrementar</button>
      <button onClick={Decrementar}>Decrementar</button>
    </div>
  );
};

export default Contador;
