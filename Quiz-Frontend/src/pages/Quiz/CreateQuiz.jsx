import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import { WEB_URLS, API_URLS } from "../../helper/constants";
import { toast } from "react-toastify";

const CreateQuiz = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);

  const initialQuiz = {
    title: "",
    category: "",
    difficulty: "",
    questions: [],
  };

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, difficultiesRes] = await Promise.all([
          axiosPrivate.get(API_URLS.QUIZ.CATEGORIES),
          axiosPrivate.get(API_URLS.QUIZ.DIFFICULTIES),
        ]);

        setCategories(categoriesRes.data);
        setDifficulties(difficultiesRes.data);
      } catch (error) {
        console.error("Failed to fetch filter data", error);
      }
    };

    fetchFilters();
  }, [axiosPrivate]);

  const [quiz, setQuiz] = useState({
    title: "",
    category: "",
    difficulty: "",
    questions: [],
  });

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuiz((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index][name] = value;
      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[qIndex].options[optIndex] = value;
      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  const handleQuestionIndexChange = (index, e) => {
    const value = parseInt(e.target.value, 10);
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index].correctOptionIndex = value - 1;
      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  const addQuestion = () => {
    if (quiz.questions.length >= 20) return;
    setQuiz((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          options: ["", "", "", ""],
          correctOptionIndex: 0,
        },
      ],
    }));
  };

  const removeQuestion = (index) => {
    setQuiz((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions.splice(index, 1);
      return {
        ...prev,
        questions: updatedQuestions,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (quiz.questions.length === 0) {
      toast.warning("You need at least one question!");
      return;
    }
    if (quiz.category === "") {
      toast.warning("You must specify a category!");
      return;
    }
    if (quiz.difficulty === "") {
      altoast.warningert("You must specify a difficulty!");
      return;
    }
    try {
      await axiosPrivate.post(API_URLS.QUIZ.CREATE, quiz);
      toast.success("Quiz created successfully!");
      setQuiz(initialQuiz);
      navigate(WEB_URLS.QUIZ_CREATE);
    } catch (error) {
      console.error("Failed to create quiz", error);
      toast.error("Failed to create quiz.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-600 mb-6 text-center">
        Create a New Quiz
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Title:
          </label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleQuizChange}
            required
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1">
              Category:
            </label>
            <select
              name="category"
              value={quiz.category}
              onChange={handleQuizChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-purple-500"
            >
              <option value="">Select</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block font-semibold text-gray-700 mb-1">
              Difficulty:
            </label>
            <select
              name="difficulty"
              value={quiz.difficulty}
              onChange={handleQuizChange}
              className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-purple-500"
            >
              <option value="">Select</option>
              {difficulties.map((dif) => (
                <option key={dif} value={dif}>
                  {dif}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Questions:
          </h3>
          {quiz.questions.map((q, index) => (
            <div
              key={index}
              className="mb-4 border border-gray-300 p-4 rounded shadow-sm bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-700">
                  Question {index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeQuestion(index)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>

              <input
                type="text"
                name="text"
                placeholder="Question text"
                value={q.text}
                onChange={(e) => handleQuestionChange(index, e)}
                className="border border-gray-300 rounded px-3 py-2 w-full mb-2 focus:outline-none focus:border-purple-500"
                required
              />

              <div className="mb-2">
                <label className="font-semibold text-gray-700 mr-2">
                  Correct Option:
                </label>
                <input
                  type="number"
                  name="correctOptionIndex"
                  value={q.correctOptionIndex + 1}
                  onChange={(e) => handleQuestionIndexChange(index, e)}
                  min="1"
                  max={q.options.length}
                  className="border border-gray-300 rounded px-2 py-1 w-16 focus:outline-none focus:border-purple-500"
                  required
                />
              </div>

              <div>
                <h5 className="font-medium text-gray-700 mb-1">Options:</h5>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt, optIndex) => (
                    <input
                      key={optIndex}
                      type="text"
                      placeholder={`Option ${optIndex + 1}`}
                      value={opt}
                      onChange={(e) =>
                        handleOptionChange(index, optIndex, e.target.value)
                      }
                      className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:border-purple-500"
                      required
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          {quiz.questions.length < 20 && (
            <button
              type="button"
              onClick={addQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 transition-colors"
            >
              Add Question
            </button>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="bg-purple-500 text-white font-semibold px-6 py-2 rounded hover:bg-purple-600 transition-colors"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
