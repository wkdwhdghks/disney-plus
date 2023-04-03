import { useState, useEffect } from "react";
import axios from "../api/axios";
import requests from "../api/request";
import styled from "styled-components";
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
  const [isClicked, setIsClicked] = useState<boolean>(false);

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
      return str.length > n ? str.substr(0, n) + "..." : str;
    }
  };

  if (isClicked) {
    return (
      <>
        <Container>
          <HomeContainer>
            <Iframe
              src={`https://www.youtube-nocookie.com/embed/${movie?.videos?.results[0]?.key}?&autoplay=1&loop=1&mute=1&playlist=${movie?.videos?.results[0]?.key}`}
              width="640"
              height="360"
              frameBorder="0"
              allow="autoplay; fullscreen"
            ></Iframe>
          </HomeContainer>
        </Container>
        <button
          onClick={() => {
            setIsClicked(false);
          }}
        >
          X
        </button>
      </>
    );
  } else {
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
              <button
                className="banner__button play"
                onClick={() => {
                  setIsClicked(true);
                }}
              >
                play
              </button>
            )}
          </div>
          <p className="banner__description">
            {truncate(movie?.overview, 100)}
          </p>
        </div>
        <div className="banner--fadeBottom" />
      </header>
    );
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
