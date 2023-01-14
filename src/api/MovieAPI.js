import api from "./api";
import errors from "./errors";

const getAllMovies = async () => {
  try {
    const res = await api.get("/movies/all-movies");
    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const movieInfo = async (title) => {
  try {
    const res = await api.get("/movies/current-movie", { title });
    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

export default {
  getAllMovies,
  movieInfo,
};
