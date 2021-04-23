import { useState } from "react";
import { Header } from "../components/Header";
import { Player } from "../components/Player";
import { PlayerContext } from "../contexts";
import styles from "../styles/app.module.scss";
import "../styles/global.scss";
import { EpisodeUi } from "../types";

export default function MyApp({ Component, pageProps }) {
  const [episodes, setEpisodes] = useState<readonly EpisodeUi[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function play(episode: EpisodeUi) {
    setEpisodes([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodes,
        currentEpisodeIndex,
        isPlaying,
        play,
        setIsPlaying,
        togglePlay,
      }}
    >
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContext.Provider>
  );
}
