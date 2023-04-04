import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "./Search.css";

export default function Search() {
  interface MovieInfo {
    backdrop_path: string;
    media_type: string;
    id: number;
  }
  const [searchResults, setSearchResults] = useState<MovieInfo[]>([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm) {
      fetchSearchMovie(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchMovie = async (searchTerm: string) => {
    try {
      const response = await axios.get(
        `search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (searchResults?.length > 0) {
    return (
      <section className="search-container">
        {searchResults.map((movie: MovieInfo) => {
          if (movie.backdrop_path !== null && movie.media_type !== "person") {
            const movieImageUrl =
              "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;
            return (
              <div className="movie" key={movie.id}>
                <div
                  className="movie__column-poster"
                  onClick={() => {
                    navigate(`${movie.id}`);
                  }}
                >
                  <img
                    src={movieImageUrl}
                    alt="movie"
                    className="movie__poster"
                  />
                </div>
              </div>
            );
          } else {
            return "";
          }
        })}
      </section>
    );
  } else {
    return (
      <section className="no-results">
        <div className="no-results__text">
          <p>찾고자하는 검색어 "{searchTerm}" 에 맞는 영화가 없습니다.</p>
        </div>
      </section>
    );
  }
}
