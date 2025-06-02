import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { API_URLS, WEB_URLS } from "../../helper/constants";
import QuizCard from "../../components/QuizCard";
import { useNavigate } from "react-router-dom";

const History = () => {
  const axiosPrivate = useAxiosPrivate();
  const [attempts, setAttempts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axiosPrivate.get(API_URLS.QUIZ_ATTEMPT.HISTORY);
        setAttempts(response.data.quizAttempts || []);
      } catch (error) {
        console.error("Failed to fetch history", error);
        setAttempts([]);
      }
    };

    fetchHistory();
  }, []);

  const handleTakeQuiz = (quizId) => {
    navigate(WEB_URLS.QUIZ_TAKE(quizId));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Your Quiz Attempt History
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Review your past quiz attempts and try them again!
      </p>
      <QuizCard
        quizzes={attempts}
        actionLabel="History"
        onAction={handleTakeQuiz}
      />
    </div>
  );
};

export default History;
