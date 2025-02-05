import styles from "./page.module.css";

const Equipos = ({ equipos }) => {
  return (
    <div className={styles.container__list}>
      <h2 className={styles.title}>Equipos de Fútbol</h2>
      {equipos.map((equipo) => (
        <section key={equipo.id}>
          <h3 className={styles.nameclub}>{equipo.nombre}</h3>
          <ul>
            {equipo.plantilla.map((jugador) => (
              <li className={styles.container__list} key={jugador.id}>
                <strong>{jugador.nombre}</strong>
                <p>
                  <strong>Altura:</strong> {jugador.Altura}m <br />
                  <strong>Peso:</strong> {jugador.Peso}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

//Funcion que retorna la informacion de equipos.
export default function Home() {
  const equiposData = [
    {
      "id": 1,
      "nombre": "Real Madrid",
      "imagen": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV85lmcWqokcEAwxxLGA_L8Y8PbQHgu3jggg&s",
      "plantilla": [
        { "id": 1, "nombre": "Eden Hazard", "Altura": "1.75", "Peso": "74Kg" },
        { "id": 2, "nombre": "Gonzalo García", "Altura": "1.82", "Peso": "74Kg" },
        { "id": 3, "nombre": "Karim Benzema", "Altura": "1.85", "Peso": "81Kg" }
      ]
    },
    {
      "id": 2,
      "nombre": "Barcelona",
      "plantilla": [
        { "id": 1, "nombre": "Marc-André ter Stegen", "Altura": "1.75", "Peso": "74Kg" },
        { "id": 2, "nombre": "Iñigo Martinez", "Altura": "1.82", "Peso": "74Kg" },
        { "id": 3, "nombre": "Gavi", "Altura": "1.85", "Peso": "81Kg" }
      ]
    },
    {
      "id": 3,
      "nombre": "AC Milan",
      "plantilla": [
        { "id": 1, "nombre": "Jugador1", "Altura": "1.75", "Peso": "74Kg" },
        { "id": 2, "nombre": "Jugador2", "Altura": "1.82", "Peso": "74Kg" },
        { "id": 3, "nombre": "Jugador3", "Altura": "1.85", "Peso": "81Kg" }
      ]
    },
    {
      "id": 4,
      "nombre": "Borusia",
      "plantilla": [
        { "id": 1, "nombre": "Jugador4", "Altura": "1.75", "Peso": "74Kg" },
        { "id": 2, "nombre": "Jugador5", "Altura": "1.82", "Peso": "74Kg" },
        { "id": 3, "nombre": "Jugador6", "Altura": "1.85", "Peso": "81Kg" }
      ]
    }
    // Agregar mas equipos.
  ];

  return (
    <main className={styles.main}>
      <div>
        <h1>Mi Aplicación de Fútbol</h1>
        <Equipos equipos={equiposData} />
      </div>
    </main>
  );
}
