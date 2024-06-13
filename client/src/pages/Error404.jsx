import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import interdit from "../assets/images/image-404/6732854.jpg";

function Error404() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="error-container">
      <img className="interdit" src={interdit} alt="Interdit" />
      <h1 className="error-title">404</h1>
      <p className="error-message">Oops! Tu t'es trompé de chemin je crois!</p>
      <button
        type="button"
        className="home-button"
        onClick={() => navigate("/")}
      >
        Retour à l'acceuille
      </button>
    </div>
  );
}

export default Error404;
