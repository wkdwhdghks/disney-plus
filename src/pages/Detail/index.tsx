import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Detail(): JSX.Element {
  interface MovieInfo {
    backdrop_path: string;
  }

  let { movieId } = useParams();
  console.log(movieId);
  const [movie, setMovie] = useState<MovieInfo>();

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`/movie/${movieId}`);
      console.log(response);
      setMovie(response.data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) return <div></div>;

  return (
    <section>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt="modal__poster-img"
        className="modal__poster-img"
      />
    </section>
  );
}
