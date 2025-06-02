import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { API_URLS, WEB_URLS } from "../../helper/constants";
import QuizCard from "../../components/QuizCard";

const Search = () => {
  const axiosPrivate = useAxiosPrivate();

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

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, difficultiesRes, creatorsRes] = await Promise.all(
          [
            axiosPrivate.get(API_URLS.QUIZ.CATEGORIES),
            axiosPrivate.get(API_URLS.QUIZ.DIFFICULTIES),
            axiosPrivate.get(API_URLS.QUIZ.CREATORS),
          ]
        );

        setCategories(categoriesRes.data);
        setDifficulties(difficultiesRes.data);
        setCreators(creatorsRes.data);
      } catch (error) {
        console.error("Failed to fetch filter data", error);
      }
    };

    fetchFilters();
  }, [axiosPrivate]);

  const fetchQuizzes = async () => {
    try {
      const query = Object.entries(searchParams)
        .filter(([key, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");

      const url = `${API_URLS.QUIZ.SEARCH}${
        query ? "?" + query + "&sort=asc" : "?sort=asc"
      }`;
      const response = await axiosPrivate.get(url);
      setQuizzes(response.data);
    } catch (error) {
      console.error("Failed to fetch quizzes", error);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTakeQuiz = (quizId) => {
    navigate(WEB_URLS.QUIZ_TAKE(quizId));
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Search Quizzes
      </h2>

      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={searchParams.title}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-48 focus:outline-none focus:border-purple-500"
        />

        <select
          name="category"
          value={searchParams.category}
          onChange={handleInputChange}
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-48 focus:outline-none focus:border-purple-500"
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
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-48 focus:outline-none focus:border-purple-500"
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
          className="border border-gray-300 rounded px-3 py-2 w-full sm:w-48 focus:outline-none focus:border-purple-500"
        >
          <option value="">All Creators</option>
          {creators.map((creator) => (
            <option key={creator} value={creator}>
              {creator}
            </option>
          ))}
        </select>

        <button
          onClick={fetchQuizzes}
          className="bg-purple-500 text-white font-semibold rounded px-4 py-2 hover:bg-purple-600 transition-colors"
        >
          Search
        </button>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
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
