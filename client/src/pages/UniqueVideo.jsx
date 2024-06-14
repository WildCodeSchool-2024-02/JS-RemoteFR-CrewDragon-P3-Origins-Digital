import { useParams, useLocation } from "react-router-dom";
import YouTube from "react-youtube";

function UniqueVideo() {
  const { videoId } = useParams();
  // Fait passé les données dans une autre page
  const location = useLocation();
  // Déstructuration pour récup les data du Link de la page SousCategories.jsx
  const { title, description, date, duration, categories } = location.state;

  const opts = {
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <div className="video-unique-container">
        <YouTube videoId={videoId} opts={opts} />
      </div>
      <div className="data-container">
        <p className="title-video-unique">
          {" "}
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
          <strong className="strong-color">Categorie:</strong> <br />{" "}
          {categories}
        </p>
      </div>
    </div>
  );
}

export default UniqueVideo;
