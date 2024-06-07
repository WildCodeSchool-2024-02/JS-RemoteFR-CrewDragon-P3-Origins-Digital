import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login-container">
      <h2 className="tittle-login">
        Se connecter sur <strong> Origins Digital</strong>{" "}
      </h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            type="text"
            id="username"
            placeholder="Entrez votre nom d'utilisateur"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Entrez votre mot de passe"
          />
        </div>
        <button className="login-button" type="button">
          Connexion
        </button>
        <Link to="/account" className="login-account">
          Pas de compte ? Inscrivez-vous
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
