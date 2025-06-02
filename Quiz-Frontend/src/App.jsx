import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Search from "./pages/Quiz/Search";
import Quiz from "./pages/Quiz/Quiz";
import Leaderboard from "./pages/Quiz/Leaderboard";
import History from "./pages/Quiz/History";
import Results from "./pages/Quiz/Results";
import CreateQuiz from "./pages/Quiz/CreateQuiz";
import { WEB_URLS, ROLES } from "./helper/constants";
import { PersistLogin } from "./components/PersistLogin";
import { RequireAuth } from "./components/RequireAuth";
import { Layout } from "./pages/Layout";
import DeleteQuiz from "./pages/Quiz/DeleteQuiz";
import { Missing } from "./pages/Misc/Missing";
import { Unauthorized } from "./pages/Misc/Unauthorized";
import Landing from "./pages/Landing";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer position="bottom-center" />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route path={WEB_URLS.LANDING} element={<Landing />} />

            <Route path={WEB_URLS.LOGIN} element={<Login />} />
            <Route path={WEB_URLS.REGISTER} element={<Register />} />

            <Route path={WEB_URLS.QUIZ_SEARCH} element={<Search />} />
            <Route path={WEB_URLS.QUIZ_LOAD} element={<Quiz />} />
            <Route path={WEB_URLS.QUIZ_RESULTS} element={<Results />} />
            <Route path={WEB_URLS.QUIZ_LEADERBOARD} element={<Leaderboard />} />

            <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
              <Route path={WEB_URLS.QUIZ_CREATE} element={<CreateQuiz />} />
              <Route path={WEB_URLS.QUIZ_DELETE} element={<DeleteQuiz />} />
              <Route path={WEB_URLS.QUIZ_HISTORY} element={<History />} />
            </Route>

            <Route path={WEB_URLS.UNAUTHORIZED} element={<Unauthorized />} />
            <Route path="*" element={<Missing />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
