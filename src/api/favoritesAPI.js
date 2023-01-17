import api from "./api";
import errors from "./errors";

const getFavorites = async (userid) => {
  try {
    const res = await api.post(`favorite/get-favorites`, { userid });

    return res.data.data;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const addFavorite = async (title, userId) => {
  try {
    const res = await api.post("favorite/add-favorite", {
      title,
      userId,
    });

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const deleteFavorite = async (title, userId) => {
  try {
    const res = await api.post("favorite/delete-favorite", {
      title,
      userId,
    });

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

export default {
  getFavorites,
  addFavorite,
  deleteFavorite,
};
