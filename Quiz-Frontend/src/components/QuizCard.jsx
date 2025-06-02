import React, { useEffect, useState } from "react";

const QuizCard = ({ quizzes, onAction, actionLabel }) => {
  const [notFoundMsg, setNotFoundMsg] = useState("Not Found");
  const [buttonLabel, setButtonLabel] = useState("N/A");
  const [isHistory, setIsHistory] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    if (actionLabel === "History") {
      setNotFoundMsg("No attempts found.");
      setButtonLabel("Try Again");
      setIsHistory(true);
      setIsSearch(false);
      setIsDelete(false);
    } else if (actionLabel === "Search") {
      setNotFoundMsg("No quizzes found.");
      setButtonLabel("Take");
      setIsSearch(true);
      setIsHistory(false);
      setIsDelete(false);
    } else if (actionLabel === "Delete") {
      setNotFoundMsg("No quizzes to delete found.");
      setButtonLabel("Delete");
      setIsDelete(true);
      setIsHistory(false);
      setIsSearch(false);
    }
  }, [actionLabel]);

  if (!quizzes || quizzes.length === 0) {
    return (
      <div className="text-center text-gray-500 p-6">
        <p>{notFoundMsg}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {quizzes.map((quiz, index) => (
        <li
          key={index}
          className="border border-gray-300 p-4 rounded shadow-sm bg-white flex flex-col sm:flex-row sm:justify-between sm:items-center"
        >
          {/* Main Quiz Info */}
          <div className="flex-1">
            <h4 className="text-xl font-bold text-purple-600 mb-1">
              {quiz.title}
            </h4>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Category:</span> {quiz.category}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Difficulty:</span>{" "}
              {quiz.difficulty}
            </p>
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Created by:</span>{" "}
              {quiz.createdBy}
            </p>
            {quiz.attemptTime && (
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Attempt Time:</span>{" "}
                {quiz.attemptTime}
              </p>
            )}
          </div>

          {/* Middle Section: Scores & Stats */}
          <div className="mt-2 sm:mt-0 sm:mx-4 text-sm text-gray-700 text-center sm:text-left">
            {isHistory && (
              <p>
                <span className="font-semibold">Score:</span> {quiz.score}
              </p>
            )}
            {isSearch && (
              <p>
                <span className="font-semibold">Best Score:</span> {quiz.score}
              </p>
            )}
            <p>
              <span className="font-semibold"># Of Questions:</span>{" "}
              {quiz.totalQuestions}
            </p>
          </div>

          {/* Action Button */}
          {onAction && (
            <div className="mt-3 sm:mt-0 flex justify-end sm:justify-center">
              <button
                onClick={() => onAction(quiz.quizId)}
                className={`
                    font-semibold px-4 py-1 rounded transition-colors
                    ${
                      isHistory
                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                        : ""
                    }
                    ${
                      isSearch
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : ""
                    }
                    ${isDelete ? "bg-red-500 hover:bg-red-600 text-white" : ""}
                  `}
              >
                {buttonLabel}
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default QuizCard;
