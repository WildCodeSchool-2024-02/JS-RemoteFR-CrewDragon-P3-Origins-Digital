import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Message de Toastify quand l'utilisateur se log
  const notifyUser = () => toast("Connexion ok ! Vous allez être redirigée !");
  const notifyError = () =>
    toast("Votre mot de passe n'est pas correct ! Réessayer !");

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
        notifyError();
        throw new Error("Email ou mot de passe incorrect !");
      }

      const userData = await response.json();

      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));
      notifyUser();

      setTimeout(() => {
        navigate(`/Profil/${userData.user.id}`);
      }, 2000);
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
      <Toaster />
      <Link to="/account" className="login-account">
        Pas de compte ? Inscrivez-vous
      </Link>
    </form>
  );
}

export default LoginForm;
