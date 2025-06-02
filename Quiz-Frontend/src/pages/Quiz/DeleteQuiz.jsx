import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { API_URLS, ROLES } from "../../helper/constants";
import QuizCard from "../../components/QuizCard";
import { toast } from "react-toastify";

const DeleteQuiz = () => {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
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
      } catch (error) {
        console.error("Failed to fetch quizzes", error);
      }
    };

    fetchQuizzes();
  }, [axiosPrivate, auth]);

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axiosPrivate.delete(API_URLS.QUIZ.DELETE(quizId));
      setQuizzes((prev) => prev.filter((quiz) => quiz.quizId !== quizId));
      toast.success("Quiz deleted!");
    } catch (error) {
      console.error("Failed to delete quiz", error);
      toast.error("Failed to delete quiz.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Manage Your Quizzes
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Select a quiz to delete. Only your own quizzes are visible.
      </p>
      <QuizCard
        quizzes={quizzes}
        actionLabel="Delete"
        onAction={handleDeleteQuiz}
      />
    </div>
  );
};

export default DeleteQuiz;
