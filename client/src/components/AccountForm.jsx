function AccountForm() {
  return (
    <form className="account-form">
      <div className="form-group">
        <label htmlFor="firstname">Prénom</label>
        <input type="text" id="firstname" placeholder="Entrez votre prénom" />
      </div>
      <div className="form-group">
        <label htmlFor="lastname">Nom</label>
        <input type="text" id="lastname" placeholder="Entrez votre nom" />
      </div>
      <div className="form-group">
        <label htmlFor="birthday">Date de naissance</label>
        <input
          type="date"
          id="birthday"
          placeholder="Entrez votre date de naissance"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input type="email" id="email" placeholder="Entrez votre email" />
      </div>
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
      <button className="account-button" type="submit">
        S'enregistrer
      </button>
    </form>
  );
}

export default AccountForm;
