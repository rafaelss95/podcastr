import { GetStaticPropsResult } from "next";
import Image from "next/image";
import Link from "next/link";
import { api } from "../services/api";
import { EpisodeDTO, EpisodeUi } from "../types";
import { formatEpisode } from "../utils/format-episode";
import styles from "./home.module.scss";

type Props = Readonly<{
  latestEpisodes: readonly EpisodeUi[];
  previousEpisodes: readonly EpisodeUi[];
}>;

export default function Home({ latestEpisodes, previousEpisodes }: Props) {
  return (
    <div className={styles.homepage}>
      <section className={styles.latestEpisodes}>
        <h2>Últimos lançamentos</h2>
        <ul>
          {latestEpisodes.map((episode) => {
            return (
              <li key={episode.id}>
                <Image
                  height={192}
                  width={192}
                  src={episode.thumbnail}
                  alt={episode.title}
                  objectFit="cover"
                />
                <div className={styles.details}>
                  <Link href={`episodes/${episode.id}`}>
                    <a>{episode.title}</a>
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAtFormatted}</span>
                  <span>{episode.file.durationFormatted}</span>
                </div>
                <button type="button">
                  <img src="/play-green.svg" alt="Tocar episódio" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <section className={styles.previousEpisodes}>
        <h2>Todos os episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {previousEpisodes.map((episode) => {
              return (
                <tr key={episode.id}>
                  <td style={{ width: 100 }}>
                    <Image
                      height={120}
                      width={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td style={{ width: 100 }}>{episode.publishedAtFormatted}</td>
                  <td>{episode.file.durationFormatted}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export async function getStaticProps(): Promise<GetStaticPropsResult<Props>> {
  const { data } = await api.get<readonly EpisodeDTO[]>("episodes", {
    params: {
      _limit: 12,
      sort: "published_at",
      order: "desc",
    },
  });
  const episodes = data.map(formatEpisode);
  const [firstEpisode, secondEpisode, ...previousEpisodes] = episodes;
  const eightHours = 60 * 60 * 8;

  return {
    props: { latestEpisodes: [firstEpisode, secondEpisode], previousEpisodes },
    revalidate: eightHours,
  };
}
