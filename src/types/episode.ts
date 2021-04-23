type EpisodeFileDTO = Readonly<{
  url: string;
  type: string;
  duration: number;
}>;

export type EpisodeDTO = Readonly<{
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: EpisodeFileDTO;
}>;

export type EpisodeUi = EpisodeDTO &
  Readonly<{
    publishedAtFormatted: string;
    file: EpisodeFileDTO & Readonly<{ durationFormatted: string }>;
  }>;
