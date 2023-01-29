import api from "./api";
import errors from "./errors";

const setRating = async (title, stars, userid) => {
  try {
    const res = await api.post("/ratings/set-rating", { title, stars, userid });
    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const getUserRating = async (title, userid) => {
  try {
    const res = await api.post("/ratings/user-rating", {
      title,
      userid,
    });
    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const removeRating = async (title, userid) => {
  try {
    const res = await api.post("/ratings/remove-rating", {
      title,
      userid,
    });
    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const getRating = async (title) => {
  try {
    const res = await api.post("/ratings/get-rating", { title });
    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

export default {
  getRating,
  setRating,
  getUserRating,
  removeRating,
};
