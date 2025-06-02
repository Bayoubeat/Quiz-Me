import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { WEB_URLS } from "../helper/constants";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { auth } = useAuth();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate(WEB_URLS.LANDING);
  };

  return (
    <header className="border-b-2">
      <div className="mx-auto max-w-5xl px-6 py-4 flex flex-col md:flex-row gap-2 md:gap-8 items-center">
        <Link to="/" className="font-bold text-xl">
          <span className="text-purple-500">
            <i className="bi bi-bookmark-fill"></i> Quiz
          </span>
          Me
        </Link>

        <nav>
          <ul className="flex flex-wrap gap-4 text-sm md:text-base">
            <li>
              <Link
                to={WEB_URLS.QUIZ_SEARCH}
                className="hover:text-purple-500 font-bold"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to={WEB_URLS.QUIZ_CREATE}
                className="hover:text-purple-500 font-bold"
              >
                Create
              </Link>
            </li>
            <li>
              <Link
                to={WEB_URLS.QUIZ_DELETE}
                className="hover:text-purple-500 font-bold"
              >
                Manage
              </Link>
            </li>
            <li>
              <Link
                to={WEB_URLS.QUIZ_HISTORY}
                className="hover:text-purple-500 font-bold"
              >
                History
              </Link>
            </li>
            <li>
              <Link
                to={WEB_URLS.QUIZ_LEADERBOARD}
                className="hover:text-purple-500 font-bold"
              >
                Leaderboard
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex ml-0 md:ml-auto gap-2 md:gap-8 items-center flex-nowrap">
          {auth?.accessToken && (
            <span className="text-sm md:text-base font-medium text-gray-700 flex-shrink-0">
              Hello, {auth.username}!
            </span>
          )}
          {auth?.accessToken ? (
            <button
              onClick={signOut}
              className="text-sm md:text-base bg-purple-500 rounded text-white font-bold py-2 px-6 hover:bg-purple-600"
            >
              Logout
            </button>
          ) : location.pathname !== WEB_URLS.LOGIN &&
            location.pathname !== WEB_URLS.REGISTER ? (
            <Link
              to={WEB_URLS.LOGIN}
              className="text-sm md:text-base bg-purple-500 rounded text-white font-bold py-2 px-6 hover:bg-purple-600"
            >
              Login / Sign up
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
