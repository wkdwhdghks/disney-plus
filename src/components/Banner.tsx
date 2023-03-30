import { useState, useEffect } from "react";
import axios from "../api/axios";
import requests from "../api/request";
import "./Banner.css";

export default function Banner(): JSX.Element {
  interface MovieInfo {
    backdrop_path: string;
    title: string;
    name: string;
    original_name: string;
    videos: {
      results: [{ key: string }];
    };
    overview: string;
  }

  const [movie, setMovie] = useState<MovieInfo>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(requests.fetchNowPlaying);
    const movieId =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };

  const truncate = (str: string | undefined, n: number) => {
    if (typeof str === "string") {
      return str?.length > n ? str.substr(0, n) + "..." : str;
    }
  };

  return (
    <header
      className="banner"
      style={
        movie !== undefined
          ? {
              backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
              backgroundPosition: "top center",
              backgroundSize: "cover",
            }
          : {}
      }
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          {movie?.videos?.results[0]?.key && (
            <button className="banner__button play">play</button>
          )}
        </div>
        <p className="banner__description">{truncate(movie?.overview, 100)}</p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}
