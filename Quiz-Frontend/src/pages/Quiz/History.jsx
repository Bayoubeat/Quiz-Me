import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { API_URLS, WEB_URLS, CACHE_KEYS } from "../../helper/constants";
import QuizCard from "../../components/QuizCard";
import { useNavigate } from "react-router-dom";
import useLocalCache from "../../hooks/useLocalCache";

const History = () => {
  const axiosPrivate = useAxiosPrivate();
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  const { get, set, clear } = useLocalCache();

  useEffect(() => {
    const cached = get(CACHE_KEYS.HISTORY);
    if (cached) {
      setAttempts(cached);
    } else {
      fetchHistory();
    }
  }, [axiosPrivate]);

  const fetchHistory = async () => {
    try {
      const response = await axiosPrivate.get(API_URLS.QUIZ_ATTEMPT.HISTORY);
      const fetchedAttempts = response.data.quizAttempts || [];
      setAttempts(fetchedAttempts);

      set(CACHE_KEYS.HISTORY, fetchedAttempts);
    } catch (error) {
      console.error("Failed to fetch history", error);
      setAttempts([]);
    }
  };

  const handleTakeQuiz = (quizId) => {
    navigate(WEB_URLS.QUIZ_TAKE(quizId));
  };

  const handleRefreshHistory = () => {
    clear(CACHE_KEYS.HISTORY);
    fetchHistory();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Your Quiz Attempt History
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Review your past quiz attempts and try them again!
      </p>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleRefreshHistory}
          className="bg-yellow-500 text-white font-semibold rounded px-4 py-2 hover:bg-yellow-600 transition-colors"
        >
          Retrieve History
        </button>
      </div>
      <QuizCard
        quizzes={attempts}
        actionLabel="History"
        onAction={handleTakeQuiz}
      />
    </div>
  );
};

export default History;
