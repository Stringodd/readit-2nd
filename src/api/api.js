import axios from "axios";
import TokenService from "./TokenService";

const baseURL = "http://localhost:8080";

const instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    if (config.url === "/auth/logout") {
      const token = TokenService.getLocalRefreshToken();
      if (token) {
        /* eslint-disable-next-line no-param-reassign */
        config.headers.Authorization = `Bearer ${token}`; // for Spring Boot back-end
        // config.headers['x-access-token'] = token; // for Node.js Express back-end
      }

      return config;
    }

    const token = TokenService.getLocalAccessToken();
    if (token) {
      /* eslint-disable-next-line no-param-reassign */
      config.headers.Authorization = `Bearer ${token}`; // for Spring Boot back-end
      // config.headers['x-access-token'] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig.retried) {
        originalConfig.retried = true;

        const token = TokenService.getLocalRefreshToken();

        if (!token) {
          return Promise.reject(new Error("no local refresh token"));
        }

        try {
          const rs = await axios.get(`${baseURL}/auth/refresh_token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const save = TokenService.isSaved();
          TokenService.setLocalAccessToken(rs.data.access_token, save);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
