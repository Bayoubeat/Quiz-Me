export const WEB_URLS = {
  LANDING: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  QUIZ_SEARCH: "/search",
  QUIZ_LOAD: "/quiz/:id",
  QUIZ_TAKE: (id) => {
    return `/quiz/${id}`;
  },
  QUIZ_RESULTS: "/results",
  QUIZ_CREATE: "/create",
  QUIZ_DELETE: "/delete",
  QUIZ_HISTORY: "/history",
  QUIZ_LEADERBOARD: "/leaderboard",
  UNAUTHORIZED: "/unauthorized",
};

export const API_URLS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    REFRESH: "/api/auth/refresh",
    LOGOUT: "/api/auth/logout",
  },
  LEADERBOARD: {
    RANKINGS: "/api/leaderboard",
  },
  QUIZ_ATTEMPT: {
    SUBMIT: "/api/attempts/submit",
    HISTORY: "/api/attempts/history",
  },
  QUIZ: {
    CREATE: "/api/quizzes/create",
    SEARCH: "/api/quizzes/search",
    FETCH: (id) => {
      return `/api/quizzes/fetch/${id}`;
    },
    DELETE: (id) => {
      return `/api/quizzes/delete/${id}`;
    },
    CATEGORIES: "/api/quizzes/categories",
    DIFFICULTIES: "/api/quizzes/difficulties",
    CREATORS: "/api/quizzes/creators",
  },
};

export const ROLES = {
  User: "ROLE_USER",
  Admin: "ROLE_ADMIN",
};

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const REAL_NAME = import.meta.env.VITE_REAL_NAME;
export const REAL_EMAIL = import.meta.env.VITE_REAL_EMAIL;
export const REAL_NUMBER = import.meta.env.VITE_REAL_NUMBER;
