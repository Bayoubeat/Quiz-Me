import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../../api/axios";
import { API_URLS, WEB_URLS } from "../../helper/constants";
import useAuth from "../../hooks/useAuth";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z]).{4,24}$/;

export default function Register() {
  const { auth, setAuth, persist, setPersist } = useAuth();

  const userRef = useRef();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUser, setValidUser] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [pwdMatch, setPwdMatch] = useState("");
  const [validPwdMatch, setValidPwdMatch] = useState(false);
  const [pwdMatchFocus, setPwdMatchFocus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidUser(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidPwdMatch(password === pwdMatch);
  }, [password, pwdMatch]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, pwdMatch]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        API_URLS.AUTH.REGISTER,
        JSON.stringify({ username: username, password: password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      const upUsername = response?.data?.username;
      setAuth({
        username: upUsername,
        displayName: username,
        roles,
        accessToken,
      });
      localStorage.setItem("auth", JSON.stringify(auth));
      navigate(WEB_URLS.LANDING);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div className="mt-10 p-6 max-w-md mx-auto bg-white border border-gray-300 rounded shadow-sm">
      <h2 className="text-2xl font-bold text-purple-600 mb-4 text-center">
        Register
      </h2>

      <form onSubmit={handleRegister} className="space-y-4">
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
            id="user"
            onChange={(e) => setUsername(e.target.value)}
            required
            ref={userRef}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            className={`border rounded px-3 py-2 w-full focus:outline-none ${
              validUser
                ? "border-green-500"
                : userFocus
                ? "border-purple-500"
                : "border-gray-300"
            }`}
          />
          <p className="mt-1 text-xs text-gray-500">
            Username must be 4–24 characters, start with a letter, and can
            include letters, numbers, hyphens, and underscores.
          </p>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            id="pwd"
            onChange={(e) => setPassword(e.target.value)}
            required
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            className={`border rounded px-3 py-2 w-full focus:outline-none ${
              validPwd
                ? "border-green-500"
                : pwdFocus
                ? "border-purple-500"
                : "border-gray-300"
            }`}
          />
          <p className="mt-1 text-xs text-gray-500">
            Password must be 4–24 characters and include at least one uppercase
            and one lowercase letter. Numbers and special characters are
            optional.
          </p>
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="off"
            id="pwdMatch"
            onChange={(e) => setPwdMatch(e.target.value)}
            required
            onFocus={() => setPwdMatchFocus(true)}
            onBlur={() => setPwdMatchFocus(false)}
            className={`border rounded px-3 py-2 w-full focus:outline-none ${
              validPwdMatch
                ? "border-green-500"
                : pwdMatchFocus
                ? "border-purple-500"
                : "border-gray-300"
            }`}
          />
          <p className="mt-1 text-xs text-gray-500">
            Confirm Password must match the password field.
          </p>
        </div>

        <button
          type="submit"
          disabled={!validUser || !validPwd || !validPwdMatch}
          className={`w-full font-semibold px-4 py-2 rounded transition-colors ${
            !validUser || !validPwd || !validPwdMatch
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-purple-500 text-white hover:bg-purple-600"
          }`}
        >
          Create Account
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">Already have an account?</p>
        <Link to="/login">
          <button className="mt-2 bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 transition-colors">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
