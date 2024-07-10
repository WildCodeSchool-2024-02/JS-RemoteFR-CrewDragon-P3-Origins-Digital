// src/pages/Abonnement.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Abonnement() {
  const [abonnements, setAbonnements] = useState([]);

  useEffect(() => {
    const fetchAbonnements = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/abonnements`
        );

        setAbonnements(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des abonnements :",
          error
        );
      }
    };

    fetchAbonnements();
  }, []);

  const handleSubscribe = (abonnementName) => {
    toast(`Vous avez bien souscrit un  ${abonnementName}`);
  };

  return (
    <div className="abonnements-container">
      <Toaster />
      {abonnements.map((abonnement) => (
        <div key={abonnement.id} className="card">
          <h2>{abonnement.name}</h2>
          <p>Montant: {abonnement.montant}€</p>
          {abonnement.duréee && <p>Durée: {abonnement.duréee}</p>}
          <p>{abonnement.description}</p>
          <button
            className="abo-button"
            type="button"
            onClick={() => handleSubscribe(abonnement.name)}
          >
            S'abonner
          </button>
        </div>
      ))}
    </div>
  );
}

export default Abonnement;
