import { Link } from "react-router-dom";

function LoginForm() {
  return (
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
      <button className="login-button" type="submit">
        Connexion
      </button>
      <Link to="/account" className="login-account">
        Pas de compte ? Inscrivez-vous
      </Link>
    </form>
  );
}

export default LoginForm;
