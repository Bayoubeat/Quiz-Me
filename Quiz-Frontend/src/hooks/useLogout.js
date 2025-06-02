import useAuth from "./useAuth";
import axios from "../api/axios";
import { API_URLS } from "../helper/constants";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.post(API_URLS.AUTH.LOGOUT, null, {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
