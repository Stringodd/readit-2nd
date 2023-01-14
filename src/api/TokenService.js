const getLocalAccessToken = () => {
  return (
    window.localStorage.getItem("accessToken") ||
    window.sessionStorage.getItem("accessToken")
  );
};

const setLocalAccessToken = (accessToken, save) => {
  if (save) {
    window.localStorage.setItem("accessToken", accessToken);
  } else {
    window.sessionStorage.setItem("accessToken", accessToken);
  }
};

const removeLocalAccessToken = () => {
  window.localStorage.removeItem("accessToken");
  window.sessionStorage.removeItem("accessToken");
};

const isSaved = () => {
  return window.localStorage.getItem("refreshToken") != null;
};

export default {
  getLocalAccessToken,

  setLocalAccessToken,

  removeLocalAccessToken,

  isSaved,
};
