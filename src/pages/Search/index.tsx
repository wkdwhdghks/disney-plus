import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export default function Search() {
  const [searchResults, setSearchResults] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();
  const searchTerm = query.get("q");

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
      setSearchResults(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return <div>Search</div>;
}
