import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { API_URLS, WEB_URLS } from "../../helper/constants";

export default function Login() {
  const { auth, setAuth, persist, setPersist } = useAuth();

  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || WEB_URLS.LANDING;

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URLS.AUTH.LOGIN,
        JSON.stringify({ username: username, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      setAuth({ username: username, roles, accessToken });
      localStorage.setItem("auth", JSON.stringify(auth));
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="mt-10 p-6 max-w-md mx-auto bg-white border border-gray-300 rounded shadow-sm">
      <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">
        Login
      </h2>

      <form onSubmit={handleLogin} className="space-y-4">
        <p
          ref={errRef}
          className={`text-red-500 text-sm ${errMsg ? "" : "hidden"}`}
          aria-live="assertive"
        >
          {errMsg}
        </p>

        <div>
          <input
            type="text"
            placeholder="Username"
            autoComplete="off"
            ref={userRef}
            id="user"
            onChange={(e) => setUsername(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            id="pwd"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="persist"
            onChange={togglePersist}
            checked={persist}
            className="accent-purple-500"
          />
          <label htmlFor="persist" className="text-sm text-gray-700">
            Trust this device?
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-purple-500 text-white font-semibold px-4 py-2 rounded hover:bg-purple-600 transition-colors"
        >
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Don't have an account?</p>
        <Link to="/register">
          <button className="mt-2 bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 transition-colors">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
