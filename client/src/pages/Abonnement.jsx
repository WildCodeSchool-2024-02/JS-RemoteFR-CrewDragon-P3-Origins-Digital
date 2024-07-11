import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function Abonnement() {
  const [abonnements, setAbonnements] = useState([]);
  const [userSubscription, setUserSubscription] = useState("");

  useEffect(() => {
    const fetchAbonnements = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/abonnements`
        );
        setAbonnements(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des abonnements :", error);
      }
    };

    fetchAbonnements();
  }, []);

  const handleSubscribe = async (abonnementName, abonnementsid) => {
    try {
      setUserSubscription(abonnementName);

      const userId = 2;
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/abonnement`,
        {
          abonnementsid, // Utilisation de la syntaxe de raccourci
        }
      );

      setUserSubscription("");
      toast.success(`Vous avez bien souscrit à ${abonnementName}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'abonnement :", error);
      toast.error("Erreur lors de la mise à jour de l'abonnement");
    }
  };

  return (
    <div className="abonnements-container">
      <Toaster position="top-right" />
      {abonnements.map((abonnement) => (
        <div key={abonnement.id} className="card">
          <h2>{abonnement.name}</h2>
          <p>Montant: {abonnement.montant}€</p>
          {abonnement.durée && <p>Durée: {abonnement.durée}</p>}
          <p>{abonnement.description}</p>

          <button
            className="abo-button"
            type="button"
            onClick={() => handleSubscribe(abonnement.name, abonnement.id)}
          >
            S'abonner
          </button>
        </div>
      ))}

      {userSubscription && <p>Vous êtes abonné à : {userSubscription}</p>}
    </div>
  );
}

export default Abonnement;
