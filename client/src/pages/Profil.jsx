import { useLoaderData, Link } from "react-router-dom";

function Profil() {
  const users = useLoaderData();

  return (
    <div>
      <div className="profil-container">
        <div className="user-profil-container">
          <h1 className="user-connected">
            Hello <span className="user-style">{users.firstname}</span> ! 👋
          </h1>
          <div className="userInfos">
            <div className="modMail">
              <p>
                <span className="userDesc">Votre adresse mail :</span>{" "}
                {users.email}
              </p>
              <button type="button" className="modify-button">
                Modifier
              </button>
            </div>
            <div className="modName">
              <p>
                <span className="userDesc">Votre Nom :</span> {users.lastname}
              </p>
              <button type="button" className="modify-button">
                Modifier
              </button>
            </div>
            <div className="modBirthday">
              <p>
                <span className="userDesc">Votre date d'anniversaire :</span>{" "}
                {users.birthday}
              </p>
              <button type="button" className="modify-button">
                Modifier
              </button>
            </div>
            <div className="modAbo">
              <p>
                <span className="userDesc">Votre abonnement :</span>{" "}
                {users.abonnements.name}
              </p>
              <Link to="/abo">
                <button type="button" className="modify-button">
                  changer d'abonnement
                </button>
              </Link>
            </div>
            <div className="modDates">
              <p>
                <span className="userDesc">Date de souscription :</span>{" "}
                {users.abonnements.date_de_paiement}
              </p>
              <p>
                <span className="userDesc">Date de fin d'abonnement :</span>{" "}
                {users.abonnements.date_de_fin}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
