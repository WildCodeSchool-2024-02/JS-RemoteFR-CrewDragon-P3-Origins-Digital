function ContactForm() {
  return (
    <form className="login-form">
      <div className="form-group">
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          placeholder="Entrez votre prénom"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastname">Nom</label>
        <input
          type="text"
          id="lastname"
          placeholder="Entrez votre nom"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="Entrez votre email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea className="form-control" rows="10" required />
      </div>
      <button className="login-button" type="submit">
        Soumettre
      </button>
    </form>
  );
}

export default ContactForm;
