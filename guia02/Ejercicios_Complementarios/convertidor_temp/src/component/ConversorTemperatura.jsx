import { useState } from "react";
import "./conversor.css";

const ConversorTemperatura = () => {
  const [temperatura, setTemperatura] = useState("");
  const [unidad, setUnidad] = useState("CtoF");
  const [resultado, setResultado] = useState("");

  const convertir = () => {
    let temp = parseFloat(temperatura);
    if (isNaN(temp)) {
      setResultado("Ingrese un número válido");
      return;
    }

    if (unidad === "CtoF") {
      setResultado(`${temp}°C = ${(temp * 9/5 + 32).toFixed(2)}°F`);
    } else {
      setResultado(`${temp}°F = ${((temp - 32) * 5/9).toFixed(2)}°C`);
    }
  };

  return (
    <div className="contenedor">
      <h2>Conversor de Temperatura</h2>
      <input 
        type="number" 
        placeholder="Ingrese temperatura" 
        value={temperatura} 
        onChange={(e) => setTemperatura(e.target.value)} 
      />
      <select value={unidad} onChange={(e) => setUnidad(e.target.value)}>
        <option value="CtoF">Celsius a Fahrenheit</option>
        <option value="FtoC">Fahrenheit a Celsius</option>
      </select>
      <button onClick={convertir}>Convertir</button>
      <h3>{resultado}</h3>
    </div>
  );
};

export default ConversorTemperatura;
