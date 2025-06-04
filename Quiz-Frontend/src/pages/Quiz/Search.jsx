import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { API_URLS, WEB_URLS, CACHE_KEYS } from "../../helper/constants";
import QuizCard from "../../components/QuizCard";
import useLocalCache from "../../hooks/useLocalCache";

const Search = () => {
  const axiosPrivate = useAxiosPrivate();

  const { get, set, clear } = useLocalCache();

  const [quizzes, setQuizzes] = useState([]);
  const [searchParams, setSearchParams] = useState({
    title: "",
    category: "",
    difficulty: "",
    createdBy: "",
  });

  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [creators, setCreators] = useState([]);

  const navigate = useNavigate();

  const fetchFilters = async () => {
    try {
      const [searchInfoRes] = await Promise.all([
        axiosPrivate.get(API_URLS.QUIZ.SEARCH_INFO),
      ]);

      const data = searchInfoRes.data;

      setCategories(data.categories);
      setDifficulties(data.difficulties);
      setCreators(data.creators);

      set(CACHE_KEYS.SEARCH_FILTERS, data);
    } catch (error) {
      console.error("Failed to fetch filter data", error);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const query = Object.entries(searchParams)
        .filter(([key, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const url = `${API_URLS.QUIZ.SEARCH}${
        query ? "?" + query + "&sort=desc" : "?sort=desc"
      }`;
      const response = await axiosPrivate.get(url);
      setQuizzes(response.data);

      set(CACHE_KEYS.SEARCH_RESULTS, {
        quizzes: response.data,
        searchParams: searchParams,
      });
    } catch (error) {
      console.error("Failed to fetch quizzes", error);
    }
  };

  useEffect(() => {
    const cached = get(CACHE_KEYS.SEARCH_FILTERS);
    if (cached) {
      setCategories(cached.categories);
      setDifficulties(cached.difficulties);
      setCreators(cached.creators);
    } else {
      fetchFilters();
    }

    const cachedQuizzesData = get(CACHE_KEYS.SEARCH_RESULTS);
    if (cachedQuizzesData) {
      setQuizzes(cachedQuizzesData.quizzes);
      setSearchParams(cachedQuizzesData.searchParams || searchParams);
    } else {
      fetchQuizzes();
    }
  }, [axiosPrivate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchQuiz = () => {
    clear(CACHE_KEYS.SEARCH_RESULTS);
    clear(CACHE_KEYS.SEARCH_FILTERS);
    fetchFilters();
    fetchQuizzes();
  };

  const handleTakeQuiz = (quizId) => {
    navigate(WEB_URLS.QUIZ_TAKE(quizId));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Search Quizzes
      </h2>

      <div className="flex flex-wrap gap-2 mb-6 justify-center items-end">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={searchParams.title}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 sm:w-48 focus:outline-none focus:border-purple-500"
        />

        <select
          name="category"
          value={searchParams.category}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 sm:w-48 focus:outline-none focus:border-purple-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          name="difficulty"
          value={searchParams.difficulty}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 sm:w-48 focus:outline-none focus:border-purple-500"
        >
          <option value="">All Difficulties</option>
          {difficulties.map((dif) => (
            <option key={dif} value={dif}>
              {dif}
            </option>
          ))}
        </select>

        <select
          name="createdBy"
          value={searchParams.createdBy}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 sm:w-48 focus:outline-none focus:border-purple-500"
        >
          <option value="">All Creators</option>
          {creators.map((creator) => (
            <option key={creator} value={creator}>
              {creator}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearchQuiz}
          className="bg-purple-500 text-white font-semibold rounded px-4 py-2 hover:bg-purple-600 transition-colors"
        >
          Search
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Results
        </h3>
        <QuizCard
          quizzes={quizzes}
          actionLabel="Search"
          onAction={handleTakeQuiz}
        />
      </div>
    </div>
  );
};

export default Search;
