import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "150eeb20a211091264da400f641cf7c4",
    language: "ko-KR",
  },
});

export default instance;
