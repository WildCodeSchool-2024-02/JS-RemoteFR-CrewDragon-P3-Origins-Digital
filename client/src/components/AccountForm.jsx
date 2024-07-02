import { useState, useRef } from "react";
import axios from "axios";

function AccountForm() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [setUser] = useState(null);
  const emailRef = useRef();

  const handleAddUser = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    const NewUser = {
      firstname,
      lastname,
      birthday,
      email,
      password,
      // abonnementsid,
    };
    const User = e.target;
    const UserData = new FormData(User);
    const Userjson = Object.fromEntries(UserData.entries());
    try {
      // Appel à l'API pour créer un nouvel utilisateur
      await axios.post(`http://localhost:3310/api/users`, Userjson);
      setUser(NewUser);
    } catch (error) {
      console.error("Erreur lors de la création du compte : ", error);
    }
  };

  return (
    <form className="account-form" onSubmit={handleAddUser}>
      <div className="form-group">
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          placeholder="Entrez votre prénom"
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
          placeholder="Entrez votre mot de passe"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirmpassword">Confirmer le mots de passe</label>
        <input
          type="password"
          id="confirmpassword"
          placeholder="Confirmer le mots de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <label>
        <input
          className="chacbox-abo"
          type="checkbox"
          name="abonnements_id"
          id="abonnements_id"
        />
        abonnements
      </label>
      <button className="account-button" type="submit">
        S'enregistrer
      </button>
    </form>
  );
}

export default AccountForm;
