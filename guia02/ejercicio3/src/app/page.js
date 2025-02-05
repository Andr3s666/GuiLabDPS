"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [numero1, setNumero1] = useState("");
  const [numero2, setNumero2] = useState("");
  const [resultado, setResultado] = useState(null);

  const sumar = () => {
    setResultado(`Resultado de la suma: ${parseFloat(numero1) + parseFloat(numero2)}`);
  };

  const restar = () => {
    setResultado(`Resultado de la resta: ${parseFloat(numero1) - parseFloat(numero2)}`);
  };

  const multiplicar = () => {
    setResultado(`Resultado de la multiplicación: ${parseFloat(numero1) * parseFloat(numero2)}`);
  };

  const dividir = () => {
    if (parseFloat(numero2) === 0) {
      setResultado("Error: No se puede dividir entre 0");
    } else {
      setResultado(`Resultado de la división: ${parseFloat(numero1) / parseFloat(numero2)}`);
    }
  };

  const potenciar = () => {
    setResultado(`Resultado de la potenciación: ${Math.pow(parseFloat(numero1), parseFloat(numero2))}`);
  };

  const raizCuadrada = () => {
    if (parseFloat(numero1) < 0) {
      setResultado("Error: No se puede calcular la raíz cuadrada de un número negativo");
    } else {
      setResultado(`Raíz cuadrada de ${numero1}: ${Math.sqrt(parseFloat(numero1))}`);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.calculadora}>
        <div className={styles.numeros}>
          <label className={styles.text}>Número 1:</label>
          <input className={styles.inputnum} type="number" value={numero1} onChange={(e) => setNumero1(e.target.value)} />
        </div>
        <div className={styles.numeros}>
          <label className={styles.text}>Número 2:</label>
          <input className={styles.inputnum} type="number" value={numero2} onChange={(e) => setNumero2(e.target.value)} />
        </div>
        <div>
          <button className={styles.button} onClick={sumar}>Sumar</button>
          <button className={styles.button} onClick={restar}>Restar</button>
          <button className={styles.button} onClick={multiplicar}>Multiplicar</button>
          <button className={styles.button} onClick={dividir}>Dividir</button>
          <button className={styles.button} onClick={potenciar}>Potenciación</button>
          <button className={styles.button} onClick={raizCuadrada}>Raíz Cuadrada</button>
        </div>
        {resultado && <div className={styles.resultado}>{resultado}</div>}
      </div>
    </main>
  );
}