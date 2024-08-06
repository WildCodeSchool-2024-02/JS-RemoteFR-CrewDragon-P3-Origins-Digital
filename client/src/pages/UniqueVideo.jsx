import { useParams, useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import { useContext } from "react";
import { AuthContext } from "../contexte/AuthContext";

function UniqueVideo() {
  const { videoId } = useParams();
  const location = useLocation();
  const { title, description, date, duration, categories, abonnementsid } =
    location.state;
  const { abonnementId } = useContext(AuthContext);

  // Déterminez si l'utilisateur a accès à la vidéo
  const hasAccess =
    abonnementId === 2 ||
    (abonnementId === 1 && abonnementsid === 1) ||
    (!abonnementId && abonnementsid === 1);

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      {hasAccess ? (
        <div className="video-unique-container">
          <YouTube videoId={videoId} opts={opts} />
        </div>
      ) : (
        <div className="restricted-message">
          <p>
            Vous n'avez pas accès à cette vidéo. Veuillez vous abonner pour y
            accéder.
          </p>
        </div>
      )}
      <div className="data-container">
        <p className="title-video-unique">
          <strong className="strong-color">Titre:</strong> <br /> {title}
        </p>
        <p className="desc-video-unique">
          <strong className="strong-color">Description:</strong> <br />{" "}
          {description}
        </p>
        <p className="date-video-unique">
          <strong className="strong-color">Date de publication:</strong> <br />{" "}
          {date}
        </p>
        <p className="time-video-unique">
          <strong className="strong-color">Durée:</strong> <br /> {duration}
        </p>
        <p className="time-video-unique">
          <strong className="strong-color">Catégorie:</strong> <br />{" "}
          {categories}
        </p>
      </div>
    </div>
  );
}

export default UniqueVideo;
