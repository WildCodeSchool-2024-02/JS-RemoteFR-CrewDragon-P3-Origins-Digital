import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../contexte/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const notifyUser = () =>
    toast("Connexion réussie ! Vous allez être redirigé(e) !");
  const notifyError = () =>
    toast.error("Email ou mot de passe incorrect ! Réessayez.");

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
      login(userData.token); // Utilisation de la fonction login du contexte

      localStorage.setItem("user", JSON.stringify(userData.user)); // Stockage des données utilisateur si nécessaire
      notifyUser();

      setTimeout(() => {
        navigate(`/Profil/${userData.user.id}`);
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <form className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Mot de passe"
          required
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
