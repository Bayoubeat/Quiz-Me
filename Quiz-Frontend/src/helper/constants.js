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
  MISSING: "/missing",
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
    CREATE: "/api/quizzes/create/quiz",
    SEARCH: "/api/quizzes/search/all",
    SEARCH_INFO: "/api/quizzes/search/info",

    FETCH: (id) => {
      return `/api/quizzes/fetch/${id}`;
    },
    DELETE: (id) => {
      return `/api/quizzes/delete/${id}`;
    },
  },
};

export const ROLES = {
  User: "ROLE_USER",
  Admin: "ROLE_ADMIN",
};

export const CACHE_KEYS = {
  SEARCH_FILTERS: "quiz_search_info",
  SEARCH_RESULTS: "quiz_search_results",
  HISTORY: "quiz_attempt_history",
  DELETE_LIST: "quiz_deletion_results",
  LEADERBOARD: "quiz_leaderboard_data",
};

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const REAL_NAME = import.meta.env.VITE_REAL_NAME;
export const REAL_EMAIL = import.meta.env.VITE_REAL_EMAIL;
export const REAL_NUMBER = import.meta.env.VITE_REAL_NUMBER;
