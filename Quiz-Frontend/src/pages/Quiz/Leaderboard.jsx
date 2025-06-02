import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { API_URLS } from "../../helper/constants.js";

const Leaderboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axiosPrivate.get(API_URLS.LEADERBOARD.RANKINGS);
        setEntries(response.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
        setEntries([]);
      }
    };

    fetchLeaderboard();
  }, []);

  const sortedEntries = [...entries].sort((a, b) => {
    const ratioA = a.totalScore / a.totalQuestions;
    const ratioB = b.totalScore / b.totalQuestions;
    return ratioB - ratioA;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Leaderboard
      </h2>

      {sortedEntries.length === 0 ? (
        <p className="text-center text-gray-600">No leaderboard data found.</p>
      ) : (
        <ul className="space-y-2">
          {sortedEntries.map((entry, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white border border-gray-300 rounded p-3 shadow-sm"
            >
              <span className="font-semibold text-gray-700">
                {index + 1}. {entry.username}
              </span>
              <span className="text-sm text-gray-600">
                Score:{" "}
                <span className="font-medium text-purple-600">
                  {entry.totalScore}
                </span>{" "}
                / {entry.totalQuestions} (
                {((entry.totalScore / entry.totalQuestions) * 100).toFixed(1)}%)
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Leaderboard;
