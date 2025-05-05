import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRedirect = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  return user ? <Navigate to="/dashboard" replace /> : children;
};

export default AuthRedirect;
