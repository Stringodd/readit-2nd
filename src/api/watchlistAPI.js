import api from "./api";
import errors from "./errors";

const getWatchlist = async (userid) => {
  try {
    const res = await api.post("watchlist/get-watchlist", { userid });

    return res.data.data;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const addToWatchlist = async (title, userId) => {
  try {
    const res = await api.post("watchlist/add-watchlist", {
      title,
      userId,
    });

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const deleteFromWatchlist = async (title, userId) => {
  try {
    const res = await api.post("watchlist/delete-watchlist", {
      title,
      userId,
    });

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

export default {
  getWatchlist,
  addToWatchlist,
  deleteFromWatchlist,
};
