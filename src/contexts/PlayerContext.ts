import { createContext } from "react";
import { EpisodeUi } from "../types";

type PlayerContextData = Readonly<{
  episodes: readonly EpisodeUi[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  play: (episode: EpisodeUi) => void;
  setIsPlaying: (state: boolean) => void;
  togglePlay: () => void;
}>;

export const PlayerContext = createContext({} as PlayerContextData);
