import api from "./api";
import errors from "./errors";

const createList = async (profileid, listname) => {
  try {
    const res = await api.post("lists/create-list", {
      profileid,
      listname,
    });
    console.log(res.data);

    return { error: false };
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const deleteList = async (listname, profileid) => {
  try {
    const res = await api.post("lists/create-list", {
      listname,
      profileid,
    });
    console.log(res.data);

    return { error: false };
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const getAllLists = async (profileid) => {
  try {
    const res = await api.get(`lists/all-lists`, { profileid });
    console.log(res.data);

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const currentList = async (listname, profileid) => {
  try {
    const res = await api.get("lists/list-current", { listname, profileid });

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const addMovie = async (listname, profileid, title) => {
  try {
    const res = await api.post("lists/add-movie", {
      listname,
      profileid,
      title,
    });

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const removeMovie = async (listname, profileid, title) => {
  try {
    const res = await api.post("lists/remove-movie", {
      listname,
      profileid,
      title,
    });

    return res;
  } catch (error) {
    return errors.errorHandler(error);
  }
};

export default {
  currentList,
  getAllLists,
  createList,
  deleteList,
  addMovie,
  removeMovie,
};

//router.post("/create-list", authentication, listController.createList);

//router.post("/delete-list", authentication, listController.deleteList);
