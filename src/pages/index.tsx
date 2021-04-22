type Episode = Readonly<{
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  description: string;
  file: Readonly<{
    url: string;
    type: string;
    duration: number;
  }>;
}>;

type Props = Readonly<{
  episodes: readonly Episode[];
}>;

export default function Home({ episodes }: Props) {
  return (
    <ul>
      {episodes.map((episode) => (
        <li key={episode.id}>{episode.title}</li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch("http://localhost:3333/episodes");
  const episodes = await response.json();
  const eightHours = 60 * 60 * 8;

  return {
    props: { episodes },
    revalidate: eightHours,
  };
}
