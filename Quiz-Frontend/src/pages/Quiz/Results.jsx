import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { WEB_URLS } from "../../helper/constants";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};
  const { auth } = useAuth();

  if (!result) {
    return (
      <div className="flex justify-center items-center h-40 text-gray-600">
        No results found.
      </div>
    );
  }

  const handleTryAgain = () => {
    navigate(WEB_URLS.QUIZ_TAKE(result.quizId));
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-4 text-center">
        Results for: {result.title}
      </h2>

      <div className="text-center text-gray-700 space-y-2">
        <p className="text-lg font-medium">
          Score:{" "}
          <span className="text-green-600 font-semibold">{result.score}</span> /{" "}
          {result.totalQuestions}
        </p>
        {auth?.accessToken ? (
          <p className="text-green-600 font-semibold">
            Your scores have been saved!
          </p>
        ) : (
          <p className="text-yellow-600 font-semibold">
            Login to save your scores!
          </p>
        )}
      </div>

      <div className="mt-6 space-y-4">
        {result.answers.map((item, index) => (
          <div
            key={index}
            className={`border rounded p-4 ${
              item.isCorrect
                ? "border-green-400 bg-green-50"
                : "border-red-400 bg-red-50"
            }`}
          >
            <p className="font-semibold mb-1">
              Q{index + 1}: {item.question}
            </p>
            <p>
              Your Answer: <span className="font-medium">{item.answer}</span>
            </p>
            <p
              className={`font-semibold ${
                item.isCorrect ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.isCorrect ? "Correct" : "Incorrect"}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={handleTryAgain}
          className="bg-blue-500 text-white font-semibold px-6 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Results;
