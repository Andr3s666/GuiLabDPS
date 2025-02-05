import styles from "../styles/Home.module.css"; const element = (
  <>
  <h1>Hola, Mundo!</h1>
  <h2>Son las {new Date().toTimeString() }</h2>
  </>
  ); export default function Home() { return (
  <main className={styles.main}>
  <div className="App">
  {element}
  </div>
  </main>
  );
  }