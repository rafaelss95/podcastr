import { createContext, PropsWithChildren, useContext, useState } from "react";
import { EpisodeUi } from "../types";

type PlayerContextData = Readonly<{
  episodes: readonly EpisodeUi[];
  canShuffle: boolean;
  currentEpisodeIndex: number;
  hasPreviousEpisode: boolean;
  hasNextEpisode: boolean;
  isLooping: boolean;
  isPlaying: boolean;
  isShuffling: boolean;
  play: (episode: EpisodeUi) => void;
  playPrevious: () => void;
  playNext: () => void;
  playMultiple: (episodes: readonly EpisodeUi[], currentIndex: number) => void;
  setIsPlaying: (state: boolean) => void;
  toggleLoop: () => void;
  togglePlay: () => void;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
}>;

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [episodes, setEpisodes] = useState<readonly EpisodeUi[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const canShuffle = episodes.length > 1;
  const hasPreviousEpisode = currentEpisodeIndex > 0;
  const hasNextEpisode =
    isShuffling || currentEpisodeIndex + 1 < episodes.length;

  function play(episode: EpisodeUi) {
    playMultiple([episode], 0);
  }

  function playMultiple(episodes: readonly EpisodeUi[], currentIndex: number) {
    setEpisodes(episodes);
    setCurrentEpisodeIndex(currentIndex);
    setIsPlaying(true);
  }

  function playPrevious() {
    if (hasPreviousEpisode) {
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function playNext() {
    if (isShuffling) {
      const randomIndex = Math.floor(Math.random() * episodes.length);
      setCurrentEpisodeIndex(randomIndex);
    } else if (hasNextEpisode) {
      setCurrentEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function clearPlayerState() {
    playMultiple([], 0);
  }

  return (
    <PlayerContext.Provider
      value={{
        episodes,
        canShuffle,
        currentEpisodeIndex,
        hasPreviousEpisode,
        hasNextEpisode,
        isLooping,
        isPlaying,
        isShuffling,
        play,
        playPrevious,
        playNext,
        playMultiple,
        setIsPlaying,
        toggleLoop,
        togglePlay,
        toggleShuffle,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
