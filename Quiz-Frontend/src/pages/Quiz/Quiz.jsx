import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { API_URLS, WEB_URLS } from "../../helper/constants";

const Quiz = () => {
  const { id: quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axiosPrivate.get(API_URLS.QUIZ.FETCH(quizId));
        setQuiz(response.data);
      } catch (error) {
        console.error("Failed to fetch quiz", error);
        navigate(WEB_URLS.MISSING);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleOptionSelect = (questionId, index) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: index,
    }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    const payload = {
      quizId: parseInt(quizId),
      selectedOptionIndexes: quiz.questions.map((q) =>
        answers[q.questionId] !== undefined ? answers[q.questionId] : -1
      ),
    };

    try {
      const response = await axiosPrivate.post(
        API_URLS.QUIZ_ATTEMPT.SUBMIT,
        payload
      );
      response.data.quizId = quizId;
      setSubmitted(true);
      navigate(WEB_URLS.QUIZ_RESULTS, {
        state: {
          result: response.data,
        },
      });
    } catch (error) {
      console.error("Failed to submit quiz", error);
    }
  };

  if (!quiz) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-600">
        Loading quiz...
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-4 text-center">
        {quiz.title}
      </h2>
      <div className="text-center text-gray-600 mb-6">
        <p className="text-sm">Category: {quiz.category}</p>
        <p className="text-sm">Difficulty: {quiz.difficulty}</p>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-4">Questions:</h3>
      <ul className="space-y-4">
        {quiz.questions.map((q) => (
          <li
            key={q.questionId}
            className="border border-gray-300 p-4 rounded shadow-sm bg-white"
          >
            <p className="font-medium text-gray-700 mb-2">{q.text}</p>
            <ul className="space-y-2">
              {q.options.map((opt, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(q.questionId, index)}
                  className={`px-3 py-2 rounded cursor-pointer border border-gray-200 ${
                    submitted
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-purple-100"
                  } ${
                    answers[q.questionId] === index
                      ? "bg-purple-200 border-purple-300"
                      : "bg-white"
                  } transition-colors`}
                >
                  {opt}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col items-center">
        {!submitted && (
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white font-semibold px-6 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Submit Quiz
          </button>
        )}

        {submitted && (
          <p className="text-green-600 font-medium mt-4">
            Quiz submitted! Check your score.
          </p>
        )}
      </div>
    </div>
  );
};

export default Quiz;
