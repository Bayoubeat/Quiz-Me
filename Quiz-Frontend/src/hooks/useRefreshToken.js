import axios from "../api/axios";
import useAuth from "./useAuth";
import { API_URLS } from "../helper/constants";

const useRefreshToken = () => {
  const { setAuth, persist } = useAuth();

  const refresh = async () => {
    const response = await axios.post(API_URLS.AUTH.REFRESH, null, {
      withCredentials: true,
    });
    setAuth((prev) => {
      return {
        ...prev,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
        username: response.data.username,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
