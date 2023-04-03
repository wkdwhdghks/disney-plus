import axios from "../api/axios";
import { useCallback, useEffect, useState } from "react";
import "./Row.css";
import MovieModal from "./MovieModal";

export default function Row({
  title,
  id,
  fetchUrl,
}: {
  title: string;
  id: string;
  fetchUrl: string;
}): JSX.Element {
  interface MovieInfo {
    id: string;
    backdrop_path: string;
    title: string;
  }

  const [movies, setMovies] = useState<MovieInfo[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [movieSelected, setMovieSelection] = useState({});

  const fetchMovieData = useCallback(async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response.data.results);
  }, [fetchUrl]);

  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData]);

  const handleClick = (movie: MovieInfo) => {
    setModalOpen(true);
    setMovieSelection(movie);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className="slider">
        <div className="slider__arrow-left">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id)!.scrollLeft -= window.innerWidth - 80;
            }}
          >
            {"<"}
          </span>
        </div>
        <div id={id} className="row__posters">
          {movies.map((movie) => (
            <img
              key={movie.id}
              className="row__poster"
              src={`https://images.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
              onClick={() => handleClick(movie)}
            ></img>
          ))}
        </div>
        <div className="slider__arrow-right">
          <span
            className="arrow"
            onClick={() => {
              document.getElementById(id)!.scrollLeft += window.innerWidth - 80;
            }}
          >
            {">"}
          </span>
        </div>
      </div>
      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </div>
  );
}
