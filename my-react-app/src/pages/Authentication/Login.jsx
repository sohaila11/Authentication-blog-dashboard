import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FireBaseConfig";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/AuthSlice";
import { useNavigate } from "react-router-dom";
import "./Authentication.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        loginSuccess({
          user: {
            uid: user.uid,
            email: user.email,
          },
          token: user.accessToken,
        })
      );
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed:", error.message);
    }
  };

  return (
    <div className="main">
      <h2>Login</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/")}>back</button>
    </div>
  );
};

export default Login;
