import { useEffect } from "react";

import LoginForm from "../components/LoginForm";

function LoginPage() {
  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="login-container">
      <h2 className="tittle-login">
        Se connecter sur <strong> Origins Digital</strong>{" "}
      </h2>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
