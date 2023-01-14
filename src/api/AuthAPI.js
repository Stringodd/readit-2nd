import api from "./api";
import errors from "./errors";
import TokenService from "./TokenService";

const logout = async () => {
  TokenService.removeLocalAccessToken();
};

const handleAuthResponse = (res, save) => {
  if (res.data.token) {
    TokenService.setLocalAccessToken(res.data.token, save);

    return { error: false };
  }
  return { error: res.error };
};

const login = async (username, password, save) => {
  try {
    const res = await api.post(`users/login-user`, { username, password });
    console.log(res.data);

    return handleAuthResponse(res, save);
  } catch (error) {
    return errors.errorHandler(error);
  }
};

const register = async (username, email, password) => {
  try {
    const res = await api.post(`users/register-user`, {
      username,
      email,
      password,
    });
    console.log(res.data);

    return { error: false };
  } catch (error) {
    return errors.errorHandler(error);
  }
};

export default {
  logout,
  login,
  register,
};
