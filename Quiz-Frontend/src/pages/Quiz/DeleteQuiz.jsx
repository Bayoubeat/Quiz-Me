import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { API_URLS, ROLES, CACHE_KEYS } from "../../helper/constants";
import QuizCard from "../../components/QuizCard";
import { toast } from "react-toastify";
import useLocalCache from "../../hooks/useLocalCache";

const DeleteQuiz = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [quizzes, setQuizzes] = useState([]);

  const { get, set, clear } = useLocalCache();

  useEffect(() => {
    const cached = get(CACHE_KEYS.DELETE_LIST);
    if (cached) {
      setQuizzes(cached);
    } else {
      fetchQuizzes();
    }
  }, [axiosPrivate, auth]);

  const fetchQuizzes = async () => {
    try {
      const response = await axiosPrivate.get(
        `${API_URLS.QUIZ.SEARCH}?sort=desc`
      );
      let fetchedQuizzes = response.data;

      if (!auth?.roles?.includes(ROLES.Admin)) {
        fetchedQuizzes = fetchedQuizzes.filter(
          (quiz) => quiz.createdBy === auth.username
        );
      }

      setQuizzes(fetchedQuizzes);

      set(CACHE_KEYS.DELETE_LIST, fetchedQuizzes);
    } catch (error) {
      console.error("Failed to fetch quizzes", error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axiosPrivate.delete(API_URLS.QUIZ.DELETE(quizId));
      const updatedQuizzes = quizzes.filter((quiz) => quiz.quizId !== quizId);
      setQuizzes(updatedQuizzes);

      set(CACHE_KEYS.DELETE_LIST, updatedQuizzes);

      toast.success("Quiz deleted!");
    } catch (error) {
      console.error("Failed to delete quiz", error);
      toast.error("Failed to delete quiz.");
    }
  };

  const handleRefreshQuizzes = () => {
    clear(CACHE_KEYS.DELETE_LIST);
    fetchQuizzes();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Manage Your Quizzes
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Select a quiz to delete. Only your own quizzes are visible.
      </p>
      <button
        onClick={handleRefreshQuizzes}
        className="bg-yellow-500 text-white font-semibold rounded px-4 py-2 hover:bg-yellow-600 transition-colors mb-4 block mx-auto"
      >
        Retrieve Latest
      </button>
      <QuizCard
        quizzes={quizzes}
        actionLabel="Delete"
        onAction={handleDeleteQuiz}
      />
    </div>
  );
};

export default DeleteQuiz;
