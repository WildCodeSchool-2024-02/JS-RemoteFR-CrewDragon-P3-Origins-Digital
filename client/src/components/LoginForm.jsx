import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleValidation = async (e) => {
    e.preventDefault();
    try {
      const loginUrl = `${import.meta.env.VITE_API_URL}/api/auths`;

      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Email ou mot de passe incorrect !");
      }

      const userData = await response.json();

      localStorage.setItem("token", JSON.stringify(userData.token));
      localStorage.setItem("user", JSON.stringify(userData.user));

      navigate("/profil");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form className="login-form">
      <div className="form-group">
        <label htmlFor="username">Nom d'utilisateur</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Mot de passe"
        />
      </div>
      <button className="login-button" type="submit" onClick={handleValidation}>
        Connexion
      </button>
      <Link to="/account" className="login-account">
        Pas de compte ? Inscrivez-vous
      </Link>
    </form>
  );
}

export default LoginForm;
