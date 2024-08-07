import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AccountForm() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);
  const emailRef = useRef();

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      return;
    }
    const NewUser = {
      firstname,
      lastname,
      birthday,
      email,
      password,
    };
    const User = e.target;
    const UserData = new FormData(User);
    const Userjson = Object.fromEntries(UserData.entries());
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users`, Userjson);
      setUser(NewUser);
    } catch (error) {
      console.error("Erreur lors de la création du compte : ", error);
    }
  };

  return (
    <div>
      <form className="account-form" onSubmit={handleAddUser}>
        <div className="form-group">
          <label htmlFor="firstname">Prénom</label>
          <input
            type="text"
            id="firstname"
            placeholder="Entrez votre prénom"
            name="firstname"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastname">Nom</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Entrez votre nom"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Date de naissance</label>
          <input
            type="date"
            name="birthday"
            id="birthday"
            placeholder="Entrez votre date de naissance"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            name="email"
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Entrez votre mot de passe"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmpassword">Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button className="account-button" type="submit">
          S'enregistrer
        </button>
      </form>
      {user && ( // Utilisation de l'état user pour afficher un message de confirmation
        <div className="confirmation-message">
          <h2 className="user-greeting">
            Bienvenue, <span className="user-color">{user.firstname}</span> !
          </h2>
          <p className="user-greeting">Votre compte a été créé avec succès.</p>
          <Link to="/Login">
            <button className="account-log" type="button">
              Se connecter
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default AccountForm;
