import { useEffect, useState, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexte/AuthContext";

function Abonnement() {
  const [abonnements, setAbonnements] = useState([]);
  const [userSubscription, setUserSubscription] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).userId : null;

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
    if (!userId) {
      toast.error("Utilisateur non connecté");
      return;
    }

    try {
      setUserSubscription(abonnementName);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/abonnement`,
        { abonnementsid },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newToken = response.data.token;
      if (newToken) {
        localStorage.setItem("token", newToken);
        login(newToken);
      } else {
        console.error(
          "Token non trouvé dans la réponse de l'API :",
          response.data
        );
      }

      setUserSubscription("");
      toast.success(`Vous avez bien souscrit à ${abonnementName}`);
      navigate(`/profil/${userId}`);
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
