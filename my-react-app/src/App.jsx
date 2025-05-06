import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Authentication/Login";
import Navbar from "./layout/Navbar/Navbar";
import Signup from "./pages/Authentication/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import NewPost from "./pages/NewPost/NewPost";
import Posts from "./pages/Posts/Posts";
import Home from "./pages/Home/Home";
import AuthRedirect from "./components/AuthRedirect";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
        <Route path="/signup" element={<AuthRedirect><Signup /></AuthRedirect>} />
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/posts" element={<ProtectedRoute />}>
          <Route index element={<Posts />} />
        </Route>
        <Route path="/new-post" element={<ProtectedRoute />}>
          <Route index element={<NewPost />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
