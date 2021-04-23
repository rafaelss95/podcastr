import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { EpisodeDTO, EpisodeUi } from "../types";
import { secondsToTime } from "./secondsToTime";

export function formatEpisode(episode: EpisodeDTO): EpisodeUi {
  return {
    ...episode,
    publishedAtFormatted: format(parseISO(episode.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    file: {
      ...episode.file,
      durationFormatted: secondsToTime(episode.file.duration),
    },
  };
}
