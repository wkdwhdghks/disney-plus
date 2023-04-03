import "./MovieModal.css";

export default function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
}: {
  backdrop_path?: string;
  title?: string;
  overview?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: string;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return <div>{backdrop_path}</div>;
}
