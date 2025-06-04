import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { API_URLS, CACHE_KEYS } from "../../helper/constants.js";
import useLocalCache from "../../hooks/useLocalCache";

const Leaderboard = () => {
  const axiosPrivate = useAxiosPrivate();
  const [entries, setEntries] = useState([]);
  const { get, set, clear } = useLocalCache();

  useEffect(() => {
    const cached = get(CACHE_KEYS.LEADERBOARD);
    if (cached) {
      setEntries(cached);
    } else {
      fetchLeaderboard();
    }
  }, [axiosPrivate]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axiosPrivate.get(API_URLS.LEADERBOARD.RANKINGS);
      setEntries(response.data);

      set(CACHE_KEYS.LEADERBOARD, response.data);
    } catch (error) {
      console.error("Failed to fetch leaderboard", error);
      setEntries([]);
    }
  };

  const handleRefreshLeaderboard = () => {
    clear(CACHE_KEYS.LEADERBOARD);
    fetchLeaderboard();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Leaderboard
      </h2>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleRefreshLeaderboard}
          className="bg-yellow-500 text-white font-semibold rounded px-4 py-2 hover:bg-yellow-600 transition-colors"
        >
          Refresh Leaderboard
        </button>
      </div>

      {entries.length === 0 ? (
        <p className="text-center text-gray-600">No leaderboard data found.</p>
      ) : (
        <ul className="space-y-2">
          {entries.map((entry, index) => (
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
