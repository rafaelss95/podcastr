import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PlayerContextProvider } from "../contexts";
import styles from "../styles/app.module.scss";
import "../styles/global.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}
