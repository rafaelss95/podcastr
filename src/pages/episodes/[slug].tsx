import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { PlayerContext } from "../../contexts";
import { api } from "../../services/api";
import { EpisodeDTO, EpisodeUi } from "../../types";
import { formatEpisode } from "../../utils/format-episode";
import styles from "./episode.module.scss";

type Props = Readonly<{
  episode: EpisodeUi;
}>;

export default function Episode({ episode }: Props) {
  const { play } = useContext(PlayerContext);

  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="Voltar" />
          </button>
        </Link>
        <Image
          height={160}
          width={700}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>
      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAtFormatted}</span>
        <span>{episode.file.durationFormatted}</span>
      </header>
      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: episode.description }}
      />
    </div>
  );
}

export function getStaticPaths(): GetStaticPathsResult {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({
  params: { slug },
}: GetStaticPropsContext): Promise<GetStaticPropsResult<Props>> {
  const { data } = await api.get<EpisodeDTO>(`episodes/${slug}`);
  const episode = formatEpisode(data);
  const twentyFourHours = 60 * 60 * 24;
  return {
    props: { episode },
    revalidate: twentyFourHours,
  };
}
